import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

export interface PlannerSkillContext {
  id: string;
  title: string;
  domainName: string;
  tier: number;
  summary: string;
  remainingTopics: {
    dayRange: string;
    title: string;
    summary: string;
    resourceTitles: string[];
  }[];
  topPapers: string[];
  topProjects: string[];
  topCerts: string[];
}

export interface StudyPlannerInput {
  skills: PlannerSkillContext[];
  dailyMinutes: number;
  targetDays: number;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Fast-Track Review';
  goalNote?: string;
}

export interface StudyPlanBlock {
  timeAllocation: string;
  activityType:
    | 'Concept'
    | 'Hands-On'
    | 'Paper Study'
    | 'Project Build'
    | 'Flashcard Review';
  title: string;
  actionSteps: string[];
  linkedResource: string;
}

export interface StudyPlanDay {
  dayNumber: number;
  dateLabel: string;
  focusSkill: string;
  sessionMinutes: number;
  objective: string;
  blocks: StudyPlanBlock[];
  deliverable: string;
}

export interface StudyPlanMilestone {
  afterDay: number;
  milestone: string;
  resumeArtifact: string;
}

export interface GeneratedStudyPlan {
  planTitle: string;
  strategySummary: string;
  estimatedTotalHours: number;
  weeklyCadenceNote: string;
  days: StudyPlanDay[];
  milestoneCheckpoints: StudyPlanMilestone[];
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

export async function generateStudyPlan(
  input: StudyPlannerInput
): Promise<GeneratedStudyPlan> {
  const ai = getGeminiClient();

  const systemInstruction = `You are a senior polymath curriculum architect for Polymath Atlas.
Create a realistic, high-density, actionable daily study roadmap tailored strictly to the user's daily time budget (${input.dailyMinutes} minutes/day), target span (${input.targetDays} days), experience level (${input.experienceLevel}), and remaining curriculum topics.
Rules:
1. Every day's blocks MUST sum accurately to roughly ${input.dailyMinutes} minutes (e.g. "20m", "25m", "15m").
2. Reference the actual topics, resources, research papers, projects, and free certifications provided in the skill context whenever possible.
3. Sequence prerequisites and core fundamentals before deep-dive papers or scalable capstone builds.
4. Include short Flashcard Review or active recall intervals so knowledge sticks.
5. Keep actionSteps concrete and verifiable (e.g. "Implement X", "Summarize section 3 of Y", "Pass quiz on Z").
6. Return strictly valid JSON matching the requested schema.`;

  const prompt = JSON.stringify(
    {
      dailyMinutesAvailable: input.dailyMinutes,
      totalDaysToPlan: input.targetDays,
      experienceLevel: input.experienceLevel,
      userGoal: input.goalNote?.trim() || 'Build resume-ready mastery and complete projects',
      chosenSkills: input.skills,
    },
    null,
    2
  );

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Build a personalized ${input.targetDays}-day study plan at ${input.dailyMinutes} minutes per day using this curriculum context:\n\n${prompt}`,
    config: {
      systemInstruction,
      thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: [
          'planTitle',
          'strategySummary',
          'estimatedTotalHours',
          'weeklyCadenceNote',
          'days',
          'milestoneCheckpoints',
        ],
        properties: {
          planTitle: {
            type: Type.STRING,
            description: 'Crisp title for this personalized study roadmap.',
          },
          strategySummary: {
            type: Type.STRING,
            description: '2-3 sentence overview of how the chosen skills and time budget are paced.',
          },
          estimatedTotalHours: {
            type: Type.NUMBER,
            description: 'Total study hours across the full schedule.',
          },
          weeklyCadenceNote: {
            type: Type.STRING,
            description: 'Practical tip on balancing theory, projects, papers, and recall.',
          },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: [
                'dayNumber',
                'dateLabel',
                'focusSkill',
                'sessionMinutes',
                'objective',
                'blocks',
                'deliverable',
              ],
              properties: {
                dayNumber: { type: Type.INTEGER },
                dateLabel: { type: Type.STRING },
                focusSkill: { type: Type.STRING },
                sessionMinutes: { type: Type.INTEGER },
                objective: { type: Type.STRING },
                blocks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: [
                      'timeAllocation',
                      'activityType',
                      'title',
                      'actionSteps',
                      'linkedResource',
                    ],
                    properties: {
                      timeAllocation: { type: Type.STRING },
                      activityType: { type: Type.STRING },
                      title: { type: Type.STRING },
                      actionSteps: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      linkedResource: { type: Type.STRING },
                    },
                  },
                },
                deliverable: { type: Type.STRING },
              },
            },
          },
          milestoneCheckpoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ['afterDay', 'milestone', 'resumeArtifact'],
              properties: {
                afterDay: { type: Type.INTEGER },
                milestone: { type: Type.STRING },
                resumeArtifact: { type: Type.STRING },
              },
            },
          },
        },
      },
    },
  });

  const rawText = (response.text ?? '').trim();
  if (!rawText) {
    throw new Error('Gemini returned an empty response while generating the study plan.');
  }

  try {
    const parsed = JSON.parse(rawText) as GeneratedStudyPlan;
    return {
      planTitle: parsed.planTitle || 'Personalized Polymath Study Plan',
      strategySummary: parsed.strategySummary || '',
      estimatedTotalHours:
        typeof parsed.estimatedTotalHours === 'number'
          ? parsed.estimatedTotalHours
          : Number(((input.dailyMinutes * input.targetDays) / 60).toFixed(1)),
      weeklyCadenceNote: parsed.weeklyCadenceNote || '',
      days: Array.isArray(parsed.days) ? parsed.days : [],
      milestoneCheckpoints: Array.isArray(parsed.milestoneCheckpoints)
        ? parsed.milestoneCheckpoints
        : [],
    };
  } catch (parseErr) {
    console.error('Failed to parse Gemini study plan JSON:', parseErr, rawText);
    throw new Error('Failed to parse generated study roadmap. Please try again.');
  }
}
