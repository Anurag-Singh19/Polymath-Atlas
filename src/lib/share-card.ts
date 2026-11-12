import { DOMAIN_MAP } from '../data';
import { getBadgeRankLabel } from '../components/SkillMasteryBadge';
import { SkillNode } from '../types/curriculum';

export type ShareCardTheme = 'obsidian' | 'emerald' | 'cyan';

export interface SkillShareMetrics {
  completedTopics: number;
  totalTopics: number;
  percentage: number;
  masteredCards: number;
  totalCards: number;
  currentStreak: number;
}

export interface ShareLinksBundle {
  shareUrl: string;
  xIntentUrl: string;
  linkedInShareUrl: string;
  linkedInPostText: string;
  shortShareText: string;
}

export function buildSkillShareLinks(
  skill: SkillNode,
  metrics: SkillShareMetrics
): ShareLinksBundle {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://polymath-atlas.app';
  const shareUrl = `${origin}/#skill/${skill.id}`;
  const dom = DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data'];
  const rankLabel = getBadgeRankLabel(skill.tier);
  const unlocked = metrics.percentage === 100;

  const statusLine = unlocked
    ? `Unlocked the ${rankLabel} (100% mastery) in ${skill.title}`
    : `Reached ${metrics.percentage}% mastery (${metrics.completedTopics}/${metrics.totalTopics} topics) in ${skill.title}`;

  const streakSuffix =
    metrics.currentStreak > 1 ? ` · ${metrics.currentStreak}-day learning streak` : '';

  const shortShareText = `${statusLine} on Polymath Atlas (${dom.name})${streakSuffix}.`;

  const linkedInPostText = [
    unlocked
      ? `Milestone unlocked: ${skill.title} — ${rankLabel} (100% Completed)`
      : `Learning progress update: ${metrics.percentage}% through ${skill.title}`,
    '',
    `• Domain: ${dom.name} (Tier ${skill.tier} · ${skill.estimatedDays}-Day Track)`,
    `• Topics Completed: ${metrics.completedTopics}/${metrics.totalTopics}`,
    `• Flashcards Mastered: ${metrics.masteredCards}/${metrics.totalCards}`,
    metrics.currentStreak > 0 ? `• Active Daily Streak: ${metrics.currentStreak} day${metrics.currentStreak === 1 ? '' : 's'}` : null,
    '',
    `Explore the full roadmap, skill tree, and portfolio credentials: ${shareUrl}`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shortShareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  return {
    shareUrl,
    xIntentUrl,
    linkedInShareUrl,
    linkedInPostText,
    shortShareText,
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  if (lines.length === maxLines && words.join(' ') !== lines.join(' ')) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.length > 3 ? `${last.slice(0, -1)}…` : last;
  }
  return lines;
}

export function renderPolymathShareCardCanvas(
  canvas: HTMLCanvasElement,
  skill: SkillNode,
  metrics: SkillShareMetrics,
  theme: ShareCardTheme,
  includeStreak: boolean
): void {
  const width = 1200;
  const height = 630;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dom = DOMAIN_MAP[skill.domain] || DOMAIN_MAP['swe-data'];
  const unlocked = metrics.percentage === 100;
  const rankLabel = getBadgeRankLabel(skill.tier);

  const palette =
    theme === 'emerald'
      ? {
          bgStart: '#06100C',
          bgEnd: '#091A16',
          cardBg: '#0C1E18',
          primary: '#10B981',
          secondary: '#34D399',
          glow: 'rgba(16, 185, 129, 0.28)',
        }
      : theme === 'cyan'
      ? {
          bgStart: '#060914',
          bgEnd: '#0B1633',
          cardBg: '#0E1528',
          primary: '#60A5FA',
          secondary: '#2563EB',
          glow: 'rgba(37, 99, 235, 0.36)',
        }
      : {
          bgStart: '#06070A',
          bgEnd: '#0B0D14',
          cardBg: '#0E111B',
          primary: unlocked ? '#10B981' : dom.accentHex,
          secondary: '#60A5FA',
          glow: unlocked ? 'rgba(16, 185, 129, 0.24)' : 'rgba(37, 99, 235, 0.3)',
        };

  // Base background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, palette.bgStart);
  bgGrad.addColorStop(1, palette.bgEnd);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle architectural gallery vertical lines
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.05)';
  ctx.lineWidth = 1;
  for (let vx = 240; vx < width; vx += 240) {
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx, height);
    ctx.stroke();
  }

  // Ambient radial glow behind right panel
  const glow = ctx.createRadialGradient(950, 290, 20, 950, 290, 420);
  glow.addColorStop(0, palette.glow);
  glow.addColorStop(1, 'rgba(6, 7, 10, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Luminous Ivory Gallery Halo Ring
  ctx.beginPath();
  ctx.arc(950, 305, 148, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.22)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Outer frame card
  drawRoundedRect(ctx, 48, 44, width - 96, height - 88, 28);
  ctx.fillStyle = palette.cardBg;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.14)';
  ctx.stroke();

  // Top accent bar inside card
  drawRoundedRect(ctx, 48, 44, width - 96, 5, 3);
  const topBar = ctx.createLinearGradient(48, 0, width - 48, 0);
  topBar.addColorStop(0, '#2563EB');
  topBar.addColorStop(0.55, '#F4F1EA');
  topBar.addColorStop(1, '#10B981');
  ctx.fillStyle = topBar;
  ctx.fill();

  // Brand lockup top-left
  ctx.fillStyle = '#F4F1EA';
  ctx.font = '600 26px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('POLYMATH ATLAS', 92, 108);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('CURATED ACHIEVEMENT CREDENTIAL', 92, 134);

  // Domain + Tier kicker top-right
  ctx.textAlign = 'right';
  ctx.fillStyle = palette.primary;
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText(
    `${dom.name.toUpperCase()}  ·  TIER ${skill.tier}  ·  ${skill.estimatedDays}-DAY TRACK`,
    width - 92,
    112
  );
  ctx.fillStyle = unlocked ? '#34D399' : '#CBD5E1';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText(unlocked ? `${rankLabel.toUpperCase()} UNLOCKED` : rankLabel.toUpperCase(), width - 92, 138);
  ctx.textAlign = 'left';

  // Hairline divider
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(92, 162);
  ctx.lineTo(width - 92, 162);
  ctx.stroke();

  // Left column: Skill Title + Summary
  ctx.fillStyle = '#F4F1EA';
  ctx.font = '600 52px "Cormorant Garamond", Georgia, serif';
  const titleLines = wrapTextLines(ctx, skill.title, 650, 2);
  titleLines.forEach((line, i) => {
    ctx.fillText(line, 92, 232 + i * 56);
  });

  const summaryTop = 232 + titleLines.length * 56 + 10;
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
  const summaryLines = wrapTextLines(ctx, skill.summary, 640, 3);
  summaryLines.forEach((line, i) => {
    ctx.fillText(line, 92, summaryTop + i * 30);
  });

  // Right column: Progress Ring / Percentage Card
  const panelX = 790;
  const panelY = 194;
  const panelW = 318;
  const panelH = 228;
  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 20);
  ctx.fillStyle = '#06070A';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = unlocked ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 241, 234, 0.14)';
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText('SKILL PROGRESS', panelX + 28, panelY + 40);

  ctx.fillStyle = unlocked ? '#34D399' : '#F4F1EA';
  ctx.font = '700 72px "JetBrains Mono", monospace';
  ctx.fillText(`${metrics.percentage}%`, panelX + 28, panelY + 124);

  // Progress bar inside right panel
  const barX = panelX + 28;
  const barY = panelY + 150;
  const barW = panelW - 56;
  const barH = 14;
  drawRoundedRect(ctx, barX, barY, barW, barH, 7);
  ctx.fillStyle = '#141928';
  ctx.fill();

  const fillW = Math.max(metrics.percentage > 0 ? 14 : 0, Math.round((barW * metrics.percentage) / 100));
  if (fillW > 0) {
    drawRoundedRect(ctx, barX, barY, fillW, barH, 7);
    const progGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    progGrad.addColorStop(0, unlocked ? '#10B981' : '#2563EB');
    progGrad.addColorStop(1, unlocked ? '#34D399' : '#F4F1EA');
    ctx.fillStyle = progGrad;
    ctx.fill();
  }

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText(
    `${metrics.completedTopics}/${metrics.totalTopics} Topics Completed`,
    panelX + 28,
    panelY + 196
  );

  // Bottom Stats Strip
  const footerY = 468;
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.1)';
  ctx.beginPath();
  ctx.moveTo(92, footerY - 20);
  ctx.lineTo(width - 92, footerY - 20);
  ctx.stroke();

  const stats: { label: string; value: string; color: string }[] = [
    {
      label: 'FLASHCARDS MASTERED',
      value: `${metrics.masteredCards} / ${metrics.totalCards}`,
      color: '#F4F1EA',
    },
    {
      label: 'CAPSTONES & PAPERS',
      value: `${skill.projects.required.length + skill.projects.scalable.length} Projects · ${skill.papers.length} Papers`,
      color: '#F4F1EA',
    },
    ...(includeStreak && metrics.currentStreak > 0
      ? [
          {
            label: 'DAILY STREAK',
            value: `${metrics.currentStreak} Day${metrics.currentStreak === 1 ? '' : 's'}`,
            color: '#F97316',
          },
        ]
      : [
          {
            label: 'MASTERY SEAL',
            value: unlocked ? rankLabel : 'In Progress',
            color: unlocked ? '#34D399' : '#CBD5E1',
          },
        ]),
  ];

  stats.forEach((stat, idx) => {
    const sx = 92 + idx * 345;
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText(stat.label, sx, footerY + 12);
    ctx.fillStyle = stat.color;
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(stat.value, sx, footerY + 46);
  });

  // Footer link right aligned
  ctx.textAlign = 'right';
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText(`#skill/${skill.id}`, width - 92, footerY + 44);
  ctx.textAlign = 'left';
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}
