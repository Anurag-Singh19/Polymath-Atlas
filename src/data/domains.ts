import { DomainInfo } from '../types/curriculum';

export const DOMAINS: DomainInfo[] = [
  {
    id: 'ai-ml',
    name: 'AI, Deep Learning & Agentic Systems',
    shortName: 'AI & ML',
    tagline: 'From statistical learning and neural architectures to LLMs, agentic loops, and MLOps.',
    accentHex: '#38BDF8',
    secondaryHex: '#10B981',
    position3D: [0, 3.1, 2.2],
  },
  {
    id: 'swe-data',
    name: 'Software, Data & Systems Engineering',
    shortName: 'Systems & Data',
    tagline: 'Python, DSA, C++, SQL, full-stack architecture, data pipelines, QA, and system design.',
    accentHex: '#10B981',
    secondaryHex: '#34D399',
    position3D: [-3.2, 1.3, 1.4],
  },
  {
    id: 'cloud-sec',
    name: 'Cloud, DevOps, Networks & Security',
    shortName: 'Cloud & Security',
    tagline: 'Distributed cloud infrastructure, CI/CD, packet-level networking, and offensive/defensive security.',
    accentHex: '#60A5FA',
    secondaryHex: '#38BDF8',
    position3D: [-2.8, -2.0, -1.6],
  },
  {
    id: 'quant-finance',
    name: 'Quantitative Finance & Capital Markets',
    shortName: 'Quant & Capital',
    tagline: 'Quant engineering, algorithmic trading, fintech, IB, PE, VC, fund and asset management.',
    accentHex: '#F59E0B',
    secondaryHex: '#38BDF8',
    position3D: [3.2, 1.2, -1.4],
  },
  {
    id: 'creative-3d',
    name: '3D Graphics, Game Dev, Media & Robotics',
    shortName: 'Creative & Robotics',
    tagline: 'UI/UX systems, Blender rendering, game engines, cinematography, sound, and physical robotics.',
    accentHex: '#A78BFA',
    secondaryHex: '#38BDF8',
    position3D: [2.9, -2.1, 1.7],
  },
  {
    id: 'business-polymath',
    name: 'Product, Operations, Sales & Languages',
    shortName: 'Strategy & Fluency',
    tagline: 'Product discovery, Excel back-office rigor, freelance economics, sales, events, and French & Spanish.',
    accentHex: '#2DD4BF',
    secondaryHex: '#FBBF24',
    position3D: [0, -3.1, -2.1],
  },
];

export const DOMAIN_MAP = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<
  DomainInfo['id'],
  DomainInfo
>;
