import {
  GoogleGenAI,
  ThinkingLevel,
  type Content,
  type GenerateContentResponse,
} from '@google/genai';

export interface MentorTopicContext {
  id: string;
  dayRange: string;
  moduleTitle: string;
  title: string;
  summary: string;
  resourceTitles: string[];
}

export interface MentorHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

export interface MentorChatInput {
  skillTitle: string;
  domainName: string;
  tier: number;
  skillSummary: string;
  completedTopics: number;
  totalTopics: number;
  focusedTopic: MentorTopicContext | null;
  curriculumOutline: {
    dayRange: string;
    moduleTitle: string;
    topicTitles: string[];
  }[];
  history: MentorHistoryTurn[];
  message: string;
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

function sanitizeHistory(turns: MentorHistoryTurn[]): Content[] {
  const cleaned: MentorHistoryTurn[] = [];
  for (const turn of turns) {
    if (turn.role !== 'user' && turn.role !== 'model') continue;
    const text = typeof turn.text === 'string' ? turn.text.trim().slice(0, 4000) : '';
    if (!text) continue;

    const last = cleaned[cleaned.length - 1];
    if (!last) {
      if (turn.role === 'user') {
        cleaned.push({ role: 'user', text });
      }
      continue;
    }

    if (last.role === turn.role) {
      last.text = `${last.text}\n\n${text}`;
    } else {
      cleaned.push({ role: turn.role, text });
    }
  }

  // Ensure history ends on a 'model' turn because the current user message is sent next
  if (cleaned.length > 0 && cleaned[cleaned.length - 1].role === 'user') {
    cleaned.pop();
  }

  // Keep the most recent 12 turns (6 exchanges)
  const bounded = cleaned.slice(-12);
  while (bounded.length > 0 && bounded[0].role !== 'user') {
    bounded.shift();
  }

  return bounded.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));
}

export async function* streamSkillMentorReply(
  input: MentorChatInput
): AsyncGenerator<string, void, unknown> {
  const ai = getGeminiClient();

  const outlineText = input.curriculumOutline
    .slice(0, 12)
    .map(
      (mod) =>
        `- ${mod.dayRange} (${mod.moduleTitle}): ${mod.topicTitles.slice(0, 8).join('; ')}`
    )
    .join('\n');

  const focusBlock = input.focusedTopic
    ? `\nACTIVE FOCUSED TOPIC:
- Day Range: ${input.focusedTopic.dayRange} (${input.focusedTopic.moduleTitle})
- Topic: ${input.focusedTopic.title}
- Description: ${input.focusedTopic.summary}
- Attached Resources: ${
        input.focusedTopic.resourceTitles.length > 0
          ? input.focusedTopic.resourceTitles.join(', ')
          : 'Curriculum notes'
      }`
    : '\nACTIVE FOCUS: General skill overview across the full track.';

  const systemInstruction = `You are an expert, practical AI Mentor embedded inside the "${input.skillTitle}" curriculum page on Polymath Atlas.

SKILL CONTEXT:
- Discipline: ${input.skillTitle}
- Domain: ${input.domainName} (Tier ${input.tier})
- Summary: ${input.skillSummary}
- Learner Progress: ${input.completedTopics} of ${input.totalTopics} topics completed
${focusBlock}

CURRICULUM OUTLINE:
${outlineText || 'Standard multi-day track'}

MENTORING GUIDELINES:
1. Give crisp, insightful, context-aware answers anchored directly to "${input.skillTitle}"${
    input.focusedTopic ? ` and specifically "${input.focusedTopic.title}"` : ''
  }.
2. Explain mental models clearly first, then back them up with concrete code, equations, architecture examples, or domain scenarios when helpful.
3. Reference relevant topics or attached learning resources from the curriculum naturally when useful.
4. Keep formatting scannable: short paragraphs, concise bullet lists, and clean fenced code blocks when illustrating syntax or formulas.
5. Never invent fake URLs. If the learner asks for a check or practice, conclude with one focused follow-up question or micro-exercise they can try next.`;

  const history = sanitizeHistory(input.history);
  const chat = ai.chats.create({
    model: 'gemini-4-hydrogen',
    history,
    config: {
      systemInstruction,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    },
  });

  const stream = await chat.sendMessageStream({
    message: input.message.trim().slice(0, 2000),
  });

  for await (const chunk of stream) {
    const c = chunk as GenerateContentResponse;
    if (c.text) {
      yield c.text;
    }
  }
}
