import React, { useMemo, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, ArrowRight, GitBranch } from 'lucide-react';
import { ALL_SKILLS, DOMAINS, DOMAIN_MAP, SKILL_MAP, getSkillCompletion } from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';
import { ScrollStage } from './GalleryChoreography';
import { MotionSegmentedControl } from './ui/WatermelonUI';

interface SkillTreeFlowchartProps {
  skills?: SkillNode[];
  skillMap?: Record<string, SkillNode>;
  progress: UserProgressState;
  onOpenSkill: (skillId: string) => void;
}

interface PositionedNode {
  skill: SkillNode;
  x: number;
  y: number;
}

const NODE_W = 212;
const NODE_H = 74;
const TIER_X: Record<1 | 2 | 3 | 4, number> = {
  1: 70,
  2: 430,
  3: 790,
  4: 1150,
};

export const SkillTreeFlowchart: React.FC<SkillTreeFlowchartProps> = ({
  skills = ALL_SKILLS,
  skillMap = SKILL_MAP,
  progress,
  onOpenSkill,
}) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('ai-ml');
  const [domainFilter, setDomainFilter] = useState<DomainId | 'all'>('all');
  const [zoom, setZoom] = useState<number>(0.88);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 16 });
  const [dragging, setDragging] = useState<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  const { nodes, nodeMap, canvasHeight, edges } = useMemo(() => {
    const tierGroups: Record<1 | 2 | 3 | 4, SkillNode[]> = { 1: [], 2: [], 3: [], 4: [] };
    const domainOrder: Record<DomainId, number> = {
      'swe-data': 0,
      'ai-ml': 1,
      'cloud-sec': 2,
      'quant-finance': 3,
      'creative-3d': 4,
      'business-polymath': 5,
    };

    const sorted = [...skills].sort(
      (a, b) => domainOrder[a.domain] - domainOrder[b.domain] || a.title.localeCompare(b.title)
    );

    sorted.forEach((skill) => {
      tierGroups[skill.tier].push(skill);
    });

    const positioned: PositionedNode[] = [];
    const map: Record<string, PositionedNode> = {};
    const maxRows = Math.max(
      tierGroups[1].length,
      tierGroups[2].length,
      tierGroups[3].length,
      tierGroups[4].length
    );

    const rowGap = 104;
    const totalH = Math.max(900, maxRows * rowGap + 140);

    ([1, 2, 3, 4] as const).forEach((tier) => {
      const list = tierGroups[tier];
      const colHeight = list.length * rowGap;
      const startY = Math.max(76, (totalH - colHeight) / 2);
      list.forEach((skill, idx) => {
        const pn: PositionedNode = {
          skill,
          x: TIER_X[tier],
          y: startY + idx * rowGap,
        };
        positioned.push(pn);
        map[skill.id] = pn;
      });
    });

    const edgeList: { from: string; to: string }[] = [];
    const seen = new Set<string>();
    for (const skill of skills) {
      for (const preId of skill.prerequisites) {
        if (map[preId]) {
          const key = `${preId}->${skill.id}`;
          if (!seen.has(key)) {
            seen.add(key);
            edgeList.push({ from: preId, to: skill.id });
          }
        }
      }
      for (const unId of skill.unlocks) {
        if (map[unId]) {
          const key = `${skill.id}->${unId}`;
          if (!seen.has(key)) {
            seen.add(key);
            edgeList.push({ from: skill.id, to: unId });
          }
        }
      }
    }

    return { nodes: positioned, nodeMap: map, canvasHeight: totalH, edges: edgeList };
  }, [skills]);

  const selectedSkill = skillMap[selectedSkillId] || skills[0];
  const selectedDomainInfo =
    DOMAIN_MAP[selectedSkill.domain] || DOMAIN_MAP['swe-data'];

  const { upstreamSet, downstreamSet } = useMemo(() => {
    const up = new Set<string>();
    const down = new Set<string>();

    const walkUp = (id: string) => {
      const s = skillMap[id];
      if (!s) return;
      for (const pre of s.prerequisites) {
        if (!up.has(pre)) {
          up.add(pre);
          walkUp(pre);
        }
      }
    };
    const walkDown = (id: string) => {
      const s = skillMap[id];
      if (!s) return;
      for (const un of s.unlocks) {
        if (!down.has(un)) {
          down.add(un);
          walkDown(un);
        }
      }
    };

    walkUp(selectedSkill.id);
    walkDown(selectedSkill.id);
    return { upstreamSet: up, downstreamSet: down };
  }, [selectedSkill.id, skillMap]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setDragging({
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPan({
      x: dragging.origX + (e.clientX - dragging.startX),
      y: dragging.origY + (e.clientY - dragging.startY),
    });
  };

  const handlePointerUp = () => setDragging(null);

  const selectedComp = getSkillCompletion(
    selectedSkill,
    progress.completedTopicIds,
    progress.demoPolymathMode
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <ScrollStage>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono-data">
              <GitBranch className="h-3.5 w-3.5 text-[#60A5FA]" />
              <span>Connected Prerequisite Graph</span>
              <span aria-hidden="true">·</span>
              <span>{skills.length} Nodes</span>
              <span aria-hidden="true">·</span>
              <span>{edges.length} Dependency Edges</span>
            </div>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#F4F1EA]">
              Overall Polymath Skill Tree Flowchart
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Click any skill node to trace its upstream prerequisites (cobalt) and downstream unlock pathways (mint), or drag the canvas to explore all four mastery tiers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-xl border border-slate-500/70 bg-[#0E111B] p-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.45, Number((z - 0.12).toFixed(2))))}
                aria-label="Zoom out"
                className="rounded-lg p-2 text-slate-300 hover:text-[#F4F1EA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="px-2 font-mono-data text-xs text-[#F4F1EA] tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.4, Number((z + 0.12).toFixed(2))))}
                aria-label="Zoom in"
                className="rounded-lg p-2 text-slate-300 hover:text-[#F4F1EA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(0.86);
                  setPan({ x: 20, y: 16 });
                }}
                aria-label="Reset pan and zoom"
                className="rounded-lg p-2 text-slate-300 hover:text-[#F4F1EA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollStage>

      {/* Domain Highlight Filter */}
      <MotionSegmentedControl
        layoutId="wm-tree-domain-tab"
        value={domainFilter}
        onChange={setDomainFilter}
        options={[
          { id: 'all', label: 'Highlight All Paths' },
          ...DOMAINS.map((dom) => ({
            id: dom.id,
            label: dom.shortName,
            accentHex: dom.accentHex,
          })),
        ]}
      />

      {/* Split Interactive Graph + Selected Inspector Panel */}
      <ScrollStage delay={0.05}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div
            data-cursor="orbit"
            data-cursor-label="PAN"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="xl:col-span-9 relative h-[680px] overflow-hidden rounded-2xl border border-[rgba(244,241,234,0.12)] bg-[#06070A]/62 backdrop-blur-sm bg-grid-nerdy select-none cursor-grab active:cursor-grabbing"
          >
            {/* Tier Column Labels */}
            <div
              className="pointer-events-none absolute top-0 left-0 origin-top-left"
              style={{
                width: 1460,
                height: canvasHeight,
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {([
                { tier: 1, label: 'Tier 1 · Foundations' },
                { tier: 2, label: 'Tier 2 · Core Craft' },
                { tier: 3, label: 'Tier 3 · Specialized' },
                { tier: 4, label: 'Tier 4 · Polymath Mastery' },
              ] as const).map((col) => (
                <div
                  key={col.tier}
                  style={{ left: TIER_X[col.tier], top: 18, width: NODE_W }}
                  className="absolute font-mono-data text-xs font-semibold text-slate-400 border-b border-[rgba(244,241,234,0.12)] pb-2"
                >
                  {col.label}
                </div>
              ))}

              {/* SVG Cubic Bezier Edges */}
              <svg width={1460} height={canvasHeight} className="absolute inset-0">
                {edges.map((edge) => {
                  const fromNode = nodeMap[edge.from];
                  const toNode = nodeMap[edge.to];
                  if (!fromNode || !toNode) return null;

                  const x1 = fromNode.x + NODE_W;
                  const y1 = fromNode.y + NODE_H / 2;
                  const x2 = toNode.x;
                  const y2 = toNode.y + NODE_H / 2;
                  const dx = Math.max(60, Math.abs(x2 - x1) * 0.52);
                  const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                  const isUpstreamEdge =
                    (upstreamSet.has(edge.from) || edge.from === selectedSkill.id) &&
                    (upstreamSet.has(edge.to) || edge.to === selectedSkill.id);
                  const isDownstreamEdge =
                    (downstreamSet.has(edge.from) || edge.from === selectedSkill.id) &&
                    (downstreamSet.has(edge.to) || edge.to === selectedSkill.id);

                  const matchesDomain =
                    domainFilter === 'all' ||
                    fromNode.skill.domain === domainFilter ||
                    toNode.skill.domain === domainFilter;

                  let stroke = 'rgba(244,241,234,0.14)';
                  let strokeWidth = 1.4;
                  if (isUpstreamEdge) {
                    stroke = '#3B82F6';
                    strokeWidth = 2.6;
                  } else if (isDownstreamEdge) {
                    stroke = '#10B981';
                    strokeWidth = 2.6;
                  } else if (!matchesDomain) {
                    stroke = 'rgba(244,241,234,0.04)';
                  }

                  return (
                    <path
                      key={`${edge.from}-${edge.to}`}
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                    />
                  );
                })}
              </svg>

              {/* Skill Node Cards */}
              {nodes.map(({ skill, x, y }) => {
                const dom = DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data'];
                const comp = getSkillCompletion(
                  skill,
                  progress.completedTopicIds,
                  progress.demoPolymathMode
                );
                const isSelected = skill.id === selectedSkill.id;
                const isUp = upstreamSet.has(skill.id);
                const isDown = downstreamSet.has(skill.id);
                const dimmed =
                  domainFilter !== 'all' &&
                  skill.domain !== domainFilter &&
                  !isSelected &&
                  !isUp &&
                  !isDown;

                return (
                  <button
                    key={skill.id}
                    type="button"
                    data-cursor="open"
                    data-cursor-label="NODE"
                    onClick={() => setSelectedSkillId(skill.id)}
                    onDoubleClick={() => onOpenSkill(skill.id)}
                    style={{
                      left: x,
                      top: y,
                      width: NODE_W,
                      height: NODE_H,
                      opacity: dimmed ? 0.28 : 1,
                    }}
                    className={`pointer-events-auto absolute rounded-xl border p-3 text-left transition-[opacity,border-color,background-color,box-shadow] duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                      isSelected
                        ? 'border-[#60A5FA] bg-[#0F1B33] shadow-[0_0_24px_rgba(37,99,235,0.35)]'
                        : comp.percentage === 100
                        ? 'border-[#10B981]/65 bg-[#091A16]'
                        : isDown
                        ? 'border-[#10B981]/60 bg-[#0B1E18]'
                        : isUp
                        ? 'border-[#3B82F6]/60 bg-[#0D1629]'
                        : 'border-[rgba(244,241,234,0.12)] bg-[#0E111B] hover:border-[#60A5FA]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 text-[10px] font-mono-data">
                          <span className="truncate" style={{ color: dom.accentHex }}>
                            {dom.shortName}
                          </span>
                          <span className={comp.percentage === 100 ? 'text-[#34D399] font-semibold tabular-nums' : 'text-slate-300 tabular-nums'}>
                            {comp.percentage}%
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[#F4F1EA] truncate">
                          {skill.title}
                        </div>
                      </div>
                      {comp.percentage === 100 && (
                        <SkillMasteryBadge
                          domain={skill.domain}
                          tier={skill.tier}
                          unlocked={true}
                          size="sm"
                        />
                      )}
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#06070A]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${comp.percentage}%`,
                          backgroundColor: comp.percentage === 100 ? '#10B981' : dom.accentHex,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend Overlay */}
            <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap items-center gap-4 rounded-xl border border-[rgba(244,241,234,0.12)] bg-[#06070A]/92 px-3.5 py-2 text-[11px] font-mono-data text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#3B82F6]" />
                Prerequisites
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#10B981]" />
                Unlocks Next
              </span>
              <span>Double-click node to open full roadmap</span>
            </div>
          </div>

          {/* Right Sticky Inspector Drawer */}
          <aside className="xl:col-span-3 rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 space-y-5">
            <div>
              <div className="text-xs font-mono-data" style={{ color: selectedDomainInfo.accentHex }}>
                {selectedDomainInfo.name}
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#F4F1EA]">
                {selectedSkill.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {selectedSkill.summary}
              </p>
            </div>

            {/* Completion Meter + Badge Status */}
            <div className="rounded-xl bg-[#0B0D14] border border-[rgba(244,241,234,0.08)] p-4 flex items-center gap-3.5">
              <SkillMasteryBadge
                domain={selectedSkill.domain}
                tier={selectedSkill.tier}
                unlocked={selectedComp.percentage === 100}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-xs font-mono-data">
                  <span className={selectedComp.percentage === 100 ? 'text-[#34D399] font-semibold' : 'text-slate-300'}>
                    {selectedComp.percentage === 100
                      ? getBadgeRankLabel(selectedSkill.tier)
                      : 'Skill Progress'}
                  </span>
                  <span className="text-[#F4F1EA] font-semibold tabular-nums">
                    {selectedComp.completed}/{selectedComp.total} ({selectedComp.percentage}%)
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#06070A]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${selectedComp.percentage}%`,
                      backgroundColor: selectedComp.percentage === 100 ? '#10B981' : '#3B82F6',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Connected Prerequisites */}
            <div>
              <h3 className="text-xs font-semibold text-slate-300">
                Prerequisites ({selectedSkill.prerequisites.length})
              </h3>
              {selectedSkill.prerequisites.length === 0 ? (
                <p className="mt-1.5 text-xs text-slate-400">Entry-level foundation node — start here anytime.</p>
              ) : (
                <div className="mt-2 flex flex-col gap-1.5">
                  {selectedSkill.prerequisites.map((preId) => {
                    const pre = skillMap[preId];
                    if (!pre) return null;
                    return (
                      <button
                        key={preId}
                        type="button"
                        onClick={() => setSelectedSkillId(preId)}
                        className="flex items-center justify-between rounded-lg border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] px-3 py-2 text-xs text-[#F4F1EA] hover:border-[#60A5FA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                      >
                        <span className="truncate">{pre.title}</span>
                        <span className="text-[#60A5FA] font-mono-data">Focus</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Downstream Unlocks */}
            <div>
              <h3 className="text-xs font-semibold text-slate-300">
                Unlocks Next ({selectedSkill.unlocks.length})
              </h3>
              {selectedSkill.unlocks.length === 0 ? (
                <p className="mt-1.5 text-xs text-slate-400">Terminal specialization capstone.</p>
              ) : (
                <div className="mt-2 flex flex-col gap-1.5">
                  {selectedSkill.unlocks.map((unId) => {
                    const un = skillMap[unId];
                    if (!un) return null;
                    return (
                      <button
                        key={unId}
                        type="button"
                        onClick={() => setSelectedSkillId(unId)}
                        className="flex items-center justify-between rounded-lg border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] px-3 py-2 text-xs text-[#F4F1EA] hover:border-[#10B981]/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#34D399]"
                      >
                        <span className="truncate">{un.title}</span>
                        <span className="text-[#34D399] font-mono-data">Focus</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              data-cursor="open"
              onClick={() => onOpenSkill(selectedSkill.id)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.3)] transition-colors hover:bg-[#3B82F6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              Open Full Skill Roadmap
              <ArrowRight className="h-4 w-4" />
            </button>
          </aside>
        </div>
      </ScrollStage>
    </div>
  );
};
