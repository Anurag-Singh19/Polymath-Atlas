import 'dotenv/config';
import http from 'node:http';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { requireAuth, type AuthRequest } from './src/middleware/auth.ts';
import { getUserProgress, saveUserProgress } from './src/db/progress.ts';
import {
  generateStudyPlan,
  type PlannerSkillContext,
} from './src/lib/gemini-planner.ts';
import {
  generateCompleteSkillNode,
  type CatalogSkillBrief,
} from './src/lib/gemini-skill-generator.ts';
import { fetchCareerOutlook } from './src/lib/gemini-career.ts';
import {
  streamSkillMentorReply,
  type MentorHistoryTurn,
  type MentorTopicContext,
} from './src/lib/gemini-mentor.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '1mb' }));

  const formatApiError = (error: unknown, fallback: string): string => {
    const raw = error instanceof Error ? error.message : fallback;
    if (raw.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.error?.message === 'string') {
          return parsed.error.message;
        }
      } catch {
        // Keep raw fallback
      }
    }
    return raw || fallback;
  };

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/skills/generate', async (req, res) => {
    const body = req.body || {};
    const skillName =
      typeof body.skillName === 'string' ? body.skillName.trim().slice(0, 100) : '';
    const optionalFocus =
      typeof body.optionalFocus === 'string'
        ? body.optionalFocus.trim().slice(0, 200)
        : '';
    const existingCatalog = Array.isArray(body.existingCatalog)
      ? (body.existingCatalog.slice(0, 80) as CatalogSkillBrief[])
      : [];

    if (!skillName || skillName.length < 2) {
      res.status(400).json({ error: 'Please enter a valid skill name.' });
      return;
    }

    try {
      const skillNode = await generateCompleteSkillNode(
        skillName,
        existingCatalog,
        optionalFocus
      );
      res.json(skillNode);
    } catch (error) {
      console.error('Gemini skill generation error:', error);
      const message = formatApiError(
        error,
        'Unable to generate complete skill roadmap right now.'
      );
      const status = message.includes('GEMINI_API_KEY')
        ? 503
        : message.includes('429') || message.includes('RESOURCE_EXHAUSTED') || message.toLowerCase().includes('quota')
        ? 429
        : 500;
      res.status(status).json({ error: message });
    }
  });

  app.post('/api/career-outlook', async (req, res) => {
    const body = req.body || {};
    const skillId =
      typeof body.skillId === 'string' ? body.skillId.trim().slice(0, 80) : '';
    const skillTitle =
      typeof body.skillTitle === 'string'
        ? body.skillTitle.trim().slice(0, 120)
        : '';
    const domainName =
      typeof body.domainName === 'string'
        ? body.domainName.trim().slice(0, 120)
        : 'Technology';
    const forceRefresh = Boolean(body.forceRefresh);

    if (!skillTitle) {
      res.status(400).json({ error: 'Skill title is required.' });
      return;
    }

    try {
      const outlook = await fetchCareerOutlook(
        skillId || skillTitle,
        skillTitle,
        domainName,
        forceRefresh
      );
      res.json(outlook);
    } catch (error) {
      console.error('Gemini career outlook error:', error);
      const message = formatApiError(
        error,
        'Unable to fetch live career outlook right now.'
      );
      const status = message.includes('GEMINI_API_KEY')
        ? 503
        : message.includes('429') || message.includes('RESOURCE_EXHAUSTED') || message.toLowerCase().includes('quota')
        ? 429
        : 500;
      res.status(status).json({ error: message });
    }
  });

  app.post('/api/study-planner', async (req, res) => {
    const body = req.body || {};
    const skills = Array.isArray(body.skills)
      ? (body.skills.slice(0, 3) as PlannerSkillContext[])
      : [];
    const dailyMinutes = Math.min(360, Math.max(15, Number(body.dailyMinutes) || 60));
    const targetDays = Math.min(21, Math.max(3, Number(body.targetDays) || 7));
    const experienceLevel =
      body.experienceLevel === 'Intermediate' ||
      body.experienceLevel === 'Fast-Track Review'
        ? body.experienceLevel
        : 'Beginner';
    const goalNote = typeof body.goalNote === 'string' ? body.goalNote.slice(0, 240) : '';

    if (skills.length === 0) {
      res.status(400).json({ error: 'Select at least one skill discipline to plan.' });
      return;
    }

    try {
      const plan = await generateStudyPlan({
        skills,
        dailyMinutes,
        targetDays,
        experienceLevel,
        goalNote,
      });
      res.json(plan);
    } catch (error) {
      console.error('Gemini study planner error:', error);
      const message = formatApiError(
        error,
        'Unable to generate study roadmap right now.'
      );
      const status = message.includes('GEMINI_API_KEY')
        ? 503
        : message.includes('429') || message.includes('RESOURCE_EXHAUSTED') || message.toLowerCase().includes('quota')
        ? 429
        : 500;
      res.status(status).json({ error: message });
    }
  });

  app.post('/api/mentor-chat', async (req, res) => {
    const body = req.body || {};
    const skillTitle =
      typeof body.skillTitle === 'string' ? body.skillTitle.trim().slice(0, 120) : '';
    const domainName =
      typeof body.domainName === 'string'
        ? body.domainName.trim().slice(0, 120)
        : 'Technology';
    const tier = Math.min(3, Math.max(1, Number(body.tier) || 1));
    const skillSummary =
      typeof body.skillSummary === 'string' ? body.skillSummary.trim().slice(0, 800) : '';
    const completedTopics = Math.max(0, Number(body.completedTopics) || 0);
    const totalTopics = Math.max(0, Number(body.totalTopics) || 0);
    const message =
      typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : '';

    if (!skillTitle || !message) {
      res.status(400).json({ error: 'Skill title and question message are required.' });
      return;
    }

    const rawTopic = body.focusedTopic;
    const focusedTopic: MentorTopicContext | null =
      rawTopic && typeof rawTopic === 'object' && typeof rawTopic.title === 'string'
        ? {
            id: typeof rawTopic.id === 'string' ? rawTopic.id.slice(0, 100) : 'topic',
            dayRange:
              typeof rawTopic.dayRange === 'string'
                ? rawTopic.dayRange.slice(0, 40)
                : 'Day Module',
            moduleTitle:
              typeof rawTopic.moduleTitle === 'string'
                ? rawTopic.moduleTitle.slice(0, 140)
                : '',
            title: rawTopic.title.slice(0, 160),
            summary:
              typeof rawTopic.summary === 'string' ? rawTopic.summary.slice(0, 600) : '',
            resourceTitles: Array.isArray(rawTopic.resourceTitles)
              ? rawTopic.resourceTitles
                  .filter((r: unknown): r is string => typeof r === 'string')
                  .slice(0, 6)
              : [],
          }
        : null;

    const curriculumOutline = Array.isArray(body.curriculumOutline)
      ? body.curriculumOutline
          .slice(0, 12)
          .map((mod: unknown) => {
            const m = mod as Record<string, unknown>;
            return {
              dayRange: typeof m?.dayRange === 'string' ? m.dayRange.slice(0, 40) : '',
              moduleTitle:
                typeof m?.moduleTitle === 'string' ? m.moduleTitle.slice(0, 120) : '',
              topicTitles: Array.isArray(m?.topicTitles)
                ? m.topicTitles
                    .filter((t: unknown): t is string => typeof t === 'string')
                    .slice(0, 8)
                : [],
            };
          })
      : [];

    const history: MentorHistoryTurn[] = Array.isArray(body.history)
      ? body.history.slice(-14).map((h: unknown) => {
          const item = h as Record<string, unknown>;
          return {
            role: item?.role === 'model' ? 'model' : 'user',
            text: typeof item?.text === 'string' ? item.text : '',
          };
        })
      : [];

    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured. Please add your API key in Settings > Secrets.',
      });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    let clientClosed = false;
    res.on('close', () => {
      if (!res.writableEnded) {
        clientClosed = true;
      }
    });

    try {
      for await (const delta of streamSkillMentorReply({
        skillTitle,
        domainName,
        tier,
        skillSummary,
        completedTopics,
        totalTopics,
        focusedTopic,
        curriculumOutline,
        history,
        message,
      })) {
        if (clientClosed) break;
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }

      if (!clientClosed) {
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      }
    } catch (error) {
      console.error('Gemini mentor chat error:', error);
      const errMsg = formatApiError(
        error,
        'Unable to reach Skill Mentor right now.'
      );
      if (!clientClosed) {
        res.write(`data: ${JSON.stringify({ error: errMsg })}\n\n`);
        res.end();
      }
    }
  });

  app.get('/api/progress', requireAuth, async (req: AuthRequest, res) => {
    if (!req.user?.uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const data = await getUserProgress(
        req.user.uid,
        req.user.email || '',
        typeof req.user.name === 'string' ? req.user.name : null
      );
      res.json(data);
    } catch (error) {
      console.error('Failed to load user progress:', error);
      res.status(500).json({ error: 'Failed to load learning progress.' });
    }
  });

  app.put('/api/progress', requireAuth, async (req: AuthRequest, res) => {
    if (!req.user?.uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const saved = await saveUserProgress(
        req.user.uid,
        req.user.email || '',
        typeof req.user.name === 'string' ? req.user.name : null,
        req.body || {}
      );
      res.json(saved);
    } catch (error) {
      console.error('Failed to save user progress:', error);
      res.status(500).json({ error: 'Failed to save learning progress.' });
    }
  });

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API route not found.' });
  });

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({ error: 'Invalid JSON request body.' });
        return;
      }
      next(err);
    }
  );

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        ws: { server: httpServer },
        hmr: process.env.DISABLE_HMR === 'true' ? false : true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
