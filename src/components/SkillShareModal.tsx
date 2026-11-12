import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Flame,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import { DOMAIN_MAP } from '../data';
import { SkillNode } from '../types/curriculum';
import { SkillMasteryBadge, getBadgeRankLabel } from './SkillMasteryBadge';
import { MotionModalFrame, MotionSegmentedControl } from './ui/WatermelonUI';
import {
  ShareCardTheme,
  SkillShareMetrics,
  buildSkillShareLinks,
  canvasToPngBlob,
  renderPolymathShareCardCanvas,
} from '../lib/share-card';

interface SkillShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillNode;
  metrics: SkillShareMetrics;
}

export const SkillShareModal: React.FC<SkillShareModalProps> = ({
  isOpen,
  onClose,
  skill,
  metrics,
}) => {
  const [theme, setTheme] = useState<ShareCardTheme>('obsidian');
  const [includeStreak, setIncludeStreak] = useState(true);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dom = DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data'];
  const unlocked = metrics.percentage === 100;
  const rankLabel = getBadgeRankLabel(skill.tier);
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const links = useMemo(() => buildSkillShareLinks(skill, metrics), [skill, metrics]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    renderPolymathShareCardCanvas(canvasRef.current, skill, metrics, theme, includeStreak);
  }, [isOpen, skill, metrics, theme, includeStreak]);

  const setTemporaryFeedback = (label: string) => {
    setExportError(null);
    setCopiedState(label);
    window.setTimeout(() => {
      setCopiedState((prev) => (prev === label ? null : prev));
    }, 2000);
  };

  const handleDownloadPng = async () => {
    if (!canvasRef.current) return;
    renderPolymathShareCardCanvas(canvasRef.current, skill, metrics, theme, includeStreak);
    const blob = await canvasToPngBlob(canvasRef.current);
    if (!blob) {
      setExportError('Unable to export card image on this browser.');
      return;
    }
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `polymath-${skill.id}-card.png`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setTemporaryFeedback('downloaded');
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    renderPolymathShareCardCanvas(canvasRef.current, skill, metrics, theme, includeStreak);
    const blob = await canvasToPngBlob(canvasRef.current);
    if (!blob) {
      setExportError('Unable to generate PNG image.');
      return;
    }

    if (
      typeof ClipboardItem !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.write === 'function'
    ) {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setTemporaryFeedback('image');
        return;
      } catch {
        // Fallback to downloading image if image clipboard write is restricted
      }
    }
    await handleDownloadPng();
  };

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard?.writeText(text);
      setTemporaryFeedback(label);
    } catch {
      setExportError('Clipboard permission unavailable. Use Download PNG or Share buttons.');
    }
  };

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    try {
      if (canvasRef.current) {
        renderPolymathShareCardCanvas(canvasRef.current, skill, metrics, theme, includeStreak);
        const blob = await canvasToPngBlob(canvasRef.current);
        if (blob) {
          const file = new File([blob], `polymath-${skill.id}-card.png`, {
            type: 'image/png',
          });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${skill.title} · Polymath Atlas`,
              text: links.shortShareText,
              url: links.shareUrl,
              files: [file],
            });
            return;
          }
        }
      }
      await navigator.share({
        title: `${skill.title} · Polymath Atlas`,
        text: links.shortShareText,
        url: links.shareUrl,
      });
    } catch {
      // User dismissed share sheet
    }
  };

  const cardSurfaceClass =
    theme === 'emerald'
      ? 'bg-gradient-to-br from-[#06100C] via-[#091A16] to-[#06070A] border-[#10B981]/35'
      : theme === 'cyan'
      ? 'bg-gradient-to-br from-[#060914] via-[#0B1633] to-[#06070A] border-[#2563EB]/50'
      : 'bg-gradient-to-br from-[#0E111B] via-[#0B0D14] to-[#06070A] border-[rgba(244,241,234,0.12)]';

  return (
    <MotionModalFrame
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="share-card-modal-title"
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-5">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(244,241,234,0.1)] pb-4">
          <div>
            <div className="text-xs font-mono-data text-[#34D399]">
              Social Achievement Generator
            </div>
            <h2
              id="share-card-modal-title"
              className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]"
            >
              Share Polymath Summary Card
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="rounded-lg border border-slate-500/70 bg-[#0B0D14] p-2 text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Customization Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <MotionSegmentedControl
            layoutId="wm-share-theme"
            value={theme}
            onChange={setTheme}
            options={[
              { id: 'obsidian', label: 'Obsidian Gallery' },
              { id: 'emerald', label: 'Emerald Mastery' },
              { id: 'cyan', label: 'Cobalt Studio' },
            ]}
          />

          {metrics.currentStreak > 0 && (
            <button
              type="button"
              onClick={() => setIncludeStreak((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${
                includeStreak
                  ? 'border-[#F97316]/55 bg-[#23140B] text-[#FED7AA]'
                  : 'border-slate-500/70 bg-[#0B0D14] text-slate-300'
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-[#F97316]" />
              <span>{includeStreak ? 'Streak Stamp On' : 'Streak Stamp Off'}</span>
            </button>
          )}
        </div>

        {/* Live Rendered Polymath Summary Card Preview */}
        <div
          className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 bg-grid-nerdy ${cardSurfaceClass}`}
        >
          {/* Top Gradient Edge */}
          <div
            className="absolute inset-x-0 top-0 h-1.5"
            style={{
              background: `linear-gradient(90deg, #2563EB 0%, #F4F1EA 55%, #10B981 100%)`,
            }}
          />

          <div className="space-y-5">
            {/* Top Bar Inside Card */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(244,241,234,0.1)] pb-3.5">
              <div>
                <div className="font-display text-lg font-semibold tracking-tight text-[#F4F1EA]">
                  Polymath Atlas
                </div>
                <div className="text-[11px] font-mono-data text-slate-400">
                  Achievement Summary Card
                </div>
              </div>
              <div className="text-right font-mono-data text-xs">
                <div style={{ color: dom.accentHex }}>{dom.name}</div>
                <div className="text-slate-300">
                  Tier {skill.tier} · {skill.estimatedDays}-Day Track
                </div>
              </div>
            </div>

            {/* Middle Split: Title + Progress Readout */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2.5 max-w-md">
                <div className="flex items-center gap-3">
                  <SkillMasteryBadge
                    domain={skill.domain}
                    tier={skill.tier}
                    unlocked={unlocked}
                    size="md"
                  />
                  <div>
                    <div
                      className={`text-xs font-mono-data font-semibold ${
                        unlocked ? 'text-[#34D399]' : 'text-slate-300'
                      }`}
                    >
                      {unlocked ? `${rankLabel} Unlocked` : rankLabel}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[#F4F1EA]">
                      {skill.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300 line-clamp-2">
                  {skill.summary}
                </p>
              </div>

              <div className="w-full sm:w-52 shrink-0 rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#06070A]/92 p-4 space-y-2.5">
                <div className="text-[11px] font-mono-data text-slate-400">
                  Skill Progress
                </div>
                <div
                  className={`font-mono-data text-4xl font-bold tabular-nums ${
                    unlocked ? 'text-[#34D399]' : 'text-[#F4F1EA]'
                  }`}
                >
                  {metrics.percentage}%
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#141928]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${metrics.percentage}%`,
                      background: unlocked
                        ? '#10B981'
                        : 'linear-gradient(90deg, #2563EB 0%, #F4F1EA 100%)',
                    }}
                  />
                </div>
                <div className="font-mono-data text-[11px] text-slate-300 tabular-nums">
                  {metrics.completedTopics}/{metrics.totalTopics} Topics Completed
                </div>
              </div>
            </div>

            {/* Bottom Metrics Row Inside Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[rgba(244,241,234,0.1)] pt-4 font-mono-data">
              <div>
                <div className="text-[10px] text-slate-400">FLASHCARDS</div>
                <div className="text-sm font-bold text-[#F4F1EA] tabular-nums">
                  {metrics.masteredCards}/{metrics.totalCards} Mastered
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">CREDENTIALS</div>
                <div className="text-sm font-bold text-[#F4F1EA] tabular-nums">
                  {skill.projects.required.length + skill.projects.scalable.length} Projects ·{' '}
                  {skill.papers.length} Papers
                </div>
              </div>
              {includeStreak && metrics.currentStreak > 0 ? (
                <div>
                  <div className="text-[10px] text-slate-400">DAILY STREAK</div>
                  <div className="inline-flex items-center gap-1 text-sm font-bold text-[#F97316] tabular-nums">
                    <Flame className="h-3.5 w-3.5" fill="#F97316" />
                    {metrics.currentStreak} Day{metrics.currentStreak === 1 ? '' : 's'}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[10px] text-slate-400">ROADMAP LINK</div>
                  <div className="truncate text-xs font-medium text-slate-300">
                    #skill/{skill.id}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Offscreen Canvas for Crisp 1200x630 PNG Export */}
        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

        {exportError && (
          <div className="rounded-xl border border-rose-500/45 bg-rose-950/35 px-3.5 py-2 text-xs text-rose-200">
            {exportError}
          </div>
        )}

        {/* Primary Social Share + Export Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <a
            href={links.xIntentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0D14] border border-slate-500/70 px-4 py-2.5 text-xs font-semibold text-[#F4F1EA] hover:border-[#60A5FA] hover:bg-[#141928] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <span>Share on X</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
          </a>

          <a
            href={links.linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0D14] border border-slate-500/70 px-4 py-2.5 text-xs font-semibold text-[#F4F1EA] hover:border-[#60A5FA] hover:bg-[#141928] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <span>Share on LinkedIn</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#60A5FA]" />
          </a>

          <button
            type="button"
            onClick={handleDownloadPng}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3B82F6] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            {copiedState === 'downloaded' ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>PNG Saved</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span>Download PNG Card</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyImage}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-500/70 bg-[#0B0D14] px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            {copiedState === 'image' ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="text-[#34D399]">Card Image Copied</span>
              </>
            ) : (
              <>
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Copy Card Image</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleCopyText(links.linkedInPostText, 'post')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-500/70 bg-[#0B0D14] px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            {copiedState === 'post' ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="text-[#34D399]">Post Text Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Post Caption</span>
              </>
            )}
          </button>

          {canNativeShare ? (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#10B981]/50 bg-[#10B981]/15 px-4 py-2.5 text-xs font-semibold text-[#34D399] hover:bg-[#10B981]/25 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Sheet</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleCopyText(links.shareUrl, 'link')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-500/70 bg-[#0B0D14] px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              {copiedState === 'link' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#10B981]" />
                  <span className="text-[#34D399]">Skill Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Skill Link</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </MotionModalFrame>
  );
};
