import 'dotenv/config';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '1mb' }));

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
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to generate complete skill roadmap right now.';
      const status = message.includes('GEMINI_API_KEY')
        ? 503
        : message.includes('429') || message.includes('RESOURCE_EXHAUSTED')
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
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to fetch live career outlook right now.';
      const status = message.includes('GEMINI_API_KEY')
        ? 503
        : message.includes('429') || message.includes('RESOURCE_EXHAUSTED')
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
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to generate study roadmap right now.';
      const status = message.includes('GEMINI_API_KEY')
        ? 503
        : message.includes('429') || message.includes('RESOURCE_EXHAUSTED')
        ? 429
        : 500;
      res.status(status).json({ error: message });
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

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
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

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
