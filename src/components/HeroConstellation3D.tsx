import React, { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ChevronDown, ChevronUp, RotateCw, Compass, RotateCcw, Play, Pause } from 'lucide-react';
import { DOMAINS } from '../data';
import { DomainId } from '../types/curriculum';

export const HERO_REEL_SEQUENCE: (DomainId | 'all')[] = [
  'all',
  'ai-ml',
  'swe-data',
  'cloud-sec',
  'quant-finance',
  'creative-3d',
  'business-polymath',
];

export const HERO_REEL_DURATION_MS = 6200;

interface HeroConstellation3DProps {
  skillCount?: number;
  activeDomain: DomainId | 'all';
  displayedDomain: DomainId | 'all';
  hoveredDomain: DomainId | null;
  reelIndex: number;
  reelPlaying: boolean;
  autoOrbit: boolean;
  onSelectDomain: (domainId: DomainId | 'all') => void;
  onResetReelIndex: () => void;
  onToggleReelPlaying: () => void;
  onToggleAutoOrbit: () => void;
  onResetCamera: () => void;
  onOpenTree: () => void;
}

const CHAPTER_HEADLINES: Record<DomainId | 'all', { lead: string; accent: string }> = {
  all: { lead: 'Master Every Craft. Become a', accent: 'Polymath.' },
  'ai-ml': { lead: 'Neural Systems. Agentic', accent: 'Intelligence.' },
  'swe-data': { lead: 'Resilient Code. Distributed', accent: 'Data.' },
  'cloud-sec': { lead: 'Cloud Mesh. Zero-Trust', accent: 'Defense.' },
  'quant-finance': { lead: 'Stochastic Models. Capital', accent: 'Allocation.' },
  'creative-3d': { lead: 'Spatial Compute. Physical', accent: 'Robotics.' },
  'business-polymath': { lead: 'Product Velocity. Polyglot', accent: 'Fluency.' },
};

export const HeroConstellation3D: React.FC<HeroConstellation3DProps> = ({
  skillCount = 45,
  activeDomain,
  displayedDomain,
  hoveredDomain,
  reelIndex,
  reelPlaying,
  autoOrbit,
  onSelectDomain,
  onResetReelIndex,
  onToggleReelPlaying,
  onToggleAutoOrbit,
  onResetCamera,
  onOpenTree,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroContentY = useTransform(heroScrollProgress, [0, 1], [0, 42]);
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.72, 1], [1, 0.82, 0.25]);

  const [hudCollapsed, setHudCollapsed] = useState(false);

  const hoveredDomainInfo = hoveredDomain
    ? DOMAINS.find((d) => d.id === hoveredDomain)
    : null;

  const displayedDomainIndex =
    displayedDomain === 'all'
      ? -1
      : DOMAINS.findIndex((d) => d.id === displayedDomain);

  const displayedDomainInfo =
    displayedDomainIndex >= 0 ? DOMAINS[displayedDomainIndex] : null;

  const chapterCode =
    displayedDomainIndex >= 0
      ? String(displayedDomainIndex + 1).padStart(2, '0')
      : '00';

  const chapterTitle =
    displayedDomainInfo ? displayedDomainInfo.shortName : 'Full Atlas';

  const chapterSubtitle = displayedDomainInfo
    ? displayedDomainInfo.tagline
    : 'Interactive 3D roadmap spanning AI/ML, Systems, Cloud, Quant Finance, Creative 3D, and Strategy—complete with day-by-day checklists, adaptive topic flashcards, research papers, scalable projects, and free certifications.';

  const headline = CHAPTER_HEADLINES[displayedDomain];
  const leadWords = headline.lead.split(' ');
  const chapterAccent = displayedDomainInfo?.accentHex ?? '#60A5FA';
  const isSweepAnimating =
    activeDomain === 'all' && reelPlaying && !prefersReducedMotion;

  return (
    <section
      id="hero-observatory"
      ref={sectionRef}
      className="relative pointer-events-none min-h-[calc(100vh-120px)] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between py-2 sm:py-4"
    >
      {/* Top Spatial Readout Row */}
      <div className="relative z-10 pointer-events-none flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs text-slate-300 font-mono-data">
          <span style={{ color: chapterAccent }}>{chapterCode}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#F4F1EA]">{chapterTitle}</span>
          <span aria-hidden="true">·</span>
          <span>{skillCount} Disciplines</span>
        </div>

        <div className="rounded-lg border border-slate-500/45 bg-[#06070A]/75 backdrop-blur-md px-3 py-1.5 text-xs text-slate-300 font-mono-data">
          {hoveredDomainInfo ? (
            <span className="text-[#F4F1EA]">
              Click to filter:{' '}
              <strong style={{ color: hoveredDomainInfo.accentHex }}>
                {hoveredDomainInfo.shortName}
              </strong>
            </span>
          ) : (
            <span>Drag open space to orbit · Click any 3D beacon · Scroll to travel</span>
          )}
        </div>
      </div>

      {/* Left Editorial Serif Typography Showcase (Borderless Floating Over Live 3D Orbit) */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: heroContentOpacity, y: heroContentY }
        }
        className="relative z-10 pointer-events-none py-10 sm:py-12 max-w-2xl my-auto"
      >
        {/* Soft edge-free radial contrast halo behind headline text only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 75% 70% at 35% 50%, rgba(6, 7, 10, 0.72) 0%, rgba(6, 7, 10, 0.28) 55%, rgba(6, 7, 10, 0) 80%)',
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={displayedDomain}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-semibold leading-[1.03] tracking-tight text-[#F4F1EA]">
              {leadWords.map((word, idx) => (
                <span
                  key={`${displayedDomain}-w-${idx}`}
                  className="inline-block overflow-hidden align-bottom mr-[0.24em] pb-[0.06em]"
                >
                  <motion.span
                    className="inline-block"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: '105%', filter: 'blur(4px)' }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: '0%', filter: 'blur(0px)' }
                    }
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom pb-[0.06em]">
                <motion.span
                  className="inline-block italic font-semibold"
                  style={{ color: chapterAccent }}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: '105%', filter: 'blur(4px)' }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: '0%', filter: 'blur(0px)' }
                  }
                  transition={{
                    duration: 0.48,
                    delay: leadWords.length * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {headline.accent}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-[48ch]"
            >
              {chapterSubtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 pointer-events-auto inline-flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onOpenTree}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] shadow-[0_0_28px_rgba(37,99,235,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Compass className="h-4 w-4" />
            Explore Skill Tree Flowchart
          </motion.button>

          {displayedDomainInfo && activeDomain === 'all' ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectDomain(displayedDomainInfo.id)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-500/60 bg-[#0E111B]/80 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-[#F4F1EA] transition-colors duration-150 hover:border-[#60A5FA] hover:text-[#93C5FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Filter {displayedDomainInfo.shortName} Skills
            </motion.button>
          ) : (
            <motion.a
              whileTap={{ scale: 0.96 }}
              href="#masonry-catalog"
              className="inline-flex items-center justify-center rounded-lg border border-slate-500/60 bg-[#0E111B]/80 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-[#F4F1EA] transition-colors duration-150 hover:border-[#60A5FA] hover:text-[#93C5FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] whitespace-nowrap shrink-0"
            >
              Browse All {skillCount} Skills
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Bottom Spatial Dock + Architectural Progress Sweep */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center gap-3 pt-2">
        <div className="pointer-events-auto flex flex-col items-center max-w-full">
          <div className="mb-1.5 flex items-center gap-1.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setHudCollapsed((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-500/55 bg-[#0B0D14]/82 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors duration-150 hover:text-[#F4F1EA] hover:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] cursor-pointer"
            >
              {hudCollapsed ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Show 3D Controls
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Hide Controls
                </>
              )}
            </motion.button>

            {activeDomain === 'all' && !prefersReducedMotion && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={onToggleReelPlaying}
                title={reelPlaying ? 'Pause showcase reel' : 'Play showcase reel'}
                aria-label={reelPlaying ? 'Pause showcase reel' : 'Play showcase reel'}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium border backdrop-blur-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] cursor-pointer ${
                  reelPlaying
                    ? 'border-[#3B82F6]/60 bg-[#0B0D14]/82 text-[#93C5FD]'
                    : 'border-slate-500/55 bg-[#0B0D14]/82 text-slate-300 hover:text-[#F4F1EA]'
                }`}
              >
                {reelPlaying ? (
                  <>
                    <Pause className="h-3 w-3" />
                    Pause Reel
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" />
                    Play Reel
                  </>
                )}
              </motion.button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {!hudCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
                className="flex flex-wrap items-center justify-center gap-1 rounded-xl border border-slate-500/50 bg-[#0B0D14]/82 backdrop-blur-md p-1.5 shadow-[inset_0_1px_0_rgba(244,241,234,0.06)]"
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    onResetReelIndex();
                    onSelectDomain('all');
                  }}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] cursor-pointer ${
                    activeDomain === 'all' && displayedDomain === 'all'
                      ? 'bg-[#2563EB] text-white'
                      : activeDomain === 'all'
                      ? 'bg-[#141928] text-[#F4F1EA] border border-slate-500/50'
                      : 'text-slate-300 hover:text-[#F4F1EA]'
                  }`}
                >
                  00 · All 6
                </motion.button>
                {DOMAINS.map((dom, idx) => {
                  const isActive = displayedDomain === dom.id;
                  const isLocked = activeDomain === dom.id;
                  return (
                    <motion.button
                      key={dom.id}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onSelectDomain(isLocked ? 'all' : dom.id)}
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] cursor-pointer ${
                        isLocked
                          ? 'bg-[#172554]/80 text-[#F4F1EA] border border-[#3B82F6]/70'
                          : isActive
                          ? 'bg-[#141928] text-[#F4F1EA] border border-slate-500/50'
                          : 'text-slate-300 hover:text-[#F4F1EA]'
                      }`}
                    >
                      <span className="font-mono-data opacity-75 mr-1">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {dom.shortName}
                    </motion.button>
                  );
                })}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={onToggleAutoOrbit}
                  title="Toggle 3D auto-rotation"
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium border transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] cursor-pointer ${
                    autoOrbit
                      ? 'border-[#3B82F6]/65 text-[#93C5FD]'
                      : 'border-slate-500/50 text-slate-400 hover:text-[#F4F1EA]'
                  }`}
                >
                  <RotateCw className="h-3 w-3" />
                  Orbit
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={onResetCamera}
                  title="Reset camera angle"
                  aria-label="Reset 3D camera"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-500/50 px-2 py-1.5 text-[11px] text-slate-300 transition-colors duration-150 hover:text-[#F4F1EA] hover:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hairline 2px Architectural Progress Sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-[2px] w-full max-w-3xl bg-[rgba(244,241,234,0.1)]"
        >
          <motion.div
            key={`${displayedDomain}-${reelIndex}-${isSweepAnimating ? 'run' : 'hold'}`}
            initial={{ scaleX: isSweepAnimating ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={
              isSweepAnimating
                ? { duration: HERO_REEL_DURATION_MS / 1000, ease: 'linear' }
                : { duration: 0.2 }
            }
            style={{ backgroundColor: chapterAccent }}
            className="h-full w-full origin-left"
          />
        </div>
      </div>
    </section>
  );
};
