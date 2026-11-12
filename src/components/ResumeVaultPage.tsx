import React, { useMemo, useState } from 'react';
import { Search, ExternalLink, Bookmark, FileText, FolderGit2, Award, ArrowUpRight } from 'lucide-react';
import { ALL_SKILLS, DOMAINS, DOMAIN_MAP } from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';
import { ScrollStage } from './GalleryChoreography';
import { MotionSegmentedControl } from './ui/WatermelonUI';

interface ResumeVaultPageProps {
  skills?: SkillNode[];
  progress: UserProgressState;
  onToggleBookmark: (itemKey: string) => void;
  onOpenSkill: (skillId: string) => void;
}

export const ResumeVaultPage: React.FC<ResumeVaultPageProps> = ({
  skills = ALL_SKILLS,
  progress,
  onToggleBookmark,
  onOpenSkill,
}) => {
  const [category, setCategory] = useState<'papers' | 'projects' | 'certs' | 'bookmarked'>('papers');
  const [domainFilter, setDomainFilter] = useState<DomainId | 'all'>('all');
  const [query, setQuery] = useState('');

  const { allPapers, allProjects, allCerts } = useMemo(() => {
    const papers = skills.flatMap((skill) =>
      skill.papers.map((paper, idx) => ({
        key: `paper:${skill.id}:${idx}`,
        skill,
        paper,
      }))
    );
    const projects = skills.flatMap((skill) => [
      ...skill.projects.required.map((project, idx) => ({
        key: `proj-req:${skill.id}:${idx}`,
        skill,
        project,
      })),
      ...skill.projects.scalable.map((project, idx) => ({
        key: `proj-scale:${skill.id}:${idx}`,
        skill,
        project,
      })),
    ]);
    const certs = skills.flatMap((skill) =>
      skill.certifications.map((cert, idx) => ({
        key: `cert:${skill.id}:${idx}`,
        skill,
        cert,
      }))
    );
    return { allPapers: papers, allProjects: projects, allCerts: certs };
  }, [skills]);

  const q = query.trim().toLowerCase();

  const filteredPapers = useMemo(
    () =>
      allPapers.filter(({ key, skill, paper }) => {
        if (category === 'bookmarked' && !progress.bookmarkedItems[key]) return false;
        if (domainFilter !== 'all' && skill.domain !== domainFilter) return false;
        if (!q) return true;
        return (
          paper.title.toLowerCase().includes(q) ||
          paper.authors.toLowerCase().includes(q) ||
          skill.title.toLowerCase().includes(q)
        );
      }),
    [allPapers, category, domainFilter, q, progress.bookmarkedItems]
  );

  const filteredProjects = useMemo(
    () =>
      allProjects.filter(({ key, skill, project }) => {
        if (category === 'bookmarked' && !progress.bookmarkedItems[key]) return false;
        if (domainFilter !== 'all' && skill.domain !== domainFilter) return false;
        if (!q) return true;
        return (
          project.title.toLowerCase().includes(q) ||
          project.stack.toLowerCase().includes(q) ||
          skill.title.toLowerCase().includes(q)
        );
      }),
    [allProjects, category, domainFilter, q, progress.bookmarkedItems]
  );

  const filteredCerts = useMemo(
    () =>
      allCerts.filter(({ key, skill, cert }) => {
        if (category === 'bookmarked' && !progress.bookmarkedItems[key]) return false;
        if (domainFilter !== 'all' && skill.domain !== domainFilter) return false;
        if (!q) return true;
        return (
          cert.name.toLowerCase().includes(q) ||
          cert.issuer.toLowerCase().includes(q) ||
          skill.title.toLowerCase().includes(q)
        );
      }),
    [allCerts, category, domainFilter, q, progress.bookmarkedItems]
  );

  const bookmarkedCount = Object.values(progress.bookmarkedItems).filter(Boolean).length;

  return (
    <div className="space-y-8">
      <ScrollStage>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-[rgba(244,241,234,0.1)] pb-6">
          <div>
            <div className="font-mono-data text-xs text-[#34D399]">
              Cross-Disciplinary Credentials Index
            </div>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#F4F1EA]">
              Resume-Ready Vault
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Browse {allPapers.length} valid research papers, {allProjects.length} required &amp; scalable projects, and {allCerts.length} free popular certifications across every skill.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter papers, projects, certs…"
              aria-label="Filter papers, projects, and certifications"
              className="w-full rounded-xl border border-slate-500 bg-[#0E111B] py-2.5 pr-4 pl-10 text-base sm:text-sm text-[#F4F1EA] placeholder-slate-400 focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
            />
          </div>
        </div>
      </ScrollStage>

      {/* Category & Domain Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <MotionSegmentedControl
          layoutId="wm-vault-category"
          value={category}
          onChange={setCategory}
          variant={category === 'bookmarked' ? 'mint' : 'pill'}
          options={[
            {
              id: 'papers',
              label: 'Research Papers',
              count: allPapers.length,
              icon: <FileText className="h-3.5 w-3.5 text-[#60A5FA]" />,
            },
            {
              id: 'projects',
              label: 'Projects',
              count: allProjects.length,
              icon: <FolderGit2 className="h-3.5 w-3.5 text-[#34D399]" />,
            },
            {
              id: 'certs',
              label: 'Free Certifications',
              count: allCerts.length,
              icon: <Award className="h-3.5 w-3.5 text-[#F59E0B]" />,
            },
            {
              id: 'bookmarked',
              label: 'Saved Stack',
              count: bookmarkedCount,
              icon: <Bookmark className="h-3.5 w-3.5 text-[#10B981]" />,
            },
          ]}
        />

        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value as DomainId | 'all')}
          aria-label="Filter by domain"
          className="rounded-xl border border-slate-500 bg-[#0E111B] px-3 py-2 text-base sm:text-xs font-medium text-[#F4F1EA] focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] self-start"
        >
          <option value="all">All 6 Domains</option>
          {DOMAINS.map((dom) => (
            <option key={dom.id} value={dom.id}>
              {dom.name}
            </option>
          ))}
        </select>
      </div>

      {/* Papers View */}
      {(category === 'papers' || (category === 'bookmarked' && filteredPapers.length > 0)) && (
        <ScrollStage delay={0.04}>
          <div className="space-y-3">
            {category === 'bookmarked' && (
              <h2 className="font-display text-2xl font-semibold text-[#F4F1EA]">Saved Research Papers</h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPapers.map(({ key, skill, paper }) => {
                const bookmarked = Boolean(progress.bookmarkedItems[key]);
                return (
                  <article
                    key={key}
                    className="flex flex-col justify-between rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-5 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                        <button
                          type="button"
                          data-cursor="open"
                          onClick={() => onOpenSkill(skill.id)}
                          className="truncate hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA]"
                          style={{ color: (DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data']).accentHex }}
                        >
                          {skill.title}
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(key)}
                          aria-label={`Bookmark paper ${paper.title}`}
                          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${bookmarked ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[#F4F1EA]">
                        {paper.title}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono-data">
                        {paper.authors} · {paper.venue} ({paper.year})
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">{paper.takeaway}</p>
                    </div>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                    >
                      Read Paper <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </ScrollStage>
      )}

      {/* Projects View */}
      {(category === 'projects' || (category === 'bookmarked' && filteredProjects.length > 0)) && (
        <ScrollStage delay={0.05}>
          <div className="space-y-3">
            {category === 'bookmarked' && (
              <h2 className="font-display text-2xl font-semibold text-[#F4F1EA]">Saved Projects</h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredProjects.map(({ key, skill, project }) => {
                const bookmarked = Boolean(progress.bookmarkedItems[key]);
                return (
                  <article
                    key={key}
                    className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                      <span className={project.tier === 'Scalable Capstone' ? 'text-[#34D399]' : 'text-[#60A5FA]'}>
                        {project.tier} · {skill.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(key)}
                        aria-label={`Bookmark project ${project.title}`}
                        className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${bookmarked ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                      >
                        <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#F4F1EA]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300">{project.scope}</p>
                    <div className="text-xs font-mono-data text-slate-400">{project.stack}</div>
                    <div className="pt-2 border-t border-[rgba(244,241,234,0.08)] flex items-center justify-between gap-3">
                      <p className="text-xs text-[#F4F1EA]/90 truncate">• {project.resumeBullet}</p>
                      <button
                        type="button"
                        data-cursor="open"
                        onClick={() => onOpenSkill(skill.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#34D399] shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
                      >
                        Skill <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </ScrollStage>
      )}

      {/* Certifications View */}
      {(category === 'certs' || (category === 'bookmarked' && filteredCerts.length > 0)) && (
        <ScrollStage delay={0.06}>
          <div className="space-y-3">
            {category === 'bookmarked' && (
              <h2 className="font-display text-2xl font-semibold text-[#F4F1EA]">Saved Certifications</h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {filteredCerts.map(({ key, skill, cert }) => {
                const bookmarked = Boolean(progress.bookmarkedItems[key]);
                return (
                  <article
                    key={key}
                    className="flex flex-col justify-between rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B]/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-5 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                        <span className="text-[#34D399]">{cert.costNote}</span>
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(key)}
                          aria-label={`Bookmark certification ${cert.name}`}
                          className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${bookmarked ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-[#F4F1EA]'}`}
                        >
                          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[#F4F1EA]">
                        {cert.name}
                      </h3>
                      <div className="text-xs text-[#93C5FD]">{cert.issuer} · {skill.title}</div>
                      <p className="text-xs text-slate-300">{cert.focus}</p>
                    </div>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F1EA] hover:text-[#34D399] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                    >
                      Open Course / Cert <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </ScrollStage>
      )}

      {category === 'bookmarked' && bookmarkedCount === 0 && (
        <div className="rounded-2xl border border-dashed border-[rgba(244,241,234,0.16)] bg-[#0E111B]/80 backdrop-blur-md p-12 text-center space-y-2">
          <Bookmark className="mx-auto h-8 w-8 text-slate-400" />
          <p className="text-sm font-medium text-[#F4F1EA]">No items saved to your target resume stack yet.</p>
          <p className="text-xs text-slate-300">Click the bookmark icon on any paper, project, or certification to curate your personal dossier.</p>
        </div>
      )}
    </div>
  );
};
