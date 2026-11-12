import React, { useCallback, useEffect, useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Building2,
  RefreshCw,
  ExternalLink,
  Briefcase,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import type { CareerOutlookData } from '../lib/gemini-career';

interface CareerOutlookSectionProps {
  skillId: string;
  skillTitle: string;
  domainName: string;
}

const CLIENT_CACHE_PREFIX = 'polymath_career_outlook_v1_';

export const CareerOutlookSection: React.FC<CareerOutlookSectionProps> = ({
  skillId,
  skillTitle,
  domainName,
}) => {
  const [data, setData] = useState<CareerOutlookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadOutlook = useCallback(
    async (forceRefresh = false) => {
      const storageKey = `${CLIENT_CACHE_PREFIX}${skillId}`;
      if (!forceRefresh) {
        try {
          const cachedRaw = sessionStorage.getItem(storageKey);
          if (cachedRaw) {
            const cached = JSON.parse(cachedRaw) as CareerOutlookData;
            setData(cached);
            return;
          }
        } catch {
          // Ignore storage errors
        }
      }

      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch('/api/career-outlook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            skillId,
            skillTitle,
            domainName,
            forceRefresh,
          }),
        });
        const payload = await res.json();
        if (!res.ok) {
          throw new Error(payload?.error || 'Could not load live Career Outlook.');
        }
        setData(payload as CareerOutlookData);
        try {
          sessionStorage.setItem(storageKey, JSON.stringify(payload));
        } catch {
          // Ignore quota issues
        }
      } catch (err) {
        setErrorMsg(
          err instanceof Error
            ? err.message
            : 'Unable to pull live market data right now.'
        );
      } finally {
        setLoading(false);
      }
    },
    [skillId, skillTitle, domainName]
  );

  useEffect(() => {
    setData(null);
    loadOutlook(false);
  }, [loadOutlook]);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#141B17] p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-data text-[#38BDF8]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Real-Time Google Search Market Grounding</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#F1F5F3]">
            Career Outlook — {skillTitle}
          </h2>
          <p className="mt-1 text-sm text-[#A7B5AE]">
            Live industry demand signals, compensation ranges, and top employers actively hiring for this discipline.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadOutlook(true)}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-[#0F1412] px-3.5 py-2 text-xs font-semibold text-[#F1F5F3] hover:border-[#38BDF8]/60 hover:text-[#38BDF8] disabled:opacity-50 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Searching Live Market...' : 'Refresh Live Data'}</span>
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && !data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          <div className="h-32 rounded-xl bg-[#0F1412] border border-white/8" />
          <div className="h-32 rounded-xl bg-[#0F1412] border border-white/8" />
          <div className="h-32 rounded-xl bg-[#0F1412] border border-white/8" />
        </div>
      )}

      {/* Error State */}
      {errorMsg && !data && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-[#FF3366]/40 bg-[#FF3366]/10 p-4 text-xs text-[#FECDD3]">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#FF3366] mt-0.5" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => loadOutlook(true)}
            className="rounded-lg bg-[#FF3366] px-3 py-1.5 text-xs font-semibold text-white shrink-0 cursor-pointer"
          >
            Retry Search
          </button>
        </div>
      )}

      {/* Grounded Outlook Content */}
      {data && (
        <div className="space-y-6">
          {/* Demand + Summary Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 rounded-xl border border-[#10B981]/35 bg-[#0F1A15] p-5 space-y-2">
              <div className="font-mono-data text-xs text-[#10B981]">
                Industry Demand Signal
              </div>
              <div className="font-display text-2xl font-bold text-[#F1F5F3]">
                {data.demandLevel}
              </div>
              <div className="text-xs font-mono-data text-[#A7B5AE]">
                {data.growthStat}
              </div>
            </div>

            <div className="lg:col-span-8 rounded-xl border border-white/10 bg-[#0F1412] p-5 space-y-2">
              <div className="font-mono-data text-xs text-[#A7B5AE]">
                Market Synthesis
              </div>
              <p className="text-sm leading-relaxed text-[#F1F5F3]">
                {data.marketSummary}
              </p>
              {data.commonJobTitles.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Briefcase className="h-3.5 w-3.5 text-[#FF3366] shrink-0" />
                  <span className="text-xs text-[#A7B5AE] font-mono-data">
                    {data.commonJobTitles.join(' · ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Compensation Bands */}
          {data.salaryBands.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A7B5AE]">
                <DollarSign className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Compensation Ranges</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.salaryBands.map((band, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-[#0F1412] p-4 space-y-1.5"
                  >
                    <div className="text-xs text-[#A7B5AE]">{band.level}</div>
                    <div className="font-mono-data text-lg font-bold text-[#10B981]">
                      {band.range}
                    </div>
                    {band.notes && (
                      <p className="text-xs text-[#708078] leading-relaxed">
                        {band.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Hiring Companies + High-ROI Pairings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {data.topHiringCompanies.length > 0 && (
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#A7B5AE]">
                  <Building2 className="h-3.5 w-3.5 text-[#FF3366]" />
                  <span>Top Companies Hiring</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.topHiringCompanies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/8 bg-[#0F1412] px-4 py-3 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-display text-sm font-semibold text-[#F1F5F3]">
                          {comp.name}
                        </div>
                        <div className="text-xs text-[#A7B5AE] mt-0.5">
                          {comp.roleFocus}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.highRoiPairings.length > 0 && (
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#A7B5AE]">
                  <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                  <span>High-ROI Skill Multipliers</span>
                </div>
                <div className="rounded-xl border border-white/8 bg-[#0F1412] p-4 space-y-2">
                  {data.highRoiPairings.map((pairing, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-[#F1F5F3] flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] shrink-0" />
                      <span>{pairing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Verified Google Search Sources */}
          {data.sources.length > 0 && (
            <div className="border-t border-white/8 pt-4 space-y-2">
              <div className="font-mono-data text-[11px] text-[#708078]">
                Grounded Web Sources ({new Date(data.fetchedAt).toLocaleDateString()})
              </div>
              <div className="flex flex-wrap gap-2">
                {data.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0F1412] px-3 py-1.5 text-xs text-[#A7B5AE] hover:border-[#38BDF8]/60 hover:text-white transition-colors max-w-[260px]"
                  >
                    <span className="truncate">{src.title}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
