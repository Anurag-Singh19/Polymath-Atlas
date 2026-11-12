import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export const GalleryAmbientBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Deep Cobalt Studio Perimeter Glow matching the Gallery Noir Exhibition framing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 52% at 50% 0%, rgba(10, 42, 150, 0.24) 0%, rgba(6, 7, 10, 0) 70%), radial-gradient(ellipse 68% 48% at 50% 100%, rgba(29, 78, 216, 0.18) 0%, rgba(6, 7, 10, 0) 72%)',
        }}
      />

      {/* Continuous Architectural 5-Bay Hairline Vertical Gallery Columns */}
      <div className="mx-auto flex h-full max-w-[1440px] justify-between px-4 sm:px-6 lg:px-8 opacity-75">
        <div className="h-full w-px bg-[rgba(244,241,234,0.06)]" />
        <div className="hidden sm:block h-full w-px bg-[rgba(244,241,234,0.045)]" />
        <div className="h-full w-px bg-[rgba(244,241,234,0.045)]" />
        <div className="hidden lg:block h-full w-px bg-[rgba(244,241,234,0.045)]" />
        <div className="hidden sm:block h-full w-px bg-[rgba(244,241,234,0.045)]" />
        <div className="h-full w-px bg-[rgba(244,241,234,0.06)]" />
      </div>
    </div>
  );
};

interface SectionChapter {
  id: string;
  label: string;
  code: string;
}

const EXPLORE_CHAPTERS: SectionChapter[] = [
  { id: 'hero-observatory', label: '01 · 3D Observatory', code: '01' },
  { id: 'polymath-meter', label: '02 · Mastery Meter', code: '02' },
  { id: 'masonry-catalog', label: '03 · Skill Index', code: '03' },
];

interface GalleryScrollRailProps {
  activeView: string;
}

export const GalleryScrollRail: React.FC<GalleryScrollRailProps> = ({ activeView }) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });
  const [activeChapterId, setActiveChapterId] = useState<string>('hero-observatory');

  useEffect(() => {
    if (activeView !== 'explore') return;

    const updateActive = () => {
      const mid = window.scrollY + window.innerHeight * 0.36;
      let current = EXPLORE_CHAPTERS[0].id;
      for (const ch of EXPLORE_CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (mid >= top) {
            current = ch.id;
          }
        }
      }
      setActiveChapterId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [activeView]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      {/* Continuous Full-Page Top Cobalt Scroll Sweep Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent"
      >
        <motion.div
          style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#F4F1EA]"
        />
      </div>

      {/* Left Vertical Chapter Indicator Rail (Matches Inspiration Left Gutter Ticks) */}
      {activeView === 'explore' && (
        <aside
          aria-label="Page sections"
          className="hidden 2xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-4"
        >
          <div className="relative h-24 w-px bg-[rgba(244,241,234,0.14)] ml-[3px] overflow-hidden">
            <motion.div
              style={{ scaleY: prefersReducedMotion ? scrollYProgress : smoothProgress }}
              className="h-full w-full origin-top bg-[#3B82F6]"
            />
          </div>

          <nav className="flex flex-col gap-3.5" aria-label="Gallery chapters">
            {EXPLORE_CHAPTERS.map((ch) => {
              const isActive = activeChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpTo(ch.id)}
                  title={ch.label}
                  aria-label={`Jump to ${ch.label}`}
                  className="group flex items-center gap-2.5 py-0.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <motion.span
                    animate={{
                      width: isActive ? 22 : 5,
                      backgroundColor: isActive ? '#3B82F6' : 'rgba(244, 241, 234, 0.35)',
                    }}
                    transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                    className="block h-[2px] rounded-full"
                  />
                  <span
                    className={`font-mono-data text-[10px] tracking-wider transition-opacity duration-150 ${
                      isActive
                        ? 'opacity-100 text-[#93C5FD]'
                        : 'opacity-0 group-hover:opacity-100 text-slate-400'
                    }`}
                  >
                    {ch.code}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
      )}
    </>
  );
};

interface ScrollStageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollStage: React.FC<ScrollStageProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
