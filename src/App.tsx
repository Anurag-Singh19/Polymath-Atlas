import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Navbar, AppView } from './components/Navbar';
import { HeroConstellation3D, HERO_REEL_DURATION_MS, HERO_REEL_SEQUENCE } from './components/HeroConstellation3D';
import { GlobalOrbitBackground } from './components/GlobalOrbitBackground';
import { PolymathMeter } from './components/PolymathMeter';
import { PinterestMasonryGrid } from './components/PinterestMasonryGrid';
import { SkillTreeFlowchart } from './components/SkillTreeFlowchart';
import { SkillDetailPage } from './components/SkillDetailPage';
import { ResumeVaultPage } from './components/ResumeVaultPage';
import { KnowledgeMapPage } from './components/KnowledgeMapPage';
import { StudyPlannerPage } from './components/StudyPlannerPage';
import { AddSkillModal } from './components/AddSkillModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CustomCursor } from './components/CustomCursor';
import { GalleryAmbientBackdrop, GalleryScrollRail } from './components/GalleryChoreography';
import { useAuth } from './contexts/AuthContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import {
  DailyStreakState,
  computeStreakSummary,
  recordDailyEngagement,
} from './lib/streak';
import { ALL_SKILLS, getGlobalCompletion, mergeSkills } from './data';
import { DomainId, SkillNode, UserProgressState } from './types/curriculum';

const STORAGE_KEY = 'polymath_atlas_progress_v1';
const PENDING_SYNC_KEY = 'polymath_atlas_pending_sync_v1';

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

function scrollPageToTop() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
}

export default function App() {
  const {
    user,
    loading: authLoading,
    authError,
    signInWithGoogle,
    signOut,
    getIdToken,
  } = useAuth();
  const isOnline = useOnlineStatus();
  const [activeView, setActiveView] = useState<AppView>('explore');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(ALL_SKILLS[0].id);
  const [activeDomain, setActiveDomain] = useState<DomainId | 'all'>('all');
  const [hoveredDomain, setHoveredDomain] = useState<DomainId | null>(null);
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const [reelIndex, setReelIndex] = useState(0);
  const [reelPlaying, setReelPlaying] = useState(() =>
    typeof window !== 'undefined'
      ? !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      : true
  );
  const [progress, setProgress] = useState<UserProgressState>(loadProgress);
  const [streakState, setStreakState] = useState<DailyStreakState>(() =>
    recordDailyEngagement('visit')
  );
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [dismissedAuthError, setDismissedAuthError] = useState<string | null>(null);
  const [pendingSync, setPendingSync] = useState<boolean>(() => {
    try {
      return localStorage.getItem(PENDING_SYNC_KEY) === '1';
    } catch {
      return false;
    }
  });
  const hydratedUidRef = useRef<string | null>(null);
  const skipNextRemoteSaveRef = useRef(false);

  const displayedDomain: DomainId | 'all' =
    activeDomain !== 'all' ? activeDomain : HERO_REEL_SEQUENCE[reelIndex];

  useEffect(() => {
    if (activeView !== 'explore' || activeDomain !== 'all' || !reelPlaying) {
      return;
    }
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setReelIndex((prev) => (prev + 1) % HERO_REEL_SEQUENCE.length);
    }, HERO_REEL_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [activeView, activeDomain, reelPlaying]);

  useEffect(() => {
    if (activeDomain !== 'all') {
      const matched = HERO_REEL_SEQUENCE.indexOf(activeDomain);
      if (matched !== -1) setReelIndex(matched);
    }
  }, [activeDomain]);

  const { skills: allSkills, skillMap } = useMemo(
    () => mergeSkills(progress.customSkills),
    [progress.customSkills]
  );

  // Sync URL hash for shareable skill links & browser Back/Forward navigation
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('skill/')) {
        const id = hash.slice(6);
        if (skillMap[id]) {
          setSelectedSkillId(id);
          setActiveView('skill');
        } else {
          setActiveView('explore');
        }
      } else if (hash === 'tree') {
        setActiveView('tree');
      } else if (hash === 'knowledge-map') {
        setActiveView('map');
      } else if (hash === 'study-planner') {
        setActiveView('planner');
      } else if (hash === 'vault') {
        setActiveView('vault');
      } else {
        setActiveView('explore');
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

    if (!user) {
      return;
    }

    if (!isOnline || hydratedUidRef.current !== user.uid) {
      try {
        localStorage.setItem(PENDING_SYNC_KEY, '1');
      } catch {
        // Ignore storage errors
      }
      setPendingSync(true);
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
        const res = await fetch('/api/progress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(progress),
        });
        if (!res.ok) throw new Error('Sync failed');
        try {
          localStorage.removeItem(PENDING_SYNC_KEY);
        } catch {
          // Ignore storage errors
        }
        setPendingSync(false);
      } catch {
        try {
          localStorage.setItem(PENDING_SYNC_KEY, '1');
        } catch {
          // Ignore storage errors
        }
        setPendingSync(true);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [progress, user, isOnline, getIdToken]);

  // Flush queued offline progress automatically when back online
  useEffect(() => {
    if (!isOnline || !user || !pendingSync) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getIdToken();
        if (!token || cancelled) return;
        const res = await fetch('/api/progress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(progress),
        });
        if (!res.ok || cancelled) return;
        localStorage.removeItem(PENDING_SYNC_KEY);
        setPendingSync(false);
      } catch {
        // Retry on next reconnect or progress change
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isOnline, user, pendingSync, progress, getIdToken]);

  const navigateView = (view: AppView) => {
    setActiveView(view);
    if (view === 'explore') window.location.hash = '';
    else if (view === 'tree') window.location.hash = 'tree';
    else if (view === 'map') window.location.hash = 'knowledge-map';
    else if (view === 'planner') window.location.hash = 'study-planner';
    else if (view === 'vault') window.location.hash = 'vault';
    scrollPageToTop();
  };

  const openSkill = (skillId: string) => {
    if (!skillMap[skillId]) return;
    setSelectedSkillId(skillId);
    setActiveView('skill');
    window.location.hash = `skill/${skillId}`;
    scrollPageToTop();
  };

  const handleAddCustomSkill = (newSkill: SkillNode) => {
    setProgress((prev) => ({
      ...prev,
      customSkills: [...(prev.customSkills || []), newSkill],
    }));
    setStreakState(recordDailyEngagement('study'));
    setSelectedSkillId(newSkill.id);
    setActiveView('skill');
    window.location.hash = `skill/${newSkill.id}`;
    scrollPageToTop();
  };

  const handleDeleteCustomSkill = (skillId: string) => {
    setProgress((prev) => ({
      ...prev,
      customSkills: (prev.customSkills || []).filter((s) => s.id !== skillId),
    }));
    navigateView('explore');
  };

  const toggleTopic = (topicId: string) => {
    const becomingComplete = !progress.completedTopicIds[topicId];
    setProgress((prev) => ({
      ...prev,
      completedTopicIds: {
        ...prev.completedTopicIds,
        [topicId]: !prev.completedTopicIds[topicId],
      },
    }));
    if (becomingComplete) {
      setStreakState(recordDailyEngagement('study'));
    }
  };

  const toggleModuleTopics = (topicIds: string[], markComplete: boolean) => {
    setProgress((prev) => {
      const next = { ...prev.completedTopicIds };
      topicIds.forEach((id) => {
        next[id] = markComplete;
      });
      return { ...prev, completedTopicIds: next };
    });
    if (markComplete) {
      setStreakState(recordDailyEngagement('study'));
    }
  };

  const toggleCardMastered = (cardId: string) => {
    const becomingMastered = !progress.masteredCardIds[cardId];
    setProgress((prev) => ({
      ...prev,
      masteredCardIds: {
        ...prev.masteredCardIds,
        [cardId]: !prev.masteredCardIds[cardId],
      },
    }));
    if (becomingMastered) {
      setStreakState(recordDailyEngagement('study'));
    }
  };

  const toggleBookmark = (itemKey: string) => {
    const becomingBookmarked = !progress.bookmarkedItems[itemKey];
    setProgress((prev) => ({
      ...prev,
      bookmarkedItems: {
        ...prev.bookmarkedItems,
        [itemKey]: !prev.bookmarkedItems[itemKey],
      },
    }));
    if (becomingBookmarked) {
      setStreakState(recordDailyEngagement('study'));
    }
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

  const streakSummary = useMemo(
    () => computeStreakSummary(streakState),
    [streakState]
  );

  const selectedSkill = skillMap[selectedSkillId] || allSkills[0];

  useEffect(() => {
    const viewTitles: Record<AppView, string> = {
      explore: 'Polymath Atlas — 3D Skill Roadmap & Career Credentials',
      tree: 'Skill Tree Flowchart — Polymath Atlas',
      map: 'Knowledge Map — Polymath Atlas',
      planner: 'Study Planner — Polymath Atlas',
      vault: 'Resume Vault — Polymath Atlas',
      skill: `${selectedSkill.title} — Polymath Atlas`,
    };
    document.title = viewTitles[activeView];
  }, [activeView, selectedSkill.title]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-transparent text-[#F4F1EA] flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white focus-visible:outline-2 focus-visible:outline-[#F4F1EA]"
        >
          Skip to main content
        </a>

        <GlobalOrbitBackground
          activeView={activeView}
          activeDomain={activeDomain}
          displayedDomain={displayedDomain}
          globalPercentage={globalStats.percentage}
          isPolymath={globalStats.isPolymath}
          autoOrbit={autoOrbit}
          resetSignal={resetSignal}
          onSelectDomain={(dom) => setActiveDomain(dom)}
          onHoverDomain={setHoveredDomain}
        />
        <GalleryAmbientBackdrop />
        <GalleryScrollRail activeView={activeView} />
        <CustomCursor />

        <Navbar
          activeView={activeView}
          onNavigate={navigateView}
          globalPercentage={globalStats.percentage}
          isPolymath={globalStats.isPolymath}
          user={user}
          authLoading={authLoading}
          streakSummary={streakSummary}
          onSignIn={signInWithGoogle}
          onSignOut={signOut}
        />

        <main
          id="main-content"
          className={`relative z-10 mx-auto w-full max-w-[1440px] flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 ${
            activeView === 'explore' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {authError && dismissedAuthError !== authError && (
            <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-xl border border-rose-500/45 bg-rose-950/60 backdrop-blur-md px-4 py-3 text-xs text-rose-200">
              <span>{authError}</span>
              <button
                type="button"
                onClick={() => setDismissedAuthError(authError)}
                className="font-semibold text-[#F4F1EA] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                Dismiss
              </button>
            </div>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeView === 'skill' ? `skill-${selectedSkill.id}` : activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className={`space-y-12 ${
                activeView === 'explore' ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
            >
              {activeView === 'explore' && (
                <>
                  <HeroConstellation3D
                    skillCount={allSkills.length}
                    activeDomain={activeDomain}
                    displayedDomain={displayedDomain}
                    hoveredDomain={hoveredDomain}
                    reelIndex={reelIndex}
                    reelPlaying={reelPlaying}
                    autoOrbit={autoOrbit}
                    onSelectDomain={(dom) => {
                      setActiveDomain(dom);
                    }}
                    onResetReelIndex={() => setReelIndex(0)}
                    onToggleReelPlaying={() => setReelPlaying((prev) => !prev)}
                    onToggleAutoOrbit={() => setAutoOrbit((prev) => !prev)}
                    onResetCamera={() => {
                      setReelIndex(0);
                      setActiveDomain('all');
                      setResetSignal((n) => n + 1);
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
                      const prefersReduced = window.matchMedia?.(
                        '(prefers-reduced-motion: reduce)'
                      ).matches;
                      document
                        .getElementById('masonry-catalog')
                        ?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
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
                  currentStreak={streakSummary.currentStreak}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <AddSkillModal
          isOpen={addSkillOpen}
          onClose={() => setAddSkillOpen(false)}
          existingSkills={allSkills}
          onSkillCreated={handleAddCustomSkill}
        />

        <OfflineIndicator pendingSync={pendingSync} />

        <footer className="relative z-10 border-t border-[rgba(244,241,234,0.1)] bg-[#06070A]/75 backdrop-blur-md py-7">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
            <span className="font-mono-data">
              Polymath Atlas · {allSkills.length} Cross-Disciplinary Roadmaps &amp; Resume Credentials
            </span>
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => navigateView('explore')}
                className="hover:text-[#F4F1EA] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                Atlas Grid
              </button>
              <button
                type="button"
                onClick={() => navigateView('tree')}
                className="hover:text-[#F4F1EA] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                Skill Tree
              </button>
              <button
                type="button"
                onClick={() => navigateView('map')}
                className="hover:text-[#F4F1EA] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                Knowledge Map
              </button>
              <button
                type="button"
                onClick={() => navigateView('planner')}
                className="hover:text-[#F4F1EA] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                Study Planner
              </button>
              <button
                type="button"
                onClick={() => navigateView('vault')}
                className="hover:text-[#F4F1EA] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                Resume Vault
              </button>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
