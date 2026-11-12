import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  CheckSquare,
  Square,
  BookOpen,
  FileText,
  FolderGit2,
  Award,
  Bookmark,
  Trash2,
  Share2,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ALL_SKILLS, DOMAIN_MAP, SKILL_MAP, getSkillCompletion } from '../data';
import { SkillNode, UserProgressState } from '../types/curriculum';
import { DetailedSkillFlowchart } from './DetailedSkillFlowchart';
import { AdaptiveFlashcards } from './AdaptiveFlashcards';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';
import { CareerOutlookSection } from './CareerOutlookSection';
import { SkillShareModal } from './SkillShareModal';
import { SkillMentorChat } from './SkillMentorChat';
import { ScrollStage } from './GalleryChoreography';
import { MorphingCopyButton, MotionSegmentedControl } from './ui/WatermelonUI';

interface SkillDetailPageProps {
  skill: SkillNode;
  skills?: SkillNode[];
  skillMap?: Record<string, SkillNode>;
  progress: UserProgressState;
  onBack: () => void;
  onSelectSkill: (skillId: string) => void;
  onToggleTopic: (topicId: string) => void;
  onToggleModuleTopics: (topicIds: string[], markComplete: boolean) => void;
  onToggleCardMastered: (cardId: string) => void;
  onToggleBookmark: (itemKey: string) => void;
  onDeleteCustomSkill?: (skillId: string) => void;
  currentStreak?: number;
}

export const SkillDetailPage: React.FC<SkillDetailPageProps> = ({
  skill,
  skills = ALL_SKILLS,
  skillMap = SKILL_MAP,
  progress,
  onBack,
  onSelectSkill,
  onToggleTopic,
  onToggleModuleTopics,
  onToggleCardMastered,
  onToggleBookmark,
  onDeleteCustomSkill,
  currentStreak = 0,
}) => {
  const [resumeTab, setResumeTab] = useState<'papers' | 'projects' | 'certs'>('papers');
  const [copiedBullet, setCopiedBullet] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [mentorTopicId, setMentorTopicId] = useState<string | null>(null);

  const openMentorForTopic = (topicId: string | null) => {
    setMentorTopicId(topicId);
    setMentorOpen(true);
  };

  const dom = DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data'];
  const comp = getSkillCompletion(skill, progress.completedTopicIds, progress.demoPolymathMode);
  const masteredCards = skill.flashcards.filter(
    (card) => progress.demoPolymathMode || Boolean(progress.masteredCardIds[card.id])
  ).length;

  const handleJumpToModule = (moduleId: string) => {
    const el = document.getElementById(`day-module-${moduleId}`);
    if (el) {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const handleCopyBullet = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedBullet(text);
    setTimeout(() => setCopiedBullet(null), 1600);
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb + Quick Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-[#F4F1EA] transition-colors self-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Skill Atlas
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => openMentorForTopic(null)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#2563EB]/60 bg-[#2563EB]/18 px-3.5 py-2 text-xs font-semibold text-[#93C5FD] hover:bg-[#2563EB]/30 hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#60A5FA]" />
            <span>Ask Mentor</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#10B981]/50 bg-[#10B981]/15 px-3.5 py-2 text-xs font-semibold text-[#34D399] hover:bg-[#10B981]/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Card</span>
          </motion.button>
          {skill.isCustom && onDeleteCustomSkill && (
            <button
              type="button"
              onClick={() => onDeleteCustomSkill(skill.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/45 bg-rose-950/35 px-3 py-2 text-xs font-medium text-rose-200 hover:border-rose-400 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove Custom Skill</span>
            </button>
          )}
          <label htmlFor="quick-skill-switch" className="text-xs text-slate-400 font-mono-data">
            Jump Skill:
          </label>
          <select
            id="quick-skill-switch"
            value={skill.id}
            onChange={(e) => onSelectSkill(e.target.value)}
            className="rounded-xl border border-slate-500 bg-[#0E111B] px-3 py-2 text-base sm:text-xs font-medium text-[#F4F1EA] focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] max-w-[260px]"
          >
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header + Skill Learned Meter */}
      <ScrollStage>
        <section className="relative overflow-hidden rounded-2xl border border-[rgba(244,241,234,0.12)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.08)] p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-35"
            style={{
              background:
                comp.percentage === 100
                  ? 'radial-gradient(circle, rgba(16,185,129,0.55), transparent 70%)'
                  : 'radial-gradient(circle, rgba(37,99,235,0.55), transparent 70%)',
            }}
          />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-slate-300">
                <span style={{ color: dom.accentHex }}>{dom.name}</span>
                <span aria-hidden="true">·</span>
                <span>Tier {skill.tier}</span>
                <span aria-hidden="true">·</span>
                <span>{skill.estimatedDays}-Day Track</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#F4F1EA]">
                {skill.title}
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {skill.summary}
              </p>
            </div>

            {/* Skill Learned Meter + Mastery Crest */}
            <div
              className={`w-full lg:w-96 shrink-0 rounded-xl border p-4 flex items-center gap-4 transition-colors ${
                comp.percentage === 100
                  ? 'border-[#10B981]/50 bg-[#091A16]'
                  : 'border-[rgba(244,241,234,0.1)] bg-[#0B0D14]'
              }`}
            >
              <SkillMasteryBadge
                domain={skill.domain}
                tier={skill.tier}
                unlocked={comp.percentage === 100}
                size="lg"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-data">
                  <span className="text-slate-300">
                    {comp.percentage === 100 ? getBadgeRankLabel(skill.tier) : 'Skill Learned Meter'}
                  </span>
                  <span className={comp.percentage === 100 ? 'text-[#34D399] font-bold tabular-nums' : 'text-[#F4F1EA] font-bold tabular-nums'}>
                    {comp.completed}/{comp.total} · {comp.percentage}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#06070A] border border-[rgba(244,241,234,0.1)]">
                  <div
                    className="h-full rounded-full transition-[width] duration-300"
                    style={{
                      width: `${comp.percentage}%`,
                      background:
                        comp.percentage === 100
                          ? '#10B981'
                          : `linear-gradient(90deg, #2563EB 0%, #F4F1EA 100%)`,
                    }}
                  />
                </div>
                <div className="text-[11px] text-slate-400">
                  {comp.percentage === 100
                    ? 'Seal Unlocked — ready for capstone projects & interviews.'
                    : `Complete 100% of topics to unlock ${getBadgeRankLabel(skill.tier)}.`}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollStage>

      {/* Detailed Connected Skill Tree */}
      <ScrollStage delay={0.04}>
        <DetailedSkillFlowchart
          skill={skill}
          skillMap={skillMap}
          progress={progress}
          onSelectSkill={onSelectSkill}
          onJumpToDayModule={handleJumpToModule}
        />
      </ScrollStage>

      {/* Day-by-Day Topic Checklist + Topic-Wise Resources */}
      <ScrollStage delay={0.06}>
        <section className="space-y-5">
          <div>
            <div className="font-mono-data text-xs text-[#60A5FA] mb-1">
              02 · Curriculum Modules
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
              Day-by-Day Roadmap &amp; Topic Resources
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Complete topics sequentially by day. Curated learning resources are attached directly to every topic.
            </p>
          </div>

          <div className="space-y-4">
            {skill.dayModules.map((mod) => {
              const topicIds = mod.topics.map((t) => t.id);
              const allDone =
                progress.demoPolymathMode ||
                (topicIds.length > 0 && topicIds.every((id) => Boolean(progress.completedTopicIds[id])));

              return (
                <div
                  key={mod.id}
                  id={`day-module-${mod.id}`}
                  className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[rgba(244,241,234,0.08)] pb-4">
                    <div>
                      <div className="font-mono-data text-xs font-semibold text-[#60A5FA]">
                        {mod.dayRange}
                      </div>
                      <h3 className="mt-0.5 font-display text-2xl font-semibold text-[#F4F1EA]">
                        {mod.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-300">{mod.objective}</p>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={progress.demoPolymathMode ? undefined : { scale: 0.96 }}
                      onClick={() => onToggleModuleTopics(topicIds, !allDone)}
                      disabled={progress.demoPolymathMode}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                        allDone
                          ? 'border-[#10B981]/50 bg-[#10B981]/15 text-[#34D399]'
                          : 'border-slate-500/70 bg-[#0B0D14] text-slate-200 hover:text-[#F4F1EA] hover:border-[#60A5FA]'
                      }`}
                    >
                      {allDone ? 'Day Complete' : 'Mark Day Complete'}
                    </motion.button>
                  </div>

                  {/* Topic Checklist Rows */}
                  <div className="space-y-3">
                    {mod.topics.map((topic) => {
                      const checked =
                        progress.demoPolymathMode || Boolean(progress.completedTopicIds[topic.id]);

                      return (
                        <div
                          key={topic.id}
                          className={`rounded-xl border p-4 transition-colors ${
                            checked
                              ? 'border-[#10B981]/40 bg-[#091A16]'
                              : 'border-[rgba(244,241,234,0.08)] bg-[#0B0D14]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => onToggleTopic(topic.id)}
                              disabled={progress.demoPolymathMode}
                              aria-label={`Toggle ${topic.title}`}
                              className="mt-0.5 shrink-0 text-slate-400 hover:text-[#F4F1EA] cursor-pointer disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                            >
                              {checked ? (
                                <CheckSquare className="h-5 w-5 text-[#10B981]" />
                              ) : (
                                <Square className="h-5 w-5 text-slate-400" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1 space-y-2.5">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0 flex-1">
                                  <button
                                    type="button"
                                    onClick={() => onToggleTopic(topic.id)}
                                    disabled={progress.demoPolymathMode}
                                    className={`text-left text-sm sm:text-base font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                                      checked ? 'text-[#34D399]' : 'text-[#F4F1EA]'
                                    }`}
                                  >
                                    {topic.title}
                                  </button>
                                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                                    {topic.summary}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => openMentorForTopic(topic.id)}
                                  className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-500/70 bg-[#0E111B] px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:border-[#60A5FA] hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                                >
                                  <MessageSquare className="h-3 w-3 text-[#60A5FA]" />
                                  <span>Ask Mentor</span>
                                </button>
                              </div>

                              {/* Topic-Wise Resources */}
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {topic.resources.map((res, rIdx) => (
                                  <a
                                    key={rIdx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="open"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(244,241,234,0.1)] bg-[#0E111B] px-3 py-1.5 text-xs text-slate-200 hover:border-[#60A5FA]/70 hover:text-[#F4F1EA] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                                  >
                                    <BookOpen className="h-3.5 w-3.5 text-[#60A5FA] shrink-0" />
                                    <span className="font-medium">{res.title}</span>
                                    <span className="text-slate-400 font-mono-data">
                                      · {res.provider} ({res.kind})
                                    </span>
                                    <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollStage>

      {/* Resume-Ready Section: Papers, Required/Scalable Projects, Free Certifications */}
      <ScrollStage delay={0.08}>
        <section className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-[rgba(244,241,234,0.08)] pb-5">
            <div>
              <div className="text-xs font-mono-data text-[#34D399]">
                03 · Portfolio &amp; Proof Credentials
              </div>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
                Resume-Ready Section — {skill.title}
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Peer-reviewed research papers, required + scalable projects with resume bullets, and free recognized certifications.
              </p>
            </div>

            <MotionSegmentedControl
              layoutId="wm-detail-resume-tab"
              value={resumeTab}
              onChange={setResumeTab}
              options={[
                {
                  id: 'papers',
                  label: 'Research Papers',
                  count: skill.papers.length,
                  icon: <FileText className="h-3.5 w-3.5 text-[#60A5FA]" />,
                },
                {
                  id: 'projects',
                  label: 'Projects',
                  count: skill.projects.required.length + skill.projects.scalable.length,
                  icon: <FolderGit2 className="h-3.5 w-3.5 text-[#10B981]" />,
                },
                {
                  id: 'certs',
                  label: 'Free Certifications',
                  count: skill.certifications.length,
                  icon: <Award className="h-3.5 w-3.5 text-[#F59E0B]" />,
                },
              ]}
            />
          </div>

          {/* Tab 1: Research Papers */}
          {resumeTab === 'papers' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skill.papers.map((paper, idx) => {
                const bKey = `paper:${skill.id}:${idx}`;
                const bookmarked = Boolean(progress.bookmarkedItems[bKey]);
                return (
                  <article
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] p-5 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono-data text-slate-400">
                        <span>{paper.venue} · {paper.year}</span>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(bKey)}
                          aria-label={`Bookmark paper ${paper.title}`}
                          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${bookmarked ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-[#F4F1EA]">
                        {paper.title}
                      </h3>
                      <div className="text-xs text-slate-300">{paper.authors}</div>
                      <p className="text-xs leading-relaxed text-slate-300 pt-1">
                        <span className="font-semibold text-[#34D399]">Key Takeaway: </span>
                        {paper.takeaway}
                      </p>
                    </div>

                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA] hover:text-[#93C5FD] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                    >
                      Read Paper / Source
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </article>
                );
              })}
            </div>
          )}

          {/* Tab 2: Required + Scalable Projects */}
          {resumeTab === 'projects' && (
            <div className="space-y-6">
              {/* Required Projects */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#F4F1EA]">
                  Required Baseline Projects (Prove Core Competence)
                </h3>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {skill.projects.required.map((proj, idx) => {
                    const bKey = `proj-req:${skill.id}:${idx}`;
                    const bookmarked = Boolean(progress.bookmarkedItems[bKey]);
                    return (
                      <article
                        key={idx}
                        className="rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] p-5 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-mono-data text-[11px] text-[#60A5FA]">
                              Required · {proj.stack}
                            </div>
                            <h4 className="mt-1 font-display text-xl font-semibold text-[#F4F1EA]">
                              {proj.title}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(bKey)}
                            aria-label={`Bookmark project ${proj.title}`}
                            className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${bookmarked ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                          >
                            <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{proj.scope}</p>
                        <div className="rounded-lg bg-[#0E111B] border border-[rgba(244,241,234,0.08)] p-3 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                            <span>Resume Impact Bullet</span>
                            <MorphingCopyButton
                              copied={copiedBullet === proj.resumeBullet}
                              onClick={() => handleCopyBullet(proj.resumeBullet)}
                            />
                          </div>
                          <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">
                            • {proj.resumeBullet}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Meaningful & Scalable Capstones */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#34D399]">
                  Meaningful &amp; Scalable Capstone Projects (Stand-Out Portfolio)
                </h3>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {skill.projects.scalable.map((proj, idx) => {
                    const bKey = `proj-scale:${skill.id}:${idx}`;
                    const bookmarked = Boolean(progress.bookmarkedItems[bKey]);
                    return (
                      <article
                        key={idx}
                        className="rounded-xl border border-[#10B981]/35 bg-[#091A16] p-5 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-mono-data text-[11px] text-[#34D399]">
                              Scalable Capstone · {proj.stack}
                            </div>
                            <h4 className="mt-1 font-display text-xl font-semibold text-[#F4F1EA]">
                              {proj.title}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(bKey)}
                            aria-label={`Bookmark scalable project ${proj.title}`}
                            className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${bookmarked ? 'text-[#10B981]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                          >
                            <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{proj.scope}</p>
                        <div className="rounded-lg bg-[#0E111B] border border-[rgba(244,241,234,0.08)] p-3 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                            <span>Resume Impact Bullet</span>
                            <MorphingCopyButton
                              copied={copiedBullet === proj.resumeBullet}
                              onClick={() => handleCopyBullet(proj.resumeBullet)}
                            />
                          </div>
                          <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">
                            • {proj.resumeBullet}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Popular Free Certifications */}
          {resumeTab === 'certs' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {skill.certifications.map((cert, idx) => {
                const bKey = `cert:${skill.id}:${idx}`;
                const bookmarked = Boolean(progress.bookmarkedItems[bKey]);
                return (
                  <article
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] p-5 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                        <span className="text-[#34D399]">{cert.costNote}</span>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(bKey)}
                          aria-label={`Bookmark certification ${cert.name}`}
                          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${bookmarked ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-[#F4F1EA]">
                        {cert.name}
                      </h3>
                      <div className="text-xs text-[#93C5FD] font-medium">{cert.issuer}</div>
                      <p className="text-xs leading-relaxed text-slate-300">{cert.focus}</p>
                    </div>

                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F1EA] hover:text-[#34D399] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                    >
                      Go to Certification Platform
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </ScrollStage>

      {/* Real-Time Google Search Career Outlook */}
      <ScrollStage delay={0.1}>
        <CareerOutlookSection
          skillId={skill.id}
          skillTitle={skill.title}
          domainName={dom.name}
        />
      </ScrollStage>

      {/* Bottom Adaptive Flashcards Section */}
      <ScrollStage delay={0.12}>
        <AdaptiveFlashcards
          skill={skill}
          progress={progress}
          onToggleCardMastered={onToggleCardMastered}
        />
      </ScrollStage>

      <SkillShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        skill={skill}
        metrics={{
          completedTopics: comp.completed,
          totalTopics: comp.total,
          percentage: comp.percentage,
          masteredCards,
          totalCards: skill.flashcards.length,
          currentStreak,
        }}
      />

      <SkillMentorChat
        skill={skill}
        domainName={dom.name}
        completedTopics={comp.completed}
        totalTopics={comp.total}
        isOpen={mentorOpen}
        onOpenChange={setMentorOpen}
        focusedTopicId={mentorTopicId}
        onSelectTopicId={setMentorTopicId}
      />
    </div>
  );
};
