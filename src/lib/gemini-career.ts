import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export interface CareerSalaryBand {
  level: string;
  range: string;
  notes: string;
}

export interface CareerGroundingSource {
  title: string;
  url: string;
}

export interface CareerOutlookData {
  skillTitle: string;
  demandLevel: string;
  growthStat: string;
  marketSummary: string;
  salaryBands: CareerSalaryBand[];
  topHiringCompanies: {
    name: string;
    roleFocus: string;
  }[];
  commonJobTitles: string[];
  highRoiPairings: string[];
  sources: CareerGroundingSource[];
  fetchedAt: string;
}

const outlookCache = new Map<string, { data: CareerOutlookData; expiresAt: number }>();
const CACHE_TTL_MS = 1000 * 60 * 30;

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

export async function fetchCareerOutlook(
  skillId: string,
  skillTitle: string,
  domainName: string,
  forceRefresh = false
): Promise<CareerOutlookData> {
  const cacheKey = `${skillId}:${skillTitle.toLowerCase()}`;
  const cached = outlookCache.get(cacheKey);
  if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const ai = getGeminiClient();

  const prompt = `Use Google Search to gather current, real-time industry demand statistics, salary ranges, and top hiring companies for professionals specializing in "${skillTitle}" (domain: ${domainName}).

Respond ONLY with a valid JSON object (no commentary outside the JSON) matching this exact shape:
{
  "demandLevel": "High / Surging / Strong / Specialized",
  "growthStat": "Concise real-time demand metric or BLS/industry growth rate from search results",
  "marketSummary": "2-3 sentence synthesis of current hiring trends, market demand, and emerging skill shifts.",
  "salaryBands": [
    { "level": "Entry / Junior", "range": "$XXk - $XXXk", "notes": "Typical starting compensation note" },
    { "level": "Mid-Level", "range": "$XXXk - $XXXk", "notes": "2-5 yrs experience note" },
    { "level": "Senior / Staff / Principal", "range": "$XXXk - $XXXk+", "notes": "Total comp / equity note" }
  ],
  "topHiringCompanies": [
    { "name": "Company Name", "roleFocus": "Primary team or role hiring this skill" }
  ],
  "commonJobTitles": ["Role 1", "Role 2", "Role 3", "Role 4"],
  "highRoiPairings": ["Complementary Skill 1", "Complementary Skill 2", "Complementary Skill 3"]
}
Provide 6-8 real companies actively hiring in this space in topHiringCompanies.`;

  let response;
  try {
    response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        tools: [{ googleSearch: {} }],
      },
    });
  } catch (searchErr) {
    console.warn(
      'Career outlook Search grounding hit quota/error, falling back to model synthesis:',
      searchErr
    );
    response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
      },
    });
  }

  const text = (response.text ?? '').trim();
  const chunks =
    response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const seenUrls = new Set<string>();
  const sources: CareerGroundingSource[] = [];
  for (const chunk of chunks) {
    const uri = chunk.web?.uri;
    if (uri && !seenUrls.has(uri)) {
      seenUrls.add(uri);
      sources.push({
        title: chunk.web?.title || new URL(uri).hostname,
        url: uri,
      });
    }
  }

  let parsed: Record<string, unknown> = {};
  try {
    parsed = extractJsonObject(text);
  } catch {
    parsed = {
      demandLevel: 'Active Market',
      growthStat: 'Live Search Summary',
      marketSummary: text || `Current market overview for ${skillTitle}.`,
      salaryBands: [],
      topHiringCompanies: [],
      commonJobTitles: [],
      highRoiPairings: [],
    };
  }

  const result: CareerOutlookData = {
    skillTitle,
    demandLevel: String(parsed.demandLevel || 'Strong Demand'),
    growthStat: String(parsed.growthStat || 'Growing Industry Demand'),
    marketSummary: String(
      parsed.marketSummary || `Real-time career outlook data for ${skillTitle}.`
    ),
    salaryBands: Array.isArray(parsed.salaryBands)
      ? parsed.salaryBands.slice(0, 4).map((b: any) => ({
          level: String(b?.level || 'Role Level'),
          range: String(b?.range || 'Market Competitive'),
          notes: String(b?.notes || ''),
        }))
      : [],
    topHiringCompanies: Array.isArray(parsed.topHiringCompanies)
      ? parsed.topHiringCompanies.slice(0, 8).map((c: any) => ({
          name: String(c?.name || c || 'Tech Employer'),
          roleFocus: String(c?.roleFocus || skillTitle),
        }))
      : [],
    commonJobTitles: Array.isArray(parsed.commonJobTitles)
      ? parsed.commonJobTitles.slice(0, 6).map((t: unknown) => String(t))
      : [],
    highRoiPairings: Array.isArray(parsed.highRoiPairings)
      ? parsed.highRoiPairings.slice(0, 5).map((p: unknown) => String(p))
      : [],
    sources: sources.slice(0, 6),
    fetchedAt: new Date().toISOString(),
  };

  outlookCache.set(cacheKey, {
    data: result,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return result;
}
