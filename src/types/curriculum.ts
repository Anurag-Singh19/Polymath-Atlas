export type DomainId =
  | 'ai-ml'
  | 'swe-data'
  | 'cloud-sec'
  | 'quant-finance'
  | 'creative-3d'
  | 'business-polymath';

export interface DomainInfo {
  id: DomainId;
  name: string;
  shortName: string;
  tagline: string;
  accentHex: string;
  secondaryHex: string;
  position3D: [number, number, number];
}

export interface TopicResource {
  title: string;
  provider: string;
  url: string;
  kind: 'Docs' | 'Course' | 'Lab' | 'Guide' | 'Book';
}

export interface SkillTopic {
  id: string;
  title: string;
  summary: string;
  resources: TopicResource[];
}

export interface DayModule {
  id: string;
  dayRange: string;
  title: string;
  objective: string;
  topics: SkillTopic[];
}

export interface ResearchPaper {
  title: string;
  authors: string;
  year: number;
  venue: string;
  url: string;
  takeaway: string;
}

export interface SkillProject {
  title: string;
  tier: 'Required' | 'Scalable Capstone';
  scope: string;
  stack: string;
  resumeBullet: string;
}

export interface FreeCertification {
  name: string;
  issuer: string;
  url: string;
  costNote: string;
  focus: string;
}

export interface FlashcardItem {
  id: string;
  topicId: string;
  topicTitle: string;
  question: string;
  answer: string;
  difficulty: 'Core' | 'Applied' | 'Deep Dive';
}

export interface SkillNode {
  id: string;
  title: string;
  aliases?: string[];
  domain: DomainId;
  summary: string;
  estimatedDays: number;
  tier: 1 | 2 | 3 | 4;
  prerequisites: string[];
  unlocks: string[];
  cardHeightHint: 'compact' | 'medium' | 'tall';
  dayModules: DayModule[];
  papers: ResearchPaper[];
  projects: {
    required: SkillProject[];
    scalable: SkillProject[];
  };
  certifications: FreeCertification[];
  flashcards: FlashcardItem[];
  isCustom?: boolean;
}

export interface UserProgressState {
  completedTopicIds: Record<string, boolean>;
  masteredCardIds: Record<string, boolean>;
  bookmarkedItems: Record<string, boolean>;
  demoPolymathMode: boolean;
  customSkills?: SkillNode[];
}
