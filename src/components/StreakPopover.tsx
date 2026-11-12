import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Flame, Calendar, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StreakSummary } from '../lib/streak';

interface StreakPopoverProps {
  summary: StreakSummary;
  onOpenPlanner: () => void;
}

export const StreakPopover: React.FC<StreakPopoverProps> = ({
  summary,
  onOpenPlanner,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const hasStudyActionToday = summary.todayActions > 0;
  const milestoneRemaining = Math.max(0, summary.rank.nextMilestone - summary.currentStreak);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Daily streak: ${summary.currentStreak} day${summary.currentStreak === 1 ? '' : 's'}. Click to view streak calendar.`}
        title={`Daily Streak: ${summary.currentStreak} day${summary.currentStreak === 1 ? '' : 's'} · Best: ${summary.longestStreak}`}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${
          hasStudyActionToday
            ? 'border-[#F97316]/55 bg-[#1B120C] text-[#FED7AA] hover:border-[#F97316]'
            : 'border-slate-500/70 bg-[#0E111B] text-[#F4F1EA] hover:border-[#60A5FA]'
        }`}
      >
        <Flame
          className={`h-4 w-4 shrink-0 ${
            hasStudyActionToday
              ? 'text-[#FF5722] drop-shadow-[0_0_6px_rgba(249,115,22,0.55)]'
              : 'text-[#F59E0B]'
          }`}
          fill={hasStudyActionToday ? '#F97316' : 'rgba(245, 158, 11, 0.35)'}
        />
        <span className="font-mono-data tabular-nums text-[#F4F1EA]">
          {summary.currentStreak}
        </span>
        <span className="hidden xl:inline text-[11px] font-medium text-slate-300">
          {summary.currentStreak === 1 ? 'day' : 'days'}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.14 }
                : { type: 'spring', duration: 0.28, bounce: 0 }
            }
            role="dialog"
            aria-label="Daily Learning Streak"
            className="absolute right-0 mt-2.5 w-[332px] sm:w-[368px] rounded-2xl border border-[rgba(244,241,234,0.14)] bg-[#0E111B] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.78),0_0_32px_rgba(37,99,235,0.15)] z-50 space-y-4 origin-top-right"
          >
            {/* Header summary */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F97316]/35 bg-[#1E120C]">
                  <Flame
                    className="h-6 w-6 text-[#FF5722]"
                    fill={hasStudyActionToday ? '#F97316' : 'rgba(249, 115, 22, 0.35)'}
                  />
                </div>
                <div>
                  <div className="text-[11px] font-mono-data text-[#F97316]">
                    {summary.rank.title}
                  </div>
                  <div className="font-display text-2xl font-semibold text-[#F4F1EA] tabular-nums">
                    {summary.currentStreak} Day{summary.currentStreak === 1 ? '' : 's'} Streak
                  </div>
                </div>
              </div>

              <div className="text-right font-mono-data">
                <div className="text-[10px] text-slate-400">BEST</div>
                <div className="inline-flex items-center gap-1 text-sm font-bold text-[#F4F1EA]">
                  <Trophy className="h-3.5 w-3.5 text-[#F59E0B]" />
                  {summary.longestStreak}d
                </div>
              </div>
            </div>

            {/* 7-Day Consecutive Flame Strip */}
            <div className="rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-300">
                <span>Last 7 Days</span>
                <span className="text-slate-400">
                  {summary.totalActiveDays} active day{summary.totalActiveDays === 1 ? '' : 's'} total
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {summary.last7Days.map((cell) => (
                  <div
                    key={cell.dateKey}
                    title={`${cell.dateKey}: ${cell.actions} study action${cell.actions === 1 ? '' : 's'}`}
                    className={`flex flex-col items-center gap-1 rounded-lg border py-2 transition-colors ${
                      cell.active
                        ? cell.isToday
                          ? 'border-[#F97316]/55 bg-[#20120C]'
                          : 'border-[#F59E0B]/30 bg-[#19130D]'
                        : 'border-[rgba(244,241,234,0.08)] bg-[#06070A]'
                    }`}
                  >
                    <span className="text-[10px] font-mono-data text-slate-400">
                      {cell.shortDay}
                    </span>
                    <Flame
                      className={`h-4 w-4 ${
                        cell.active
                          ? cell.actions > 0
                            ? 'text-[#FF5722]'
                            : 'text-[#F59E0B]'
                          : 'text-slate-600'
                      }`}
                      fill={
                        cell.active
                          ? cell.actions > 0
                            ? '#F97316'
                            : 'rgba(245, 158, 11, 0.35)'
                          : 'none'
                      }
                    />
                    <span className="text-[10px] font-mono-data tabular-nums text-slate-300">
                      {cell.dayNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 28-Day Habit Heatmap */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#60A5FA]" />
                  28-Day Consistency
                </span>
                <span className="text-slate-400">
                  {milestoneRemaining > 0
                    ? `${milestoneRemaining}d to ${summary.rank.nextMilestone}-day rank`
                    : 'Milestone reached'}
                </span>
              </div>

              <div className="grid grid-cols-14 gap-1">
                {summary.last28Days.map((cell) => {
                  const bgClass = !cell.active
                    ? 'bg-[#06070A] border-[rgba(244,241,234,0.1)]'
                    : cell.actions >= 4
                    ? 'bg-[#2563EB] border-[#60A5FA]'
                    : cell.actions >= 1
                    ? 'bg-[#F97316] border-[#F97316]'
                    : 'bg-[#F59E0B]/45 border-[#F59E0B]/60';
                  return (
                    <div
                      key={cell.dateKey}
                      title={`${cell.dateKey} · ${
                        cell.active
                          ? cell.actions > 0
                            ? `${cell.actions} learning action${cell.actions === 1 ? '' : 's'}`
                            : 'Visited app'
                          : 'No activity'
                      }`}
                      className={`h-4 w-full rounded-[4px] border ${bgClass} ${
                        cell.isToday ? 'ring-1 ring-[#F4F1EA]/70' : ''
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Footer encouragement & CTA */}
            <div className="flex items-center justify-between gap-3 border-t border-[rgba(244,241,234,0.1)] pt-3">
              <div className="text-xs text-slate-300 leading-snug">
                {hasStudyActionToday ? (
                  <span className="inline-flex items-center gap-1.5 text-[#34D399] font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {summary.todayActions} action{summary.todayActions === 1 ? '' : 's'} logged today
                  </span>
                ) : (
                  <span>Complete a topic or flashcard today to stoke the flame.</span>
                )}
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setOpen(false);
                  onOpenPlanner();
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <span>Study Plan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
