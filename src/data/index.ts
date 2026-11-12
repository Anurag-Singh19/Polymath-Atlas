import { SkillNode, DomainId } from '../types/curriculum';
import { DOMAINS, DOMAIN_MAP } from './domains';
import { SKILLS_AI_ML } from './skillsAiMl';
import { SKILLS_SWE_DATA_A } from './skillsSweDataA';
import { SKILLS_SWE_DATA_B } from './skillsSweDataB';
import { SKILLS_CLOUD_SEC } from './skillsCloudSec';
import { SKILLS_QUANT_FINANCE } from './skillsQuantFinance';
import { SKILLS_CREATIVE_3D } from './skillsCreative3d';
import { SKILLS_BUSINESS_POLYMATH } from './skillsBusinessPolymath';

export { DOMAINS, DOMAIN_MAP };

export const ALL_SKILLS: SkillNode[] = [
  ...SKILLS_AI_ML,
  ...SKILLS_SWE_DATA_A,
  ...SKILLS_SWE_DATA_B,
  ...SKILLS_CLOUD_SEC,
  ...SKILLS_QUANT_FINANCE,
  ...SKILLS_CREATIVE_3D,
  ...SKILLS_BUSINESS_POLYMATH,
];

export const SKILL_MAP: Record<string, SkillNode> = Object.fromEntries(
  ALL_SKILLS.map((skill) => [skill.id, skill])
);

/**
 * Merges built-in skills with user-generated custom skills and ensures
 * prerequisite <-> unlock links are bidirectionally wired for flowcharts and D3 maps.
 */
export function mergeSkills(customSkills: SkillNode[] = []): {
  skills: SkillNode[];
  skillMap: Record<string, SkillNode>;
} {
  if (!customSkills || customSkills.length === 0) {
    return { skills: ALL_SKILLS, skillMap: SKILL_MAP };
  }

  const map: Record<string, SkillNode> = {};
  const list: SkillNode[] = [];

  for (const s of ALL_SKILLS) {
    const copy: SkillNode = {
      ...s,
      prerequisites: [...s.prerequisites],
      unlocks: [...s.unlocks],
    };
    map[copy.id] = copy;
    list.push(copy);
  }

  for (const cs of customSkills) {
    if (!cs || !cs.id || map[cs.id]) continue;
    const copy: SkillNode = {
      ...cs,
      isCustom: true,
      prerequisites: [...(cs.prerequisites || [])],
      unlocks: [...(cs.unlocks || [])],
    };
    map[copy.id] = copy;
    list.push(copy);
  }

  // Ensure bidirectional links for custom skills
  for (const cs of customSkills) {
    const node = map[cs.id];
    if (!node) continue;
    for (const preId of node.prerequisites) {
      const pre = map[preId];
      if (pre && !pre.unlocks.includes(node.id)) {
        pre.unlocks.push(node.id);
      }
    }
    for (const unId of node.unlocks) {
      const un = map[unId];
      if (un && !un.prerequisites.includes(node.id)) {
        un.prerequisites.push(node.id);
      }
    }
  }

  return { skills: list, skillMap: map };
}

export function getSkillTopicIds(skill: SkillNode): string[] {
  return skill.dayModules.flatMap((mod) => mod.topics.map((t) => t.id));
}

export function getSkillCompletion(
  skill: SkillNode,
  completedTopicIds: Record<string, boolean>,
  demoPolymathMode = false
): { completed: number; total: number; percentage: number } {
  const topicIds = getSkillTopicIds(skill);
  const total = topicIds.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0 };
  if (demoPolymathMode) return { completed: total, total, percentage: 100 };
  const completed = topicIds.filter((id) => Boolean(completedTopicIds[id])).length;
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
}

export function getGlobalCompletion(
  completedTopicIds: Record<string, boolean>,
  demoPolymathMode = false,
  skillsList: SkillNode[] = ALL_SKILLS
): {
  completed: number;
  total: number;
  percentage: number;
  isPolymath: boolean;
  domainStats: Record<DomainId, { completed: number; total: number; percentage: number; skillCount: number }>;
} {
  let total = 0;
  let completed = 0;

  const domainStats = {} as Record<
    DomainId,
    { completed: number; total: number; percentage: number; skillCount: number }
  >;

  for (const d of DOMAINS) {
    domainStats[d.id] = { completed: 0, total: 0, percentage: 0, skillCount: 0 };
  }

  for (const skill of skillsList) {
    const topicIds = getSkillTopicIds(skill);
    const skillTotal = topicIds.length;
    const skillDone = demoPolymathMode
      ? skillTotal
      : topicIds.filter((id) => Boolean(completedTopicIds[id])).length;

    total += skillTotal;
    completed += skillDone;
    domainStats[skill.domain].total += skillTotal;
    domainStats[skill.domain].completed += skillDone;
    domainStats[skill.domain].skillCount += 1;
  }

  for (const d of DOMAINS) {
    const ds = domainStats[d.id];
    ds.percentage = ds.total > 0 ? Math.round((ds.completed / ds.total) * 100) : 0;
  }

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isPolymath = total > 0 && completed === total;

  return {
    completed,
    total,
    percentage,
    isPolymath,
    domainStats,
  };
}
