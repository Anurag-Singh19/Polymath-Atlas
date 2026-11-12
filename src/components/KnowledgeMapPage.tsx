import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  ArrowRight,
  Compass,
  Sparkles,
  Plus,
} from 'lucide-react';
import {
  ALL_SKILLS,
  DOMAINS,
  DOMAIN_MAP,
  SKILL_MAP,
  getSkillCompletion,
} from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';

interface KnowledgeMapPageProps {
  skills?: SkillNode[];
  skillMap?: Record<string, SkillNode>;
  progress: UserProgressState;
  onOpenSkill: (skillId: string) => void;
  onOpenAddSkill?: () => void;
}

interface ForceNode extends d3.SimulationNodeDatum {
  id: string;
  skill: SkillNode;
  radius: number;
  degree: number;
  percentage: number;
}

interface ForceLink extends d3.SimulationLinkDatum<ForceNode> {
  source: string | ForceNode;
  target: string | ForceNode;
}

export const KnowledgeMapPage: React.FC<KnowledgeMapPageProps> = ({
  skills = ALL_SKILLS,
  skillMap = SKILL_MAP,
  progress,
  onOpenSkill,
  onOpenAddSkill,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [selectedSkillId, setSelectedSkillId] = useState<string>('ai-ml');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [domainFilter, setDomainFilter] = useState<DomainId | 'all'>('all');
  const [clusterByDomain, setClusterByDomain] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { rawNodes, rawLinks, degreeMap } = useMemo(() => {
    const edgeSet = new Set<string>();
    const links: { source: string; target: string }[] = [];
    const deg: Record<string, number> = {};

    for (const s of skills) {
      deg[s.id] = 0;
    }

    for (const s of skills) {
      for (const preId of s.prerequisites) {
        if (skillMap[preId]) {
          const key = `${preId}->${s.id}`;
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            links.push({ source: preId, target: s.id });
            deg[preId] = (deg[preId] || 0) + 1;
            deg[s.id] = (deg[s.id] || 0) + 1;
          }
        }
      }
      for (const unId of s.unlocks) {
        if (skillMap[unId]) {
          const key = `${s.id}->${unId}`;
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            links.push({ source: s.id, target: unId });
            deg[s.id] = (deg[s.id] || 0) + 1;
            deg[unId] = (deg[unId] || 0) + 1;
          }
        }
      }
    }

    const nodes = skills.map((skill) => {
      const comp = getSkillCompletion(
        skill,
        progress.completedTopicIds,
        progress.demoPolymathMode
      );
      const degree = deg[skill.id] || 0;
      return {
        id: skill.id,
        skill,
        degree,
        percentage: comp.percentage,
        radius: 11 + Math.min(8, degree * 1.1) + skill.tier * 1.4,
      };
    });

    return { rawNodes: nodes, rawLinks: links, degreeMap: deg };
  }, [skills, skillMap, progress.completedTopicIds, progress.demoPolymathMode]);

  const activeFocusId = hoveredSkillId || selectedSkillId;

  const { upstreamIds, downstreamIds } = useMemo(() => {
    const up = new Set<string>();
    const down = new Set<string>();
    const walkUp = (id: string) => {
      const s = skillMap[id];
      if (!s) return;
      for (const p of s.prerequisites) {
        if (!up.has(p)) {
          up.add(p);
          walkUp(p);
        }
      }
    };
    const walkDown = (id: string) => {
      const s = skillMap[id];
      if (!s) return;
      for (const u of s.unlocks) {
        if (!down.has(u)) {
          down.add(u);
          walkDown(u);
        }
      }
    };
    walkUp(activeFocusId);
    walkDown(activeFocusId);
    return { upstreamIds: up, downstreamIds: down };
  }, [activeFocusId, skillMap]);

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return new Set<string>();
    return new Set(
      skills
        .filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.aliases?.some((a) => a.toLowerCase().includes(q))
        )
        .map((s) => s.id)
    );
  }, [skills, searchQuery]);

  // Build & run D3 force simulation
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = 980;
    const height = 660;
    const centerX = width / 2;
    const centerY = height / 2;

    // Domain cluster centers arranged evenly on an orbital ring
    const clusterCenters: Record<DomainId, { x: number; y: number }> = {} as Record<
      DomainId,
      { x: number; y: number }
    >;
    DOMAINS.forEach((d, idx) => {
      const angle = (idx / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
      clusterCenters[d.id] = {
        x: centerX + Math.cos(angle) * 235,
        y: centerY + Math.sin(angle) * 185,
      };
    });

    const nodes: ForceNode[] = rawNodes.map((n) => ({
      ...n,
      x: clusterCenters[n.skill.domain].x + (Math.random() - 0.5) * 70,
      y: clusterCenters[n.skill.domain].y + (Math.random() - 0.5) * 70,
    }));
    const links: ForceLink[] = rawLinks.map((l) => ({ ...l }));

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');

    // Arrowhead markers
    const addMarker = (id: string, color: string) => {
      defs
        .append('marker')
        .attr('id', id)
        .attr('viewBox', '0 -4 8 8')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-4L8,0L0,4')
        .attr('fill', color);
    };
    addMarker('arrow-default', 'rgba(255,255,255,0.22)');
    addMarker('arrow-up', '#FF3366');
    addMarker('arrow-down', '#10B981');

    const container = svg.append('g').attr('class', 'graph-root');

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform.toString());
      });

    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior);

    const linkGroup = container.append('g').attr('class', 'links');
    const nodeGroup = container.append('g').attr('class', 'nodes');

    const linkSelection = linkGroup
      .selectAll<SVGPathElement, ForceLink>('path')
      .data(links)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.14)')
      .attr('stroke-width', 1.3)
      .attr('marker-end', 'url(#arrow-default)');

    const nodeSelection = nodeGroup
      .selectAll<SVGGElement, ForceNode>('g')
      .data(nodes, (d) => d.id)
      .enter()
      .append('g')
      .attr('class', 'cursor-pointer');

    // Outer halo for completed/mastered skills
    nodeSelection
      .append('circle')
      .attr('class', 'mastery-halo')
      .attr('r', (d) => d.radius + 5)
      .attr('fill', 'none')
      .attr('stroke', (d) => (d.percentage === 100 ? '#10B981' : 'transparent'))
      .attr('stroke-width', 1.8)
      .attr('stroke-dasharray', '3 2');

    // Main node circle
    nodeSelection
      .append('circle')
      .attr('class', 'node-core')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) =>
        d.percentage === 100 ? '#11251C' : '#141B17'
      )
      .attr('stroke', (d) => DOMAIN_MAP[d.skill.domain].accentHex)
      .attr('stroke-width', 2.1);

    // Tier indicator dot in center
    nodeSelection
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.34em')
      .attr('fill', '#F1F5F3')
      .attr('font-size', '9.5px')
      .attr('font-family', '"JetBrains Mono", monospace')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none')
      .text((d) => `T${d.skill.tier}`);

    // Skill title label
    nodeSelection
      .append('text')
      .attr('class', 'node-label')
      .attr('x', 0)
      .attr('y', (d) => d.radius + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#C7D3CD')
      .attr('font-size', '10.5px')
      .attr('font-weight', '500')
      .attr('pointer-events', 'none')
      .text((d) =>
        d.skill.title.length > 22 ? `${d.skill.title.slice(0, 20)}…` : d.skill.title
      );

    nodeSelection
      .on('click', (_event, d) => {
        setSelectedSkillId(d.id);
      })
      .on('dblclick', (_event, d) => {
        onOpenSkill(d.id);
      })
      .on('mouseenter', (_event, d) => {
        setHoveredSkillId(d.id);
      })
      .on('mouseleave', () => {
        setHoveredSkillId(null);
      });

    const simulation = d3
      .forceSimulation<ForceNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<ForceNode, ForceLink>(links)
          .id((d) => d.id)
          .distance(clusterByDomain ? 105 : 130)
          .strength(0.45)
      )
      .force('charge', d3.forceManyBody<ForceNode>().strength(clusterByDomain ? -240 : -320))
      .force('center', d3.forceCenter(centerX, centerY))
      .force(
        'collide',
        d3.forceCollide<ForceNode>((d) => d.radius + 26).iterations(2)
      );

    if (clusterByDomain) {
      simulation
        .force(
          'x',
          d3
            .forceX<ForceNode>((d) => clusterCenters[d.skill.domain].x)
            .strength(0.24)
        )
        .force(
          'y',
          d3
            .forceY<ForceNode>((d) => clusterCenters[d.skill.domain].y)
            .strength(0.24)
        );
    } else {
      simulation
        .force('x', d3.forceX<ForceNode>(centerX).strength(0.05))
        .force('y', d3.forceY<ForceNode>(centerY).strength(0.05));
    }

    const dragBehavior = d3
      .drag<SVGGElement, ForceNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.28).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeSelection.call(dragBehavior);

    const updatePositions = () => {
      linkSelection.attr('d', (d) => {
        const src = d.source as ForceNode;
        const tgt = d.target as ForceNode;
        const sx = src.x ?? centerX;
        const sy = src.y ?? centerY;
        const tx = tgt.x ?? centerX;
        const ty = tgt.y ?? centerY;
        const dx = tx - sx;
        const dy = ty - sy;
        const dist = Math.hypot(dx, dy) || 1;
        const padEnd = (tgt.radius || 16) + 5;
        const padStart = (src.radius || 16) + 2;
        const ex = tx - (dx / dist) * padEnd;
        const ey = ty - (dy / dist) * padEnd;
        const bx = sx + (dx / dist) * padStart;
        const by = sy + (dy / dist) * padStart;
        // Subtle arc offset for readability
        const mx = (bx + ex) / 2 - dy * 0.08;
        const my = (by + ey) / 2 + dx * 0.08;
        return `M${bx},${by} Q${mx},${my} ${ex},${ey}`;
      });

      nodeSelection.attr(
        'transform',
        (d) => `translate(${d.x ?? centerX}, ${d.y ?? centerY})`
      );
    };

    const reducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      simulation.stop();
      for (let i = 0; i < 180; i++) simulation.tick();
      updatePositions();
    } else {
      simulation.on('tick', updatePositions);
    }

    return () => {
      simulation.stop();
    };
  }, [rawNodes, rawLinks, clusterByDomain, onOpenSkill]);

  // Fast visual highlight pass without re-running force simulation
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const svg = d3.select(svgEl);

    const hasSearch = searchQuery.trim().length > 0;

    svg
      .selectAll<SVGPathElement, ForceLink>('g.links path')
      .attr('stroke', (d) => {
        const srcId = typeof d.source === 'string' ? d.source : d.source.id;
        const tgtId = typeof d.target === 'string' ? d.target : d.target.id;
        const isUpEdge =
          (upstreamIds.has(srcId) || srcId === activeFocusId) &&
          (upstreamIds.has(tgtId) || tgtId === activeFocusId);
        const isDownEdge =
          (downstreamIds.has(srcId) || srcId === activeFocusId) &&
          (downstreamIds.has(tgtId) || tgtId === activeFocusId);
        if (isUpEdge) return '#FF3366';
        if (isDownEdge) return '#10B981';
        if (
          domainFilter !== 'all' &&
          skillMap[srcId]?.domain !== domainFilter &&
          skillMap[tgtId]?.domain !== domainFilter
        ) {
          return 'rgba(255,255,255,0.04)';
        }
        return 'rgba(255,255,255,0.16)';
      })
      .attr('stroke-width', (d) => {
        const srcId = typeof d.source === 'string' ? d.source : d.source.id;
        const tgtId = typeof d.target === 'string' ? d.target : d.target.id;
        const isHighlighted =
          ((upstreamIds.has(srcId) || srcId === activeFocusId) &&
            (upstreamIds.has(tgtId) || tgtId === activeFocusId)) ||
          ((downstreamIds.has(srcId) || srcId === activeFocusId) &&
            (downstreamIds.has(tgtId) || tgtId === activeFocusId));
        return isHighlighted ? 2.4 : 1.2;
      })
      .attr('marker-end', (d) => {
        const srcId = typeof d.source === 'string' ? d.source : d.source.id;
        const tgtId = typeof d.target === 'string' ? d.target : d.target.id;
        if (
          (upstreamIds.has(srcId) || srcId === activeFocusId) &&
          (upstreamIds.has(tgtId) || tgtId === activeFocusId)
        ) {
          return 'url(#arrow-up)';
        }
        if (
          (downstreamIds.has(srcId) || srcId === activeFocusId) &&
          (downstreamIds.has(tgtId) || tgtId === activeFocusId)
        ) {
          return 'url(#arrow-down)';
        }
        return 'url(#arrow-default)';
      });

    svg
      .selectAll<SVGGElement, ForceNode>('g.nodes g')
      .attr('opacity', (d) => {
        if (hasSearch) {
          return searchMatches.has(d.id) || d.id === activeFocusId ? 1 : 0.22;
        }
        if (domainFilter !== 'all') {
          const connected =
            d.id === activeFocusId ||
            upstreamIds.has(d.id) ||
            downstreamIds.has(d.id);
          return d.skill.domain === domainFilter || connected ? 1 : 0.2;
        }
        return 1;
      });

    svg
      .selectAll<SVGCircleElement, ForceNode>('g.nodes g circle.node-core')
      .attr('stroke', (d) => {
        if (d.id === activeFocusId) return '#FFFFFF';
        if (upstreamIds.has(d.id)) return '#FF3366';
        if (downstreamIds.has(d.id)) return '#10B981';
        return DOMAIN_MAP[d.skill.domain].accentHex;
      })
      .attr('stroke-width', (d) => (d.id === activeFocusId ? 3.2 : 2));

    svg
      .selectAll<SVGTextElement, ForceNode>('g.nodes g text.node-label')
      .attr('fill', (d) =>
        d.id === activeFocusId
          ? '#FFFFFF'
          : upstreamIds.has(d.id)
          ? '#FF85A6'
          : downstreamIds.has(d.id)
          ? '#6EE7B7'
          : '#C7D3CD'
      )
      .attr('font-weight', (d) => (d.id === activeFocusId ? '700' : '500'));
  }, [
    activeFocusId,
    upstreamIds,
    downstreamIds,
    domainFilter,
    searchQuery,
    searchMatches,
  ]);

  const handleZoomStep = (factor: number) => {
    const svgEl = svgRef.current;
    const zb = zoomBehaviorRef.current;
    if (!svgEl || !zb) return;
    d3.select(svgEl).transition().duration(220).call(zb.scaleBy, factor);
  };

  const handleResetView = () => {
    const svgEl = svgRef.current;
    const zb = zoomBehaviorRef.current;
    if (!svgEl || !zb) return;
    d3.select(svgEl).transition().duration(260).call(zb.transform, d3.zoomIdentity);
  };

  const selectedSkill = skillMap[selectedSkillId] || skills[0];
  const selectedComp = getSkillCompletion(
    selectedSkill,
    progress.completedTopicIds,
    progress.demoPolymathMode
  );
  const selectedDomain = DOMAIN_MAP[selectedSkill.domain];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-data text-[#A7B5AE]">
            <Network className="h-3.5 w-3.5 text-[#10B981]" />
            <span>D3.js Force-Directed Interdependency Graph</span>
            <span aria-hidden="true">·</span>
            <span>{skills.length} Disciplines</span>
            <span aria-hidden="true">·</span>
            <span>{rawLinks.length} Directed Prerequisite Links</span>
          </div>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F3]">
            Polymath Knowledge Map
          </h1>
          <p className="mt-1 text-sm text-[#A7B5AE] max-w-2xl">
            Drag nodes, pan/zoom, or hover any discipline to trace cross-domain dependencies in real time. Double-click a node to open its full roadmap.
          </p>
        </div>

        {/* Search & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenAddSkill && (
            <button
              type="button"
              onClick={onOpenAddSkill}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF3366] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#E11D48] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Skill</span>
            </button>
          )}
          <div className="relative w-60">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#708078]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find node..."
              aria-label="Find skill node in knowledge map"
              className="w-full rounded-xl border border-white/12 bg-[#141B17] py-2 pr-3 pl-9 text-xs text-[#F1F5F3] placeholder-[#708078] focus:border-[#FF3366] focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setClusterByDomain((c) => !c)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
              clusterByDomain
                ? 'border-[#10B981]/50 bg-[#10B981]/15 text-[#10B981]'
                : 'border-white/12 bg-[#141B17] text-[#A7B5AE] hover:text-white'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>{clusterByDomain ? 'Clustered by Domain' : 'Organic Force Web'}</span>
          </button>

          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#141B17] p-1">
            <button
              type="button"
              onClick={() => handleZoomStep(0.82)}
              aria-label="Zoom out graph"
              className="rounded-lg p-1.5 text-[#A7B5AE] hover:text-white cursor-pointer"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleZoomStep(1.22)}
              aria-label="Zoom in graph"
              className="rounded-lg p-1.5 text-[#A7B5AE] hover:text-white cursor-pointer"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              aria-label="Reset graph camera"
              className="rounded-lg p-1.5 text-[#A7B5AE] hover:text-white cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Domain Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0F1412] p-1.5 border border-white/8">
        <button
          type="button"
          onClick={() => setDomainFilter('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            domainFilter === 'all'
              ? 'bg-[#FF3366] text-white'
              : 'text-[#A7B5AE] hover:text-white'
          }`}
        >
          All 6 Domains
        </button>
        {DOMAINS.map((dom) => (
          <button
            key={dom.id}
            type="button"
            onClick={() => setDomainFilter(dom.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              domainFilter === dom.id
                ? 'bg-[#19221D] text-white border border-white/25'
                : 'text-[#A7B5AE] hover:text-white'
            }`}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: dom.accentHex }}
            />
            {dom.shortName}
          </button>
        ))}
      </div>

      {/* Main Force Graph + Inspector Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-9 relative h-[660px] overflow-hidden rounded-2xl border border-white/10 bg-[#090D0B] bg-grid-nerdy">
          <svg
            ref={svgRef}
            viewBox="0 0 980 660"
            className="h-full w-full touch-none select-none"
          />

          {/* Legend Overlay */}
          <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#090D0B]/92 px-3.5 py-2 text-[11px] font-mono-data text-[#A7B5AE]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF3366]" />
              Prerequisites
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
              Unlocked Skills
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full border border-dashed border-[#10B981]" />
              100% Mastered Seal
            </span>
            <span>Drag nodes · Scroll to zoom · Double-click to open</span>
          </div>
        </div>

        {/* Right Inspector */}
        <aside className="xl:col-span-3 rounded-2xl border border-white/10 bg-[#141B17] p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div
                className="text-xs font-mono-data"
                style={{ color: selectedDomain.accentHex }}
              >
                {selectedDomain.shortName} · Tier {selectedSkill.tier}
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-[#F1F5F3]">
                {selectedSkill.title}
              </h2>
            </div>
            <SkillMasteryBadge
              domain={selectedSkill.domain}
              tier={selectedSkill.tier}
              unlocked={selectedComp.percentage === 100}
              size="md"
            />
          </div>

          <p className="text-sm leading-relaxed text-[#A7B5AE]">
            {selectedSkill.summary}
          </p>

          <div className="rounded-xl bg-[#0F1412] border border-white/8 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-data">
              <span className="text-[#A7B5AE]">
                {selectedComp.percentage === 100
                  ? getBadgeRankLabel(selectedSkill.tier)
                  : 'Graph Connections'}
              </span>
              <span className="text-white font-semibold">
                {degreeMap[selectedSkill.id] || 0} links · {selectedComp.percentage}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#090D0B]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${selectedComp.percentage}%`,
                  backgroundColor:
                    selectedComp.percentage === 100
                      ? '#10B981'
                      : selectedDomain.accentHex,
                }}
              />
            </div>
          </div>

          {/* Upstream Prerequisites */}
          <div>
            <h3 className="text-xs font-semibold text-[#A7B5AE]">
              Depends On ({selectedSkill.prerequisites.length})
            </h3>
            {selectedSkill.prerequisites.length === 0 ? (
              <p className="mt-1.5 text-xs text-[#708078]">
                Root entry discipline — no prior prerequisites.
              </p>
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
                      className="flex items-center justify-between rounded-lg border border-white/8 bg-[#0F1412] px-3 py-2 text-xs text-[#F1F5F3] hover:border-[#FF3366]/50 cursor-pointer"
                    >
                      <span className="truncate">{pre.title}</span>
                      <span className="text-[#FF3366] font-mono-data">Focus</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Downstream Unlocks */}
          <div>
            <h3 className="text-xs font-semibold text-[#A7B5AE]">
              Enables Next ({selectedSkill.unlocks.length})
            </h3>
            {selectedSkill.unlocks.length === 0 ? (
              <p className="mt-1.5 text-xs text-[#708078]">
                Terminal mastery specialization.
              </p>
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
                      className="flex items-center justify-between rounded-lg border border-white/8 bg-[#0F1412] px-3 py-2 text-xs text-[#F1F5F3] hover:border-[#10B981]/50 cursor-pointer"
                    >
                      <span className="truncate">{un.title}</span>
                      <span className="text-[#10B981] font-mono-data">Focus</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenSkill(selectedSkill.id)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF3366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E11D48] cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Open Skill Roadmap
            <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </div>
    </div>
  );
};
