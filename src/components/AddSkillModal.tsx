import React, { useState } from 'react';
import { Sparkles, X, Loader2, AlertCircle, GitBranch, BookOpen, Award, Layers } from 'lucide-react';
import { SkillNode } from '../types/curriculum';

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = skillName.trim();
    if (trimmed.length < 2) {
      setErrorMsg('Please enter a skill discipline name.');
      return;
    }

    setErrorMsg(null);
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
      setErrorMsg(
        err instanceof Error ? err.message : 'Unable to create skill right now.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-skill-title"
    >
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#141B17] p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-data text-[#FF3366]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Auto-Architect New Discipline</span>
            </div>
            <h2
              id="add-skill-title"
              className="mt-1 font-display text-2xl font-bold text-[#F1F5F3]"
            >
              Add Any Skill to Polymath Atlas
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg border border-white/10 p-2 text-[#A7B5AE] hover:text-white cursor-pointer disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-[#A7B5AE]">
          Just type the skill name. Gemini searches real web resources, categorizes its domain and tier, wires prerequisite and unlock links into your Skill Tree & Knowledge Map, and generates its full roadmap.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="new-skill-name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#A7B5AE]"
            >
              Skill Name
            </label>
            <input
              id="new-skill-name"
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              disabled={loading}
              placeholder="e.g. Quantum Computing, Rust Systems, Bioinformatics..."
              className="w-full rounded-xl border border-white/15 bg-[#090D0B] px-4 py-3 text-sm text-[#F1F5F3] placeholder-[#708078] focus:border-[#FF3366] focus:outline-none"
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
                className="rounded-lg border border-white/10 bg-[#0F1412] px-2.5 py-1 text-[11px] text-[#A7B5AE] hover:border-[#10B981]/50 hover:text-white cursor-pointer"
              >
                + {idea}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="new-skill-focus"
              className="block text-xs font-semibold uppercase tracking-wider text-[#A7B5AE]"
            >
              Optional Emphasis / Career Angle
            </label>
            <input
              id="new-skill-focus"
              type="text"
              value={optionalFocus}
              onChange={(e) => setOptionalFocus(e.target.value)}
              disabled={loading}
              placeholder="e.g. Low-latency trading infrastructure or research focus"
              className="w-full rounded-xl border border-white/12 bg-[#090D0B] px-4 py-2.5 text-xs text-[#F1F5F3] placeholder-[#708078] focus:border-[#10B981] focus:outline-none"
            />
          </div>

          {/* Auto-generated features summary */}
          <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-white/8 bg-[#0F1412] p-3.5 text-xs text-[#A7B5AE]">
            <div className="flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5 text-[#FF3366] shrink-0" />
              <span>Auto-connected Skill Tree links</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
              <span>Day modules + live web resources</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
              <span>Papers, projects & free certs</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
              <span>8 topic-mapped flashcards</span>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2 rounded-xl border border-[#FF3366]/50 bg-[#FF3366]/10 p-3 text-xs text-[#FECDD3]">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#FF3366] mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-white/12 bg-[#0F1412] px-4 py-2.5 text-xs font-semibold text-[#A7B5AE] hover:text-white cursor-pointer disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF3366] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#E11D48] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching Web & Building Skill...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate & Connect Skill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
