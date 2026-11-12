import { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { HeroConstellation3D } from './components/HeroConstellation3D';
import { PolymathMeter } from './components/PolymathMeter';
import { PinterestMasonryGrid } from './components/PinterestMasonryGrid';
import { SkillTreeFlowchart } from './components/SkillTreeFlowchart';
import { SkillDetailPage } from './components/SkillDetailPage';
import { ResumeVaultPage } from './components/ResumeVaultPage';
import { KnowledgeMapPage } from './components/KnowledgeMapPage';
import { StudyPlannerPage } from './components/StudyPlannerPage';
import { AddSkillModal } from './components/AddSkillModal';
import { useAuth } from './contexts/AuthContext';
import { ALL_SKILLS, getGlobalCompletion, mergeSkills } from './data';
import { DomainId, SkillNode, UserProgressState } from './types/curriculum';

const STORAGE_KEY = 'polymath_atlas_progress_v1';

const DEFAULT_PROGRESS: UserProgressState = {
  completedTopicIds: {},
  masteredCardIds: {},
  bookmarkedItems: {},
  demoPolymathMode: false,
  customSkills: [],
};

function hasAnyProgress(state: UserProgressState): boolean {
  return (
    Object.values(state.completedTopicIds).some(Boolean) ||
    Object.values(state.masteredCardIds).some(Boolean) ||
    Object.values(state.bookmarkedItems).some(Boolean) ||
    Boolean(state.customSkills && state.customSkills.length > 0) ||
    state.demoPolymathMode
  );
}

function loadProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      completedTopicIds: parsed.completedTopicIds || {},
      masteredCardIds: parsed.masteredCardIds || {},
      bookmarkedItems: parsed.bookmarkedItems || {},
      demoPolymathMode: Boolean(parsed.demoPolymathMode),
      customSkills: Array.isArray(parsed.customSkills) ? parsed.customSkills : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const { user, loading: authLoading, signInWithGoogle, signOut, getIdToken } = useAuth();
  const [activeView, setActiveView] = useState<AppView>('explore');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(ALL_SKILLS[0].id);
  const [activeDomain, setActiveDomain] = useState<DomainId | 'all'>('all');
  const [progress, setProgress] = useState<UserProgressState>(loadProgress);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const hydratedUidRef = useRef<string | null>(null);
  const skipNextRemoteSaveRef = useRef(false);

  const { skills: allSkills, skillMap } = useMemo(
    () => mergeSkills(progress.customSkills),
    [progress.customSkills]
  );

  // Sync URL hash for shareable skill links
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('skill/')) {
        const id = hash.slice(6);
        if (skillMap[id]) {
          setSelectedSkillId(id);
          setActiveView('skill');
        }
      } else if (hash === 'tree') {
        setActiveView('tree');
      } else if (hash === 'knowledge-map') {
        setActiveView('map');
      } else if (hash === 'study-planner') {
        setActiveView('planner');
      } else if (hash === 'vault') {
        setActiveView('vault');
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [skillMap]);

  // Load saved progress from backend when authenticated
  useEffect(() => {
    if (!user) {
      hydratedUidRef.current = null;
      return;
    }

    let cancelled = false;

    async function hydrateFromServer() {
      try {
        const token = await getIdToken();
        if (!token || cancelled) return;

        const res = await fetch('/api/progress', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok || cancelled) return;

        const remote: UserProgressState = await res.json();
        if (cancelled) return;

        const localSnapshot = loadProgress();
        if (!hasAnyProgress(remote) && hasAnyProgress(localSnapshot)) {
          // Migrate pre-existing local progress into the user's account
          hydratedUidRef.current = user!.uid;
          await fetch('/api/progress', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(localSnapshot),
          });
        } else {
          skipNextRemoteSaveRef.current = true;
          hydratedUidRef.current = user!.uid;
          setProgress({
            completedTopicIds: remote.completedTopicIds || {},
            masteredCardIds: remote.masteredCardIds || {},
            bookmarkedItems: remote.bookmarkedItems || {},
            demoPolymathMode: Boolean(remote.demoPolymathMode),
            customSkills: Array.isArray(remote.customSkills) ? remote.customSkills : [],
          });
        }
      } catch {
        // Silently retain local progress if API is unavailable (e.g. static hosting)
        hydratedUidRef.current = user?.uid ?? null;
      }
    }

    hydrateFromServer();

    return () => {
      cancelled = true;
    };
  }, [user, getIdToken]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }

    if (!user || hydratedUidRef.current !== user.uid) {
      return;
    }

    if (skipNextRemoteSaveRef.current) {
      skipNextRemoteSaveRef.current = false;
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        await fetch('/api/progress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(progress),
        });
      } catch {
        // Ignore network errors silently; local cache remains intact
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [progress, user, getIdToken]);

  const navigateView = (view: AppView) => {
    setActiveView(view);
    if (view === 'explore') window.location.hash = '';
    else if (view === 'tree') window.location.hash = 'tree';
    else if (view === 'map') window.location.hash = 'knowledge-map';
    else if (view === 'planner') window.location.hash = 'study-planner';
    else if (view === 'vault') window.location.hash = 'vault';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSkill = (skillId: string) => {
    if (!skillMap[skillId]) return;
    setSelectedSkillId(skillId);
    setActiveView('skill');
    window.location.hash = `skill/${skillId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCustomSkill = (newSkill: SkillNode) => {
    setProgress((prev) => ({
      ...prev,
      customSkills: [...(prev.customSkills || []), newSkill],
    }));
    setSelectedSkillId(newSkill.id);
    setActiveView('skill');
    window.location.hash = `skill/${newSkill.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCustomSkill = (skillId: string) => {
    setProgress((prev) => ({
      ...prev,
      customSkills: (prev.customSkills || []).filter((s) => s.id !== skillId),
    }));
    navigateView('explore');
  };

  const toggleTopic = (topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedTopicIds: {
        ...prev.completedTopicIds,
        [topicId]: !prev.completedTopicIds[topicId],
      },
    }));
  };

  const toggleModuleTopics = (topicIds: string[], markComplete: boolean) => {
    setProgress((prev) => {
      const next = { ...prev.completedTopicIds };
      topicIds.forEach((id) => {
        next[id] = markComplete;
      });
      return { ...prev, completedTopicIds: next };
    });
  };

  const toggleCardMastered = (cardId: string) => {
    setProgress((prev) => ({
      ...prev,
      masteredCardIds: {
        ...prev.masteredCardIds,
        [cardId]: !prev.masteredCardIds[cardId],
      },
    }));
  };

  const toggleBookmark = (itemKey: string) => {
    setProgress((prev) => ({
      ...prev,
      bookmarkedItems: {
        ...prev.bookmarkedItems,
        [itemKey]: !prev.bookmarkedItems[itemKey],
      },
    }));
  };

  const toggleDemoPolymath = () => {
    setProgress((prev) => ({
      ...prev,
      demoPolymathMode: !prev.demoPolymathMode,
    }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  const globalStats = getGlobalCompletion(
    progress.completedTopicIds,
    progress.demoPolymathMode,
    allSkills
  );

  const selectedSkill = skillMap[selectedSkillId] || allSkills[0];

  return (
    <div className="min-h-screen bg-[#090D0B] text-[#F1F5F3] flex flex-col">
      <Navbar
        activeView={activeView}
        onNavigate={navigateView}
        globalPercentage={globalStats.percentage}
        isPolymath={globalStats.isPolymath}
        user={user}
        authLoading={authLoading}
        onSignIn={signInWithGoogle}
        onSignOut={signOut}
      />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {activeView === 'explore' && (
          <>
            <HeroConstellation3D
              globalPercentage={globalStats.percentage}
              isPolymath={globalStats.isPolymath}
              activeDomain={activeDomain}
              onSelectDomain={(dom) => {
                setActiveDomain(dom);
              }}
              onOpenTree={() => navigateView('tree')}
            />

            <PolymathMeter
              skills={allSkills}
              progress={progress}
              onToggleDemoPolymath={toggleDemoPolymath}
              onResetProgress={resetProgress}
              onImportProgress={(imported) => setProgress(imported)}
              onSelectDomain={(dom) => {
                setActiveDomain(dom);
                document.getElementById('masonry-catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <PinterestMasonryGrid
              skills={allSkills}
              activeDomain={activeDomain}
              onSelectDomain={setActiveDomain}
              progress={progress}
              onOpenSkill={openSkill}
              onOpenAddSkill={() => setAddSkillOpen(true)}
            />
          </>
        )}

        {activeView === 'tree' && (
          <SkillTreeFlowchart
            skills={allSkills}
            skillMap={skillMap}
            progress={progress}
            onOpenSkill={openSkill}
          />
        )}

        {activeView === 'map' && (
          <KnowledgeMapPage
            skills={allSkills}
            skillMap={skillMap}
            progress={progress}
            onOpenSkill={openSkill}
            onOpenAddSkill={() => setAddSkillOpen(true)}
          />
        )}

        {activeView === 'planner' && (
          <StudyPlannerPage
            skills={allSkills}
            skillMap={skillMap}
            progress={progress}
            onOpenSkill={openSkill}
          />
        )}

        {activeView === 'vault' && (
          <ResumeVaultPage
            skills={allSkills}
            progress={progress}
            onToggleBookmark={toggleBookmark}
            onOpenSkill={openSkill}
          />
        )}

        {activeView === 'skill' && (
          <SkillDetailPage
            skill={selectedSkill}
            skills={allSkills}
            skillMap={skillMap}
            progress={progress}
            onBack={() => navigateView('explore')}
            onSelectSkill={openSkill}
            onToggleTopic={toggleTopic}
            onToggleModuleTopics={toggleModuleTopics}
            onToggleCardMastered={toggleCardMastered}
            onToggleBookmark={toggleBookmark}
            onDeleteCustomSkill={handleDeleteCustomSkill}
          />
        )}
      </main>

      <AddSkillModal
        isOpen={addSkillOpen}
        onClose={() => setAddSkillOpen(false)}
        existingSkills={allSkills}
        onSkillCreated={handleAddCustomSkill}
      />

      <footer className="border-t border-white/10 bg-[#090D0B] py-6">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#708078]">
          <span>Polymath Atlas · 45 Cross-Disciplinary Roadmaps & Resume Credentials</span>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => navigateView('explore')}
              className="hover:text-[#F1F5F3] cursor-pointer"
            >
              Atlas Grid
            </button>
            <button
              type="button"
              onClick={() => navigateView('tree')}
              className="hover:text-[#F1F5F3] cursor-pointer"
            >
              Skill Tree
            </button>
            <button
              type="button"
              onClick={() => navigateView('map')}
              className="hover:text-[#F1F5F3] cursor-pointer"
            >
              Knowledge Map
            </button>
            <button
              type="button"
              onClick={() => navigateView('planner')}
              className="hover:text-[#F1F5F3] cursor-pointer"
            >
              Study Planner
            </button>
            <button
              type="button"
              onClick={() => navigateView('vault')}
              className="hover:text-[#F1F5F3] cursor-pointer"
            >
              Resume Vault
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
