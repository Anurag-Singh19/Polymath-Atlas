import React, { useMemo, useState } from 'react';
import { Search, ArrowUpRight, Layers, ShieldCheck, Plus } from 'lucide-react';
import { ALL_SKILLS, DOMAINS, DOMAIN_MAP, getSkillCompletion } from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';

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
      className="w-full h-24 rounded-lg bg-[#090D0B] border border-white/6"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`dots-${domain}-${idx}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="rgba(255,255,255,0.08)" />
        </pattern>
      </defs>
      <rect width="280" height="110" fill={`url(#dots-${domain}-${idx})`} />
      {variant === 0 && (
        <g strokeWidth="1.5" fill="none">
          <path d="M 24 84 C 75 84, 90 28, 140 28 C 190 28, 205 78, 256 42" stroke={accent} strokeOpacity="0.8" />
          <path d="M 24 54 C 85 54, 115 88, 175 56 C 215 34, 235 64, 256 64" stroke={secondary} strokeOpacity="0.65" strokeDasharray="4 4" />
          <circle cx="140" cy="28" r="4.5" fill={accent} />
          <circle cx="256" cy="42" r="4" fill={secondary} />
          <circle cx="24" cy="84" r="3.5" fill="#F1F5F3" />
        </g>
      )}
      {variant === 1 && (
        <g strokeWidth="1.4" fill="none">
          <polygon points="140,16 184,42 184,78 140,98 96,78 96,42" stroke={accent} strokeOpacity="0.8" />
          <polygon points="140,28 172,47 172,73 140,88 108,73 108,47" stroke={secondary} strokeOpacity="0.55" />
          <line x1="32" y1="56" x2="96" y2="56" stroke={secondary} strokeOpacity="0.5" />
          <line x1="184" y1="56" x2="248" y2="56" stroke={accent} strokeOpacity="0.5" />
          <circle cx="140" cy="57" r="5" fill={accent} />
        </g>
      )}
      {variant === 2 && (
        <g strokeWidth="1.5" fill="none">
          <rect x="34" y="36" width="44" height="38" rx="6" stroke={secondary} strokeOpacity="0.7" />
          <rect x="118" y="22" width="44" height="38" rx="6" stroke={accent} strokeOpacity="0.9" />
          <rect x="202" y="48" width="44" height="38" rx="6" stroke={secondary} strokeOpacity="0.7" />
          <path d="M 78 55 L 118 41" stroke={accent} strokeOpacity="0.7" />
          <path d="M 162 41 L 202 67" stroke={secondary} strokeOpacity="0.7" />
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
}

const MasonrySkillCard: React.FC<MasonrySkillCardProps> = ({
  skill,
  index,
  progress,
  onOpen,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const dom = DOMAIN_MAP[skill.domain];
  const comp = getSkillCompletion(skill, progress.completedTopicIds, progress.demoPolymathMode);
  const isUnlocked = comp.percentage === 100;
  const rankLabel = getBadgeRankLabel(skill.tier);
  const totalPapers = skill.papers.length;
  const totalProjects = skill.projects.required.length + skill.projects.scalable.length;
  const totalCerts = skill.certifications.length;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 7, ry: x * 7 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div className="mb-5 break-inside-avoid">
      <button
        type="button"
        onClick={() => onOpen(skill.id)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease, box-shadow 220ms ease',
        }}
        className={`group w-full rounded-2xl border p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3366] cursor-pointer ${
          isUnlocked
            ? 'border-[#10B981]/55 bg-[#121D18] shadow-[0_0_28px_rgba(16,185,129,0.12)] hover:border-[#10B981]'
            : 'border-white/10 bg-[#141B17] hover:border-[#10B981]/50'
        }`}
      >
        {/* Top quiet text metadata + Skill Mastery Crest */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#A7B5AE]">
          <div className="min-w-0">
            <span className="font-medium block truncate" style={{ color: dom.accentHex }}>
              {dom.shortName}
            </span>
            <span className="font-mono-data text-[#708078]">
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

        {/* Procedural Nerdy Visual Motif */}
        {skill.cardHeightHint !== 'compact' && (
          <div className="mt-3.5 relative">
            <SkillCardMotif
              domain={skill.domain}
              accent={dom.accentHex}
              secondary={dom.secondaryHex}
              idx={index}
            />
          </div>
        )}

        {/* Title & Description */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-[#F1F5F3] group-hover:text-white">
            {skill.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#708078] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF3366]" />
        </div>

        <p
          className={`mt-2 text-sm leading-relaxed text-[#A7B5AE] ${
            skill.cardHeightHint === 'tall' ? '' : 'line-clamp-3'
          }`}
        >
          {skill.summary}
        </p>

        {/* Tall card extra preview of Day 1 & Top Project */}
        {skill.cardHeightHint === 'tall' && (
          <div className="mt-4 border-t border-white/8 pt-3 space-y-1.5 text-xs text-[#A7B5AE]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#708078]">Starts with</span>
              <span className="text-[#F1F5F3] truncate max-w-[180px]">{skill.dayModules[0]?.title}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#708078]">Capstone</span>
              <span className="text-[#10B981] truncate max-w-[180px]">
                {skill.projects.scalable[0]?.title || skill.projects.required[0]?.title}
              </span>
            </div>
          </div>
        )}

        {/* Resume-Ready Counts (Unboxed typographic separators) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#708078] font-mono-data">
          <span>{totalPapers} papers</span>
          <span aria-hidden="true">·</span>
          <span>{totalProjects} projects</span>
          <span aria-hidden="true">·</span>
          <span>{totalCerts} free certs</span>
        </div>

        {/* Per-Skill Progress Meter & Badge Unlock Readout */}
        <div className="mt-4 pt-3 border-t border-white/8">
          <div className="flex items-center justify-between text-xs font-mono-data">
            <span className={isUnlocked ? 'text-[#10B981] font-semibold' : 'text-[#A7B5AE]'}>
              {isUnlocked ? `${rankLabel} Unlocked` : `${comp.completed}/${comp.total} topics`}
            </span>
            <span className={isUnlocked ? 'text-[#10B981] font-semibold' : 'text-[#F1F5F3]'}>
              {comp.percentage}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#090D0B]">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${comp.percentage}%`,
                backgroundColor: isUnlocked ? '#10B981' : dom.accentHex,
              }}
            />
          </div>
        </div>
      </button>
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

  return (
    <section id="masonry-catalog" className="space-y-6">
      {/* Header & Filter Toolbar */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F5F3]">
              Skill Roadmap Atlas
            </h2>
            <p className="mt-1 text-sm text-[#A7B5AE]">
              Pin-board index of all {skills.length} disciplines. Complete 100% of topics in any card to unlock its mastery seal, or add any custom skill on demand.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#708078]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills (e.g. Quant, LLM, Blender)..."
                aria-label="Search skills"
                className="w-full rounded-xl border border-white/12 bg-[#141B17] py-2.5 pr-4 pl-10 text-sm text-[#F1F5F3] placeholder-[#708078] focus:border-[#FF3366] focus:outline-none"
              />
            </div>

            {onOpenAddSkill && (
              <button
                type="button"
                onClick={onOpenAddSkill}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FF3366] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#E11D48] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Bars */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0F1412] p-1 border border-white/8">
            <button
              type="button"
              onClick={() => onSelectDomain('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeDomain === 'all'
                  ? 'bg-[#FF3366] text-white'
                  : 'text-[#A7B5AE] hover:text-white'
              }`}
            >
              All ({skills.length})
            </button>
            {DOMAINS.map((dom) => {
              const count = skills.filter((s) => s.domain === dom.id).length;
              return (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => onSelectDomain(dom.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeDomain === dom.id
                      ? 'bg-[#19221D] text-white border border-white/20'
                      : 'text-[#A7B5AE] hover:text-white'
                  }`}
                >
                  {dom.shortName} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start">
            <button
              type="button"
              onClick={() => setOnlyUnlocked((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                onlyUnlocked
                  ? 'border-[#10B981]/60 bg-[#10B981]/15 text-[#10B981]'
                  : 'border-white/8 bg-[#0F1412] text-[#A7B5AE] hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Badges Unlocked ({unlockedCount}/{skills.length})</span>
            </button>

            <div className="flex items-center gap-1.5 rounded-xl bg-[#0F1412] p-1 border border-white/8">
              <Layers className="ml-2 mr-1 h-3.5 w-3.5 text-[#708078]" />
              {(['all', 1, 2, 3, 4] as const).map((tier) => (
                <button
                  key={String(tier)}
                  type="button"
                  onClick={() => setTierFilter(tier)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    tierFilter === tier
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'text-[#A7B5AE] hover:text-white'
                  }`}
                >
                  {tier === 'all' ? 'All Tiers' : `T${tier}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pinterest-Style Masonry Columns */}
      {filteredSkills.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#141B17] p-12 text-center">
          <p className="text-base font-medium text-[#F1F5F3]">
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
            className="mt-4 rounded-lg bg-[#FF3366] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
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
            />
          ))}
        </div>
      )}
    </section>
  );
};
