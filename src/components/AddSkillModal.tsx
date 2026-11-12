import React, { useState } from 'react';
import { Sparkles, X, Loader2, AlertCircle, GitBranch, BookOpen, Award, Layers } from 'lucide-react';
import { SkillNode } from '../types/curriculum';
import { MotionModalFrame } from './ui/WatermelonUI';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingSkills: SkillNode[];
  onSkillCreated: (skill: SkillNode) => void;
}

const SUGGESTED_SKILLS = [
  'Quantum Computing',
  'Rust Systems Programming',
  'Bioinformatics & Genomics',
  'Embedded Firmware & RTOS',
  'Options Market Making',
  'Shader Programming (GLSL)',
];

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  onClose,
  existingSkills,
  onSkillCreated,
}) => {
  const [skillName, setSkillName] = useState('');
  const [optionalFocus, setOptionalFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const buildOfflineSkillNode = (name: string, focus: string): SkillNode => {
    const slug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 32) || `custom-${Date.now()}`;
    const existingIds = new Set(existingSkills.map((s) => s.id));
    const id = existingIds.has(slug) ? `${slug}-${Date.now().toString().slice(-4)}` : slug;
    const query = encodeURIComponent(name);

    return {
      id,
      title: name,
      aliases: [name],
      domain: 'swe-data',
      summary: focus
        ? `${name} roadmap created in Offline Mode focusing on ${focus}. Complete topics, build portfolio artifacts, and drill flashcards locally.`
        : `${name} roadmap created in Offline Mode. Track day-by-day milestones, projects, and active recall locally.`,
      estimatedDays: 12,
      tier: 2,
      prerequisites: existingSkills[0] ? [existingSkills[0].id] : [],
      unlocks: [],
      cardHeightHint: 'medium',
      isCustom: true,
      dayModules: [
        {
          id: `${id}-d1`,
          dayRange: 'Days 1–4',
          title: `${name} Core Foundations`,
          objective: `Understand mental models, terminology, and baseline tooling in ${name}.`,
          topics: [
            {
              id: `${id}-t1-1`,
              title: `${name} Fundamentals & Setup`,
              summary: `Establish core environment, vocabulary, and key first principles of ${name}.`,
              resources: [
                {
                  title: `${name} Reference Search`,
                  provider: 'Open Web (Requires Connection)',
                  url: `https://www.google.com/search?q=${query}+documentation`,
                  kind: 'Docs',
                },
              ],
            },
            {
              id: `${id}-t1-2`,
              title: `Core Mechanics & Workflows`,
              summary: `Practice standard workflows and problem-solving patterns used across ${name}.`,
              resources: [
                {
                  title: `${name} Practice Guide`,
                  provider: 'Open Courseware',
                  url: `https://www.google.com/search?q=${query}+tutorial+course`,
                  kind: 'Guide',
                },
              ],
            },
          ],
        },
        {
          id: `${id}-d2`,
          dayRange: 'Days 5–8',
          title: `Applied ${name} Systems`,
          objective: `Build real-world implementations and analyze trade-offs in ${name}.`,
          topics: [
            {
              id: `${id}-t2-1`,
              title: `Applied Architecture & Testing`,
              summary: `Verify correctness, benchmark bottlenecks, and refine reliability in ${name}.`,
              resources: [
                {
                  title: `${name} Engineering Labs`,
                  provider: 'Open Labs',
                  url: `https://www.google.com/search?q=${query}+github+project`,
                  kind: 'Lab',
                },
              ],
            },
            {
              id: `${id}-t2-2`,
              title: `Scaling & Production Patterns`,
              summary: `Deploy, monitor, and scale ${name} deliverables for portfolio readiness.`,
              resources: [
                {
                  title: `${name} Best Practices`,
                  provider: 'Community Docs',
                  url: `https://www.google.com/search?q=${query}+best+practices`,
                  kind: 'Guide',
                },
              ],
            },
          ],
        },
      ],
      papers: [
        {
          title: `Foundational Research in ${name}`,
          authors: 'arXiv Open Archive',
          year: 2024,
          venue: 'arXiv',
          url: `https://arxiv.org/search/?query=${query}&searchtype=all`,
          takeaway: `Explore seminal peer-reviewed literature and benchmarks in ${name}.`,
        },
      ],
      projects: {
        required: [
          {
            title: `${name} Baseline Prototype`,
            tier: 'Required',
            scope: `Build an end-to-end starter project demonstrating core ${name} competence.`,
            stack: name,
            resumeBullet: `Engineered a working ${name} baseline system with reproducible tests and documentation.`,
          },
        ],
        scalable: [
          {
            title: `Production ${name} Capstone`,
            tier: 'Scalable Capstone',
            scope: `Architect a scalable, benchmarked ${name} platform ready for technical interviews.`,
            stack: name,
            resumeBullet: `Architected a scalable ${name} capstone solution with measurable throughput and reliability improvements.`,
          },
        ],
      },
      certifications: [
        {
          name: `${name} Open Certification Track`,
          issuer: 'Coursera / edX / Official Docs',
          url: `https://www.google.com/search?q=${query}+free+certification`,
          costNote: 'Free to audit',
          focus: `Core verified competencies in ${name}`,
        },
      ],
      flashcards: [
        {
          id: `${id}-fc-1`,
          topicId: `${id}-t1-1`,
          topicTitle: `${name} Fundamentals & Setup`,
          question: `What are the primary first-principles abstractions behind ${name}?`,
          answer: `Core mental models, interfaces, and constraints that govern reliable ${name} design.`,
          difficulty: 'Core',
        },
        {
          id: `${id}-fc-2`,
          topicId: `${id}-t2-1`,
          topicTitle: `Applied Architecture & Testing`,
          question: `How do you validate performance and edge-case correctness in ${name}?`,
          answer: `Use automated verification, reproducible benchmarks, and failure-mode testing across realistic workloads.`,
          difficulty: 'Applied',
        },
      ],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = skillName.trim();
    if (trimmed.length < 2) {
      setErrorMsg('Please enter a skill discipline name.');
      return;
    }

    setErrorMsg(null);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const offlineSkill = buildOfflineSkillNode(trimmed, optionalFocus.trim());
      onSkillCreated(offlineSkill);
      setSkillName('');
      setOptionalFocus('');
      onClose();
      return;
    }

    setLoading(true);

    try {
      const existingCatalog = existingSkills.map((s) => ({
        id: s.id,
        title: s.title,
        domain: s.domain,
        tier: s.tier,
      }));

      const res = await fetch('/api/skills/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName: trimmed,
          optionalFocus: optionalFocus.trim(),
          existingCatalog,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to generate skill roadmap.');
      }

      onSkillCreated(data as SkillNode);
      setSkillName('');
      setOptionalFocus('');
      onClose();
    } catch (err) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        const offlineSkill = buildOfflineSkillNode(trimmed, optionalFocus.trim());
        onSkillCreated(offlineSkill);
        setSkillName('');
        setOptionalFocus('');
        onClose();
      } else {
        setErrorMsg(
          err instanceof Error ? err.message : 'Unable to create skill right now.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionModalFrame
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="add-skill-title"
      maxWidthClass="max-w-xl"
      closeDisabled={loading}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(244,241,234,0.1)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-data text-[#60A5FA]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Auto-Architect New Discipline</span>
            </div>
            <h2
              id="add-skill-title"
              className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]"
            >
              Add Any Skill to Polymath Atlas
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg border border-slate-500/70 bg-[#0B0D14] p-2 text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] cursor-pointer disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-slate-300">
          Just type the skill name. Gemini searches real web resources, categorizes its domain and tier, wires prerequisite and unlock links into your Skill Tree &amp; Knowledge Map, and generates its full roadmap.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="new-skill-name"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Skill Name
            </label>
            <input
              id="new-skill-name"
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              disabled={loading}
              placeholder="e.g. Quantum Computing, Rust Systems, Bioinformatics…"
              className="w-full rounded-xl border border-slate-500 bg-[#06070A] px-4 py-3 text-base sm:text-sm text-[#F4F1EA] placeholder-slate-400 focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              autoFocus
            />
          </div>

          {/* Quick Ideas */}
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SKILLS.map((idea) => (
              <button
                key={idea}
                type="button"
                disabled={loading}
                onClick={() => setSkillName(idea)}
                className="rounded-lg border border-[rgba(244,241,234,0.12)] bg-[#0B0D14] px-2.5 py-1 text-[11px] text-slate-300 hover:border-[#60A5FA] hover:text-[#F4F1EA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
              >
                + {idea}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="new-skill-focus"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Optional Emphasis / Career Angle
            </label>
            <input
              id="new-skill-focus"
              type="text"
              value={optionalFocus}
              onChange={(e) => setOptionalFocus(e.target.value)}
              disabled={loading}
              placeholder="e.g. Low-latency trading infrastructure or research focus…"
              className="w-full rounded-xl border border-slate-500 bg-[#06070A] px-4 py-2.5 text-base sm:text-xs text-[#F4F1EA] placeholder-slate-400 focus:border-[#10B981] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#34D399]"
            />
          </div>

          {/* Auto-generated features summary */}
          <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] p-3.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5 text-[#60A5FA] shrink-0" />
              <span>Auto-connected Skill Tree links</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
              <span>Day modules + live web resources</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
              <span>Papers, projects &amp; free certs</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-[#A78BFA] shrink-0" />
              <span>8 topic-mapped flashcards</span>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-500/45 bg-rose-950/35 p-3 text-xs text-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-500/70 bg-[#0B0D14] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] cursor-pointer disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3B82F6] disabled:opacity-60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching Web &amp; Building Skill…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate &amp; Connect Skill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </MotionModalFrame>
  );
};
