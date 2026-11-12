import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Award, Download, Upload, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { ALL_SKILLS, DOMAINS, getGlobalCompletion } from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';

interface PolymathMeterProps {
  skills?: SkillNode[];
  progress: UserProgressState;
  onToggleDemoPolymath: () => void;
  onResetProgress: () => void;
  onImportProgress: (next: UserProgressState) => void;
  onSelectDomain?: (domainId: DomainId) => void;
}

export const PolymathMeter: React.FC<PolymathMeterProps> = ({
  skills = ALL_SKILLS,
  progress,
  onToggleDemoPolymath,
  onResetProgress,
  onImportProgress,
  onSelectDomain,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stats = getGlobalCompletion(progress.completedTopicIds, progress.demoPolymathMode, skills);

  const handleExport = () => {
    const payload = JSON.stringify(progress, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polymath-atlas-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed && typeof parsed === 'object' && parsed.completedTopicIds) {
          onImportProgress({
            completedTopicIds: parsed.completedTopicIds || {},
            masteredCardIds: parsed.masteredCardIds || {},
            bookmarkedItems: parsed.bookmarkedItems || {},
            demoPolymathMode: Boolean(parsed.demoPolymathMode),
            customSkills: Array.isArray(parsed.customSkills) ? parsed.customSkills : [],
          });
        }
      } catch {
        // Ignore malformed JSON imports safely
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <motion.section
      id="polymath-meter"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-colors duration-300 shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] ${
        stats.isPolymath
          ? 'border-[#10B981]/55 bg-gradient-to-br from-[#0E111B]/86 via-[#091A16]/84 to-[#0B1228]/86'
          : 'border-[rgba(244,241,234,0.12)] bg-[#0E111B]/78'
      }`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono-data">
            <span className="text-[#60A5FA]">02 · Global Skill Mastery</span>
            <span aria-hidden="true">·</span>
            <span>{skills.length} Disciplines</span>
            <span aria-hidden="true">·</span>
            <span>
              {stats.completed} / {stats.total} Topics Completed
            </span>
          </div>

          {stats.isPolymath ? (
            <div className="flex items-center gap-3 pt-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/15 border border-[#10B981]/45 text-[#34D399]">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F1EA]">
                  You are a <span className="italic text-[#34D399]">Polymath</span>
                </h2>
                <p className="text-sm text-slate-300">
                  100% syllabus mastery unlocked across AI/ML, Systems, Cloud, Quant Finance, Creative 3D, and Strategy.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F1EA]">
                Overall Polymath Progress Meter
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Check off day-by-day topics inside any skill roadmap to advance the meter. Complete every track to unlock the{' '}
                <span className="font-semibold text-[#60A5FA]">POLYMATH</span> rank.
              </p>
            </div>
          )}
        </div>

        {/* Controls & Big Percentage */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="mr-2 text-right">
            <div className="font-mono-data text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F1EA] tabular-nums">
              {stats.percentage}%
            </div>
            <div className="font-mono-data text-xs text-slate-400">
              {stats.isPolymath ? 'Rank: POLYMATH' : `${100 - stats.percentage}% remaining`}
            </div>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onToggleDemoPolymath}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] cursor-pointer ${
              progress.demoPolymathMode
                ? 'border-[#10B981]/60 bg-[#10B981]/15 text-[#34D399] hover:bg-[#10B981]/25'
                : 'border-slate-500/60 bg-[#141928] text-[#F4F1EA] hover:border-[#60A5FA] hover:text-white'
            }`}
          >
            {progress.demoPolymathMode ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Exit Polymath Preview
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
                Preview 100% Polymath
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handleExport}
            title="Export progress JSON"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500/60 bg-[#141928] px-3 py-2 text-xs font-medium text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => fileInputRef.current?.click()}
            title="Import progress JSON"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500/60 bg-[#141928] px-3 py-2 text-xs font-medium text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5" />
            Import
          </motion.button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onResetProgress}
            title="Reset saved topic progress"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500/60 bg-[#141928] px-3 py-2 text-xs font-medium text-slate-300 hover:text-rose-300 hover:border-rose-400/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </motion.button>
        </div>
      </div>

      {/* Main Progress Track */}
      <div className="mt-6">
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#06070A] border border-slate-600/55">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${stats.percentage}%`,
              background: stats.isPolymath
                ? 'linear-gradient(90deg, #10B981 0%, #34D399 55%, #60A5FA 100%)'
                : 'linear-gradient(90deg, #2563EB 0%, #60A5FA 60%, #F4F1EA 100%)',
            }}
          />
        </div>
      </div>

      {/* 6 Domain Cluster Breakdown */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {DOMAINS.map((domain, idx) => {
          const ds = stats.domainStats[domain.id];
          return (
            <motion.button
              key={domain.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectDomain?.(domain.id)}
              className="group rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14]/76 p-3.5 text-left transition-colors hover:border-[#3B82F6]/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#F4F1EA] truncate">
                  {domain.shortName}
                </span>
                <span
                  className="font-mono-data text-xs font-semibold tabular-nums"
                  style={{ color: ds.percentage === 100 ? '#34D399' : domain.accentHex }}
                >
                  {ds.percentage}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800/90">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: `${ds.percentage}%`,
                    backgroundColor: ds.percentage === 100 ? '#10B981' : domain.accentHex,
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono-data">
                <span>{ds.skillCount} skills</span>
                <span>
                  {ds.completed}/{ds.total}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};
