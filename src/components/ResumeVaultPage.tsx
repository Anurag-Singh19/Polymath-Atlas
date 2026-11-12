import React, { useMemo, useState } from 'react';
import { Search, ExternalLink, Bookmark, FileText, FolderGit2, Award, ArrowUpRight } from 'lucide-react';
import { ALL_SKILLS, DOMAINS, DOMAIN_MAP } from '../data';
import { DomainId, SkillNode, UserProgressState } from '../types/curriculum';

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
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="font-mono-data text-xs text-[#10B981]">
            Cross-Disciplinary Credentials Index
          </div>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F3]">
            Resume-Ready Vault
          </h1>
          <p className="mt-1 text-sm text-[#A7B5AE] max-w-2xl">
            Browse {allPapers.length} valid research papers, {allProjects.length} required & scalable projects, and {allCerts.length} free popular certifications across every skill.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#708078]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter papers, projects, certs..."
            className="w-full rounded-xl border border-white/12 bg-[#141B17] py-2.5 pr-4 pl-10 text-sm text-[#F1F5F3] placeholder-[#708078] focus:border-[#FF3366] focus:outline-none"
          />
        </div>
      </div>

      {/* Category & Domain Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0F1412] p-1 border border-white/8">
          <button
            type="button"
            onClick={() => setCategory('papers')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              category === 'papers' ? 'bg-[#FF3366] text-white' : 'text-[#A7B5AE] hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Research Papers ({allPapers.length})
          </button>
          <button
            type="button"
            onClick={() => setCategory('projects')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              category === 'projects' ? 'bg-[#FF3366] text-white' : 'text-[#A7B5AE] hover:text-white'
            }`}
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            Projects ({allProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setCategory('certs')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              category === 'certs' ? 'bg-[#FF3366] text-white' : 'text-[#A7B5AE] hover:text-white'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Free Certifications ({allCerts.length})
          </button>
          <button
            type="button"
            onClick={() => setCategory('bookmarked')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              category === 'bookmarked'
                ? 'bg-[#10B981] text-[#090D0B]'
                : 'text-[#A7B5AE] hover:text-white'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            Saved Stack ({bookmarkedCount})
          </button>
        </div>

        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value as DomainId | 'all')}
          aria-label="Filter by domain"
          className="rounded-xl border border-white/12 bg-[#141B17] px-3 py-2 text-xs font-medium text-[#F1F5F3] focus:border-[#FF3366] focus:outline-none self-start"
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
        <div className="space-y-3">
          {category === 'bookmarked' && (
            <h2 className="font-display text-lg font-semibold text-[#F1F5F3]">Saved Research Papers</h2>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map(({ key, skill, paper }) => {
              const bookmarked = Boolean(progress.bookmarkedItems[key]);
              return (
                <article
                  key={key}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141B17] p-5 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                      <button
                        type="button"
                        onClick={() => onOpenSkill(skill.id)}
                        className="truncate hover:underline cursor-pointer"
                        style={{ color: DOMAIN_MAP[skill.domain].accentHex }}
                      >
                        {skill.title}
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(key)}
                        className={`cursor-pointer ${bookmarked ? 'text-[#FF3366]' : 'text-[#708078] hover:text-white'}`}
                      >
                        <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#F1F5F3]">
                      {paper.title}
                    </h3>
                    <div className="text-xs text-[#708078] font-mono-data">
                      {paper.authors} · {paper.venue} ({paper.year})
                    </div>
                    <p className="text-xs leading-relaxed text-[#A7B5AE]">{paper.takeaway}</p>
                  </div>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF3366] hover:underline"
                  >
                    Read Paper <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects View */}
      {(category === 'projects' || (category === 'bookmarked' && filteredProjects.length > 0)) && (
        <div className="space-y-3">
          {category === 'bookmarked' && (
            <h2 className="font-display text-lg font-semibold text-[#F1F5F3]">Saved Projects</h2>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredProjects.map(({ key, skill, project }) => {
              const bookmarked = Boolean(progress.bookmarkedItems[key]);
              return (
                <article
                  key={key}
                  className="rounded-2xl border border-white/10 bg-[#141B17] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                    <span className={project.tier === 'Scalable Capstone' ? 'text-[#10B981]' : 'text-[#FF3366]'}>
                      {project.tier} · {skill.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(key)}
                      className={`cursor-pointer ${bookmarked ? 'text-[#FF3366]' : 'text-[#708078] hover:text-white'}`}
                    >
                      <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#F1F5F3]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#A7B5AE]">{project.scope}</p>
                  <div className="text-xs font-mono-data text-[#708078]">{project.stack}</div>
                  <div className="pt-2 border-t border-white/8 flex items-center justify-between gap-3">
                    <p className="text-xs text-[#F1F5F3] truncate">• {project.resumeBullet}</p>
                    <button
                      type="button"
                      onClick={() => onOpenSkill(skill.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] shrink-0 cursor-pointer"
                    >
                      Skill <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Certifications View */}
      {(category === 'certs' || (category === 'bookmarked' && filteredCerts.length > 0)) && (
        <div className="space-y-3">
          {category === 'bookmarked' && (
            <h2 className="font-display text-lg font-semibold text-[#F1F5F3]">Saved Certifications</h2>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredCerts.map(({ key, skill, cert }) => {
              const bookmarked = Boolean(progress.bookmarkedItems[key]);
              return (
                <article
                  key={key}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141B17] p-5 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-data">
                      <span className="text-[#10B981]">{cert.costNote}</span>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(key)}
                        className={`cursor-pointer ${bookmarked ? 'text-[#FF3366]' : 'text-[#708078] hover:text-white'}`}
                      >
                        <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#F1F5F3]">
                      {cert.name}
                    </h3>
                    <div className="text-xs text-[#FF3366]">{cert.issuer} · {skill.title}</div>
                    <p className="text-xs text-[#A7B5AE]">{cert.focus}</p>
                  </div>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1F5F3] hover:text-[#10B981]"
                  >
                    Open Course / Cert <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {category === 'bookmarked' && bookmarkedCount === 0 && (
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#141B17] p-12 text-center space-y-2">
          <Bookmark className="mx-auto h-8 w-8 text-[#708078]" />
          <p className="text-sm font-medium text-[#F1F5F3]">No items saved to your target resume stack yet.</p>
          <p className="text-xs text-[#A7B5AE]">Click the bookmark icon on any paper, project, or certification to curate your personal dossier.</p>
        </div>
      )}
    </div>
  );
};
