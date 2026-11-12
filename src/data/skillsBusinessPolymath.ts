import { SkillNode } from '../types/curriculum';

export const SKILLS_BUSINESS_POLYMATH: SkillNode[] = [
  {
    id: 'product-thinking',
    title: 'Product Thinking & Requirements',
    aliases: ['Product thinking & requirements', 'Product Management', 'PRDs', 'JTBD'],
    domain: 'business-polymath',
    summary:
      'Jobs-To-Be-Done discovery, crisp PRD authoring, North Star & retention metrics, RICE prioritization, edge-case specs, and hypothesis testing.',
    estimatedDays: 8,
    tier: 1,
    prerequisites: [],
    unlocks: ['ui-ux-design', 'venture-capital', 'forward-deployed-eng', 'full-stack-mern-mean'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'pt-d1',
        dayRange: 'Day 1 – 2',
        title: 'User Discovery & Jobs-To-Be-Done (JTBD)',
        objective: 'Separate feature requests from root customer problems via Mom Test interviewing.',
        topics: [
          {
            id: 'pt-t1',
            title: 'JTBD Framing, Problem Statements & Non-Leading Discovery',
            summary: 'Interview past behavior rather than hypothetical future promises.',
            resources: [
              { title: 'SVPG Product Thinking Articles', provider: 'Marty Cagan / SVPG', url: 'https://www.svpg.com/articles/', kind: 'Guide' },
              { title: 'YC How to Talk to Users', provider: 'Y Combinator', url: 'https://www.ycombinator.com/library/6g-how-to-talk-to-users', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'pt-d2',
        dayRange: 'Day 3 – 4',
        title: 'PRDs, Acceptance Criteria & Edge Cases',
        objective: 'Write unambiguous engineering-ready requirements with non-goals and failure states.',
        topics: [
          {
            id: 'pt-t2',
            title: 'One-Page PRDs, Explicit Non-Goals & State-Transition Specs',
            summary: 'Define empty, loading, error, offline, and permission boundaries upfront.',
            resources: [
              { title: 'Lenny’s Product Management Templates', provider: 'Lenny’s Newsletter', url: 'https://www.lennysnewsletter.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'pt-d3',
        dayRange: 'Day 5 – 6',
        title: 'Metrics Trees & Prioritization',
        objective: 'Connect input levers to North Star retention and avoid vanity metrics.',
        topics: [
          {
            id: 'pt-t3',
            title: 'North Star Metric Trees, Guardrail Metrics & RICE Scoring',
            summary: 'Pair conversion/growth KPIs with latency, churn, or support-ticket guardrails.',
            resources: [
              { title: 'Amplitude North Star Playbook', provider: 'Amplitude', url: 'https://amplitude.com/books/north-star', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'pt-d4',
        dayRange: 'Day 7 – 8',
        title: 'Experimentation & A/B Hypothesis Design',
        objective: 'Calculate sample sizes, avoid peeking bias, and ship validated learnings.',
        topics: [
          {
            id: 'pt-t4',
            title: 'A/B Test Power, Guardrail Trade-offs & Post-Launch Reviews',
            summary: 'Evaluate novelty effects and segment-level cannibalization.',
            resources: [
              { title: 'Ron Kohavi: Trustworthy Online Controlled Experiments Guide', provider: 'Exp-Platform', url: 'https://exp-platform.com/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Online Controlled Experiments at Large Scale',
        authors: 'Ron Kohavi, Alex Deng, Brian Frasca, Toby Walker, Ya Xu, Nils Pohlmann',
        year: 2013,
        venue: 'ACM KDD',
        url: 'https://exp-platform.com/Documents/2013-08-KDD-ControlledExperimentsAtScale.pdf',
        takeaway: 'Demonstrates why most intuitive product ideas fail to move target metrics and how OECs prevent local optimization.',
      },
      {
        title: 'Know Your Customers’ "Jobs to Be Done"',
        authors: 'Clayton M. Christensen, Taddy Hall, Karen Dillon, David S. Duncan',
        year: 2016,
        venue: 'Harvard Business Review',
        url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done',
        takeaway: 'Replaces demographic segmentation with causal functional/emotional progress jobs.',
      },
      {
        title: 'Product Discovery vs. Delivery in Modern Software Teams',
        authors: 'Teresa Torres / Marty Cagan Literature',
        year: 2021,
        venue: 'Continuous Discovery Frameworks',
        url: 'https://www.producttalk.org/',
        takeaway: 'Opportunity Solution Trees align business outcomes with customer opportunities before committing engineering sprints.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Engineering-Ready 1-Pager PRD + State Matrix',
          tier: 'Required',
          scope: 'Author a complete PRD for an AI or SaaS feature covering JTBD, non-goals, Gherkin acceptance criteria, and error states.',
          stack: 'Markdown, Mermaid Sequence Diagrams, Figma Wireframe',
          resumeBullet: 'Authored engineering-ready PRDs with explicit non-goals, state-transition matrices, and telemetry specs cutting scope creep by 40%.',
        },
        {
          title: 'Product Tear-Down & North Star Metric Tree',
          tier: 'Required',
          scope: 'Deconstruct a live product’s onboarding funnel, identify drop-off hypotheses, and design an A/B experiment spec.',
          stack: 'SQL/Analytics Spec, Miro/FigJam',
          resumeBullet: 'Designed North Star metric tree and A/B test specification targeting a +12% D7 onboarding activation lift.',
        },
      ],
      scalable: [
        {
          title: '0-to-1 Opportunity Solution Tree & Beta Launch Dossier',
          tier: 'Scalable Capstone',
          scope: 'Synthesize 10 user discovery interviews into prioritized MVP bets, instrumentation events, and launch playbook.',
          stack: 'Product Analytics Spec, PostHog/Amplitude schema',
          resumeBullet: 'Led 0-to-1 discovery across 10 user interviews translating insights into instrumented MVP specs and retention dashboards.',
        },
      ],
    },
    certifications: [
      { name: 'Digital Product Management: Modern Fundamentals (Free Audit)', issuer: 'University of Virginia (Darden) via Coursera', url: 'https://www.coursera.org/learn/uva-darden-digital-product-management', costNote: 'Free Audit', focus: 'Hypothesis-driven product discovery and roadmapping' },
      { name: 'Pendo / Mind the Product Free Product Basics', issuer: 'Pendo & Mind the Product', url: 'https://www.pendo.io/pendo-academy/', costNote: '100% Free Badge', focus: 'Product analytics, adoption, and feedback loops' },
      { name: 'Amplitude North Star Playbook & Academy', issuer: 'Amplitude', url: 'https://academy.amplitude.com/', costNote: '100% Free Courses', focus: 'Product metrics trees and behavioral cohorts' },
    ],
    flashcards: [
      { id: 'pt-fc1', topicId: 'pt-t1', topicTitle: 'The Mom Test', question: 'Why is asking "Would you pay $20/mo for an app that does X?" useless in customer discovery?', answer: 'People give polite hypothetical answers; ask instead how they currently solve the problem and what they spent time/money on last week.', difficulty: 'Core' },
      { id: 'pt-fc2', topicId: 'pt-t2', topicTitle: 'Explicit Non-Goals', question: 'Why is an explicit "Non-Goals / Out of Scope" section essential in every PRD?', answer: 'It aligns engineering, design, and stakeholders upfront on boundaries so scope creep does not derail delivery dates.', difficulty: 'Core' },
      { id: 'pt-fc3', topicId: 'pt-t3', topicTitle: 'Guardrail Metrics', question: 'Why must every optimization experiment define Guardrail Metrics alongside the primary target metric?', answer: 'Optimizing click-through rate alone can destroy page load speed, refund rates, or long-term retention.', difficulty: 'Applied' },
      { id: 'pt-fc4', topicId: 'pt-t4', topicTitle: 'Peeking Bias', question: 'Why is stopping an A/B test early the moment p < 0.05 statistically invalid?', answer: 'Repeatedly checking significance inflates false-positive rates dramatically unless sequential testing corrections are used.', difficulty: 'Deep Dive' },
      { id: 'pt-fc5', topicId: 'pt-t3', topicTitle: 'Vanity vs Actionable Metrics', question: 'Give an example of a vanity metric vs an actionable cohort metric.', answer: 'Total cumulative signups only goes up (vanity); Week-4 cohort retention of activated accounts measures real product-market fit.', difficulty: 'Core' },
      { id: 'pt-fc6', topicId: 'pt-t2', topicTitle: 'Acceptance Criteria', question: 'What makes a requirement testable by QA?', answer: 'Concrete Given/When/Then criteria specifying preconditions, user actions, exact outputs, and boundary/error behavior.', difficulty: 'Applied' },
      { id: 'pt-fc7', topicId: 'pt-t1', topicTitle: 'Output vs Outcome', question: 'Contrast an output roadmap with an outcome roadmap.', answer: 'Output: "Ship dark mode in Q2." Outcome: "Reduce nighttime mobile session drop-off by 15%."', difficulty: 'Core' },
      { id: 'pt-fc8', topicId: 'pt-t4', topicTitle: 'Novelty Effect', question: 'Why can a new UI redesign win an A/B test in Week 1 and lose by Week 4?', answer: 'Users click new elements out of curiosity (novelty effect) before reverting to baseline habits.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'excel-back-office',
    title: 'Excel & Back Office Operations',
    aliases: ['Excel & back office', 'excel & backoffice', 'Financial Spreadsheets', 'Ops Reconciliation'],
    domain: 'business-polymath',
    summary:
      'Power Query ETL, XLOOKUP/INDEX-MATCH, dynamic array formulas (FILTER/LET/LAMBDA), PivotTables, SOP automation, and back-office audit controls.',
    estimatedDays: 8,
    tier: 1,
    prerequisites: [],
    unlocks: ['data-analysis', 'investment-banking', 'private-equity', 'asset-management'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'ex-d1',
        dayRange: 'Day 1 – 2',
        title: 'Modern Lookup & Dynamic Array Formulas',
        objective: 'Replace brittle VLOOKUPs with XLOOKUP, SUMIFS, FILTER, UNIQUE, and LET.',
        topics: [
          {
            id: 'ex-t1',
            title: 'XLOOKUP, INDEX/MATCH, SUMIFS & Dynamic Array Spills',
            summary: 'Zero-hardcoding workbook architecture with separated input/calc/output tabs.',
            resources: [
              { title: 'Microsoft Excel Official Formula Guides', provider: 'Microsoft Support', url: 'https://support.microsoft.com/en-us/excel', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ex-d2',
        dayRange: 'Day 3 – 4',
        title: 'Power Query ETL & Data Cleaning',
        objective: 'Automate repeatable CSV/ERP ingestion, unpivoting, and merge joins without manual copy-paste.',
        topics: [
          {
            id: 'ex-t2',
            title: 'Power Query M Transformations, Unpivot & Folder Ingestion',
            summary: 'One-click monthly close refresh pipelines for messy operational exports.',
            resources: [
              { title: 'Microsoft Learn: Power Query Documentation', provider: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/power-query/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ex-d3',
        dayRange: 'Day 5 – 6',
        title: 'PivotTables, Reconciliation & Audit Checks',
        objective: 'Build automated tie-out checks, variance waterfalls, and error-trapped KPI packs.',
        topics: [
          {
            id: 'ex-t3',
            title: 'PivotTables, Reconciliation Tie-Outs & Data Validation Controls',
            summary: 'Enforce strict balance-check banners ("OK" vs "VARIANCE DETECTED") on every report.',
            resources: [
              { title: 'ExcelJet Function & Shortcut Reference', provider: 'ExcelJet', url: 'https://exceljet.net/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ex-d4',
        dayRange: 'Day 7 – 8',
        title: 'Back-Office SOPs, SLA Tracking & Automation',
        objective: 'Standardize AP/AR invoicing, vendor onboarding, compliance checklists, and Office Scripts.',
        topics: [
          {
            id: 'ex-t4',
            title: 'Back-Office Workflow SOPs, Exception Queues & Automated Reporting',
            summary: 'Eliminate manual email bottlenecks with structured intake sheets and audit logs.',
            resources: [
              { title: 'CFI Free Excel Crash Course', provider: 'Corporate Finance Institute', url: 'https://corporatefinanceinstitute.com/course/excel-crash-course-finance/', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'What We Know About Spreadsheet Errors',
        authors: 'Raymond R. Panko',
        year: 2008,
        venue: 'Journal of End User Computing',
        url: 'https://arxiv.org/abs/0804.0941',
        takeaway: 'Empirical audits show ~88% of unmanaged operational spreadsheets contain errors—proving why structural checks and Power Query matter.',
      },
      {
        title: 'Spreadsheet Engineering: A Research Framework',
        authors: 'David Grossman, Özgür Özlük',
        year: 2004,
        venue: 'EuSpRIG Proceedings',
        url: 'https://arxiv.org/abs/0711.0538',
        takeaway: 'Applies software modularity, separation of inputs/logic, and unit assertions to spreadsheet modeling.',
      },
      {
        title: 'Designing Auditable Financial & Operational Models',
        authors: 'FAST Standard Organization',
        year: 2019,
        venue: 'FAST Modeling Standard',
        url: 'https://www.fast-standard.org/',
        takeaway: 'Flexible, Appropriate, Structured, Transparent design principles for zero-ambiguity back-office workbooks.',
      },
    ],
    projects: {
      required: [
        {
          title: 'One-Click Power Query Monthly AP/AR Reconciliation Workbook',
          tier: 'Required',
          scope: 'Ingest messy vendor CSV exports via Power Query, normalize currencies/dates, and flag unmatched invoices automatically.',
          stack: 'Excel / Power Query / Dynamic Arrays',
          resumeBullet: 'Automated monthly AP/AR invoice reconciliation using Power Query, cutting manual close cycle from 6 hours to 12 minutes.',
        },
        {
          title: 'Executive Operations KPI & SLA Exception Dashboard',
          tier: 'Required',
          scope: 'Interactive Pivot + XLOOKUP/FILTER pack tracking ticket SLAs, backlog aging, and automated variance tie-outs.',
          stack: 'Excel / Google Sheets',
          resumeBullet: 'Built executive operations KPI workbook with built-in tie-out audit checks and SLA breach alerts.',
        },
      ],
      scalable: [
        {
          title: 'End-to-End Back-Office Order-to-Cash Control System',
          tier: 'Scalable Capstone',
          scope: 'Standardized SOP manual, validated intake forms, automated Aging Bucket rollups, and audit-trail exception log.',
          stack: 'Excel, Power Query, Office Scripts / Apps Script',
          resumeBullet: 'Designed auditable Order-to-Cash back-office system eliminating invoice leakage and unifying vendor compliance tracking.',
        },
      ],
    },
    certifications: [
      { name: 'CFI Excel Crash Course for Finance & Operations', issuer: 'Corporate Finance Institute', url: 'https://corporatefinanceinstitute.com/course/excel-crash-course-finance/', costNote: '100% Free Certificate', focus: 'Shortcuts, formulas, and financial formatting' },
      { name: 'Microsoft Learn: Excel & Power Query Skills', issuer: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/', costNote: '100% Free', focus: 'Power Query ETL, PivotTables, and Office Scripts' },
      { name: 'Excel Skills for Business (Free Audit)', issuer: 'Macquarie University via Coursera', url: 'https://www.coursera.org/specializations/excel', costNote: 'Free Audit', focus: 'Data validation, lookups, and automation' },
    ],
    flashcards: [
      { id: 'ex-fc1', topicId: 'ex-t1', topicTitle: 'XLOOKUP vs VLOOKUP', question: 'Give 3 reasons why XLOOKUP is strictly superior to legacy VLOOKUP.', answer: 'XLOOKUP defaults to exact match, survives column insertions without breaking column index numbers, and searches left or right seamlessly.', difficulty: 'Core' },
      { id: 'ex-fc2', topicId: 'ex-t2', topicTitle: 'Power Query Unpivot', question: 'Why unpivot wide date-column tables into tall normalized rows in Power Query?', answer: 'PivotTables, SUMIFS, and BI tools require tidy tall tables (Date | Metric | Value) so new months append without rewriting formulas.', difficulty: 'Applied' },
      { id: 'ex-fc3', topicId: 'ex-t3', topicTitle: 'Model Audit Checks', question: 'Why place a top-left master CHECK cell (=IF(ABS(diff)<0.01,"OK","ERROR")) on every financial tab?', answer: 'It surfaces broken formulas or unmapped categories immediately instead of silently shipping wrong totals to leadership.', difficulty: 'Core' },
      { id: 'ex-fc4', topicId: 'ex-t1', topicTitle: 'Color Coding Convention', question: 'What is the universal institutional financial modeling color code for cell text?', answer: 'Blue = hardcoded inputs, Black = same-sheet formulas, Green = cross-sheet links.', difficulty: 'Core' },
      { id: 'ex-fc5', topicId: 'ex-t1', topicTitle: 'LET Function', question: 'How does Excel’s LET() improve complex multi-condition formulas?', answer: 'It assigns names to intermediate sub-expressions so they are calculated once and read cleanly like local variables.', difficulty: 'Applied' },
      { id: 'ex-fc6', topicId: 'ex-t3', topicTitle: 'Volatile Functions', question: 'Why avoid INDIRECT() and OFFSET() in large operational workbooks?', answer: 'They are volatile functions that recalculate every single cell on every minor edit, freezing large spreadsheets.', difficulty: 'Deep Dive' },
      { id: 'ex-fc7', topicId: 'ex-t4', topicTitle: 'Segregation of Duties', question: 'What is a key back-office internal control for vendor payouts?', answer: 'Segregation of duties: the person who creates/edits vendor bank details cannot approve final wire disbursement.', difficulty: 'Applied' },
      { id: 'ex-fc8', topicId: 'ex-t2', topicTitle: 'Power Query Reproducibility', question: 'What happens to your Power Query cleanup steps when next month’s raw CSV arrives?', answer: 'Clicking Refresh All replays every recorded M transformation deterministically on the new file in seconds.', difficulty: 'Core' },
    ],
  },
  {
    id: 'freelance-business',
    title: 'Freelance & Business',
    aliases: ['Freelance & business', 'freelance', 'Solo Consulting', 'Agency Ops'],
    domain: 'business-polymath',
    summary:
      'Positioning & niche offers, value-based pricing, SOW contracts & scope control, client acquisition funnels, unit economics, and cash-flow runway.',
    estimatedDays: 8,
    tier: 2,
    prerequisites: ['communication-teamwork', 'sales'],
    unlocks: ['event-management', 'venture-capital'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'fl-d1',
        dayRange: 'Day 1 – 2',
        title: 'Positioning, Offers & Value-Based Pricing',
        objective: 'Escape hourly rate commoditization via productized sprints and ROI pricing.',
        topics: [
          {
            id: 'fl-t1',
            title: 'Niche Positioning, Productized Offers & Value Anchoring',
            summary: 'Tie project fees to client revenue/cost outcomes rather than raw hours.',
            resources: [
              { title: 'YC Startup School Business Foundations', provider: 'Y Combinator', url: 'https://www.startupschool.org/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'fl-d2',
        dayRange: 'Day 3 – 4',
        title: 'Proposals, SOWs & Scope-Creep Protection',
        objective: 'Draft clear Statements of Work with milestones, kill fees, and change-order clauses.',
        topics: [
          {
            id: 'fl-t2',
            title: 'Statements of Work, Milestone Billing & IP Licensing',
            summary: '50% upfront deposit structure, revision caps, and clear deliverable sign-off.',
            resources: [
              { title: 'SBA Small Business Learning Center', provider: 'U.S. SBA', url: 'https://www.sba.gov/learning-center', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'fl-d3',
        dayRange: 'Day 5 – 6',
        title: 'Pipeline Mechanics & Referral Flywheels',
        objective: 'Build repeatable outbound, case-study proof, and retainer renewals.',
        topics: [
          {
            id: 'fl-t3',
            title: 'Case Study Proof, Warm Outreach & Retainer Packaging',
            summary: 'Convert one-off engagements into predictable recurring advisory retainers.',
            resources: [
              { title: 'HubSpot Academy Inbound Business Guides', provider: 'HubSpot Academy', url: 'https://academy.hubspot.com/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'fl-d4',
        dayRange: 'Day 7 – 8',
        title: 'Solo P&L, Taxes & Capacity Math',
        objective: 'Model utilization ceiling, effective hourly yield, tax reserves, and subcontractor margins.',
        topics: [
          {
            id: 'fl-t4',
            title: 'Effective Hourly Yield, Tax Reserves & Subcontractor Margins',
            summary: 'Price for 60% billable utilization and reserve 25–30% for taxes upfront.',
            resources: [
              { title: 'SCORE Free Small Business Templates', provider: 'SCORE', url: 'https://www.score.org/templates-resources', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Pricing Professional Services: Hourly vs. Fixed vs. Value-Based Contracts',
        authors: 'Ronald J. Baker / Harvard Business School Pricing Studies',
        year: 2011,
        venue: 'Journal of Accountancy / HBS Cases',
        url: 'https://hbr.org/2008/09/pricing-services-with-confidence',
        takeaway: 'Demonstrates why hourly billing misaligns incentives by penalizing speed and expertise.',
      },
      {
        title: 'The Economics of Freelance & Gig Platform Matching',
        authors: 'John J. Horton',
        year: 2017,
        venue: 'Management Science',
        url: 'https://www.nber.org/papers/w20664',
        takeaway: 'Empirical field studies showing how verified track records and signal clarity compress hiring friction.',
      },
      {
        title: 'Effectuation: Elements of Entrepreneurial Expertise',
        authors: 'Saras D. Sarasvathy',
        year: 2001,
        venue: 'Academy of Management Review',
        url: 'https://journals.aom.org/doi/10.5465/amr.2001.4378020',
        takeaway: 'Shows how expert entrepreneurs use affordable loss and rapid client commitments over speculative forecasts.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Productized Offer Page, Proposal & SOW Contract Kit',
          tier: 'Required',
          scope: 'Create a 3-tier value-anchored proposal template + legal-grade SOW with revision limits and milestone terms.',
          stack: 'Docs, Pricing Sheet',
          resumeBullet: 'Standardized 3-tier value-based proposal and SOW workflow cutting deal close cycles and scope disputes.',
        },
        {
          title: 'Solo Consultancy P&L & Cash-Flow Runway Model',
          tier: 'Required',
          scope: 'Spreadsheet forecasting billable utilization, effective rate, tax escrow, and 12-month cash runway.',
          stack: 'Excel/Sheets',
          resumeBullet: 'Built 12-month freelance P&L and utilization planner modeling tax reserves and retainer revenue stability.',
        },
      ],
      scalable: [
        {
          title: 'Repeatable Client Onboarding & Case-Study Proof Engine',
          tier: 'Scalable Capstone',
          scope: 'Automated client intake portal, weekly async status digest template, and before/after ROI case study framework.',
          stack: 'Notion/Linear + CRM + Automation',
          resumeBullet: 'Engineered repeatable client onboarding and ROI case-study engine supporting parallel consulting engagements.',
        },
      ],
    },
    certifications: [
      { name: 'SBA Learning Center Entrepreneurship Courses', issuer: 'U.S. Small Business Administration', url: 'https://www.sba.gov/learning-center', costNote: '100% Free', focus: 'Business plans, contracts, pricing, and cash flow' },
      { name: 'Y Combinator Startup School', issuer: 'Y Combinator', url: 'https://www.startupschool.org/', costNote: '100% Free', focus: 'Customer acquisition, pricing, and unit economics' },
      { name: 'HubSpot Academy Inbound & Client Growth', issuer: 'HubSpot Academy', url: 'https://academy.hubspot.com/', costNote: '100% Free Certificate', focus: 'Lead capture, CRM pipeline, and client retention' },
    ],
    flashcards: [
      { id: 'fl-fc1', topicId: 'fl-t1', topicTitle: 'Hourly Billing Trap', question: 'Why does hourly billing punish experienced engineers and designers?', answer: 'As you get faster and more skilled, finishing a high-value deliverable in 4 hours instead of 40 cuts your pay by 90% under hourly rates.', difficulty: 'Core' },
      { id: 'fl-fc2', topicId: 'fl-t2', topicTitle: 'Scope Creep Defense', question: 'How do you handle a client asking for "one quick extra feature" mid-sprint gracefully?', answer: 'Acknowledge the idea positively, log it as a priced Change Order or Phase 2 item, and let the client choose between swapping scope or adding budget.', difficulty: 'Applied' },
      { id: 'fl-fc3', topicId: 'fl-t4', topicTitle: 'Utilization Ceiling', question: 'Why can a solo consultant rarely sustain 40 billable hours/week all year?', answer: 'Sales, admin, bookkeeping, invoicing, and learning take ~30–40% of the workweek; pricing must assume ~22–26 billable hours/week.', difficulty: 'Core' },
      { id: 'fl-fc4', topicId: 'fl-t1', topicTitle: '3-Option Proposals', question: 'Why present clients with 3 tiered options instead of a single take-it-or-leave-it price?', answer: 'It shifts the buyer’s question from "Should I hire them?" to "Which tier fits best?" while anchoring high-ROI value.', difficulty: 'Applied' },
      { id: 'fl-fc5', topicId: 'fl-t2', topicTitle: 'Kill Fee & Deposit', question: 'Why collect 40–50% upfront before kickoff and include a kill fee?', answer: 'It filters non-serious buyers, secures cash flow, and compensates reserved calendar capacity if the client cancels mid-project.', difficulty: 'Core' },
      { id: 'fl-fc6', topicId: 'fl-t3', topicTitle: 'Case Study Formula', question: 'What 3 elements make a freelance case study convert enterprise buyers?', answer: 'Specific baseline pain, concrete execution approach, and quantified business outcome (revenue gained, hours saved, errors cut).', difficulty: 'Applied' },
      { id: 'fl-fc7', topicId: 'fl-t4', topicTitle: 'Effective Hourly Rate', question: 'How do you calculate true Effective Hourly Rate on a fixed-fee project?', answer: 'Net project revenue divided by ALL hours spent (discovery, meetings, revisions, and delivery combined).', difficulty: 'Core' },
      { id: 'fl-fc8', topicId: 'fl-t2', topicTitle: 'IP Transfer Timing', question: 'When should full intellectual property rights transfer to the client in an SOW?', answer: 'Explicitly upon receipt of final milestone payment in full—never automatically upon first draft delivery.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    aliases: ['Sales', 'B2B Sales', 'MEDDIC', 'Negotiation'],
    domain: 'business-polymath',
    summary:
      'Consultative B2B discovery (SPIN/MEDDIC), cold outreach personalization, objection handling, mutual action plans, and principled negotiation.',
    estimatedDays: 8,
    tier: 2,
    prerequisites: ['communication-teamwork'],
    unlocks: ['freelance-business', 'forward-deployed-eng'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'sl-d1',
        dayRange: 'Day 1 – 2',
        title: 'Consultative Discovery (SPIN & Pain Quantification)',
        objective: 'Uncover explicit business pain and quantify cost-of-inaction before pitching.',
        topics: [
          {
            id: 'sl-t1',
            title: 'SPIN Questioning, Cost of Inaction & Active Listening',
            summary: 'Guide prospects from Situation/Problem to Implication and Need-Payoff.',
            resources: [
              { title: 'HubSpot Inbound Sales Certification', provider: 'HubSpot Academy', url: 'https://academy.hubspot.com/courses/inbound-sales', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'sl-d2',
        dayRange: 'Day 3 – 4',
        title: 'Enterprise Qualification (MEDDIC) & Outbound',
        objective: 'Identify Economic Buyers, Champions, Decision Criteria, and Paper Process.',
        topics: [
          {
            id: 'sl-t2',
            title: 'MEDDIC Qualification & Signal-Based Outbound Sequences',
            summary: 'Tailor cold outreach to concrete triggers (hiring, funding, tech stack shifts).',
            resources: [
              { title: 'YC Guide to Enterprise Sales', provider: 'Y Combinator', url: 'https://www.ycombinator.com/library', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'sl-d3',
        dayRange: 'Day 5 – 6',
        title: 'Demos, Objection Handling & Mutual Action Plans',
        objective: 'Run outcome-led demos and co-create Mutual Action Plans to prevent ghosting.',
        topics: [
          {
            id: 'sl-t3',
            title: 'Tailored Proof Demos, Objection Isolation & Mutual Action Plans',
            summary: 'Address "too expensive" or "no bandwidth" by isolating the true blocker.',
            resources: [
              { title: 'Salesforce Trailhead Sales Fundamentals', provider: 'Salesforce Trailhead', url: 'https://trailhead.salesforce.com/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'sl-d4',
        dayRange: 'Day 7 – 8',
        title: 'Negotiation & Pipeline Hygiene',
        objective: 'Use BATNA, give-get concessions, and weighted pipeline forecasting.',
        topics: [
          {
            id: 'sl-t4',
            title: 'Give-Get Negotiation, BATNA & CRM Stage Exit Criteria',
            summary: 'Never discount unilaterally—trade price concessions for multi-year terms or case studies.',
            resources: [
              { title: 'Harvard Program on Negotiation Open Articles', provider: 'PON Harvard', url: 'https://www.pon.harvard.edu/articles/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'SPIN Selling: Large-Scale Empirical Analysis of 35,000 Sales Calls',
        authors: 'Neil Rackham / Huthwaite Research',
        year: 1988,
        venue: 'Huthwaite Empirical Field Study',
        url: 'https://hbr.org/1988/05/major-sales-who-really-does-the-buying',
        takeaway: 'Proved Implication and Need-Payoff questions drive major B2B closes far more than product-feature pitching.',
      },
      {
        title: 'Influence: Reciprocity, Commitment, Social Proof, and Authority in Persuasion',
        authors: 'Robert B. Cialdini',
        year: 2001,
        venue: 'Scientific American / Behavioral Research',
        url: 'https://www.scientificamerican.com/article/the-science-of-persuasion/',
        takeaway: 'Experimental psychology backing ethical social proof, commitment consistency, and reciprocity.',
      },
      {
        title: 'Bargaining and the Best Alternative to a Negotiated Agreement (BATNA)',
        authors: 'Roger Fisher, William Ury (Harvard Negotiation Project)',
        year: 1981,
        venue: 'Harvard Law School PON',
        url: 'https://www.pon.harvard.edu/tag/batna/',
        takeaway: 'Separates people from the problem and anchors negotiation leverage in objective alternatives.',
      },
    ],
    projects: {
      required: [
        {
          title: 'MEDDIC Deal Playbook & Mutual Action Plan Template',
          tier: 'Required',
          scope: 'Build a complete discovery call script, MEDDIC scorecard, and buyer-shared Mutual Action Plan.',
          stack: 'CRM / Notion / Docs',
          resumeBullet: 'Created MEDDIC enterprise qualification scorecard and Mutual Action Plan framework shortening deal cycles.',
        },
        {
          title: 'Trigger-Based Cold Outbound & Objection Matrix',
          tier: 'Required',
          scope: 'Author 5 personalized multi-channel outbound sequences + top-10 objection handling playbooks.',
          stack: 'Docs / Spreadsheet',
          resumeBullet: 'Designed signal-triggered outbound cadence and objection-isolation playbook boosting qualified meeting conversion.',
        },
      ],
      scalable: [
        {
          title: 'Full-Funnel CRM Pipeline & Conversion Velocity Analyzer',
          tier: 'Scalable Capstone',
          scope: 'Track stage-to-stage conversion rates, sales cycle length, win/loss reasons, and quota coverage math.',
          stack: 'HubSpot Free CRM / SQL / Excel',
          resumeBullet: 'Built CRM funnel telemetry tracking stage velocity and win/loss attribution to identify pipeline bottlenecks.',
        },
      ],
    },
    certifications: [
      { name: 'Inbound Sales Certification', issuer: 'HubSpot Academy', url: 'https://academy.hubspot.com/courses/inbound-sales', costNote: '100% Free Certificate', focus: 'Consultative discovery, buyer personas, and closing' },
      { name: 'Salesforce Sales Operations & CRM Trails', issuer: 'Salesforce Trailhead', url: 'https://trailhead.salesforce.com/', costNote: '100% Free Badges', focus: 'Pipeline management, forecasting, and enterprise sales' },
      { name: 'Successful Negotiation: Essential Strategies (Free Audit)', issuer: 'University of Michigan via Coursera', url: 'https://www.coursera.org/learn/negotiation-skills', costNote: 'Free Audit', focus: 'BATNA, anchoring, and contract execution' },
    ],
    flashcards: [
      { id: 'sl-fc1', topicId: 'sl-t1', topicTitle: 'SPIN Selling', question: 'What is the role of "Implication" questions in SPIN Selling?', answer: 'They help the buyer connect a quiet technical inconvenience to downstream financial, risk, or team consequences—creating urgency to act.', difficulty: 'Core' },
      { id: 'sl-fc2', topicId: 'sl-t2', topicTitle: 'Champion vs Coach', question: 'In MEDDIC, what distinguishes a true Champion from a friendly Coach?', answer: 'A Coach likes you and shares info; a Champion has power/influence AND actively sells on your behalf internally when you are not in the room.', difficulty: 'Applied' },
      { id: 'sl-fc3', topicId: 'sl-t4', topicTitle: 'Give-Get Rule', question: 'What should you ALWAYS require when a prospect asks for a 15% discount?', answer: 'A concrete "Get" in exchange: e.g., signature before quarter-end, annual upfront payment, multi-year commitment, or public case study.', difficulty: 'Core' },
      { id: 'sl-fc4', topicId: 'sl-t3', topicTitle: 'Mutual Action Plan', question: 'Why share a Mutual Action Plan (MAP) after a positive demo?', answer: 'It surfaces hidden legal, security, and procurement steps early and aligns both sides on target go-live dates.', difficulty: 'Applied' },
      { id: 'sl-fc5', topicId: 'sl-t2', topicTitle: 'Cost of Inaction', question: 'Who is your biggest competitor in most B2B enterprise deals?', answer: '"No Decision" / Status Quo—prospects only buy when Cost of Inaction clearly exceeds switching risk and price.', difficulty: 'Core' },
      { id: 'sl-fc6', topicId: 'sl-t3', topicTitle: 'Objection Isolation', question: 'When a buyer says "We need to think about it," what diagnostic response isolates the real issue?', answer: '"Usually when teams pause here, it’s either budget timing, technical fit, or internal alignment—which one feels heaviest right now?"', difficulty: 'Applied' },
      { id: 'sl-fc7', topicId: 'sl-t4', topicTitle: 'Pipeline Coverage', question: 'If your team’s win rate from qualified opp to close is 25%, how much pipeline coverage do you need for a $100k quota?', answer: 'At least 4x ($400k in qualified pipeline) to hit $100k reliably.', difficulty: 'Core' },
      { id: 'sl-fc8', topicId: 'sl-t1', topicTitle: 'Demo Discipline', question: 'Why never open a sales demo with a 20-minute company slide deck and feature tour?', answer: 'Show the 2–3 workflows solving the exact pain uncovered during discovery in the first 5 minutes while attention is highest.', difficulty: 'Core' },
    ],
  },
  {
    id: 'event-management',
    title: 'Event Management & Planning',
    aliases: ['event management', 'eventplanning', 'Live Production', 'Run-of-Show'],
    domain: 'business-polymath',
    summary:
      'End-to-end event architecture, Run-of-Show (ROS) cue sheets, vendor & venue RFPs, zero-based budgeting, sponsor tiers, and crowd safety contingencies.',
    estimatedDays: 8,
    tier: 1,
    prerequisites: ['communication-teamwork'],
    unlocks: ['freelance-business'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'ev-d1',
        dayRange: 'Day 1 – 2',
        title: 'Event Concept, Capacity & Venue Sourcing',
        objective: 'Evaluate venues for floor load, AV power, acoustics, sightlines, and egress.',
        topics: [
          {
            id: 'ev-t1',
            title: 'Venue RFP Scoring, Floorplans & Attrition/Force Majeure Clauses',
            summary: 'Negotiate hotel F&B minimums, Wi-Fi bandwidth SLAs, and load-in docks.',
            resources: [
              { title: 'Eventbrite Event Planning Guides', provider: 'Eventbrite', url: 'https://www.eventbrite.com/blog/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ev-d2',
        dayRange: 'Day 3 – 4',
        title: 'Zero-Based Budgeting & Sponsorship Economics',
        objective: 'Balance fixed production costs, variable F&B, ticket tiers, and sponsor ROI.',
        topics: [
          {
            id: 'ev-t2',
            title: 'Event P&L, Breakeven Attendance & Sponsor Deliverables',
            summary: 'Always maintain a 12–15% contingency reserve for unexpected AV or overtime fees.',
            resources: [
              { title: 'Cvent Event Management Resources', provider: 'Cvent', url: 'https://www.cvent.com/en/resources', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ev-d3',
        dayRange: 'Day 5 – 6',
        title: 'Run-of-Show (ROS) & AV Production Cues',
        objective: 'Author minute-by-minute technical cue sheets across stage, lighting, audio, and MC.',
        topics: [
          {
            id: 'ev-t3',
            title: 'Minute-by-Minute Run-of-Show, Speaker Tech Checks & Comms',
            summary: 'Redundant HDMI/audio paths, clicker backups, and buffer slots for schedule drift.',
            resources: [
              { title: 'PMI Project Management Basics for Events', provider: 'Project Management Institute', url: 'https://www.pmi.org/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ev-d4',
        dayRange: 'Day 7 – 8',
        title: 'Risk Management, Crowd Flow & Post-Event ROI',
        objective: 'Prevent check-in bottlenecks and capture NPS + sponsor lead attribution.',
        topics: [
          {
            id: 'ev-t4',
            title: 'Check-In Throughput Math, Crowd Safety & Post-Mortem ROI',
            summary: 'Calculate badge-print lanes needed to clear 500 guests in 20 minutes without queues.',
            resources: [
              { title: 'FEMA Special Events Contingency Planning (IS-15.b)', provider: 'FEMA Emergency Management Institute', url: 'https://training.fema.gov/is/courseoverview.aspx?code=IS-15.b', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Event Management: An Exploratory Study of Critical Success Factors',
        authors: 'Donald Getz, Stephen J. Page',
        year: 2016,
        venue: 'Tourism Management (Progress in Event Studies)',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0261517715000977',
        takeaway: 'Synthesizes stakeholder alignment, risk control, and attendee experience design in planned events.',
      },
      {
        title: 'Queueing Theory & Pedestrian Crowd Dynamics at Large Events',
        authors: 'Dirk Helbing, Anders Johansson, Habib Zein Al-Abideen',
        year: 2007,
        venue: 'Physical Review E',
        url: 'https://arxiv.org/abs/physics/0701203',
        takeaway: 'Models crowd bottleneck transitions and pinch points guiding safe ingress/egress planning.',
      },
      {
        title: 'Project Risk Management Applied to Live Events',
        authors: 'William J. O’Toole',
        year: 2011,
        venue: 'Events Feasibility and Development',
        url: 'https://epms.net/',
        takeaway: 'Adapts formal work breakdown structures (WBS) and contingency triggers to live production.',
      },
    ],
    projects: {
      required: [
        {
          title: '500-Person Tech Summit Master Run-of-Show & AV Cue Sheet',
          tier: 'Required',
          scope: 'Minute-by-minute multi-track ROS covering load-in, mic checks, stage transitions, catering drops, and tear-down.',
          stack: 'Excel/Sheets, Floorplan Tool',
          resumeBullet: 'Authored multi-track Run-of-Show and AV cue matrix orchestrating 14 speakers and 500 attendees with zero dead-air delays.',
        },
        {
          title: 'Zero-Based Event P&L, Breakeven & Sponsor Deck',
          tier: 'Required',
          scope: 'Dynamic budget sheet linking ticket tiers, sponsor packages, variable F&B, and 15% contingency reserve.',
          stack: 'Excel/Sheets',
          resumeBullet: 'Built zero-based event P&L and sponsor ROI deck modeling breakeven attendance and protecting a 22% net margin.',
        },
      ],
      scalable: [
        {
          title: 'End-to-End Hackathon / Conference Operations Playbook',
          tier: 'Scalable Capstone',
          scope: 'Complete vendor RFP scorecard, QR check-in throughput calculator, volunteer shift schedule, and risk matrix.',
          stack: 'Notion/Sheets, QR Check-in Workflow',
          resumeBullet: 'Designed scalable conference operations system eliminating check-in bottlenecks and cutting vendor onboarding time by 50%.',
        },
      ],
    },
    certifications: [
      { name: 'FEMA IS-15.b Special Events Contingency Planning', issuer: 'FEMA Emergency Management Institute', url: 'https://training.fema.gov/is/courseoverview.aspx?code=IS-15.b', costNote: '100% Free Certificate', focus: 'Crowd safety, emergency plans, and venue risk' },
      { name: 'Google Project Management Foundations (Free Audit)', issuer: 'Google via Coursera', url: 'https://www.coursera.org/professional-certificates/google-project-management', costNote: 'Free Audit', focus: 'Budgets, vendor schedules, and risk registers' },
      { name: 'Cvent Event Management & Virtual Event Guides', issuer: 'Cvent Academy', url: 'https://www.cvent.com/en/cvent-training', costNote: 'Free Core Training', focus: 'Venue sourcing, registration flows, and ROI' },
    ],
    flashcards: [
      { id: 'ev-fc1', topicId: 'ev-t2', topicTitle: 'Contingency Budget', question: 'Why build a 12–15% unallocated contingency line into every event budget?', answer: 'Last-minute union labor overtime, backup AV gear, weather tents, or unexpected rushes happen on nearly every live production.', difficulty: 'Core' },
      { id: 'ev-fc2', topicId: 'ev-t4', topicTitle: 'Check-In Throughput', question: 'If 400 guests arrive within 20 minutes and 1 check-in agent takes 45 seconds per guest, how many lanes do you need?', answer: '400 guests / 20 min = 20 guests/min. Each lane handles 60/45 = 1.33 guests/min. Minimum 15 lanes (16–18 with buffer).', difficulty: 'Applied' },
      { id: 'ev-fc3', topicId: 'ev-t1', topicTitle: 'Attrition Clause', question: 'What is a hotel room-block attrition clause?', answer: 'A contract penalty if your attendees book fewer than an agreed percentage (e.g., 80%) of reserved sleeping rooms.', difficulty: 'Applied' },
      { id: 'ev-fc4', topicId: 'ev-t3', topicTitle: 'ROS Buffer Strategy', question: 'How do experienced stage managers keep a full-day conference on schedule when a keynote runs 8 minutes long?', answer: 'Build hidden 5-minute padding into transition breaks and give the MC adjustable Q&A lengths to absorb drift.', difficulty: 'Core' },
      { id: 'ev-fc5', topicId: 'ev-t3', topicTitle: 'AV Redundancy', question: 'What is the single most common catastrophic failure on a live conference stage and its instant fix?', answer: 'A speaker’s laptop failing HDMI handshake; fix by pre-loading all slides onto dual redundant playback laptops with a hardware switcher.', difficulty: 'Core' },
      { id: 'ev-fc6', topicId: 'ev-t1', topicTitle: 'Dedicated Bandwidth SLA', question: 'Why never rely on shared hotel guest Wi-Fi for a livestream or coding hackathon?', answer: 'Guest networks throttle upload and drop under burst connections; always contract a dedicated hardwired drop with guaranteed Mbps.', difficulty: 'Applied' },
      { id: 'ev-fc7', topicId: 'ev-t2', topicTitle: 'Sponsor Value', question: 'Why do modern B2B sponsors prefer curated roundtables over logo placement on banners?', answer: 'Logos yield vanity impressions; curated warm introductions and opted-in leads prove direct pipeline ROI.', difficulty: 'Core' },
      { id: 'ev-fc8', topicId: 'ev-t4', topicTitle: 'Hot-Wash Debrief', question: 'Why conduct a "hot-wash" post-mortem within 48 hours of an event?', answer: 'Crew and vendor friction points fade rapidly from memory; immediate debriefs capture exact fixes for the next playbook.', difficulty: 'Core' },
    ],
  },
  {
    id: 'communication-teamwork',
    title: 'Communication & Teamwork',
    aliases: ['Communication & teamwork', 'Executive Writing', 'Conflict Resolution', 'Leadership'],
    domain: 'business-polymath',
    summary:
      'Pyramid Principle executive writing, asynchronous engineering RFCs, Nonviolent Communication, high-signal feedback, and cross-functional conflict resolution.',
    estimatedDays: 7,
    tier: 1,
    prerequisites: [],
    unlocks: ['product-thinking', 'sales', 'freelance-business', 'event-management', 'forward-deployed-eng'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'cm-d1',
        dayRange: 'Day 1 – 2',
        title: 'Structured Executive Writing (BLUF & Minto Pyramid)',
        objective: 'Lead with the answer first, group supporting logic cleanly, and cut fluff by 50%.',
        topics: [
          {
            id: 'cm-t1',
            title: 'BLUF (Bottom Line Up Front), Minto Pyramid & Async RFCs',
            summary: 'Write clear technical/business memos decision-makers can scan in 30 seconds.',
            resources: [
              { title: 'Google Technical Writing Courses (Free)', provider: 'Google Developers', url: 'https://developers.google.com/tech-writing', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'cm-d2',
        dayRange: 'Day 3 – 4',
        title: 'Active Listening & Cross-Functional Alignment',
        objective: 'Translate between engineering, design, finance, and executive priorities.',
        topics: [
          {
            id: 'cm-t2',
            title: 'Stakeholder Mapping, Meeting Agendas & Decision Logs (DACI/RACI)',
            summary: 'Eliminate meeting drift by naming Drivers, Approvers, and single-threaded owners.',
            resources: [
              { title: 'Atlassian Team Playbook (Open Templates)', provider: 'Atlassian', url: 'https://www.atlassian.com/team-playbook', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'cm-d3',
        dayRange: 'Day 5 – 6',
        title: 'Psychological Safety, Feedback & Difficult Conversations',
        objective: 'Deliver Situation-Behavior-Impact (SBI) feedback without triggering defensiveness.',
        topics: [
          {
            id: 'cm-t3',
            title: 'SBI Feedback, Blameless Postmortems & Disagree-and-Commit',
            summary: 'Attack process gaps and assumptions rather than teammates.',
            resources: [
              { title: 'Google re:Work Psychological Safety Guide', provider: 'Google re:Work', url: 'https://rework.withgoogle.com/guides/understanding-team-effectiveness/steps/introduction/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'cm-d4',
        dayRange: 'Day 7',
        title: 'Storytelling & High-Stakes Presentations',
        objective: 'Deliver clear demos, status updates, and persuasive executive narratives.',
        topics: [
          {
            id: 'cm-t4',
            title: 'Problem-Stakes-Resolution Arc & Crisp Live Demos',
            summary: 'Anchor slides on one takeaway headline each rather than dense bullet walls.',
            resources: [
              { title: 'Toastmasters / Open Rhetoric Guides', provider: 'MIT Communication Lab', url: 'https://mitcommlab.mit.edu/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Psychological Safety and Learning Behavior in Work Teams',
        authors: 'Amy Edmondson',
        year: 1999,
        venue: 'Administrative Science Quarterly',
        url: 'https://journals.sagepub.com/doi/10.2307/2666999',
        takeaway: 'Proved high-performing teams report more errors openly because safety enables rapid learning and error correction.',
      },
      {
        title: 'Evidence for a Collective Intelligence Factor in the Performance of Human Groups',
        authors: 'Anita Williams Woolley, Christopher F. Chabris, Alex Pentland, Nada Hashmi, Thomas W. Malone',
        year: 2010,
        venue: 'Science',
        url: 'https://www.science.org/doi/10.1126/science.1193147',
        takeaway: 'Equal conversational turn-taking and social sensitivity predict team intelligence far better than individual IQ.',
      },
      {
        title: 'Designing Distributed Engineering Teams & Asynchronous RFC Culture',
        authors: 'MIT Sloan / Google Project Aristotle Research',
        year: 2015,
        venue: 'Google re:Work Research',
        url: 'https://rework.withgoogle.com/',
        takeaway: 'Identified psychological safety, dependability, structure/clarity, meaning, and impact as the 5 team effectiveness pillars.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Executive BLUF Decision Memo & Architecture RFC',
          tier: 'Required',
          scope: 'Convert a rambling 3-page problem thread into a 1-page BLUF decision memo with options, trade-offs, and DACI owner.',
          stack: 'Markdown / Docs',
          resumeBullet: 'Introduced BLUF decision memos and DACI ownership across team projects cutting sync meeting hours by 35%.',
        },
        {
          title: 'Blameless Incident Postmortem & Action-Item Playbook',
          tier: 'Required',
          scope: 'Write a 5-Whys root-cause analysis focusing on systemic guardrails and preventive engineering actions.',
          stack: 'Markdown / Postmortem Template',
          resumeBullet: 'Facilitated blameless postmortem culture turning production incidents into prioritized systemic prevention fixes.',
        },
      ],
      scalable: [
        {
          title: 'Async Team Operating System & Onboarding Handbook',
          tier: 'Scalable Capstone',
          scope: 'Build a searchable team handbook covering RFC review SLAs, PR etiquette, weekly async status cadence, and onboarding.',
          stack: 'Notion / GitHub Wiki',
          resumeBullet: 'Built async engineering handbook and onboarding playbook halving new-contributor ramp-up time.',
        },
      ],
    },
    certifications: [
      { name: 'Google Technical Writing One & Two', issuer: 'Google Developers', url: 'https://developers.google.com/tech-writing', costNote: '100% Free Course', focus: 'Clarity, active voice, structure, and editing' },
      { name: 'Teamwork Skills: Communicating Effectively in Groups (Free Audit)', issuer: 'University of Colorado via Coursera', url: 'https://www.coursera.org/learn/teamwork-skills-effective-communication', costNote: 'Free Audit', focus: 'Conflict resolution, decision-making, and feedback' },
      { name: 'Atlassian Agile & Team Playbook Mastery', issuer: 'Atlassian University', url: 'https://university.atlassian.com/', costNote: 'Free Foundational Courses', focus: 'DACI, retrospectives, and stakeholder alignment' },
    ],
    flashcards: [
      { id: 'cm-fc1', topicId: 'cm-t1', topicTitle: 'BLUF Principle', question: 'Why put your conclusion and ask in the first 2 sentences instead of building up chronologically?', answer: 'Busy readers understand context 3x faster when they know the decision needed upfront, letting them read details selectively.', difficulty: 'Core' },
      { id: 'cm-fc2', topicId: 'cm-t3', topicTitle: 'SBI Feedback', question: 'What are the 3 parts of an SBI feedback statement?', answer: 'Situation (when/where), Behavior (observable action, not personality label), and Impact (concrete effect on team/project).', difficulty: 'Core' },
      { id: 'cm-fc3', topicId: 'cm-t2', topicTitle: 'DACI Framework', question: 'In a DACI decision framework, what happens if nobody is explicitly named the Driver?', answer: 'Everyone assumes someone else is pushing the decision forward and the initiative stalls indefinitely.', difficulty: 'Applied' },
      { id: 'cm-fc4', topicId: 'cm-t3', topicTitle: 'Psychological Safety', question: 'Does high psychological safety mean lowering performance standards?', answer: 'No—safety paired with high accountability ("Learning Zone") encourages candid risk surfacing while maintaining rigorous execution.', difficulty: 'Applied' },
      { id: 'cm-fc5', topicId: 'cm-t3', topicTitle: 'Disagree and Commit', question: 'What does "Disagree and Commit" require after a decision is made?', answer: 'Voicing concerns forcefully during debate, then executing the chosen path wholeheartedly without passive-aggressive sabotage.', difficulty: 'Core' },
      { id: 'cm-fc6', topicId: 'cm-t1', topicTitle: 'Async vs Sync', question: 'When should a discussion move from Slack/email to a 15-minute live call?', answer: 'When 3+ back-and-forth messages reveal emotional friction, nuanced ambiguity, or urgent cross-team blocking.', difficulty: 'Applied' },
      { id: 'cm-fc7', topicId: 'cm-t4', topicTitle: 'Action-Title Slides', question: 'Why write presentation slide headers as "Checkout drop-off fell 18% after guest flow" instead of "Checkout Results"?', answer: 'Action titles carry the insight even if an executive only glances at the slide for 3 seconds.', difficulty: 'Core' },
      { id: 'cm-fc8', topicId: 'cm-t2', topicTitle: 'Collective Intelligence', question: 'According to Woolley et al. (Science), what conversational habit most strongly predicts team performance?', answer: 'Balanced turn-taking where all members speak roughly equally rather than one or two voices dominating.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'french-spanish',
    title: 'French & Spanish Languages',
    aliases: ['French & Spanish', 'CEFR B1/B2', 'Spaced Repetition', 'Comprehensible Input'],
    domain: 'business-polymath',
    summary:
      'Dual Romance-language mastery via cognate mapping, IPA pronunciation, high-frequency grammar engines, comprehensible input, and CEFR B1/B2 speaking drills.',
    estimatedDays: 16,
    tier: 1,
    prerequisites: [],
    unlocks: ['communication-teamwork', 'sales'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'fs-d1',
        dayRange: 'Day 1 – 4',
        title: 'Phonetics, IPA & Shared Romance Cognates',
        objective: 'Master French nasal vowels/liaison and Spanish crisp vowels/trills + 1,000 shared cognates.',
        topics: [
          {
            id: 'fs-t1',
            title: 'French Liaison/Nasals vs Spanish 5-Vowel System & Cognate Rules',
            summary: 'Map -tion/-ción, -ité/-idad, -ment/-mente patterns across English, French, and Spanish.',
            resources: [
              { title: 'TV5MONDE Apprendre le Français (Free)', provider: 'TV5MONDE', url: 'https://apprendre.tv5monde.com/', kind: 'Course' },
              { title: 'Language Transfer: Complete Spanish (Free Audio)', provider: 'Language Transfer', url: 'https://www.languagetransfer.org/complete-spanish', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'fs-d2',
        dayRange: 'Day 5 – 8',
        title: 'Core Verb Engines & Pronoun Placement',
        objective: 'Automate high-frequency irregular verbs and past tenses (Passé Composé vs Pretérito).',
        topics: [
          {
            id: 'fs-t2',
            title: 'Present, Past (Imparfait/Indefinido) & Direct/Indirect Pronouns',
            summary: 'Contrast ser/estar vs être/avoir and avoid interference errors between French and Spanish.',
            resources: [
              { title: 'Lawless French & Lawless Spanish Grammar Guides', provider: 'Lawless Languages', url: 'https://www.lawlessfrench.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fs-d3',
        dayRange: 'Day 9 – 12',
        title: 'Comprehensible Input & Shadowing',
        objective: 'Build listening speed via graded podcasts, dual-subtitle immersion, and chorus shadowing.',
        topics: [
          {
            id: 'fs-t3',
            title: 'Krashen Comprehensible Input (i+1) & Audio Shadowing',
            summary: '30 min daily listening + sentence mining into Anki spaced repetition decks.',
            resources: [
              { title: 'RFI Savoirs — Journal en Français Facile', provider: 'Radio France Internationale', url: 'https://francaisfacile.rfi.fr/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'fs-d4',
        dayRange: 'Day 13 – 16',
        title: 'Subjunctive, Connectors & Output Fluency',
        objective: 'Hold structured 15-minute business and travel conversations in both languages.',
        topics: [
          {
            id: 'fs-t4',
            title: 'Subjunctive Triggers, Discourse Connectors & Speaking Drills',
            summary: 'Use natural fillers ("en fait / du coup" and "de hecho / pues") and persuasive connectors.',
            resources: [
              { title: 'Instituto Cervantes AVE / Open Resources', provider: 'Instituto Cervantes', url: 'https://www.cervantes.es/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Spacing Effects in Learning: A Temporal Ridgeline of Optimal Review Intervals',
        authors: 'Nicholas J. Cepeda, Edward Vul, Doug Rohrer, John T. Wixted, Harold Pashler',
        year: 2008,
        venue: 'Psychological Science',
        url: 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2008.02209.x',
        takeaway: 'Demonstrated mathematically how spaced-repetition intervals maximize long-term vocabulary retention.',
      },
      {
        title: 'Principles and Practice in Second Language Acquisition (Input Hypothesis)',
        authors: 'Stephen D. Krashen',
        year: 1982,
        venue: 'University of Southern California / Pergamon',
        url: 'https://www.sdkrashen.com/content/books/principles_and_practice.pdf',
        takeaway: 'Explains why comprehensible input slightly above current level (i+1) outperforms rote isolated grammar drills.',
      },
      {
        title: 'The Output Hypothesis: Just Speaking and Writing Aren’t Enough',
        authors: 'Merrill Swain',
        year: 1995,
        venue: 'Principle and Practice in Applied Linguistics',
        url: 'https://academic.oup.com/',
        takeaway: 'Shows forced active output forces learners to notice syntactic gaps that passive listening glosses over.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Bilingual Anki Sentence-Mining Deck (500 High-Frequency Cards)',
          tier: 'Required',
          scope: 'Curate 250 French + 250 Spanish audio-backed cloze sentences covering top connectors, verbs, and workplace phrases.',
          stack: 'Anki / Spaced Repetition + Native Audio',
          resumeBullet: 'Built 500-card contextual French & Spanish spaced-repetition corpus anchored on top-2,000 spoken frequency words.',
        },
        {
          title: '5-Minute Bilingual Executive Intro & Mock Client Pitch',
          tier: 'Required',
          scope: 'Record and self-audit a 5-minute product/professional introduction in both French and Spanish with zero English fallback.',
          stack: 'Audio Recording + Self-Transcript Audit',
          resumeBullet: 'Delivered recorded 5-minute professional briefings in both French and Spanish demonstrating CEFR B1+ operational fluency.',
        },
      ],
      scalable: [
        {
          title: 'Dual-Language Technical & Business Phrasebook + Shadowing Log',
          tier: 'Scalable Capstone',
          scope: 'Structured domain glossary (finance, engineering, client calls) paired with 30-day logged shadowing + writing corrections.',
          stack: 'Markdown, Audio Corpus, CEFR Rubric',
          resumeBullet: 'Completed 30-day bilingual immersion log compiling domain-specific French/Spanish technical and commercial vocabulary.',
        },
      ],
    },
    certifications: [
      { name: 'TV5MONDE & RFI Français Facile Open Tracks', issuer: 'TV5MONDE / RFI', url: 'https://apprendre.tv5monde.com/', costNote: '100% Free CEFR A1–B2', focus: 'Authentic French listening, grammar, and DELF prep' },
      { name: 'Language Transfer Complete Spanish & Introduction to French', issuer: 'Language Transfer', url: 'https://www.languagetransfer.org/', costNote: '100% Free Audio Courses', focus: 'Structural mental-model transfer from English' },
      { name: 'OpenLearn Free French & Spanish Badged Courses', issuer: 'The Open University (OpenLearn)', url: 'https://www.open.edu/openlearn/languages', costNote: '100% Free Statements of Participation', focus: 'Everyday and workplace Spanish & French' },
    ],
    flashcards: [
      { id: 'fs-fc1', topicId: 'fs-t1', topicTitle: 'Romance Cognate Patterns', question: 'What systematic suffix mapping converts English words like "nation, possibility, rapidly" into Spanish and French?', answer: '-tion → -ción (ES) / -tion (FR); -ity → -idad (ES) / -ité (FR); -ly → -mente (ES) / -ment (FR).', difficulty: 'Core' },
      { id: 'fs-fc2', topicId: 'fs-t2', topicTitle: 'Spanish Ser vs Estar', question: 'Contrast "Juan es aburrido" vs "Juan está aburrido".', answer: '"es aburrido" (ser = inherent trait) means Juan is boring; "está aburrido" (estar = temporary state) means Juan is bored.', difficulty: 'Core' },
      { id: 'fs-fc3', topicId: 'fs-t2', topicTitle: 'French Passé Composé vs Imparfait', question: 'When choose Imparfait instead of Passé Composé in French narration?', answer: 'Use Imparfait for ongoing background descriptions, habits, or states; Passé Composé for specific completed events interrupting the scene.', difficulty: 'Applied' },
      { id: 'fs-fc4', topicId: 'fs-t1', topicTitle: 'French Liaison Rule', question: 'When does silent final "s" or "x" become pronounced as /z/ in French?', answer: 'When followed immediately by a word starting with a vowel or mute h inside a tight syntactic group (e.g., "les_amis", "deux_ans").', difficulty: 'Applied' },
      { id: 'fs-fc5', topicId: 'fs-t3', topicTitle: 'Comprehensible Input (i+1)', question: 'Why is 100% native-speed unsubtitled TV poor for beginners?', answer: 'At 0% comprehension there is no pattern anchor; optimal acquisition happens at ~75–85% known words plus context (i+1).', difficulty: 'Core' },
      { id: 'fs-fc6', topicId: 'fs-t4', topicTitle: 'Subjunctive Trigger', question: 'Why do "Il faut que tu viennes" (FR) and "Quiero que vengas" (ES) require the subjunctive mood?', answer: 'Expressions of necessity, desire, doubt, or emotion about another subject’s uncertain action trigger the subjunctive in Romance languages.', difficulty: 'Applied' },
      { id: 'fs-fc7', topicId: 'fs-t2', topicTitle: 'Avoiding Cross-Language Interference', question: 'Watch out for "false friends": what do "embarazada" (ES) and "actuellement" (FR) actually mean?', answer: '"embarazada" = pregnant (not embarrassed → avergonzado); "actuellement" = currently (not actually → en fait).', difficulty: 'Core' },
      { id: 'fs-fc8', topicId: 'fs-t3', topicTitle: 'Chorus Shadowing', question: 'How does audio shadowing improve accent faster than silent reading?', answer: 'Speaking aloud 0.5s behind native audio trains mouth muscle memory, prosody, and rhythm simultaneously.', difficulty: 'Core' },
    ],
  },
];
