import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import type { DomainId, SkillNode } from '../types/curriculum.ts';

export interface CatalogSkillBrief {
  id: string;
  title: string;
  domain: DomainId;
  tier: 1 | 2 | 3 | 4;
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please add your API key in Settings > Secrets.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 36);
  return base || `custom-skill-${Date.now()}`;
}

function ensureHttpsUrl(url: string | undefined, fallbackQuery: string): string {
  if (typeof url === 'string' && /^https?:\/\/.+/i.test(url.trim())) {
    return url.trim();
  }
  return `https://www.google.com/search?q=${encodeURIComponent(fallbackQuery)}`;
}

const VALID_DOMAINS: DomainId[] = [
  'ai-ml',
  'swe-data',
  'cloud-sec',
  'quant-finance',
  'creative-3d',
  'business-polymath',
];

function extractJsonObject(raw: string): Record<string, unknown> {
  const trimmed = raw.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;
  const firstBrace = candidate.indexOf('{');
  const lastBrace = candidate.lastIndexOf('}');
  const jsonSlice =
    firstBrace !== -1 && lastBrace > firstBrace
      ? candidate.slice(firstBrace, lastBrace + 1)
      : candidate;
  return JSON.parse(jsonSlice) as Record<string, unknown>;
}

const SKILL_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  required: [
    'title',
    'aliases',
    'domain',
    'summary',
    'estimatedDays',
    'tier',
    'prerequisites',
    'unlocks',
    'dayModules',
    'papers',
    'requiredProjects',
    'scalableProjects',
    'certifications',
    'flashcards',
  ],
  properties: {
    title: { type: Type.STRING },
    aliases: { type: Type.ARRAY, items: { type: Type.STRING } },
    domain: { type: Type.STRING },
    summary: { type: Type.STRING },
    estimatedDays: { type: Type.INTEGER },
    tier: { type: Type.INTEGER },
    prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } },
    unlocks: { type: Type.ARRAY, items: { type: Type.STRING } },
    dayModules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ['dayRange', 'title', 'objective', 'topics'],
        properties: {
          dayRange: { type: Type.STRING },
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          topics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ['title', 'summary', 'resources'],
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                resources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['title', 'provider', 'url', 'kind'],
                    properties: {
                      title: { type: Type.STRING },
                      provider: { type: Type.STRING },
                      url: { type: Type.STRING },
                      kind: { type: Type.STRING },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    papers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ['title', 'authors', 'year', 'venue', 'url', 'takeaway'],
        properties: {
          title: { type: Type.STRING },
          authors: { type: Type.STRING },
          year: { type: Type.INTEGER },
          venue: { type: Type.STRING },
          url: { type: Type.STRING },
          takeaway: { type: Type.STRING },
        },
      },
    },
    requiredProjects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ['title', 'scope', 'stack', 'resumeBullet'],
        properties: {
          title: { type: Type.STRING },
          scope: { type: Type.STRING },
          stack: { type: Type.STRING },
          resumeBullet: { type: Type.STRING },
        },
      },
    },
    scalableProjects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ['title', 'scope', 'stack', 'resumeBullet'],
        properties: {
          title: { type: Type.STRING },
          scope: { type: Type.STRING },
          stack: { type: Type.STRING },
          resumeBullet: { type: Type.STRING },
        },
      },
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ['name', 'issuer', 'url', 'costNote', 'focus'],
        properties: {
          name: { type: Type.STRING },
          issuer: { type: Type.STRING },
          url: { type: Type.STRING },
          costNote: { type: Type.STRING },
          focus: { type: Type.STRING },
        },
      },
    },
    flashcards: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ['topicIndex', 'question', 'answer', 'difficulty'],
        properties: {
          topicIndex: { type: Type.INTEGER },
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
          difficulty: { type: Type.STRING },
        },
      },
    },
  },
};

export async function generateCompleteSkillNode(
  skillName: string,
  existingCatalog: CatalogSkillBrief[],
  optionalFocus?: string
): Promise<SkillNode> {
  const ai = getGeminiClient();
  const cleanName = skillName.trim();

  // Pass 1: Ground real-time web resources, papers, and free certifications using Google Search
  const searchPrompt = `Research the discipline "${cleanName}"${
    optionalFocus ? ` (focus: ${optionalFocus})` : ''
  }.
Find real, currently active:
1. Authoritative free documentation, open university courses, interactive labs, or official guides (with exact URLs).
2. 3 foundational or seminal peer-reviewed research papers / arXiv papers / technical whitepapers (exact title, authors, year, venue, and arXiv/publisher URL).
3. 3 popular free or free-to-audit recognized certifications or credential tracks (exact platform name, issuer, and URL).
Summarize all findings clearly with exact URLs.`;

  let searchSummary = '';
  const groundedUrls: { title: string; url: string }[] = [];

  try {
    const searchResp = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: searchPrompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        tools: [{ googleSearch: {} }],
      },
    });
    searchSummary = (searchResp.text ?? '').trim().slice(0, 3500);
    const chunks =
      searchResp.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    for (const chunk of chunks) {
      if (chunk.web?.uri) {
        groundedUrls.push({
          title: chunk.web.title || chunk.web.uri,
          url: chunk.web.uri,
        });
      }
    }
  } catch (err) {
    console.warn('Search grounding fallback during skill generation:', err);
  }

  // Pass 2: Synthesize complete, strictly typed SkillNode linked to the existing roadmap
  const catalogListText =
    existingCatalog.length > 0
      ? existingCatalog
          .map((s) => `${s.id} | "${s.title}" | ${s.domain} | T${s.tier}`)
          .join('\n')
      : '(No existing catalog IDs supplied; return empty arrays for prerequisites and unlocks.)';

  const groundedContext =
    groundedUrls.length > 0
      ? `\nVerified Web URLs from Google Search:\n${groundedUrls
          .slice(0, 15)
          .map((g) => `- ${g.title}: ${g.url}`)
          .join('\n')}`
      : '';

  const structurePrompt = `Build a complete Polymath Atlas SkillNode JSON for "${cleanName}"${
    optionalFocus ? ` with emphasis on "${optionalFocus}"` : ''
  }. (Note: if the input has minor spelling variations like "Desigen", normalize the title cleanly while preserving the user's intent.)

Existing Atlas Skills (choose 1-3 valid prerequisite IDs and 1-2 unlock IDs from this exact list so the new skill connects naturally into the roadmap; use [] if none match):
${catalogListText}

Web Research Context:
${searchSummary || 'Use authoritative open-access documentation, arXiv papers, and free major platforms (freeCodeCamp, Coursera audit, edX audit, Google Cloud Skills Boost, Microsoft Learn, Kaggle, Hugging Face, MIT OCW).'}
${groundedContext}

Strict Requirements (ALL arrays must be non-empty, and all label fields must be crisp UI strings without parenthetical caveats, URLs, or "Note:" commentary):
- domain MUST be one of: "ai-ml", "swe-data", "cloud-sec", "quant-finance", "creative-3d", "business-polymath".
- tier MUST be 1, 2, 3, or 4 (matching difficulty relative to prerequisites).
- estimatedDays: integer between 10 and 21.
- dayModules: EXACTLY 3 progressive stages (e.g. "Days 1–4", "Days 5–9", "Days 10–14"). Each stage MUST contain 3 concrete topics (9 topics total). Every topic MUST include 2 real TopicResource objects (kind one of: "Docs", "Course", "Lab", "Guide", "Book") with valid https:// URLs and short provider names (e.g. "LearnOpenGL", "NVIDIA Developer", "MIT OCW").
- papers: 3 real, valid research papers or seminal technical papers with clean authors, numeric year, short venue (e.g. "SIGGRAPH 2023", "arXiv", "IEEE Transactions on Games"), https:// url, and concise takeaway.
- requiredProjects: 2 Required baseline projects, each with title, scope, stack, and a quantified resumeBullet.
- scalableProjects: 2 Scalable Capstone projects, each with title, scope, stack, and a quantified resumeBullet.
- certifications: 3 free or free-to-audit popular certifications with clean name, short issuer (e.g. "HarvardX / edX", "Coursera · Michigan State University", "Unity Learn"), https:// url, short costNote ("Free" or "Free to audit"), and concise focus.
- flashcards: 8 sharp Q&A cards, each linked to one of your generated topic indexes (topicIndex 0..8) and difficulty ("Core", "Applied", or "Deep Dive").`;

  let parsed: Record<string, any> | null = null;
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const structuredResp = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents:
          attempt === 0
            ? structurePrompt
            : `${structurePrompt}\n\nIMPORTANT: Ensure "dayModules" contains 3 stages and each stage has 3 "topics" with valid "resources".`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
          responseMimeType: 'application/json',
          responseSchema: SKILL_RESPONSE_SCHEMA,
        },
      });

      const rawText = (structuredResp.text ?? '').trim();
      if (!rawText) {
        throw new Error('Gemini returned an empty roadmap for this skill.');
      }

      const candidate = extractJsonObject(rawText);
      const hasTopics =
        Array.isArray(candidate.dayModules) &&
        candidate.dayModules.some(
          (m: any) => Array.isArray(m?.topics) && m.topics.length > 0
        );

      if (hasTopics) {
        parsed = candidate;
        break;
      }

      console.warn(
        `Skill generation attempt ${attempt + 1} returned empty dayModules/topics. FinishReason:`,
        structuredResp.candidates?.[0]?.finishReason
      );
      lastError = new Error('Could not generate day-by-day topics for this skill.');
    } catch (err) {
      lastError = err;
      console.warn(`Skill generation attempt ${attempt + 1} failed:`, err);
    }
  }

  if (!parsed) {
    throw lastError instanceof Error
      ? lastError
      : new Error('Could not generate day-by-day topics for this skill.');
  }

  const existingIds = new Set(existingCatalog.map((s) => s.id));
  let baseId = slugify(parsed.title || cleanName);
  if (existingIds.has(baseId)) {
    baseId = `${baseId}-${Math.floor(100 + Math.random() * 900)}`;
  }

  const domain: DomainId = VALID_DOMAINS.includes(parsed.domain)
    ? parsed.domain
    : 'swe-data';
  const rawTier = Number(parsed.tier);
  const tier: 1 | 2 | 3 | 4 =
    rawTier === 1 || rawTier === 2 || rawTier === 3 || rawTier === 4
      ? rawTier
      : 2;

  const prerequisites = Array.isArray(parsed.prerequisites)
    ? parsed.prerequisites
        .filter((id: unknown): id is string => typeof id === 'string' && existingIds.has(id))
        .slice(0, 3)
    : [];

  const unlocks = Array.isArray(parsed.unlocks)
    ? parsed.unlocks
        .filter(
          (id: unknown): id is string =>
            typeof id === 'string' && existingIds.has(id) && !prerequisites.includes(id)
        )
        .slice(0, 2)
    : [];

  const flatTopics: { id: string; title: string }[] = [];
  const validKinds = new Set(['Docs', 'Course', 'Lab', 'Guide', 'Book']);

  const dayModules = (Array.isArray(parsed.dayModules) ? parsed.dayModules : [])
    .slice(0, 4)
    .map((mod: any, mIdx: number) => {
      const modId = `${baseId}-d${mIdx + 1}`;
      const rawTopics = Array.isArray(mod?.topics) ? mod.topics : [];
      const topics = rawTopics.slice(0, 4).map((t: any, tIdx: number) => {
        const tId = `${baseId}-t${mIdx + 1}-${tIdx + 1}`;
        const tTitle = String(t?.title || `Topic ${tIdx + 1}`);
        flatTopics.push({ id: tId, title: tTitle });
        const resources = (Array.isArray(t?.resources) ? t.resources : [])
          .slice(0, 3)
          .map((r: any) => ({
            title: String(r?.title || `${tTitle} Guide`),
            provider: String(r?.provider || 'Official Docs'),
            url: ensureHttpsUrl(r?.url, `${cleanName} ${tTitle}`),
            kind: (validKinds.has(r?.kind) ? r.kind : 'Docs') as
              | 'Docs'
              | 'Course'
              | 'Lab'
              | 'Guide'
              | 'Book',
          }));
        if (resources.length === 0) {
          resources.push({
            title: `${tTitle} Reference`,
            provider: 'Open Documentation',
            url: ensureHttpsUrl(groundedUrls[0]?.url, `${cleanName} ${tTitle}`),
            kind: 'Docs',
          });
        }
        return {
          id: tId,
          title: tTitle,
          summary: String(t?.summary || `Master core concepts in ${tTitle}.`),
          resources,
        };
      });

      return {
        id: modId,
        dayRange: String(mod?.dayRange || `Stage ${mIdx + 1}`),
        title: String(mod?.title || `${cleanName} Phase ${mIdx + 1}`),
        objective: String(mod?.objective || `Build practical mastery in ${cleanName}.`),
        topics,
      };
    })
    .filter((mod) => mod.topics.length > 0);

  if (flatTopics.length === 0) {
    throw new Error('Could not generate day-by-day topics for this skill.');
  }

  const papers = (Array.isArray(parsed.papers) ? parsed.papers : [])
    .slice(0, 4)
    .map((p: any) => ({
      title: String(p?.title || `${cleanName} Foundations`),
      authors: String(p?.authors || 'Research Collective'),
      year: Number(p?.year) || 2023,
      venue: String(p?.venue || 'arXiv'),
      url: ensureHttpsUrl(p?.url, `${p?.title || cleanName} paper pdf`),
      takeaway: String(p?.takeaway || 'Core theoretical and empirical insights.'),
    }));

  const requiredProjects = (Array.isArray(parsed.requiredProjects) ? parsed.requiredProjects : [])
    .slice(0, 3)
    .map((p: any) => ({
      title: String(p?.title || `${cleanName} Core Implementation`),
      tier: 'Required' as const,
      scope: String(p?.scope || `Build a working baseline project in ${cleanName}.`),
      stack: String(p?.stack || cleanName),
      resumeBullet: String(
        p?.resumeBullet || `Engineered an end-to-end ${cleanName} baseline system with automated tests.`
      ),
    }));

  const scalableProjects = (Array.isArray(parsed.scalableProjects) ? parsed.scalableProjects : [])
    .slice(0, 3)
    .map((p: any) => ({
      title: String(p?.title || `Production ${cleanName} Capstone`),
      tier: 'Scalable Capstone' as const,
      scope: String(p?.scope || `Architect a scalable multi-user ${cleanName} platform.`),
      stack: String(p?.stack || cleanName),
      resumeBullet: String(
        p?.resumeBullet || `Architected and benchmarked a scalable ${cleanName} platform under production load.`
      ),
    }));

  const certifications = (Array.isArray(parsed.certifications) ? parsed.certifications : [])
    .slice(0, 4)
    .map((c: any) => ({
      name: String(c?.name || `${cleanName} Open Certificate`),
      issuer: String(c?.issuer || 'Open Learning Platform'),
      url: ensureHttpsUrl(c?.url, `${c?.name || cleanName} free certification`),
      costNote: String(c?.costNote || 'Free'),
      focus: String(c?.focus || `Core ${cleanName} verification`),
    }));

  const validDiffs = new Set(['Core', 'Applied', 'Deep Dive']);
  const flashcards = (Array.isArray(parsed.flashcards) ? parsed.flashcards : [])
    .slice(0, 10)
    .map((f: any, idx: number) => {
      const tIdx = Math.max(
        0,
        Math.min(flatTopics.length - 1, Number(f?.topicIndex) || idx % flatTopics.length)
      );
      const linkedTopic = flatTopics[tIdx];
      return {
        id: `${baseId}-fc-${idx + 1}`,
        topicId: linkedTopic.id,
        topicTitle: linkedTopic.title,
        question: String(f?.question || `What is the key mechanism in ${linkedTopic.title}?`),
        answer: String(f?.answer || `Core principle governing ${linkedTopic.title}.`),
        difficulty: (validDiffs.has(f?.difficulty) ? f.difficulty : 'Applied') as
          | 'Core'
          | 'Applied'
          | 'Deep Dive',
      };
    });

  return {
    id: baseId,
    title: String(parsed.title || cleanName),
    aliases: Array.isArray(parsed.aliases)
      ? parsed.aliases.filter((a: unknown): a is string => typeof a === 'string')
      : [cleanName],
    domain,
    summary: String(
      parsed.summary || `Structured roadmap covering ${cleanName} theory, projects, papers, and credentials.`
    ),
    estimatedDays: Math.min(28, Math.max(5, Number(parsed.estimatedDays) || 14)),
    tier,
    prerequisites,
    unlocks,
    cardHeightHint: 'medium',
    dayModules,
    papers,
    projects: {
      required: requiredProjects,
      scalable: scalableProjects,
    },
    certifications,
    flashcards,
    isCustom: true,
  };
}
