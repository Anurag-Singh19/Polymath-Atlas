# Polymath Atlas

Dark-themed, interactive 3D skill roadmap, connected skill tree flowchart, adaptive topic-filtered flashcards, and resume-ready credential vault covering 45 cross-disciplinary skill tracks.

## Project Structure

```text
.
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD workflow
├── public/CNAME                   # Custom domain mapping (run-on.dev)
├── index.html                     # HTML entry point & fonts
├── package.json                   # Dependencies & npm scripts
├── server.ts                      # Express server + Vite dev middleware + /api/progress
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                    # Root app, routing, & progress sync
    ├── main.tsx                   # React entry with AuthProvider
    ├── index.css                  # Tailwind CSS + dark theme & 3D flip styles
    ├── types/curriculum.ts        # TypeScript data models
    ├── contexts/AuthContext.tsx   # Firebase Google Sign-In context
    ├── lib/
    │   ├── firebase.ts            # Firebase Web SDK initialization
    │   └── firebase-admin.ts      # Firebase Admin token verification
    ├── middleware/auth.ts         # Express requireAuth middleware
    ├── db/
    │   ├── schema.ts              # Drizzle PostgreSQL schema (users, user_progress)
    │   ├── index.ts               # pg.Pool + Drizzle ORM instance
    │   ├── progress.ts            # User & progress repository helpers
    │   └── drizzle.config.ts      # Drizzle Kit configuration
    ├── data/
    │   ├── domains.ts             # 6 domain clusters & 3D spatial coordinates
    │   ├── index.ts               # Exports ALL_SKILLS, SKILL_MAP, completion helpers
    │   └── skills*.ts             # 45 skill roadmaps (days, resources, papers, projects, certs, cards)
    └── components/
        ├── Navbar.tsx
        ├── HeroConstellation3D.tsx
        ├── PolymathMeter.tsx
        ├── PinterestMasonryGrid.tsx
        ├── SkillTreeFlowchart.tsx
        ├── DetailedSkillFlowchart.tsx
        ├── SkillDetailPage.tsx
        ├── AdaptiveFlashcards.tsx
        └── ResumeVaultPage.tsx
```

## Run Locally

```bash
npm install
npm run dev
```

For static frontend production build (outputs to `dist/`):

```bash
npm run build
```

## Environment Variables (Full-Stack Server)

When running `server.ts` with PostgreSQL:
- `SQL_HOST`
- `SQL_DB_NAME`
- `SQL_USER`
- `SQL_PASSWORD`
- `SQL_ADMIN_USER` (migrations)
- `SQL_ADMIN_PASSWORD` (migrations)

When deployed statically (e.g. GitHub Pages on `run-on.dev`), progress automatically persists in browser `localStorage`.
