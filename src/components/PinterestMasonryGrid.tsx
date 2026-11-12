import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ArrowUpRight, Layers, ShieldCheck, Plus } from 'lucide-react';
import { ALL_SKILLS, DOMAINS, DOMAIN_MAP, getSkillCompletion } from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';
import { MotionSegmentedControl } from './ui/WatermelonUI';

interface PinterestMasonryGridProps {
  skills?: SkillNode[];
  activeDomain: DomainId | 'all';
  onSelectDomain: (domain: DomainId | 'all') => void;
  progress: UserProgressState;
  onOpenSkill: (skillId: string) => void;
  onOpenAddSkill?: () => void;
}

const SkillCardMotif: React.FC<{ domain: DomainId; accent: string; secondary: string; idx: number }> = ({
  domain,
  accent,
  secondary,
  idx,
}) => {
  const variant = idx % 3;
  return (
    <svg
      viewBox="0 0 280 110"
      className="w-full h-24 rounded-lg bg-[#06070A]/75 border border-[rgba(244,241,234,0.1)]"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`dots-${domain}-${idx}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="rgba(96,165,250,0.16)" />
        </pattern>
      </defs>
      <rect width="280" height="110" fill={`url(#dots-${domain}-${idx})`} />
      {variant === 0 && (
        <g strokeWidth="1.5" fill="none">
          <path d="M 24 84 C 75 84, 90 28, 140 28 C 190 28, 205 78, 256 42" stroke={accent} strokeOpacity="0.85" />
          <path d="M 24 54 C 85 54, 115 88, 175 56 C 215 34, 235 64, 256 64" stroke={secondary} strokeOpacity="0.65" strokeDasharray="4 4" />
          <circle cx="140" cy="28" r="4.5" fill={accent} />
          <circle cx="256" cy="42" r="4" fill={secondary} />
          <circle cx="24" cy="84" r="3.5" fill="#F4F1EA" />
        </g>
      )}
      {variant === 1 && (
        <g strokeWidth="1.4" fill="none">
          <polygon points="140,16 184,42 184,78 140,98 96,78 96,42" stroke={accent} strokeOpacity="0.85" />
          <polygon points="140,28 172,47 172,73 140,88 108,73 108,47" stroke={secondary} strokeOpacity="0.58" />
          <line x1="32" y1="56" x2="96" y2="56" stroke={secondary} strokeOpacity="0.5" />
          <line x1="184" y1="56" x2="248" y2="56" stroke={accent} strokeOpacity="0.5" />
          <circle cx="140" cy="57" r="5" fill={accent} />
        </g>
      )}
      {variant === 2 && (
        <g strokeWidth="1.5" fill="none">
          <rect x="34" y="36" width="44" height="38" rx="6" stroke={secondary} strokeOpacity="0.72" />
          <rect x="118" y="22" width="44" height="38" rx="6" stroke={accent} strokeOpacity="0.92" />
          <rect x="202" y="48" width="44" height="38" rx="6" stroke={secondary} strokeOpacity="0.72" />
          <path d="M 78 55 L 118 41" stroke={accent} strokeOpacity="0.72" />
          <path d="M 162 41 L 202 67" stroke={secondary} strokeOpacity="0.72" />
        </g>
      )}
    </svg>
  );
};

interface MasonrySkillCardProps {
  skill: SkillNode;
  index: number;
  progress: UserProgressState;
  onOpen: (skillId: string) => void;
  reducedMotion: boolean;
}

const MasonrySkillCard: React.FC<MasonrySkillCardProps> = ({
  skill,
  index,
  progress,
  onOpen,
  reducedMotion,
}) => {
  const dom = DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data'];
  const comp = getSkillCompletion(skill, progress.completedTopicIds, progress.demoPolymathMode);
  const isUnlocked = comp.percentage === 100;
  const rankLabel = getBadgeRankLabel(skill.tier);
  const totalPapers = skill.papers.length;
  const totalProjects = skill.projects.required.length + skill.projects.scalable.length;
  const totalCerts = skill.certifications.length;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="mb-5 break-inside-avoid">
      <motion.button
        type="button"
        data-cursor="open"
        data-cursor-label="OPEN"
        initial={reducedMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: 0.44,
          delay: Math.min(index % 4, 3) * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onOpen(skill.id)}
        onMouseMove={handleMouseMove}
        className={`group wm-spotlight w-full rounded-2xl border p-5 text-left backdrop-blur-md transition-[transform,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] cursor-pointer shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] ${
          isUnlocked
            ? 'border-[#10B981]/55 bg-[#091A16]/82 hover:border-[#10B981]'
            : 'border-[rgba(244,241,234,0.12)] bg-[#0E111B]/78 hover:border-[#3B82F6]/65'
        }`}
      >
        {/* Top quiet text metadata + Skill Mastery Crest */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
          <div className="min-w-0">
            <span className="font-medium block truncate" style={{ color: dom.accentHex }}>
              {dom.shortName}
            </span>
            <span className="font-mono-data text-slate-400">
              Tier {skill.tier} · {skill.estimatedDays}d
            </span>
          </div>

          <SkillMasteryBadge
            domain={skill.domain}
            tier={skill.tier}
            unlocked={isUnlocked}
            size="md"
          />
        </div>

        {/* Procedural Technical Visual Motif */}
        {skill.cardHeightHint !== 'compact' && (
          <div className="mt-3.5 relative overflow-hidden rounded-lg">
            <div className="transition-transform duration-300 ease-out group-hover:scale-[1.03]">
              <SkillCardMotif
                domain={skill.domain}
                accent={dom.accentHex}
                secondary={dom.secondaryHex}
                idx={index}
              />
            </div>
          </div>
        )}

        {/* Title & Description */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-snug text-[#F4F1EA] group-hover:text-white">
            {skill.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#60A5FA]" />
        </div>

        <p
          className={`mt-2 text-sm leading-relaxed text-slate-300 ${
            skill.cardHeightHint === 'tall' ? '' : 'line-clamp-3'
          }`}
        >
          {skill.summary}
        </p>

        {/* Tall card extra preview of Day 1 & Top Project */}
        {skill.cardHeightHint === 'tall' && (
          <div className="mt-4 border-t border-[rgba(244,241,234,0.08)] pt-3 space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Starts with</span>
              <span className="text-[#F4F1EA] truncate max-w-[180px]">{skill.dayModules[0]?.title}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Capstone</span>
              <span className="text-[#34D399] truncate max-w-[180px]">
                {skill.projects.scalable[0]?.title || skill.projects.required[0]?.title}
              </span>
            </div>
          </div>
        )}

        {/* Resume-Ready Counts */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono-data">
          <span>{totalPapers} papers</span>
          <span aria-hidden="true">·</span>
          <span>{totalProjects} projects</span>
          <span aria-hidden="true">·</span>
          <span>{totalCerts} free certs</span>
        </div>

        {/* Per-Skill Progress Meter & Badge Unlock Readout */}
        <div className="mt-4 pt-3 border-t border-[rgba(244,241,234,0.08)]">
          <div className="flex items-center justify-between text-xs font-mono-data">
            <span className={isUnlocked ? 'text-[#34D399] font-semibold' : 'text-slate-400'}>
              {isUnlocked ? `${rankLabel} Unlocked` : `${comp.completed}/${comp.total} topics`}
            </span>
            <span className={isUnlocked ? 'text-[#34D399] font-semibold' : 'text-[#F4F1EA]'}>
              {comp.percentage}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#06070A]">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${comp.percentage}%`,
                backgroundColor: isUnlocked ? '#10B981' : dom.accentHex,
              }}
            />
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export const PinterestMasonryGrid: React.FC<PinterestMasonryGridProps> = ({
  skills = ALL_SKILLS,
  activeDomain,
  onSelectDomain,
  progress,
  onOpenSkill,
  onOpenAddSkill,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [query, setQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  const unlockedCount = useMemo(() => {
    return skills.filter(
      (s) =>
        getSkillCompletion(s, progress.completedTopicIds, progress.demoPolymathMode)
          .percentage === 100
    ).length;
  }, [skills, progress.completedTopicIds, progress.demoPolymathMode]);

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      if (activeDomain !== 'all' && skill.domain !== activeDomain) return false;
      if (tierFilter !== 'all' && skill.tier !== tierFilter) return false;
      if (onlyUnlocked) {
        const comp = getSkillCompletion(
          skill,
          progress.completedTopicIds,
          progress.demoPolymathMode
        );
        if (comp.percentage !== 100) return false;
      }
      if (!q) return true;
      const inTitle = skill.title.toLowerCase().includes(q);
      const inSummary = skill.summary.toLowerCase().includes(q);
      const inAliases = skill.aliases?.some((a) => a.toLowerCase().includes(q));
      return inTitle || inSummary || Boolean(inAliases);
    });
  }, [
    skills,
    activeDomain,
    tierFilter,
    onlyUnlocked,
    query,
    progress.completedTopicIds,
    progress.demoPolymathMode,
  ]);

  const domainOptions = useMemo(
    () => [
      { id: 'all' as const, label: 'All', count: skills.length },
      ...DOMAINS.map((dom) => ({
        id: dom.id,
        label: dom.shortName,
        count: skills.filter((s) => s.domain === dom.id).length,
        accentHex: dom.accentHex,
      })),
    ],
    [skills]
  );

  const tierOptions = useMemo(
    () => [
      { id: 'all', label: 'All Tiers' },
      { id: '1', label: 'T1' },
      { id: '2', label: 'T2' },
      { id: '3', label: 'T3' },
      { id: '4', label: 'T4' },
    ],
    []
  );

  return (
    <motion.section
      id="masonry-catalog"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto space-y-6"
    >
      {/* Header & Filter Toolbar */}
      <div className="flex flex-col gap-4 border-b border-[rgba(244,241,234,0.1)] pb-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono-data text-xs text-[#60A5FA] mb-1">
              03 · Curated Archive
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F1EA]">
              Skill Roadmap Atlas
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Pin-board index of all {skills.length} disciplines. Complete 100% of topics in any card to unlock its mastery seal, or add any custom skill on demand.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills (e.g. Quant, LLM, Blender)…"
                aria-label="Search skills"
                className="w-full rounded-xl border border-slate-500 bg-[#0E111B] py-2.5 pr-4 pl-10 text-base sm:text-sm text-[#F4F1EA] placeholder-slate-400 focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              />
            </div>

            {onOpenAddSkill && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={onOpenAddSkill}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3B82F6] shadow-[0_0_20px_rgba(37,99,235,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Skill</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Interactive Motion Filter Bars */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <MotionSegmentedControl
            layoutId="wm-masonry-domain-tab"
            options={domainOptions}
            value={activeDomain}
            onChange={(val) => onSelectDomain(val as DomainId | 'all')}
          />

          <div className="flex flex-wrap items-center gap-2 self-start">
            <button
              type="button"
              onClick={() => setOnlyUnlocked((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] cursor-pointer ${
                onlyUnlocked
                  ? 'border-[#10B981]/60 bg-[#10B981]/15 text-[#34D399]'
                  : 'border-slate-500/60 bg-[#0B0D14] text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA]'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Badges Unlocked ({unlockedCount}/{skills.length})</span>
            </button>

            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
              <MotionSegmentedControl
                layoutId="wm-masonry-tier-tab"
                variant="mint"
                options={tierOptions}
                value={String(tierFilter)}
                onChange={(val) =>
                  setTierFilter(val === 'all' ? 'all' : (Number(val) as 1 | 2 | 3 | 4))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pinterest-Style Masonry Columns */}
      {filteredSkills.length === 0 ? (
        <div className="rounded-2xl border border-[rgba(244,241,234,0.12)] bg-[#0E111B]/80 backdrop-blur-md p-12 text-center">
          <p className="text-base font-medium text-[#F4F1EA]">
            {onlyUnlocked
              ? 'No mastery badges unlocked yet for this filter. Complete 100% of a skill’s topics to earn its seal.'
              : `No matching skills found for "${query}".`}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSelectDomain('all');
              setTierFilter('all');
              setOnlyUnlocked(false);
            }}
            className="mt-4 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3B82F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {filteredSkills.map((skill, idx) => (
            <MasonrySkillCard
              key={skill.id}
              skill={skill}
              index={idx}
              progress={progress}
              onOpen={onOpenSkill}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};
