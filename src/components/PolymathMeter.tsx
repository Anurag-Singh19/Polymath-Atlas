import React, { useRef } from 'react';
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
    <section
      id="polymath-meter"
      className={`rounded-2xl border p-6 md:p-8 transition-colors duration-300 ${
        stats.isPolymath
          ? 'border-[#10B981]/60 bg-gradient-to-br from-[#141B17] via-[#10241B] to-[#1D1219]'
          : 'border-white/10 bg-[#141B17]'
      }`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#A7B5AE] font-mono-data">
            <span>Global Skill Mastery</span>
            <span aria-hidden="true">·</span>
            <span>{skills.length} Disciplines</span>
            <span aria-hidden="true">·</span>
            <span>{stats.completed} / {stats.total} Topics Completed</span>
          </div>

          {stats.isPolymath ? (
            <div className="flex items-center gap-3 pt-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981]">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  You are a <span className="text-[#10B981]">POLYMATH</span>
                </h2>
                <p className="text-sm text-[#A7B5AE]">
                  100% syllabus mastery unlocked across AI/ML, Systems, Cloud, Quant Finance, Creative 3D, and Strategy.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F5F3]">
                Overall Polymath Progress Meter
              </h2>
              <p className="mt-1 text-sm text-[#A7B5AE]">
                Check off day-by-day topics inside any skill roadmap to advance the meter. Complete every track to unlock the{' '}
                <span className="font-semibold text-[#FF3366]">POLYMATH</span> rank.
              </p>
            </div>
          )}
        </div>

        {/* Controls & Big Percentage */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="mr-2 text-right">
            <div className="font-mono-data text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {stats.percentage}%
            </div>
            <div className="font-mono-data text-xs text-[#A7B5AE]">
              {stats.isPolymath ? 'Rank: POLYMATH' : `${100 - stats.percentage}% remaining`}
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleDemoPolymath}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              progress.demoPolymathMode
                ? 'border-[#10B981]/60 bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25'
                : 'border-white/15 bg-[#19221D] text-[#F1F5F3] hover:border-[#FF3366]/60 hover:text-white'
            }`}
          >
            {progress.demoPolymathMode ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Exit Polymath Preview
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#FF3366]" />
                Preview 100% Polymath
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExport}
            title="Export progress JSON"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#19221D] px-3 py-2 text-xs font-medium text-[#A7B5AE] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Import progress JSON"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#19221D] px-3 py-2 text-xs font-medium text-[#A7B5AE] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5" />
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />

          <button
            type="button"
            onClick={onResetProgress}
            title="Reset saved topic progress"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#19221D] px-3 py-2 text-xs font-medium text-[#A7B5AE] hover:text-[#FF3366] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Progress Track */}
      <div className="mt-6">
        <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#090D0B] border border-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${stats.percentage}%`,
              background: stats.isPolymath
                ? 'linear-gradient(90deg, #10B981 0%, #34D399 50%, #FF3366 100%)'
                : 'linear-gradient(90deg, #FF3366 0%, #10B981 100%)',
            }}
          />
        </div>
      </div>

      {/* 6 Domain Cluster Breakdown */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {DOMAINS.map((domain) => {
          const ds = stats.domainStats[domain.id];
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => onSelectDomain?.(domain.id)}
              className="group rounded-xl border border-white/8 bg-[#0F1412] p-3.5 text-left transition-colors hover:border-white/20 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#F1F5F3] truncate">
                  {domain.shortName}
                </span>
                <span
                  className="font-mono-data text-xs font-semibold"
                  style={{ color: ds.percentage === 100 ? '#10B981' : domain.accentHex }}
                >
                  {ds.percentage}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#19221D]">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: `${ds.percentage}%`,
                    backgroundColor: ds.percentage === 100 ? '#10B981' : domain.accentHex,
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#708078] font-mono-data">
                <span>{ds.skillCount} skills</span>
                <span>{ds.completed}/{ds.total}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
