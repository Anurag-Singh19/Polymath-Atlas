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
  Copy,
  Check,
  Trash2,
} from 'lucide-react';
import { ALL_SKILLS, DOMAIN_MAP, SKILL_MAP, getSkillCompletion } from '../data';
import { SkillNode, UserProgressState } from '../types/curriculum';
import { DetailedSkillFlowchart } from './DetailedSkillFlowchart';
import { AdaptiveFlashcards } from './AdaptiveFlashcards';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';
import { CareerOutlookSection } from './CareerOutlookSection';

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
}) => {
  const [resumeTab, setResumeTab] = useState<'papers' | 'projects' | 'certs'>('papers');
  const [copiedBullet, setCopiedBullet] = useState<string | null>(null);

  const dom = DOMAIN_MAP[skill.domain];
  const comp = getSkillCompletion(skill, progress.completedTopicIds, progress.demoPolymathMode);

  const handleJumpToModule = (moduleId: string) => {
    const el = document.getElementById(`day-module-${moduleId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          className="inline-flex items-center gap-2 text-sm font-medium text-[#A7B5AE] hover:text-white transition-colors self-start cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Skill Atlas
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {skill.isCustom && onDeleteCustomSkill && (
            <button
              type="button"
              onClick={() => onDeleteCustomSkill(skill.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#FF3366]/35 bg-[#1F151A] px-3 py-2 text-xs font-medium text-[#FF85A6] hover:border-[#FF3366] cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove Custom Skill</span>
            </button>
          )}
          <label htmlFor="quick-skill-switch" className="text-xs text-[#708078] font-mono-data">
            Jump Skill:
          </label>
          <select
            id="quick-skill-switch"
            value={skill.id}
            onChange={(e) => onSelectSkill(e.target.value)}
            className="rounded-xl border border-white/12 bg-[#141B17] px-3 py-2 text-xs font-medium text-[#F1F5F3] focus:border-[#FF3366] focus:outline-none max-w-[260px]"
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
      <section className="rounded-2xl border border-white/10 bg-[#141B17] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-[#A7B5AE]">
              <span style={{ color: dom.accentHex }}>{dom.name}</span>
              <span aria-hidden="true">·</span>
              <span>Tier {skill.tier}</span>
              <span aria-hidden="true">·</span>
              <span>{skill.estimatedDays}-Day Track</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F3]">
              {skill.title}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#A7B5AE]">
              {skill.summary}
            </p>
          </div>

          {/* Skill Learned Meter + Mastery Crest */}
          <div
            className={`w-full lg:w-96 shrink-0 rounded-xl border p-4 flex items-center gap-4 transition-colors ${
              comp.percentage === 100
                ? 'border-[#10B981]/50 bg-[#0F1B15]'
                : 'border-white/10 bg-[#0F1412]'
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
                <span className="text-[#A7B5AE]">
                  {comp.percentage === 100 ? getBadgeRankLabel(skill.tier) : 'Skill Learned Meter'}
                </span>
                <span className={comp.percentage === 100 ? 'text-[#10B981] font-bold' : 'text-white font-bold'}>
                  {comp.completed}/{comp.total} · {comp.percentage}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#090D0B] border border-white/8">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: `${comp.percentage}%`,
                    background:
                      comp.percentage === 100
                        ? '#10B981'
                        : `linear-gradient(90deg, #FF3366 0%, ${dom.secondaryHex} 100%)`,
                  }}
                />
              </div>
              <div className="text-[11px] text-[#708078]">
                {comp.percentage === 100
                  ? 'Seal Unlocked — ready for capstone projects & interviews.'
                  : `Complete 100% of topics to unlock ${getBadgeRankLabel(skill.tier)}.`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Connected Skill Tree */}
      <DetailedSkillFlowchart
        skill={skill}
        skillMap={skillMap}
        progress={progress}
        onSelectSkill={onSelectSkill}
        onJumpToDayModule={handleJumpToModule}
      />

      {/* Day-by-Day Topic Checklist + Topic-Wise Resources */}
      <section className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F1F5F3]">
            Day-by-Day Roadmap & Topic Resources
          </h2>
          <p className="mt-1 text-sm text-[#A7B5AE]">
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
                className="rounded-2xl border border-white/10 bg-[#141B17] p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/8 pb-4">
                  <div>
                    <div className="font-mono-data text-xs font-semibold text-[#FF3366]">
                      {mod.dayRange}
                    </div>
                    <h3 className="mt-0.5 font-display text-xl font-semibold text-[#F1F5F3]">
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#A7B5AE]">{mod.objective}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleModuleTopics(topicIds, !allDone)}
                    disabled={progress.demoPolymathMode}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer ${
                      allDone
                        ? 'border-[#10B981]/50 bg-[#10B981]/15 text-[#10B981]'
                        : 'border-white/15 bg-[#0F1412] text-[#A7B5AE] hover:text-white'
                    }`}
                  >
                    {allDone ? 'Day Complete' : 'Mark Day Complete'}
                  </button>
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
                            ? 'border-[#10B981]/40 bg-[#102019]'
                            : 'border-white/8 bg-[#0F1412]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => onToggleTopic(topic.id)}
                            disabled={progress.demoPolymathMode}
                            aria-label={`Toggle ${topic.title}`}
                            className="mt-0.5 shrink-0 text-[#A7B5AE] hover:text-white cursor-pointer"
                          >
                            {checked ? (
                              <CheckSquare className="h-5 w-5 text-[#10B981]" />
                            ) : (
                              <Square className="h-5 w-5 text-[#708078]" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1 space-y-2.5">
                            <div>
                              <button
                                type="button"
                                onClick={() => onToggleTopic(topic.id)}
                                disabled={progress.demoPolymathMode}
                                className={`text-left text-sm sm:text-base font-semibold cursor-pointer ${
                                  checked ? 'text-[#10B981]' : 'text-[#F1F5F3]'
                                }`}
                              >
                                {topic.title}
                              </button>
                              <p className="mt-1 text-xs sm:text-sm text-[#A7B5AE]">
                                {topic.summary}
                              </p>
                            </div>

                            {/* Topic-Wise Resources */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {topic.resources.map((res, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#141B17] px-3 py-1.5 text-xs text-[#F1F5F3] hover:border-[#FF3366]/60 hover:text-white transition-colors"
                                >
                                  <BookOpen className="h-3.5 w-3.5 text-[#FF3366] shrink-0" />
                                  <span className="font-medium">{res.title}</span>
                                  <span className="text-[#708078] font-mono-data">
                                    · {res.provider} ({res.kind})
                                  </span>
                                  <ExternalLink className="h-3 w-3 text-[#708078] shrink-0" />
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

      {/* Resume-Ready Section: Papers, Required/Scalable Projects, Free Certifications */}
      <section className="rounded-2xl border border-white/10 bg-[#141B17] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-5">
          <div>
            <div className="text-xs font-mono-data text-[#10B981]">
              Portfolio & Proof Credentials
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold text-[#F1F5F3]">
              Resume-Ready Section — {skill.title}
            </h2>
            <p className="mt-1 text-sm text-[#A7B5AE]">
              Peer-reviewed research papers, required + scalable projects with resume bullets, and free recognized certifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#0F1412] p-1">
            <button
              type="button"
              onClick={() => setResumeTab('papers')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                resumeTab === 'papers'
                  ? 'bg-[#FF3366] text-white'
                  : 'text-[#A7B5AE] hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Research Papers ({skill.papers.length})
            </button>
            <button
              type="button"
              onClick={() => setResumeTab('projects')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                resumeTab === 'projects'
                  ? 'bg-[#FF3366] text-white'
                  : 'text-[#A7B5AE] hover:text-white'
              }`}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              Projects ({skill.projects.required.length + skill.projects.scalable.length})
            </button>
            <button
              type="button"
              onClick={() => setResumeTab('certs')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                resumeTab === 'certs'
                  ? 'bg-[#FF3366] text-white'
                  : 'text-[#A7B5AE] hover:text-white'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              Free Certifications ({skill.certifications.length})
            </button>
          </div>
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
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0F1412] p-5 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-data text-[#708078]">
                      <span>{paper.venue} · {paper.year}</span>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(bKey)}
                        aria-label="Bookmark paper"
                        className={`cursor-pointer ${bookmarked ? 'text-[#FF3366]' : 'text-[#708078] hover:text-white'}`}
                      >
                        <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 className="font-display text-base font-semibold leading-snug text-[#F1F5F3]">
                      {paper.title}
                    </h3>
                    <div className="text-xs text-[#A7B5AE]">{paper.authors}</div>
                    <p className="text-xs leading-relaxed text-[#A7B5AE] pt-1">
                      <span className="font-semibold text-[#10B981]">Key Takeaway: </span>
                      {paper.takeaway}
                    </p>
                  </div>

                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF3366] hover:underline"
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
              <h3 className="text-sm font-semibold text-[#F1F5F3]">
                Required Baseline Projects (Prove Core Competence)
              </h3>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {skill.projects.required.map((proj, idx) => {
                  const bKey = `proj-req:${skill.id}:${idx}`;
                  const bookmarked = Boolean(progress.bookmarkedItems[bKey]);
                  return (
                    <article
                      key={idx}
                      className="rounded-xl border border-white/10 bg-[#0F1412] p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-mono-data text-[11px] text-[#FF3366]">
                            Required · {proj.stack}
                          </div>
                          <h4 className="mt-1 font-display text-lg font-semibold text-[#F1F5F3]">
                            {proj.title}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(bKey)}
                          aria-label="Bookmark project"
                          className={`cursor-pointer ${bookmarked ? 'text-[#FF3366]' : 'text-[#708078] hover:text-white'}`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <p className="text-sm text-[#A7B5AE] leading-relaxed">{proj.scope}</p>
                      <div className="rounded-lg bg-[#141B17] border border-white/8 p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono-data text-[#708078]">
                          <span>Resume Impact Bullet</span>
                          <button
                            type="button"
                            onClick={() => handleCopyBullet(proj.resumeBullet)}
                            className="inline-flex items-center gap-1 text-[#10B981] hover:underline cursor-pointer"
                          >
                            {copiedBullet === proj.resumeBullet ? (
                              <>
                                <Check className="h-3 w-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-[#F1F5F3] leading-relaxed">
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
              <h3 className="text-sm font-semibold text-[#10B981]">
                Meaningful & Scalable Capstone Projects (Stand-Out Portfolio)
              </h3>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {skill.projects.scalable.map((proj, idx) => {
                  const bKey = `proj-scale:${skill.id}:${idx}`;
                  const bookmarked = Boolean(progress.bookmarkedItems[bKey]);
                  return (
                    <article
                      key={idx}
                      className="rounded-xl border border-[#10B981]/35 bg-[#0F1813] p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-mono-data text-[11px] text-[#10B981]">
                            Scalable Capstone · {proj.stack}
                          </div>
                          <h4 className="mt-1 font-display text-lg font-semibold text-[#F1F5F3]">
                            {proj.title}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(bKey)}
                          aria-label="Bookmark scalable project"
                          className={`cursor-pointer ${bookmarked ? 'text-[#10B981]' : 'text-[#708078] hover:text-white'}`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <p className="text-sm text-[#A7B5AE] leading-relaxed">{proj.scope}</p>
                      <div className="rounded-lg bg-[#141B17] border border-white/8 p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono-data text-[#708078]">
                          <span>Resume Impact Bullet</span>
                          <button
                            type="button"
                            onClick={() => handleCopyBullet(proj.resumeBullet)}
                            className="inline-flex items-center gap-1 text-[#10B981] hover:underline cursor-pointer"
                          >
                            {copiedBullet === proj.resumeBullet ? (
                              <>
                                <Check className="h-3 w-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-[#F1F5F3] leading-relaxed">
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
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0F1412] p-5 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                      <span className="text-[#10B981]">{cert.costNote}</span>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(bKey)}
                        aria-label="Bookmark certification"
                        className={`cursor-pointer ${bookmarked ? 'text-[#FF3366]' : 'text-[#708078] hover:text-white'}`}
                      >
                        <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 className="font-display text-base font-semibold leading-snug text-[#F1F5F3]">
                      {cert.name}
                    </h3>
                    <div className="text-xs text-[#FF3366] font-medium">{cert.issuer}</div>
                    <p className="text-xs leading-relaxed text-[#A7B5AE]">{cert.focus}</p>
                  </div>

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1F5F3] hover:text-[#10B981] transition-colors"
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

      {/* Real-Time Google Search Career Outlook */}
      <CareerOutlookSection
        skillId={skill.id}
        skillTitle={skill.title}
        domainName={dom.name}
      />

      {/* Bottom Adaptive Flashcards Section */}
      <AdaptiveFlashcards
        skill={skill}
        progress={progress}
        onToggleCardMastered={onToggleCardMastered}
      />
    </div>
  );
};
