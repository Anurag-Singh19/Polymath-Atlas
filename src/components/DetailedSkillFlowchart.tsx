import React from 'react';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { SKILL_MAP } from '../data';
import { SkillNode, UserProgressState } from '../types/curriculum';

interface DetailedSkillFlowchartProps {
  skill: SkillNode;
  skillMap?: Record<string, SkillNode>;
  progress: UserProgressState;
  onSelectSkill: (skillId: string) => void;
  onJumpToDayModule: (moduleId: string) => void;
}

export const DetailedSkillFlowchart: React.FC<DetailedSkillFlowchartProps> = ({
  skill,
  skillMap = SKILL_MAP,
  progress,
  onSelectSkill,
  onJumpToDayModule,
}) => {
  return (
    <section className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B] shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-mono-data text-xs text-[#60A5FA] mb-1">
            01 · Prerequisite Graph
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F4F1EA]">
            Detailed Connected Skill Tree
          </h2>
          <p className="text-xs text-slate-300">
            Live-connected pathway from upstream prerequisites through each day module to downstream specializations.
          </p>
        </div>
        <div className="text-xs font-mono-data text-slate-400">
          Click any module or linked skill
        </div>
      </div>

      {/* Connected 3-Stage Flow Diagram */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px] grid grid-cols-12 items-center gap-3">
          {/* Column 1: Prerequisites */}
          <div className="col-span-3 space-y-2.5">
            <div className="text-[11px] font-mono-data text-[#60A5FA]">
              Prerequisites ({skill.prerequisites.length})
            </div>
            {skill.prerequisites.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(244,241,234,0.14)] bg-[#0B0D14] p-3 text-xs text-slate-400">
                Direct Entry Foundation
              </div>
            ) : (
              skill.prerequisites.map((preId) => {
                const pre = skillMap[preId];
                if (!pre) return null;
                return (
                  <button
                    key={preId}
                    type="button"
                    data-cursor="open"
                    onClick={() => onSelectSkill(preId)}
                    className="w-full rounded-xl border border-[#2563EB]/50 bg-[#0B0D14] p-3 text-left transition-colors hover:border-[#60A5FA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                  >
                    <div className="text-[10px] font-mono-data text-[#60A5FA]">Prerequisite</div>
                    <div className="mt-0.5 text-xs font-semibold text-[#F4F1EA] truncate">
                      {pre.title}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Connector Arrows */}
          <div className="col-span-1 flex justify-center text-[#60A5FA]/80">
            <ArrowRight className="h-5 w-5" />
          </div>

          {/* Column 2: Internal Connected Day Modules */}
          <div className="col-span-4 space-y-2">
            <div className="text-[11px] font-mono-data text-slate-200">
              Internal Progression ({skill.dayModules.length} Stages)
            </div>
            <div className="relative space-y-2">
              {skill.dayModules.map((mod, idx) => {
                const total = mod.topics.length;
                const done = progress.demoPolymathMode
                  ? total
                  : mod.topics.filter((t) => progress.completedTopicIds[t.id]).length;
                const isDone = total > 0 && done === total;

                return (
                  <div key={mod.id} className="relative">
                    <button
                      type="button"
                      onClick={() => onJumpToDayModule(mod.id)}
                      className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                        isDone
                          ? 'border-[#10B981]/55 bg-[#091A16]'
                          : 'border-[rgba(244,241,234,0.1)] bg-[#0B0D14] hover:border-[#60A5FA]/60'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-mono-data text-[10px] text-slate-400">
                          {mod.dayRange}
                        </div>
                        <div className="text-xs font-semibold text-[#F4F1EA] truncate">
                          {mod.title}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 font-mono-data text-[11px] tabular-nums">
                        <span className={isDone ? 'text-[#34D399]' : 'text-slate-300'}>
                          {done}/{total}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                    </button>
                    {idx < skill.dayModules.length - 1 && (
                      <div className="mx-auto h-2 w-[2px] bg-[rgba(244,241,234,0.12)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connector Arrows */}
          <div className="col-span-1 flex justify-center text-[#34D399]/80">
            <ArrowRight className="h-5 w-5" />
          </div>

          {/* Column 3: Downstream Unlocks */}
          <div className="col-span-3 space-y-2.5">
            <div className="text-[11px] font-mono-data text-[#34D399]">
              Unlocks Next ({skill.unlocks.length})
            </div>
            {skill.unlocks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(244,241,234,0.14)] bg-[#0B0D14] p-3 text-xs text-slate-400">
                Capstone Specialization
              </div>
            ) : (
              skill.unlocks.map((unId) => {
                const un = skillMap[unId];
                if (!un) return null;
                return (
                  <button
                    key={unId}
                    type="button"
                    data-cursor="open"
                    onClick={() => onSelectSkill(unId)}
                    className="w-full rounded-xl border border-[#10B981]/40 bg-[#0B0D14] p-3 text-left transition-colors hover:border-[#34D399] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
                  >
                    <div className="text-[10px] font-mono-data text-[#34D399]">Unlocked Path</div>
                    <div className="mt-0.5 text-xs font-semibold text-[#F4F1EA] truncate">
                      {un.title}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
