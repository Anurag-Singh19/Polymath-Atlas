import React, { useId } from 'react';
import { DOMAIN_MAP } from '../data';
import { DomainId } from '../types/curriculum';

export type BadgeSize = 'sm' | 'md' | 'lg';

interface SkillMasteryBadgeProps {
  domain: DomainId;
  tier: 1 | 2 | 3 | 4;
  unlocked: boolean;
  size?: BadgeSize;
  title?: string;
}

const SIZE_PX: Record<BadgeSize, number> = {
  sm: 28,
  md: 42,
  lg: 76,
};

export function getBadgeRankLabel(tier: 1 | 2 | 3 | 4): string {
  switch (tier) {
    case 1:
      return 'Foundation Seal';
    case 2:
      return 'Practitioner Crest';
    case 3:
      return 'Architect Emblem';
    case 4:
      return 'Polymath Sovereign';
  }
}

export const SkillMasteryBadge: React.FC<SkillMasteryBadgeProps> = ({
  domain,
  tier,
  unlocked,
  size = 'md',
  title,
}) => {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');
  const dom = DOMAIN_MAP[domain];
  const px = SIZE_PX[size];
  const rankLabel = getBadgeRankLabel(tier);

  const primary = unlocked ? dom.accentHex : '#4A5750';
  const secondary = unlocked ? '#10B981' : '#35403A';
  const fillBg = unlocked ? '#0D1713' : '#0B100E';

  // Crown pip coordinates along the top perimeter of a 64x64 viewBox
  const pipCount = tier;
  const pipAngles =
    pipCount === 1
      ? [0]
      : pipCount === 2
      ? [-14, 14]
      : pipCount === 3
      ? [-22, 0, 22]
      : [-28, -10, 10, 28];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        unlocked ? 'badge-unlock-pop' : ''
      }`}
      style={{ width: px, height: px }}
      title={
        title ||
        (unlocked
          ? `Unlocked · ${rankLabel} (${dom.shortName})`
          : `Locked · Complete 100% of topics to unlock ${rankLabel}`)
      }
      aria-label={unlocked ? `${rankLabel} unlocked` : `${rankLabel} locked`}
    >
      <svg
        viewBox="0 0 64 64"
        width={px}
        height={px}
        className="overflow-visible"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`rim-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primary} />
            <stop offset="55%" stopColor="#F1F5F3" stopOpacity={unlocked ? 0.9 : 0.25} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
          <radialGradient id={`core-${uid}`} cx="50%" cy="42%" r="58%">
            <stop
              offset="0%"
              stopColor={unlocked ? secondary : '#1A2420'}
              stopOpacity={unlocked ? 0.34 : 0.2}
            />
            <stop offset="100%" stopColor={fillBg} stopOpacity="1" />
          </radialGradient>
          {unlocked && (
            <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2.4"
                floodColor={secondary}
                floodOpacity="0.45"
              />
            </filter>
          )}
        </defs>

        <g filter={unlocked ? `url(#glow-${uid})` : undefined}>
          {/* Outer Crest Silhouette */}
          {domain === 'ai-ml' && (
            <polygon
              points="32,5 55,18 55,46 32,59 9,46 9,18"
              fill={`url(#core-${uid})`}
              stroke={`url(#rim-${uid})`}
              strokeWidth={unlocked ? 2.2 : 1.3}
              strokeDasharray={unlocked ? undefined : '3 2.5'}
            />
          )}
          {domain === 'swe-data' && (
            <polygon
              points="32,4 58,24 49,56 15,56 6,24"
              fill={`url(#core-${uid})`}
              stroke={`url(#rim-${uid})`}
              strokeWidth={unlocked ? 2.2 : 1.3}
              strokeDasharray={unlocked ? undefined : '3 2.5'}
            />
          )}
          {domain === 'cloud-sec' && (
            <path
              d="M32 5 L53 13 L53 34 C53 47 43 55 32 59 C21 55 11 47 11 34 L11 13 Z"
              fill={`url(#core-${uid})`}
              stroke={`url(#rim-${uid})`}
              strokeWidth={unlocked ? 2.2 : 1.3}
              strokeDasharray={unlocked ? undefined : '3 2.5'}
            />
          )}
          {domain === 'quant-finance' && (
            <polygon
              points="32,4 52,16 58,34 46,56 18,56 6,34 12,16"
              fill={`url(#core-${uid})`}
              stroke={`url(#rim-${uid})`}
              strokeWidth={unlocked ? 2.2 : 1.3}
              strokeDasharray={unlocked ? undefined : '3 2.5'}
            />
          )}
          {domain === 'creative-3d' && (
            <polygon
              points="32,5 48,13 58,28 53,48 32,59 11,48 6,28 16,13"
              fill={`url(#core-${uid})`}
              stroke={`url(#rim-${uid})`}
              strokeWidth={unlocked ? 2.2 : 1.3}
              strokeDasharray={unlocked ? undefined : '3 2.5'}
            />
          )}
          {domain === 'business-polymath' && (
            <>
              <circle
                cx="32"
                cy="32"
                r="25"
                fill={`url(#core-${uid})`}
                stroke={`url(#rim-${uid})`}
                strokeWidth={unlocked ? 2.2 : 1.3}
                strokeDasharray={unlocked ? undefined : '3 2.5'}
              />
              <circle
                cx="32"
                cy="32"
                r="20"
                fill="none"
                stroke={secondary}
                strokeOpacity={unlocked ? 0.35 : 0.15}
                strokeWidth="1"
              />
            </>
          )}

          {/* Inner Domain Emblem */}
          {domain === 'ai-ml' && (
            <g
              stroke={unlocked ? '#F1F5F3' : '#52615A'}
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
              opacity={unlocked ? 1 : 0.45}
            >
              <circle cx="32" cy="32" r="5" fill={unlocked ? primary : 'none'} />
              <line x1="32" y1="16" x2="32" y2="27" />
              <line x1="20" y1="41" x2="28" y2="35" />
              <line x1="44" y1="41" x2="36" y2="35" />
              <circle cx="32" cy="15" r="2.2" fill={unlocked ? secondary : '#52615A'} />
              <circle cx="19" cy="42" r="2.2" fill={unlocked ? secondary : '#52615A'} />
              <circle cx="45" cy="42" r="2.2" fill={unlocked ? secondary : '#52615A'} />
            </g>
          )}

          {domain === 'swe-data' && (
            <g
              stroke={unlocked ? '#F1F5F3' : '#52615A'}
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={unlocked ? 1 : 0.45}
            >
              <polyline points="24,25 17,32 24,39" />
              <polyline points="40,25 47,32 40,39" />
              <line x1="34.5" y1="22" x2="29.5" y2="42" stroke={unlocked ? secondary : '#52615A'} />
            </g>
          )}

          {domain === 'cloud-sec' && (
            <g
              stroke={unlocked ? '#F1F5F3' : '#52615A'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={unlocked ? 1 : 0.45}
            >
              <rect x="23" y="29" width="18" height="13" rx="3" fill={unlocked ? '#0B1612' : 'none'} />
              <path d="M27 29 V24 A5 5 0 0 1 37 24 V29" />
              <circle cx="32" cy="35.5" r="1.8" fill={unlocked ? secondary : '#52615A'} stroke="none" />
            </g>
          )}

          {domain === 'quant-finance' && (
            <g
              stroke={unlocked ? '#F1F5F3' : '#52615A'}
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={unlocked ? 1 : 0.45}
            >
              <polyline points="19,40 27,31 33,35 44,22" stroke={unlocked ? secondary : '#52615A'} />
              <polyline points="38,22 44,22 44,28" stroke={unlocked ? secondary : '#52615A'} />
              <line x1="19" y1="44" x2="45" y2="44" />
            </g>
          )}

          {domain === 'creative-3d' && (
            <g
              stroke={unlocked ? '#F1F5F3' : '#52615A'}
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
              opacity={unlocked ? 1 : 0.45}
            >
              <polygon points="32,18 45,25 32,32 19,25" fill={unlocked ? primary : 'none'} fillOpacity="0.28" />
              <polygon points="19,25 32,32 32,47 19,40" />
              <polygon points="45,25 32,32 32,47 45,40" fill={unlocked ? secondary : 'none'} fillOpacity="0.22" />
            </g>
          )}

          {domain === 'business-polymath' && (
            <g
              stroke={unlocked ? '#F1F5F3' : '#52615A'}
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
              opacity={unlocked ? 1 : 0.45}
            >
              <polygon
                points="32,17 35.5,28.5 47,32 35.5,35.5 32,47 28.5,35.5 17,32 28.5,28.5"
                fill={unlocked ? secondary : 'none'}
                fillOpacity="0.3"
              />
              <circle cx="32" cy="32" r="2.2" fill={unlocked ? primary : '#52615A'} stroke="none" />
            </g>
          )}

          {/* Tier Crown Pips along Top Rim */}
          {pipAngles.map((deg, idx) => {
            const rad = ((deg - 90) * Math.PI) / 180;
            const r = 29;
            const cx = 32 + Math.cos(rad) * r;
            const cy = 32 + Math.sin(rad) * r;
            return (
              <polygon
                key={idx}
                points={`${cx},${cy - 2.6} ${cx + 2.4},${cy} ${cx},${cy + 2.6} ${cx - 2.4},${cy}`}
                fill={unlocked ? '#10B981' : '#3E4A43'}
                stroke="#090D0B"
                strokeWidth="0.8"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};
