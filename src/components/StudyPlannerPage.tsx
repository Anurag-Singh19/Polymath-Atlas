import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  Clock,
  Sparkles,
  CheckSquare,
  Square,
  Download,
  ArrowRight,
  Target,
  AlertCircle,
  Loader2,
  Search,
} from 'lucide-react';
import {
  ALL_SKILLS,
  DOMAIN_MAP,
  SKILL_MAP,
  getSkillCompletion,
} from '../data';
import { SkillNode, UserProgressState } from '../types/curriculum';
import { ScrollStage } from './GalleryChoreography';
import type { GeneratedStudyPlan } from '../lib/gemini-planner';

interface StudyPlannerPageProps {
  skills?: SkillNode[];
  skillMap?: Record<string, SkillNode>;
  progress: UserProgressState;
  onOpenSkill: (skillId: string) => void;
}

const PLAN_STORAGE_KEY = 'polymath_atlas_ai_plan_v1';

interface SavedPlannerState {
  plan: GeneratedStudyPlan;
  completedBlocks: Record<string, boolean>;
  selectedSkillIds: string[];
  dailyMinutes: number;
}

function loadSavedPlan(): SavedPlannerState | null {
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedPlannerState;
  } catch {
    return null;
  }
}

const ACTIVITY_COLORS: Record<string, string> = {
  Concept: '#60A5FA',
  'Hands-On': '#10B981',
  'Paper Study': '#F59E0B',
  'Project Build': '#38BDF8',
  'Flashcard Review': '#A78BFA',
};

export const StudyPlannerPage: React.FC<StudyPlannerPageProps> = ({
  skills = ALL_SKILLS,
  skillMap = SKILL_MAP,
  progress,
  onOpenSkill,
}) => {
  const saved = useMemo(() => loadSavedPlan(), []);

  const initialSelected = useMemo(() => {
    const valid = (saved?.selectedSkillIds || []).filter((id) => Boolean(skillMap[id]));
    return valid.length > 0 ? valid : [skills[0]?.id || 'ai-ml'];
  }, [saved, skillMap, skills]);

  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(initialSelected);

  useEffect(() => {
    setSelectedSkillIds((prev) => {
      const valid = prev.filter((id) => Boolean(skillMap[id]));
      if (valid.length === prev.length && valid.length > 0) return prev;
      return valid.length > 0 ? valid : [skills[0]?.id || 'ai-ml'];
    });
  }, [skillMap, skills]);
  const [skillSearch, setSkillSearch] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState<number>(
    saved?.dailyMinutes || 60
  );
  const [targetDays, setTargetDays] = useState<number>(7);
  const [experienceLevel, setExperienceLevel] = useState<
    'Beginner' | 'Intermediate' | 'Fast-Track Review'
  >('Intermediate');
  const [goalNote, setGoalNote] = useState('');
  const [skipCompleted, setSkipCompleted] = useState(true);

  const [plan, setPlan] = useState<GeneratedStudyPlan | null>(
    saved?.plan ?? null
  );
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>(
    saved?.completedBlocks ?? {}
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!plan) return;
    try {
      localStorage.setItem(
        PLAN_STORAGE_KEY,
        JSON.stringify({
          plan,
          completedBlocks,
          selectedSkillIds,
          dailyMinutes,
        } satisfies SavedPlannerState)
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [plan, completedBlocks, selectedSkillIds, dailyMinutes]);

  const filteredSkills = useMemo(() => {
    const q = skillSearch.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (DOMAIN_MAP[s.domain]?.shortName || '').toLowerCase().includes(q) ||
        s.aliases?.some((a) => a.toLowerCase().includes(q))
    );
  }, [skills, skillSearch]);

  const toggleSkillSelection = (skillId: string) => {
    setSelectedSkillIds((prev) => {
      if (prev.includes(skillId)) {
        return prev.length > 1 ? prev.filter((id) => id !== skillId) : prev;
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), skillId];
      }
      return [...prev, skillId];
    });
  };

  const buildOfflineStudyPlan = (
    skillsContext: {
      id: string;
      title: string;
      remainingTopics: {
        dayRange: string;
        title: string;
        summary: string;
        resourceTitles: string[];
      }[];
      topPapers: string[];
      topProjects: string[];
      topCerts: string[];
    }[]
  ): GeneratedStudyPlan => {
    const primary = skillsContext[0];
    const conceptMins = Math.max(15, Math.round(dailyMinutes * 0.45));
    const handsOnMins = Math.max(10, Math.round(dailyMinutes * 0.35));
    const recallMins = Math.max(5, dailyMinutes - conceptMins - handsOnMins);

    const days = Array.from({ length: targetDays }, (_, idx) => {
      const skill = skillsContext[idx % skillsContext.length] || primary;
      const topics = skill.remainingTopics;
      const topic = topics[idx % Math.max(1, topics.length)];
      const paper = skill.topPapers[idx % Math.max(1, skill.topPapers.length)];
      const project = skill.topProjects[idx % Math.max(1, skill.topProjects.length)];

      return {
        dayNumber: idx + 1,
        dateLabel: `Offline Session ${idx + 1}`,
        focusSkill: skill.title,
        sessionMinutes: dailyMinutes,
        objective: topic
          ? `Master ${topic.title}`
          : `Advance core competencies in ${skill.title}`,
        blocks: [
          {
            timeAllocation: `${conceptMins}m`,
            activityType: 'Concept' as const,
            title: topic ? topic.title : `${skill.title} Foundations`,
            actionSteps: [
              topic?.summary || `Study core mechanisms in ${skill.title}.`,
              paper
                ? `Review key takeaways from "${paper}".`
                : 'Take structured architecture notes.',
            ],
            linkedResource:
              topic?.resourceTitles[0] || `${skill.title} Bundled Guide`,
          },
          {
            timeAllocation: `${handsOnMins}m`,
            activityType: idx % 2 === 0 ? ('Hands-On' as const) : ('Project Build' as const),
            title: project || `${skill.title} Applied Drill`,
            actionSteps: [
              `Implement a focused component or exercise for ${topic?.title || skill.title}.`,
              'Document findings and mark topic completion in the checklist.',
            ],
            linkedResource: project || `${skill.title} Portfolio Spec`,
          },
          {
            timeAllocation: `${recallMins}m`,
            activityType: 'Flashcard Review' as const,
            title: `${skill.title} Active Recall Check`,
            actionSteps: [
              'Run 5–8 randomized flashcards on covered topics.',
              'Mark mastered cards to lock retention.',
            ],
            linkedResource: 'In-App Adaptive Flashcards',
          },
        ],
        deliverable: `Completed notes & practice artifact for ${topic?.title || skill.title}`,
      };
    });

    const totalHours = Number(((dailyMinutes * targetDays) / 60).toFixed(1));
    return {
      planTitle: `${skillsContext.map((s) => s.title).join(' + ')} (Offline Plan)`,
      strategySummary:
        'Generated locally from your bundled Polymath Atlas curriculum, remaining checklist topics, papers, and project milestones while offline.',
      estimatedTotalHours: totalHours,
      weeklyCadenceNote:
        'Paced locally into concept study, hands-on implementation, and active recall flashcards. Reconnect anytime to refine with live Gemini planning.',
      days,
      milestoneCheckpoints: [
        {
          afterDay: Math.max(1, Math.floor(targetDays / 2)),
          milestone: `Midpoint Check: Core ${primary?.title || 'Skill'} topics completed`,
          resumeArtifact: primary?.topProjects[0] || 'Working baseline prototype',
        },
        {
          afterDay: targetDays,
          milestone: `Sprint Complete: ${skillsContext.map((s) => s.title).join(' & ')} Portfolio Ready`,
          resumeArtifact:
            primary?.topCerts[0] || primary?.topProjects[1] || 'Resume capstone bullet',
        },
      ],
    };
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const skillsContext = selectedSkillIds
      .map((id) => skillMap[id])
      .filter(Boolean)
      .map((skill) => {
        const remainingTopics = skill.dayModules.flatMap((mod) =>
          mod.topics
            .filter((t) =>
              skipCompleted
                ? !(
                    progress.demoPolymathMode ||
                    progress.completedTopicIds[t.id]
                  )
                : true
            )
            .map((t) => ({
              dayRange: mod.dayRange,
              title: t.title,
              summary: t.summary,
              resourceTitles: t.resources.map(
                (r) => `${r.title} (${r.provider})`
              ),
            }))
        );

        return {
          id: skill.id,
          title: skill.title,
          domainName: (DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data']).name,
          tier: skill.tier,
          summary: skill.summary,
          remainingTopics:
            remainingTopics.length > 0
              ? remainingTopics.slice(0, 12)
              : skill.dayModules.flatMap((m) =>
                  m.topics.map((t) => ({
                    dayRange: m.dayRange,
                    title: `${t.title} (Review)`,
                    summary: t.summary,
                    resourceTitles: t.resources.map(
                      (r) => `${r.title} (${r.provider})`
                    ),
                  }))
                ),
          topPapers: skill.papers.slice(0, 3).map((p) => `${p.title} (${p.year})`),
          topProjects: [
            ...skill.projects.required.slice(0, 2),
            ...skill.projects.scalable.slice(0, 1),
          ].map((p) => `${p.title} [${p.stack}]`),
          topCerts: skill.certifications.slice(0, 2).map((c) => `${c.name} (${c.issuer})`),
        };
      });

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setPlan(buildOfflineStudyPlan(skillsContext));
      setCompletedBlocks({});
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/study-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: skillsContext,
          dailyMinutes,
          targetDays,
          experienceLevel,
          goalNote,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Could not generate study roadmap.');
      }

      setPlan(data as GeneratedStudyPlan);
      setCompletedBlocks({});
    } catch (err) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setPlan(buildOfflineStudyPlan(skillsContext));
        setCompletedBlocks({});
      } else {
        setErrorMsg(
          err instanceof Error
            ? err.message
            : 'Unable to generate study roadmap right now.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockDone = (blockKey: string) => {
    setCompletedBlocks((prev) => ({
      ...prev,
      [blockKey]: !prev[blockKey],
    }));
  };

  const handleExportMarkdown = () => {
    if (!plan) return;
    const lines: string[] = [
      `# ${plan.planTitle}`,
      '',
      plan.strategySummary,
      '',
      `- Daily Budget: ${dailyMinutes} min/day`,
      `- Estimated Total Hours: ${plan.estimatedTotalHours} hrs`,
      `- Cadence Note: ${plan.weeklyCadenceNote}`,
      '',
      '## Daily Schedule',
      '',
    ];

    for (const day of plan.days) {
      lines.push(
        `### Day ${day.dayNumber}: ${day.dateLabel} — ${day.focusSkill} (${day.sessionMinutes}m)`
      );
      lines.push(`**Objective:** ${day.objective}`);
      lines.push('');
      for (const b of day.blocks) {
        lines.push(
          `- **${b.timeAllocation} · ${b.activityType}:** ${b.title} _(Resource: ${b.linkedResource})_`
        );
        for (const step of b.actionSteps) {
          lines.push(`  - ${step}`);
        }
      }
      lines.push(`**Daily Deliverable:** ${day.deliverable}`);
      lines.push('');
    }

    if (plan.milestoneCheckpoints.length > 0) {
      lines.push('## Milestones');
      for (const m of plan.milestoneCheckpoints) {
        lines.push(
          `- **After Day ${m.afterDay}:** ${m.milestone} — _Resume Artifact: ${m.resumeArtifact}_`
        );
      }
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'polymath-study-plan.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalBlocks = useMemo(() => {
    if (!plan) return 0;
    return plan.days.reduce((acc, d) => acc + d.blocks.length, 0);
  }, [plan]);

  const doneBlocks = useMemo(() => {
    if (!plan) return 0;
    let count = 0;
    plan.days.forEach((d) => {
      d.blocks.forEach((_b, idx) => {
        if (completedBlocks[`d${d.dayNumber}-b${idx}`]) count += 1;
      });
    });
    return count;
  }, [plan, completedBlocks]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollStage>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-data text-[#60A5FA]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Personalized Curriculum Architect</span>
            </div>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#F4F1EA]">
              Adaptive Study Planner
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Pick up to 3 skill disciplines and your realistic daily time budget. Gemini structures your remaining topics, papers, hands-on labs, projects, and flashcard recall into a day-by-day execution roadmap.
            </p>
          </div>

          {plan && (
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-500/70 bg-[#0E111B] px-4 py-2.5 text-xs font-semibold text-[#F4F1EA] hover:border-[#10B981]/60 hover:text-[#34D399] self-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              <Download className="h-4 w-4" />
              Export Plan (.md)
            </button>
          )}
        </div>
      </ScrollStage>

      {/* Config Form + Generated Roadmap Grid */}
      <ScrollStage delay={0.05}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Control Panel */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-5 rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 space-y-6"
          >
            {/* Step 1: Choose 1-3 Skills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  1. Skill Focus ({selectedSkillIds.length}/3 selected)
                </label>
                <span className="font-mono-data text-[11px] text-slate-400">
                  Click to toggle
                </span>
              </div>

              {/* Selected chips summary */}
              <div className="flex flex-wrap gap-2">
                {selectedSkillIds.map((id) => {
                  const s = skillMap[id];
                  if (!s) return null;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleSkillSelection(id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#2563EB]/60 bg-[#2563EB]/18 px-2.5 py-1 text-xs font-medium text-[#F4F1EA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                    >
                      <span>{s.title}</span>
                      {selectedSkillIds.length > 1 && (
                        <span className="text-[#93C5FD]">×</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder={`Filter ${skills.length} skills…`}
                  aria-label="Filter skills for study planner"
                  className="w-full rounded-xl border border-slate-500 bg-[#0B0D14] py-2 pr-3 pl-9 text-base sm:text-xs text-[#F4F1EA] placeholder-slate-400 focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                />
              </div>

              <div className="max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#06070A] p-2 space-y-1">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkillIds.includes(skill.id);
                  const comp = getSkillCompletion(
                    skill,
                    progress.completedTopicIds,
                    progress.demoPolymathMode
                  );
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkillSelection(skill.id)}
                      className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] ${
                        isSelected
                          ? 'bg-[#0F1B33] text-[#F4F1EA] border border-[#2563EB]/60'
                          : 'text-slate-300 hover:bg-[#0E111B] hover:text-[#F4F1EA]'
                      }`}
                    >
                      <span className="truncate font-medium">{skill.title}</span>
                      <span className="font-mono-data text-[11px] shrink-0 text-slate-400 tabular-nums">
                        {comp.percentage}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Daily Time Available */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="daily-minutes-range"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  2. Daily Time Available
                </label>
                <span className="font-mono-data text-sm font-bold text-[#34D399] tabular-nums">
                  {dailyMinutes} min / day
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[30, 45, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyMinutes(mins)}
                    className={`rounded-lg py-1.5 text-xs font-mono-data font-semibold transition-colors cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] ${
                      dailyMinutes === mins
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#0B0D14] text-slate-300 border border-slate-500/70 hover:text-[#F4F1EA]'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
              <input
                id="daily-minutes-range"
                type="range"
                min={15}
                max={240}
                step={15}
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(Number(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
            </div>

            {/* Step 3: Horizon & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="target-days-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  3. Plan Horizon
                </label>
                <select
                  id="target-days-select"
                  value={targetDays}
                  onChange={(e) => setTargetDays(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-500 bg-[#0B0D14] px-3 py-2 text-base sm:text-xs text-[#F4F1EA] focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                >
                  <option value={5}>5 Days (Sprint)</option>
                  <option value={7}>7 Days (1 Week)</option>
                  <option value={10}>10 Days (Focused)</option>
                  <option value={14}>14 Days (2 Weeks)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="experience-level-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  4. Current Level
                </label>
                <select
                  id="experience-level-select"
                  value={experienceLevel}
                  onChange={(e) =>
                    setExperienceLevel(
                      e.target.value as
                        | 'Beginner'
                        | 'Intermediate'
                        | 'Fast-Track Review'
                    )
                  }
                  className="w-full rounded-xl border border-slate-500 bg-[#0B0D14] px-3 py-2 text-base sm:text-xs text-[#F4F1EA] focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                >
                  <option value="Beginner">Beginner (Step-by-step)</option>
                  <option value="Intermediate">Intermediate (Applied)</option>
                  <option value="Fast-Track Review">Fast-Track Review</option>
                </select>
              </div>
            </div>

            {/* Step 4: Goal Note */}
            <div className="space-y-2">
              <label
                htmlFor="planner-goal-note"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                5. Target Outcome (Optional)
              </label>
              <input
                id="planner-goal-note"
                type="text"
                value={goalNote}
                onChange={(e) => setGoalNote(e.target.value)}
                placeholder="e.g. Quant dev interview prep or build capstone repo…"
                className="w-full rounded-xl border border-slate-500 bg-[#0B0D14] px-3 py-2 text-base sm:text-xs text-[#F4F1EA] placeholder-slate-400 focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={skipCompleted}
                onChange={(e) => setSkipCompleted(e.target.checked)}
                className="h-4 w-4 rounded accent-[#10B981]"
              />
              <span>Skip topics I already checked off in the Atlas</span>
            </label>

            {errorMsg && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/45 bg-rose-950/35 p-3 text-xs text-rose-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.3)] transition-colors hover:bg-[#3B82F6] disabled:opacity-60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Architecting Personalized Roadmap…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Daily Study Plan
                </>
              )}
            </button>
          </form>

          {/* Right Output Panel */}
          <div className="lg:col-span-7 space-y-6">
            {!plan && !loading && (
              <div className="rounded-2xl border border-dashed border-[rgba(244,241,234,0.16)] bg-[#0E111B]/78 backdrop-blur-md p-10 text-center space-y-3">
                <CalendarClock className="mx-auto h-10 w-10 text-[#60A5FA]" />
                <h2 className="font-display text-2xl font-semibold text-[#F4F1EA]">
                  Ready to Build Your Schedule
                </h2>
                <p className="mx-auto max-w-md text-sm text-slate-300">
                  Select 1–3 skills and your daily minutes on the left. Gemini will craft exact time-boxed study blocks mapped to real papers, labs, and resume projects.
                </p>
              </div>
            )}

            {plan && (
              <div className="space-y-6">
                {/* Plan Summary Card */}
                <div className="rounded-2xl border border-[#10B981]/35 bg-[#091A16]/85 backdrop-blur-md p-6 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="font-mono-data text-xs text-[#34D399]">
                        Personalized Roadmap · {plan.days.length} Days ·{' '}
                        {plan.estimatedTotalHours} Total Hours
                      </div>
                      <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
                        {plan.planTitle}
                      </h2>
                    </div>
                    <div className="rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#06070A] px-3.5 py-2 text-right font-mono-data shrink-0">
                      <div className="text-[11px] text-slate-400">
                        Block Progress
                      </div>
                      <div className="text-sm font-bold text-[#34D399] tabular-nums">
                        {doneBlocks}/{totalBlocks} done
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-200">
                    {plan.strategySummary}
                  </p>

                  {plan.weeklyCadenceNote && (
                    <div className="rounded-xl border border-[rgba(244,241,234,0.08)] bg-[#0B0D14] p-3 text-xs text-slate-200">
                      <span className="font-semibold text-[#60A5FA]">
                        Cadence Tip:{' '}
                      </span>
                      {plan.weeklyCadenceNote}
                    </div>
                  )}

                  {/* Quick Jump Links to Chosen Skills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedSkillIds.map((id) => {
                      const s = skillMap[id];
                      if (!s) return null;
                      return (
                        <button
                          key={id}
                          type="button"
                          data-cursor="open"
                          onClick={() => onOpenSkill(id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500/70 bg-[#0E111B] px-3 py-1.5 text-xs font-medium text-[#F4F1EA] hover:border-[#60A5FA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                        >
                          <span>Open {s.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#60A5FA]" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Daily Time-Boxed Cards */}
                <div className="space-y-4">
                  {plan.days.map((day) => (
                    <article
                      key={day.dayNumber}
                      className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-5 sm:p-6 space-y-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[rgba(244,241,234,0.08)] pb-3.5">
                        <div>
                          <div className="flex items-center gap-2 font-mono-data text-xs text-[#60A5FA]">
                            <span>Day {day.dayNumber}</span>
                            <span aria-hidden="true">·</span>
                            <span>{day.dateLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#34D399]">{day.focusSkill}</span>
                          </div>
                          <h3 className="mt-1 font-display text-xl font-semibold text-[#F4F1EA]">
                            {day.objective}
                          </h3>
                        </div>

                        <div className="inline-flex items-center gap-1.5 font-mono-data text-xs text-slate-300 shrink-0 tabular-nums">
                          <Clock className="h-3.5 w-3.5 text-[#10B981]" />
                          <span>{day.sessionMinutes} min</span>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {day.blocks.map((block, bIdx) => {
                          const bKey = `d${day.dayNumber}-b${bIdx}`;
                          const checked = Boolean(completedBlocks[bKey]);
                          const actColor =
                            ACTIVITY_COLORS[block.activityType] || '#10B981';

                          return (
                            <div
                              key={bKey}
                              className={`rounded-xl border p-3.5 transition-colors ${
                                checked
                                  ? 'border-[#10B981]/40 bg-[#091A16]'
                                  : 'border-[rgba(244,241,234,0.08)] bg-[#0B0D14]'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <button
                                  type="button"
                                  onClick={() => toggleBlockDone(bKey)}
                                  aria-label={`Toggle ${block.title}`}
                                  className="mt-0.5 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                                >
                                  {checked ? (
                                    <CheckSquare className="h-4.5 w-4.5 text-[#10B981]" />
                                  ) : (
                                    <Square className="h-4.5 w-4.5 text-slate-400" />
                                  )}
                                </button>

                                <div className="min-w-0 flex-1 space-y-1.5">
                                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-data">
                                    <span className="text-[#F4F1EA] font-semibold">
                                      {block.timeAllocation}
                                    </span>
                                    <span aria-hidden="true" className="text-slate-400">
                                      ·
                                    </span>
                                    <span style={{ color: actColor }}>
                                      {block.activityType}
                                    </span>
                                    {block.linkedResource && (
                                      <>
                                        <span aria-hidden="true" className="text-slate-400">
                                          ·
                                        </span>
                                        <span className="text-slate-400 truncate">
                                          {block.linkedResource}
                                        </span>
                                      </>
                                    )}
                                  </div>

                                  <div
                                    className={`text-sm font-semibold ${
                                      checked
                                        ? 'text-[#34D399] line-through'
                                        : 'text-[#F4F1EA]'
                                    }`}
                                  >
                                    {block.title}
                                  </div>

                                  {block.actionSteps?.length > 0 && (
                                    <ul className="space-y-1 text-xs text-slate-300 list-disc pl-4">
                                      {block.actionSteps.map((step, sIdx) => (
                                        <li key={sIdx}>{step}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-[#06070A] border border-[rgba(244,241,234,0.08)] px-3.5 py-2.5 text-xs text-slate-300">
                        <Target className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                        <span>
                          <strong className="text-[#F4F1EA]">Deliverable: </strong>
                          {day.deliverable}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Milestone Checkpoints */}
                {plan.milestoneCheckpoints.length > 0 && (
                  <div className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold text-[#F4F1EA]">
                      Resume &amp; Proof Milestones
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {plan.milestoneCheckpoints.map((m, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-[rgba(244,241,234,0.08)] bg-[#0B0D14] p-4 space-y-1.5"
                        >
                          <div className="font-mono-data text-xs text-[#60A5FA]">
                            After Day {m.afterDay}
                          </div>
                          <div className="text-sm font-semibold text-[#F4F1EA]">
                            {m.milestone}
                          </div>
                          <div className="text-xs text-[#34D399]">
                            Resume Artifact: {m.resumeArtifact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollStage>
    </div>
  );
};
