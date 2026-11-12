import { SkillNode } from '../types/curriculum';

export const SKILLS_SWE_DATA_B: SkillNode[] = [
  {
    id: 'web-apis',
    title: 'Web Foundations & APIs',
    aliases: ['Web foundations & APIs', 'HTTP/REST', 'GraphQL', 'OAuth2'],
    domain: 'swe-data',
    summary:
      'Browser rendering & DOM, semantic HTML/CSS, HTTP/2 semantics, REST & OpenAPI contracts, Auth (JWT/Session/OAuth2 PKCE), WebSockets, and rate limiting.',
    estimatedDays: 10,
    tier: 1,
    prerequisites: ['git-github'],
    unlocks: ['full-stack-mern-mean', 'cloud', 'cybersecurity', 'agentic-ai'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'web-d1',
        dayRange: 'Day 1 – 3',
        title: 'Semantic HTML, Modern CSS & Browser Rendering',
        objective: 'Master Flex/Grid layouts, accessibility landmarks, and the critical rendering path.',
        topics: [
          {
            id: 'web-t1',
            title: 'Semantic HTML5, CSS Grid/Flexbox & Core Web Vitals (LCP/INP/CLS)',
            summary: 'Eliminate layout shifts and achieve sub-100ms interaction responsiveness.',
            resources: [
              { title: 'MDN Learn Web Development', provider: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn', kind: 'Docs' },
              { title: 'web.dev Learn HTML, CSS & Performance', provider: 'Google web.dev', url: 'https://web.dev/learn/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'web-d2',
        dayRange: 'Day 4 – 6',
        title: 'HTTP Semantics, REST Contracts & OpenAPI',
        objective: 'Design idempotent endpoints, status codes, CORS, ETag caching, and cursor pagination.',
        topics: [
          {
            id: 'web-t2',
            title: 'HTTP Methods, Status Codes, Caching Headers & OpenAPI 3.1',
            summary: 'Use ETag/If-None-Match, Cache-Control, and RFC 9457 Problem Details.',
            resources: [
              { title: 'MDN HTTP Overview & Caching Guide', provider: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'web-d3',
        dayRange: 'Day 7 – 8',
        title: 'Authentication: Sessions, JWT & OAuth 2.1 PKCE',
        objective: 'Implement secure cookie sessions, refresh token rotation, and OAuth2 PKCE flows.',
        topics: [
          {
            id: 'web-t3',
            title: 'Session Cookies vs JWTs, OAuth2 PKCE & RBAC Middleware',
            summary: 'Avoid storing refresh tokens in localStorage; protect routes cleanly.',
            resources: [
              { title: 'OAuth 2.0 Simplified', provider: 'Aaron Parecki', url: 'https://www.oauth.com/', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'web-d4',
        dayRange: 'Day 9 – 10',
        title: 'Real-Time APIs, Webhooks & Rate Limiting',
        objective: 'Build SSE/WebSockets, token-bucket rate limiters, and resilient retries.',
        topics: [
          {
            id: 'web-t4',
            title: 'Server-Sent Events (SSE), WebSockets & Rate-Limit Headers',
            summary: 'Choose SSE for AI token streaming and WebSockets for bidirectional collaboration.',
            resources: [
              { title: 'MDN Server-Sent Events & WebSockets', provider: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Architectural Styles and the Design of Network-based Software Architectures (REST)',
        authors: 'Roy Thomas Fielding',
        year: 2000,
        venue: 'UC Irvine Doctoral Dissertation',
        url: 'https://ics.uci.edu/~fielding/pubs/dissertation/top.htm',
        takeaway: 'Defined REST constraints (statelessness, cacheability, uniform interface, HATEOAS).',
      },
      {
        title: 'RFC 9110: HTTP Semantics',
        authors: 'Roy T. Fielding, Mark Nottingham, Julian Reschke (IETF)',
        year: 2022,
        venue: 'IETF Standards Track',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
        takeaway: 'Authoritative specification of idempotency, safe methods, content negotiation, and caching.',
      },
      {
        title: 'OAuth 2.0 Threat Model and Security Considerations (RFC 6819 / OAuth 2.1)',
        authors: 'Torsten Lodderstedt, Mark McGloin, Phil Hunt',
        year: 2013,
        venue: 'IETF',
        url: 'https://www.rfc-editor.org/rfc/rfc6819.html',
        takeaway: 'Details PKCE, redirect URI validation, and CSRF state protections.',
      },
    ],
    projects: {
      required: [
        {
          title: 'OpenAPI-First Rate-Limited REST Service with ETag Caching',
          tier: 'Required',
          scope: 'Build a typed API enforcing Zod/Pydantic validation, RFC 9457 error objects, ETag 304 responses, and Redis rate limits.',
          stack: 'TypeScript/Express or FastAPI, OpenAPI, Redis',
          resumeBullet: 'Built OpenAPI-validated REST service supporting ETag conditional caching and sliding-window rate limiting.',
        },
        {
          title: 'Live SSE Token-Streaming & WebSocket Notification Client',
          tier: 'Required',
          scope: 'Implement resilient EventSource/fetch-stream reader with automatic exponential backoff and Last-Event-ID resume.',
          stack: 'TypeScript, React, SSE/WebSockets',
          resumeBullet: 'Engineered resilient SSE streaming client with Last-Event-ID replay recovery and sub-50ms UI updates.',
        },
      ],
      scalable: [
        {
          title: 'Multi-Tenant API Gateway with OAuth2 PKCE & Webhook Dispatcher',
          tier: 'Scalable Capstone',
          scope: 'Scoped API keys, HMAC-signed outbound webhooks with exponential retry queue, and per-tenant quota enforcement.',
          stack: 'TypeScript, PostgreSQL, Redis, Docker',
          resumeBullet: 'Architected multi-tenant API gateway with OAuth2 PKCE auth and guaranteed-delivery HMAC webhook dispatcher.',
        },
      ],
    },
    certifications: [
      { name: 'Responsive Web Design & Backend APIs Certifications', issuer: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/', costNote: '100% Free Certificates', focus: 'HTML/CSS, Node/Express APIs, and REST fundamentals' },
      { name: 'The Odin Project Foundations & NodeJS Paths', issuer: 'The Odin Project', url: 'https://www.theodinproject.com/', costNote: '100% Free Open Curriculum', focus: 'DOM, async JS, APIs, auth, and deployment' },
      { name: 'Google web.dev Learn Core Web Vitals & Accessibility', issuer: 'Google web.dev', url: 'https://web.dev/learn/', costNote: '100% Free', focus: 'Performance, semantic HTML, and progressive web patterns' },
    ],
    flashcards: [
      { id: 'web-fc1', topicId: 'web-t2', topicTitle: 'PUT vs PATCH vs POST', question: 'Which HTTP methods are guaranteed idempotent by RFC 9110?', answer: 'GET, HEAD, OPTIONS, PUT, and DELETE are idempotent; POST (and optionally PATCH) is not.', difficulty: 'Core' },
      { id: 'web-fc2', topicId: 'web-t2', topicTitle: 'CORS Preflight', question: 'When does a browser send an OPTIONS preflight request before your API call?', answer: 'On cross-origin requests that use non-simple methods (PUT/DELETE/PATCH), custom headers (Authorization), or JSON Content-Type.', difficulty: 'Applied' },
      { id: 'web-fc3', topicId: 'web-t3', topicTitle: 'OAuth2 PKCE', question: 'Why is PKCE mandatory for SPAs and mobile apps doing OAuth2 Authorization Code flow?', answer: 'Public clients cannot store a client_secret safely; PKCE binds the authorization code to a per-session code_verifier hash to stop code interception.', difficulty: 'Applied' },
      { id: 'web-fc4', topicId: 'web-t4', topicTitle: 'SSE vs WebSockets', question: 'Why choose Server-Sent Events (SSE) over WebSockets for AI chat streaming or live stock feeds?', answer: 'SSE runs over standard HTTP with built-in automatic reconnection, Last-Event-ID resume, and simpler load-balancer compatibility.', difficulty: 'Core' },
      { id: 'web-fc5', topicId: 'web-t2', topicTitle: 'ETag Conditional Requests', question: 'How do ETag and If-None-Match save server bandwidth and latency?', answer: 'If the resource hash hasn’t changed, the server replies `304 Not Modified` with an empty body so the browser reuses its cached payload.', difficulty: 'Applied' },
      { id: 'web-fc6', topicId: 'web-t1', topicTitle: 'CLS Layout Shift', question: 'What is the #1 cause of Cumulative Layout Shift (CLS) and how do you fix it?', answer: 'Images, embeds, or async banners injected without reserved width/height aspect-ratio boxes; reserve space upfront in CSS.', difficulty: 'Core' },
      { id: 'web-fc7', topicId: 'web-t3', topicTitle: 'JWT Revocation Trade-off', question: 'What is the main operational weakness of long-lived stateless JWTs?', answer: 'You cannot instantly revoke a compromised token before expiry without re-introducing server-side denylist state (defeating statelessness).', difficulty: 'Deep Dive' },
      { id: 'web-fc8', topicId: 'web-t2', topicTitle: '401 vs 403', question: 'Distinguish HTTP 401 Unauthorized from 403 Forbidden.', answer: '401 = unauthenticated (missing/invalid credentials); 403 = authenticated identity known, but lacks permission for this resource.', difficulty: 'Core' },
    ],
  },
  {
    id: 'full-stack-mern-mean',
    title: 'Full Stack (MERN & MEAN)',
    aliases: ['Full Stack-MEAN,MEARN', 'MERN', 'MEAN', 'React/Angular/Node'],
    domain: 'swe-data',
    summary:
      'End-to-end MongoDB/Express/Node full-stack engineering comparing React (MERN) and Angular (MEAN), state synchronization, indexing, and production deployment.',
    estimatedDays: 16,
    tier: 3,
    prerequisites: ['web-apis', 'sql', 'ui-ux-design'],
    unlocks: ['system-design', 'software-testing-qa', 'forward-deployed-eng'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'fs-mern-d1',
        dayRange: 'Day 1 – 4',
        title: 'MongoDB Schema Design & Aggregation Pipelines',
        objective: 'Model embedding vs referencing, compound indexes, and aggregation stages cleanly.',
        topics: [
          {
            id: 'fs-mern-t1',
            title: 'MongoDB Document Modeling, ESR Index Rule & Aggregation Pipelines',
            summary: 'Avoid unbounded document arrays and use Equality-Sort-Range index ordering.',
            resources: [
              { title: 'MongoDB University Free Courses', provider: 'MongoDB University', url: 'https://learn.mongodb.com/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'fs-mern-d2',
        dayRange: 'Day 5 – 8',
        title: 'Express / Node.js Backend & Type-Safe Contracts',
        objective: 'Structure layered controllers/services, Zod validation, transactions, and graceful shutdown.',
        topics: [
          {
            id: 'fs-mern-t2',
            title: 'Express Middleware, Mongo Transactions & Clean Error Handling',
            summary: 'Prevent event-loop blocking, handle async errors cleanly, and validate request payloads.',
            resources: [
              { title: 'Node.js Best Practices Repository', provider: 'GitHub / Goldbergyoni', url: 'https://github.com/goldbergyoni/nodebestpractices', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fs-mern-d3',
        dayRange: 'Day 9 – 12',
        title: 'Frontend Architecture: React (MERN) vs Angular (MEAN)',
        objective: 'Master React hooks/TanStack Query alongside Angular Signals, DI, and RxJS.',
        topics: [
          {
            id: 'fs-mern-t3',
            title: 'React Concurrent Hooks & Server-State vs Angular Signals & RxJS',
            summary: 'Compare unidirectional React composition with Angular’s batteries-included DI & router.',
            resources: [
              { title: 'React Official Learn Docs', provider: 'React.dev', url: 'https://react.dev/learn', kind: 'Docs' },
              { title: 'Angular Official Tutorials (Signals & Standalone)', provider: 'Angular.dev', url: 'https://angular.dev/tutorials', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'fs-mern-d4',
        dayRange: 'Day 13 – 16',
        title: 'Full-Stack Security, Caching & E2E Deployment',
        objective: 'Connect optimistic UI updates, Redis caching, and containerized CI/CD.',
        topics: [
          {
            id: 'fs-mern-t4',
            title: 'Optimistic Mutations, SSR/Hydration & Production Bundling',
            summary: 'Ship code-split bundles with zero waterfall fetches.',
            resources: [
              { title: 'Full Stack Open (University of Helsinki)', provider: 'University of Helsinki', url: 'https://fullstackopen.com/en/', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Out of the Tar Pit',
        authors: 'Ben Moseley, Peter Marks',
        year: 2006,
        venue: 'Software Practice Advancement',
        url: 'https://curtclifton.net/papers/MoseleyMarks06a.pdf',
        takeaway: 'Explains why separating essential state from accidental UI/cache state prevents full-stack complexity collapse.',
      },
      {
        title: 'The Node.js Event Loop & Reactor Pattern (libuv)',
        authors: 'Ryan Dahl / libuv Architecture Docs',
        year: 2009,
        venue: 'JSConf / libuv Design Overview',
        url: 'https://docs.libuv.org/en/v1.x/design.html',
        takeaway: 'Shows how non-blocking I/O multiplexing achieves high concurrency on a single JS thread.',
      },
      {
        title: 'ReactiveX & Push-Based Dataflow Programming',
        authors: 'Erik Meijer (RxJS Foundations)',
        year: 2012,
        venue: 'Communications of the ACM',
        url: 'https://queue.acm.org/detail.cfm?id=2169076',
        takeaway: 'Unified async events as composable observable streams powering Angular’s RxJS stack.',
      },
    ],
    projects: {
      required: [
        {
          title: 'MERN Collaborative Issue & Sprint Board (Optimistic UI)',
          tier: 'Required',
          scope: 'React + Express + MongoDB app with JWT/cookie auth, drag-drop optimistic mutations, and ESR-indexed search.',
          stack: 'MongoDB, Express, React, Node.js, TypeScript',
          resumeBullet: 'Built full-stack MERN workspace with optimistic drag-drop updates, cookie auth, and ESR-indexed MongoDB search.',
        },
        {
          title: 'MEAN Enterprise Inventory & Audit Portal',
          tier: 'Required',
          scope: 'Angular standalone components + Signals + RxJS typeahead calling Express + MongoDB aggregation endpoints.',
          stack: 'MongoDB, Express, Angular, Node.js, RxJS',
          resumeBullet: 'Developed MEAN enterprise inventory portal using Angular Signals, RxJS switchMap debouncing, and MongoDB aggregations.',
        },
      ],
      scalable: [
        {
          title: 'Real-Time Multi-Tenant SaaS Starter with RBAC & Stripe Webhooks',
          tier: 'Scalable Capstone',
          scope: 'Full-stack workspace featuring tenant isolation, WebSocket presence, Redis rate limiting, and E2E Playwright suite.',
          stack: 'MongoDB, Express, React/Angular, Redis, Docker, Playwright',
          resumeBullet: 'Shipped containerized multi-tenant SaaS architecture supporting real-time WebSocket sync and automated Playwright E2E CI.',
        },
      ],
    },
    certifications: [
      { name: 'Full Stack Open (Deep Dive into Modern Web Development)', issuer: 'University of Helsinki', url: 'https://fullstackopen.com/en/', costNote: '100% Free University Certificate', focus: 'React, Node/Express, MongoDB, GraphQL, TypeScript, CI/CD' },
      { name: 'MongoDB Node.js Developer Path', issuer: 'MongoDB University', url: 'https://learn.mongodb.com/', costNote: '100% Free Badges', focus: 'Data modeling, indexes, aggregation, and transactions' },
      { name: 'Back End Development and APIs + Front End Libraries', issuer: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/', costNote: '100% Free Certificates', focus: 'React, Redux, Node, Express, and MongoDB' },
    ],
    flashcards: [
      { id: 'fs-mern-fc1', topicId: 'fs-mern-t1', topicTitle: 'MongoDB ESR Rule', question: 'In what order should fields appear in a compound MongoDB index?', answer: 'Equality filters first, Sort fields second, Range filters last (ESR) to avoid expensive in-memory sorts.', difficulty: 'Applied' },
      { id: 'fs-mern-fc2', topicId: 'fs-mern-t3', topicTitle: 'RxJS switchMap', question: 'Why use `switchMap` instead of `mergeMap` for an Angular search-as-you-type autocomplete?', answer: 'switchMap cancels previous in-flight HTTP requests whenever the user types a new character, preventing stale slow responses from overwriting newer results.', difficulty: 'Applied' },
      { id: 'fs-mern-fc3', topicId: 'fs-mern-t3', topicTitle: 'React Keys', question: 'Why never use array index as the React `key` prop in a reorderable or filterable list?', answer: 'Index keys confuse React reconciliation when items shift or delete, corrupting component local state and animations.', difficulty: 'Core' },
      { id: 'fs-mern-fc4', topicId: 'fs-mern-t2', topicTitle: 'Node Event Loop Blocking', question: 'Why can running synchronous JSON.parse on 50MB payloads or bcrypt sync stall ALL Express users?', answer: 'Node executes JS on one main event-loop thread; heavy CPU work blocks every other concurrent request until it finishes.', difficulty: 'Core' },
      { id: 'fs-mern-fc5', topicId: 'fs-mern-t1', topicTitle: 'Unbounded Arrays', question: 'Why is embedding an unbounded `comments[]` array inside a MongoDB Post document an anti-pattern?', answer: 'Documents hit the 16MB BSON limit, trigger frequent disk relocations, and bloat index updates; store comments in a referenced collection.', difficulty: 'Applied' },
      { id: 'fs-mern-fc6', topicId: 'fs-mern-t4', topicTitle: 'Server vs Client State', question: 'Why separate server-cache state (TanStack Query) from local UI state?', answer: 'Server state is asynchronous, shared, and stale-prone; dedicated query caches handle deduplication, background refetch, and optimistic rollback cleanly.', difficulty: 'Applied' },
      { id: 'fs-mern-fc7', topicId: 'fs-mern-t3', topicTitle: 'MERN vs MEAN', question: 'What is the biggest architectural difference between React (MERN) and Angular (MEAN)?', answer: 'React is a focused UI view library choosing ecosystem tools piecemeal; Angular is an opinionated full framework with built-in DI, routing, forms, and Signals.', difficulty: 'Core' },
      { id: 'fs-mern-fc8', topicId: 'fs-mern-t2', topicTitle: 'Graceful Shutdown', question: 'What should an Express/Node server do when receiving SIGTERM from Kubernetes/Docker?', answer: 'Stop accepting new connections (`server.close()`), finish active in-flight requests, close DB/Redis pools cleanly, then exit 0.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'system-design',
    title: 'System Design',
    aliases: ['System Design', 'Distributed Systems', 'High Scalability', 'Architecture'],
    domain: 'swe-data',
    summary:
      'Back-of-envelope capacity math, caching & eviction, sharding & consistent hashing, replication & consensus (Raft), queues, and backpressure.',
    estimatedDays: 14,
    tier: 4,
    prerequisites: ['full-stack-mern-mean', 'sql', 'cloud-engineering', 'network-engineering'],
    unlocks: ['mlops', 'forward-deployed-eng', 'fintech'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'sd-d1',
        dayRange: 'Day 1 – 3',
        title: 'Capacity Estimation, SLAs & Read/Write Scaling',
        objective: 'Estimate QPS, storage, bandwidth, and tail latency amplification.',
        topics: [
          {
            id: 'sd-t1',
            title: 'Back-of-Envelope Math, Tail Latency & Read-Heavy vs Write-Heavy',
            summary: 'Analyze fan-out-on-write vs fan-out-on-read for feeds and timelines.',
            resources: [
              { title: 'System Design Primer (GitHub Open Guide)', provider: 'Donne Martin', url: 'https://github.com/donnemartin/system-design-primer', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'sd-d2',
        dayRange: 'Day 4 – 7',
        title: 'Caching, Partitioning & Consistent Hashing',
        objective: 'Prevent cache stampedes, hot keys, and rebalancing storms.',
        topics: [
          {
            id: 'sd-t2',
            title: 'Cache-Aside/Write-Through, Stampede Mitigation & Consistent Hashing',
            summary: 'Use virtual nodes, singleflight coalescing, and jittered TTLs.',
            resources: [
              { title: 'Redis Architecture & Caching Patterns', provider: 'Redis Docs', url: 'https://redis.io/docs/latest/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'sd-d3',
        dayRange: 'Day 8 – 11',
        title: 'Replication, CAP/PACELC & Consensus (Raft)',
        objective: 'Reason rigorously about split-brain, quorum reads/writes, and leader election.',
        topics: [
          {
            id: 'sd-t3',
            title: 'Quorums (W + R > N), PACELC, Lamport Clocks & Raft Consensus',
            summary: 'Understand why distributed locks need fencing tokens.',
            resources: [
              { title: 'MIT 6.5840 (6.824) Distributed Systems', provider: 'MIT CSAIL', url: 'https://pdos.csail.mit.edu/6.824/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'sd-d4',
        dayRange: 'Day 12 – 14',
        title: 'Resilience: Circuit Breakers, Outbox Pattern & Backpressure',
        objective: 'Prevent cascading retries and dual-write inconsistencies.',
        topics: [
          {
            id: 'sd-t4',
            title: 'Transactional Outbox, Token Buckets, Circuit Breakers & Shedding',
            summary: 'Use exponential backoff + full jitter and load-shedding priority queues.',
            resources: [
              { title: 'Stripe / AWS Builders Library Distributed Patterns', provider: 'AWS Builders Library', url: 'https://aws.amazon.com/builders-library/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Dynamo: Amazon’s Highly Available Key-value Store',
        authors: 'Giuseppe DeCandia et al.',
        year: 2007,
        venue: 'ACM SOSP',
        url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
        takeaway: 'Popularized consistent hashing, sloppy quorums, hinted handoff, and vector clocks.',
      },
      {
        title: 'In Search of an Understandable Consensus Algorithm (Raft)',
        authors: 'Diego Ongaro, John Ousterhout',
        year: 2014,
        venue: 'USENIX ATC',
        url: 'https://raft.github.io/raft.pdf',
        takeaway: 'Decomposed consensus into leader election, log replication, and safety invariants.',
      },
      {
        title: 'The Tail at Scale',
        authors: 'Jeffrey Dean, Luiz André Barroso',
        year: 2013,
        venue: 'Communications of the ACM',
        url: 'https://research.google/pubs/the-tail-at-scale/',
        takeaway: 'Explains why p99 latency compounds across fan-out RPCs and how hedged requests cure it.',
      },
      {
        title: 'Bigtable: A Distributed Storage System for Structured Data',
        authors: 'Fay Chang et al.',
        year: 2006,
        venue: 'USENIX OSDI',
        url: 'https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/',
        takeaway: 'Introduced LSM-tree SSTable compaction architecture behind HBase, Cassandra, and RocksDB.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Distributed Consistent-Hashing Cache Ring with Virtual Nodes',
          tier: 'Required',
          scope: 'Implement a consistent hash ring with configurable vnodes, key-distribution variance benchmarks, and node failover.',
          stack: 'Go/Python/TypeScript',
          resumeBullet: 'Implemented consistent hashing ring with 150 virtual nodes/shard reducing key redistribution during node failure to <4%.',
        },
        {
          title: 'Transactional Outbox + Idempotent Consumer Demo',
          tier: 'Required',
          scope: 'Guarantee atomic DB write + Kafka/queue event publishing without dual-write race conditions.',
          stack: 'PostgreSQL, Redis/Kafka, Node/Python',
          resumeBullet: 'Eliminated dual-write event loss by implementing the Transactional Outbox pattern with idempotent consumer deduplication.',
        },
      ],
      scalable: [
        {
          title: 'Mini-Raft Key-Value Cluster (MIT 6.824 Style)',
          tier: 'Scalable Capstone',
          scope: 'Implement Raft leader election, AppendEntries log replication, and partitioned split-brain recovery tests.',
          stack: 'Go / Rust / TypeScript',
          resumeBullet: 'Built fault-tolerant Raft consensus KV cluster surviving leader crashes and network partitions with linearizable reads.',
        },
      ],
    },
    certifications: [
      { name: 'MIT 6.5840 (6.824) Distributed Systems', issuer: 'MIT CSAIL (Open Courseware)', url: 'https://pdos.csail.mit.edu/6.824/', costNote: '100% Free Lectures & Papers', focus: 'MapReduce, Raft, Spanner, and linearizability' },
      { name: 'System Design Primer & Architecture Guides', issuer: 'Open Source / GitHub', url: 'https://github.com/donnemartin/system-design-primer', costNote: '100% Free', focus: 'Sharding, caching, load balancing, and case studies' },
      { name: 'AWS Builders Library (Distributed Systems)', issuer: 'Amazon Web Services', url: 'https://aws.amazon.com/builders-library/', costNote: '100% Free Engineering Papers', focus: 'Retries, timeouts, shuffle sharding, and health checks' },
    ],
    flashcards: [
      { id: 'sd-fc1', topicId: 'sd-t2', topicTitle: 'Cache Stampede', question: 'What causes a thundering herd cache stampede when a popular key expires, and how do you stop it?', answer: 'Thousands of requests miss simultaneously and slam the DB; fix with singleflight request coalescing, jittered TTLs, or early probabilistic refresh.', difficulty: 'Applied' },
      { id: 'sd-fc2', topicId: 'sd-t4', topicTitle: 'Retry Storms', question: 'Why does naive immediate retry across microservices turn a brief blip into a full outage?', answer: 'Synchronized retries multiply load (e.g. 3x at every hop = 27x amplification); always use exponential backoff + full jitter + retry budgets.', difficulty: 'Core' },
      { id: 'sd-fc3', topicId: 'sd-t3', topicTitle: 'Fencing Tokens', question: 'Why is a Redis SETNX distributed lock alone unsafe for guaranteeing mutual exclusion on storage writes?', answer: 'GC pauses can expire a client’s lease mid-operation; storage must reject stale writes using monotonically increasing fencing tokens.', difficulty: 'Deep Dive' },
      { id: 'sd-fc4', topicId: 'sd-t1', topicTitle: 'Fan-Out Hybrid', question: 'How does Twitter/X combine fan-out-on-write and fan-out-on-read for timelines?', answer: 'Push tweets into followers’ Redis feeds for normal users (fast reads), but pull at read time for celebrities with millions of followers.', difficulty: 'Applied' },
      { id: 'sd-fc5', topicId: 'sd-t3', topicTitle: 'PACELC Theorem', question: 'What does PACELC add beyond CAP theorem?', answer: 'If Partitioned, choose Availability or Consistency (PA/PC); Else in normal operation, choose Latency or Consistency (EL/EC).', difficulty: 'Applied' },
      { id: 'sd-fc6', topicId: 'sd-t1', topicTitle: 'Tail Latency Amplification', question: 'If 1 RPC has a 1% chance of taking >100ms, what is the chance a fan-out page calling 50 services hits >100ms?', answer: '1 - (0.99)^50 ≈ 39.5% of users experience the slow tail!', difficulty: 'Deep Dive' },
      { id: 'sd-fc7', topicId: 'sd-t4', topicTitle: 'Transactional Outbox', question: 'How do you reliably update Postgres AND publish an event to Kafka without distributed 2PC?', answer: 'Write the domain row and an `outbox_events` row inside the same single local ACID Postgres transaction, then relay asynchronously.', difficulty: 'Applied' },
      { id: 'sd-fc8', topicId: 'sd-t2', topicTitle: 'Consistent Hashing', question: 'Why add virtual nodes (vnodes) on a consistent hash ring?', answer: 'A handful of physical nodes create uneven arc sizes and hot spots; 100+ vnodes per machine balance key distribution uniformly.', difficulty: 'Core' },
    ],
  },
  {
    id: 'software-testing-qa',
    title: 'Software Testing & QA',
    aliases: ['Software testing & QA', 'Playwright', 'Test Pyramid', 'Contract Testing'],
    domain: 'swe-data',
    summary:
      'Testing trophy/pyramid strategy, unit & property-based testing, API integration & contract testing, Playwright E2E determinism, and CI flakiness control.',
    estimatedDays: 8,
    tier: 2,
    prerequisites: ['git-github', 'web-apis'],
    unlocks: ['full-stack-mern-mean', 'devops'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'qa-d1',
        dayRange: 'Day 1 – 2',
        title: 'Testing Trophy, Boundaries & Test Doubles',
        objective: 'Know when to mock vs use real test databases and avoid brittle implementation-coupled tests.',
        topics: [
          {
            id: 'qa-t1',
            title: 'Test Pyramid vs Trophy, Fakes vs Mocks & Deterministic Clocks',
            summary: 'Test observable behavior rather than internal private method calls.',
            resources: [
              { title: 'Martin Fowler: The Practical Test Pyramid', provider: 'MartinFowler.com', url: 'https://martinfowler.com/articles/practical-test-pyramid.html', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'qa-d2',
        dayRange: 'Day 3 – 4',
        title: 'Unit, Property-Based & Mutation Testing',
        objective: 'Catch boundary edge cases automatically with Hypothesis / fast-check.',
        topics: [
          {
            id: 'qa-t2',
            title: 'Property-Based Testing (fast-check/Hypothesis) & Equivalence Partitioning',
            summary: 'Assert invariants across 1,000 generated inputs instead of 3 happy-path examples.',
            resources: [
              { title: 'Vitest & Hypothesis Testing Docs', provider: 'Vitest', url: 'https://vitest.dev/guide/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'qa-d3',
        dayRange: 'Day 5 – 6',
        title: 'Playwright E2E & Accessibility Testing',
        objective: 'Write zero-flake Playwright browser tests using semantic role locators.',
        topics: [
          {
            id: 'qa-t3',
            title: 'Playwright Web-First Assertions, Role Locators & Trace Viewer',
            summary: 'Never use `sleep(2000)`; rely on auto-retrying locator assertions and isolated browser contexts.',
            resources: [
              { title: 'Playwright Official Best Practices & Docs', provider: 'Microsoft Playwright', url: 'https://playwright.dev/docs/best-practices', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'qa-d4',
        dayRange: 'Day 7 – 8',
        title: 'Load, Contract & Chaos QA in CI',
        objective: 'Validate OpenAPI consumer-provider contracts and run k6 load baselines.',
        topics: [
          {
            id: 'qa-t4',
            title: 'API Contract Testing, k6 Load Baselines & Flake Quarantine',
            summary: 'Measure p95 regression under concurrency and isolate flaky tests quickly.',
            resources: [
              { title: 'Grafana k6 Load Testing Guides', provider: 'k6 Docs', url: 'https://grafana.com/docs/k6/latest/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs',
        authors: 'Koen Claessen, John Hughes',
        year: 2000,
        venue: 'ACM ICFP',
        url: 'https://dl.acm.org/doi/10.1145/351240.351266',
        takeaway: 'Invented property-based testing with automatic minimal counterexample shrinking.',
      },
      {
        title: 'An Empirical Analysis of Flaky Tests',
        authors: 'Qingzhou Luo, Farah Hariri, Lamyaa Eloussi, Darko Marinov',
        year: 2014,
        venue: 'ACM FSE',
        url: 'https://mir.cs.illinois.edu/marinov/publications/LuoETAL14FlakyTests.pdf',
        takeaway: 'Categorized root causes of test flakiness (async waits 45%, concurrency, test order dependency).',
      },
      {
        title: 'Are Mutants a Valid Substitute for Real Faults in Software Testing?',
        authors: 'René Just, Darioush Jalali, Laura Inozemtseva, Michael D. Ernst, Reid Holmes, Gordon Fraser',
        year: 2014,
        venue: 'ACM FSE',
        url: 'https://homes.cs.washington.edu/~rjust/publ/mutants_fse_2014.pdf',
        takeaway: 'Proved mutation score catches suite blind spots that raw line coverage misses.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Zero-Flake Playwright E2E + Accessibility Gate',
          tier: 'Required',
          scope: 'Test auth, form errors, responsive layouts, and axe-core WCAG rules with Playwright Trace artifacts on failure.',
          stack: 'Playwright, TypeScript, axe-core, GitHub Actions',
          resumeBullet: 'Built deterministic Playwright E2E and axe-core accessibility CI suite catching UI and WCAG regressions on every PR.',
        },
        {
          title: 'Property-Based Testing Suite for Financial/Parser Logic',
          tier: 'Required',
          scope: 'Use fast-check or Hypothesis to fuzz invariants (round-trip serialization, ledger conservation) across 1,000+ cases.',
          stack: 'Vitest/Pytest, fast-check/Hypothesis',
          resumeBullet: 'Uncovered 6 boundary arithmetic bugs via property-based fuzzing across 10k generated test vectors.',
        },
      ],
      scalable: [
        {
          title: 'CI Performance & Contract Regression Guard (k6 + Testcontainers)',
          tier: 'Scalable Capstone',
          scope: 'Spin up ephemeral Postgres via Testcontainers for integration tests and enforce p95 k6 latency thresholds in CI.',
          stack: 'Testcontainers, k6, Playwright, GitHub Actions',
          resumeBullet: 'Automated ephemeral Testcontainers integration and k6 p95 latency gates blocking performance regressions pre-merge.',
        },
      ],
    },
    certifications: [
      { name: 'Quality Assurance Certification', issuer: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/quality-assurance/', costNote: '100% Free Certificate', focus: 'Chai/Mocha testing, functional & API assertions' },
      { name: 'Test Automation University (TAU) Free Paths', issuer: 'Applitools TAU', url: 'https://testautomationu.applitools.com/', costNote: '100% Free Certificates', focus: 'Playwright, Cypress, API testing, and CI pipelines' },
      { name: 'Google Testing Blog & Web Testing Guides', issuer: 'Google / web.dev', url: 'https://web.dev/learn/testing/', costNote: '100% Free', focus: 'Component, integration, and browser automation' },
    ],
    flashcards: [
      { id: 'qa-fc1', topicId: 'qa-t1', topicTitle: 'Coverage Fallacy', question: 'How can a codebase have 95% line coverage and still ship critical bugs?', answer: 'Line coverage only tracks whether code executed, not whether meaningful assertions verified edge cases, error paths, or business invariants.', difficulty: 'Core' },
      { id: 'qa-fc2', topicId: 'qa-t3', topicTitle: 'Playwright Locators', question: 'Why prefer `getByRole("button", { name: "Save" })` over `.btn-primary-2 > span`?', answer: 'Role locators test real accessibility semantics and survive CSS refactoring without breaking tests.', difficulty: 'Core' },
      { id: 'qa-fc3', topicId: 'qa-t3', topicTitle: 'Eliminating E2E Flake', question: 'Why are hardcoded `waitForTimeout(3000)` calls the #1 cause of flaky and slow E2E suites?', answer: 'Fast CI passes slowly while loaded CI fails at 3.1s; web-first auto-retrying assertions (`expect(locator).toBeVisible()`) settle instantly as soon as state is ready.', difficulty: 'Core' },
      { id: 'qa-fc4', topicId: 'qa-t2', topicTitle: 'Property-Based Testing', question: 'What extra power does property-based testing add over example-based unit tests?', answer: 'It generates hundreds of adversarial inputs (empty strings, Unicode, negative/max ints) and shrinks failing cases to the minimal reproducible counterexample.', difficulty: 'Applied' },
      { id: 'qa-fc5', topicId: 'qa-t1', topicTitle: 'Mocking Trap', question: 'When does over-mocking make a test suite worthless?', answer: 'Mocking your own database queries or internal helpers tests your mock assumptions rather than real SQL/serialization integration.', difficulty: 'Applied' },
      { id: 'qa-fc6', topicId: 'qa-t4', topicTitle: 'Contract Testing', question: 'How does Consumer-Driven Contract Testing catch breaking API changes faster than full E2E staging environments?', answer: 'Consumer and provider verify shared request/response schema contracts independently in seconds without deploying every microservice.', difficulty: 'Deep Dive' },
      { id: 'qa-fc7', topicId: 'qa-t2', topicTitle: 'Boundary Value Analysis', question: 'For a discount rule "valid for quantities 1 to 100", which boundary values must be tested?', answer: '0, 1, 2 (lower boundary) and 99, 100, 101 (upper boundary), plus negative/null types.', difficulty: 'Core' },
      { id: 'qa-fc8', topicId: 'qa-t4', topicTitle: 'Flaky Test Policy', question: 'Why should known flaky tests never just be ignored with infinite retries?', answer: 'Ignoring flaky tests trains engineers to ignore red CI builds, letting real regressions slip straight into production.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'forward-deployed-eng',
    title: 'Forward Deployed Engineering',
    aliases: ['Forward Deployed Engg', 'Solutions Engineering', 'Field Engineering', 'Customer Engineering'],
    domain: 'swe-data',
    summary:
      'Rapid customer discovery + production prototyping, messy enterprise data integration, live PoC delivery, security compliance, and turning field hacks into core product.',
    estimatedDays: 10,
    tier: 4,
    prerequisites: ['full-stack-mern-mean', 'agentic-ai', 'communication-teamwork', 'sales'],
    unlocks: [],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'fde-d1',
        dayRange: 'Day 1 – 3',
        title: 'Embedded Discovery & Rapid Prototyping',
        objective: 'Shadow real operators, spot high-ROI bottlenecks, and ship a working PoC in 48 hours.',
        topics: [
          {
            id: 'fde-t1',
            title: 'Operational Shadowing, Time-Boxed PoCs & Success Criteria',
            summary: 'Define measurable PoC exit gates before writing custom integration code.',
            resources: [
              { title: 'Palantir Engineering Blog (Field & Platform Engineering)', provider: 'Palantir Blog', url: 'https://blog.palantir.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fde-d2',
        dayRange: 'Day 4 – 6',
        title: 'Dirty Enterprise Data & Legacy Integration',
        objective: 'Connect modern APIs/AI onto messy ERP exports, SFTP drops, SOAP/XML, and flaky CSVs.',
        topics: [
          {
            id: 'fde-t2',
            title: 'Legacy Adapters, Schema Quarantine & Idempotent Backfills',
            summary: 'Handle encoding quirks, partial sync failures, and strict customer VPC deployments.',
            resources: [
              { title: 'Twelve-Factor App Methodology', provider: '12factor.net', url: 'https://12factor.net/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fde-d3',
        dayRange: 'Day 7 – 8',
        title: 'Enterprise Security Reviews & Air-Gapped Deployments',
        objective: 'Navigate SOC2 questionnaires, SSO/SAML, RBAC, and private-cloud Docker/Helm handoffs.',
        topics: [
          {
            id: 'fde-t3',
            title: 'SSO/SAML/SCIM, VPC Deployment & InfoSec Architecture Reviews',
            summary: 'Communicate data residency, encryption-at-rest, and zero-retention AI guarantees cleanly.',
            resources: [
              { title: 'OWASP Enterprise Security Architecture', provider: 'OWASP', url: 'https://owasp.org/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'fde-d4',
        dayRange: 'Day 9 – 10',
        title: 'Productizing Field Solutions Back to Core',
        objective: 'Avoid permanent bespoke consulting forks by extracting reusable platform primitives.',
        topics: [
          {
            id: 'fde-t4',
            title: 'Field-to-Product Feedback Loops & Config-Over-Fork Architecture',
            summary: 'Distill 3 customer workarounds into 1 clean core platform feature.',
            resources: [
              { title: 'Martin Fowler: Patterns of Enterprise Integration', provider: 'Enterprise Integration Patterns', url: 'https://www.enterpriseintegrationpatterns.com/', kind: 'Book' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Twelve-Factor App (Portable Cloud-Native Deployment Methodology)',
        authors: 'Adam Wiggins',
        year: 2011,
        venue: 'Heroku / Cloud Engineering Standard',
        url: 'https://12factor.net/',
        takeaway: 'Config-via-env, stateless processes, and dev/prod parity essential for customer-VPC deployments.',
      },
      {
        title: 'Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions',
        authors: 'Gregor Hohpe, Bobby Woolf',
        year: 2003,
        venue: 'Addison-Wesley / EIP',
        url: 'https://www.enterpriseintegrationpatterns.com/',
        takeaway: 'Catalogs canonical adapter, dead-letter, splitter, and idempotent receiver patterns for legacy systems.',
      },
      {
        title: 'Conway’s Law: How Do Committees Invent?',
        authors: 'Melvin E. Conway',
        year: 1968,
        venue: 'Datamation',
        url: 'https://www.melconway.com/Home/Conways_Law.html',
        takeaway: 'Explains why forward-deployed engineers must map enterprise org boundaries when integrating cross-team software.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Dirty-CSV / Legacy ERP Ingestion Adapter with Quarantine UI',
          tier: 'Required',
          scope: 'Ingest inconsistent encoding/date CSVs, validate via Zod/Pydantic, route bad rows to fix-it queue, and emit clean API sync.',
          stack: 'Python/TypeScript, PostgreSQL, Docker',
          resumeBullet: 'Built fault-tolerant ERP ingestion adapter handling malformed legacy exports with row-level quarantine and replay.',
        },
        {
          title: '48-Hour Customer PoC + Architecture InfoSec One-Pager',
          tier: 'Required',
          scope: 'Containerized single-command (`docker compose up`) AI workflow demo paired with data-flow & RBAC security brief.',
          stack: 'Docker Compose, FastAPI/React, Mermaid',
          resumeBullet: 'Delivered turnkey Dockerized enterprise PoC and InfoSec data-flow packet accelerating technical sign-off.',
        },
      ],
      scalable: [
        {
          title: 'Configurable Multi-Customer Connector Framework (Zero Code Forks)',
          tier: 'Scalable Capstone',
          scope: 'Declarative YAML field-mapping & auth adapter engine letting field engineers onboard new client schemas without forking core code.',
          stack: 'TypeScript/Python, JSON Schema, OpenTelemetry',
          resumeBullet: 'Designed declarative connector framework enabling 1-day customer onboarding with zero per-tenant codebase forks.',
        },
      ],
    },
    certifications: [
      { name: 'The Twelve-Factor App & Cloud Native Architecture', issuer: 'CNCF / 12factor', url: 'https://12factor.net/', costNote: '100% Free Standard', focus: 'Portable config, backing services, and parity' },
      { name: 'Enterprise Integration Patterns Guide', issuer: 'EIP', url: 'https://www.enterpriseintegrationpatterns.com/', costNote: '100% Free Reference', focus: 'Adapters, message routers, and legacy bridges' },
      { name: 'Google Cloud / AWS Solutions Architect Free Learning Paths', issuer: 'AWS Skill Builder / Google Cloud', url: 'https://explore.skillbuilder.aws/', costNote: '100% Free Tier', focus: 'VPC networking, IAM federation, and enterprise security' },
    ],
    flashcards: [
      { id: 'fde-fc1', topicId: 'fde-t1', topicTitle: 'PoC Success Criteria', question: 'What mistake turns a 2-week Forward Deployed PoC into an endless unpaid consulting trap?', answer: 'Starting without written, measurable business acceptance criteria and a defined conversion milestone agreed upfront with the buyer.', difficulty: 'Core' },
      { id: 'fde-fc2', topicId: 'fde-t4', topicTitle: 'Config vs Fork', question: 'Why is copying and modifying the core repo for Customer #4 ("bespoke fork") catastrophic for a startup?', answer: 'Every bugfix and core upgrade now has to be manually ported across N diverging forks, paralyzing engineering velocity.', difficulty: 'Core' },
      { id: 'fde-fc3', topicId: 'fde-t2', topicTitle: 'Dirty Data Strategy', question: 'When an overnight 100,000-row customer sync hits 12 malformed rows, should the whole batch fail silently or crash?', answer: 'Neither—apply dead-letter quarantine: commit valid rows idempotently, isolate the 12 bad rows with exact error reasons, and alert.', difficulty: 'Applied' },
      { id: 'fde-fc4', topicId: 'fde-t3', topicTitle: 'InfoSec Trust Accelerators', question: 'What 3 artifacts instantly unblock an enterprise InfoSec review?', answer: 'A clean architecture data-flow diagram, explicit encryption/data-retention policy, and SSO/RBAC permission matrix.', difficulty: 'Applied' },
      { id: 'fde-fc5', topicId: 'fde-t1', topicTitle: 'Operator Shadowing', question: 'Why watch end operators do their actual job rather than only interviewing their VP sponsor?', answer: 'VPs describe ideal processes; operators reveal the messy Excel workarounds, copy-paste bottlenecks, and tribal rules where real ROI hides.', difficulty: 'Core' },
      { id: 'fde-fc6', topicId: 'fde-t2', topicTitle: 'SFTP & Legacy Reality', question: 'Why must FDEs master boring protocols like SFTP, fixed-width CSVs, and SOAP?', answer: 'Banks, hospitals, and logistics giants still run mission-critical systems on nightly SFTP drops rather than clean GraphQL APIs.', difficulty: 'Core' },
      { id: 'fde-fc7', topicId: 'fde-t3', topicTitle: 'Air-Gapped Packaging', question: 'What breaks when deploying a Docker container inside a restricted customer VPC with no public internet?', answer: 'Runtime downloads (pip/npm/HF weights/Google Fonts) fail; all weights, assets, and dependencies must be pre-baked or mirrored locally.', difficulty: 'Deep Dive' },
      { id: 'fde-fc8', topicId: 'fde-t4', topicTitle: 'Productization Signal', question: 'When should a field-built integration script be promoted into the core product roadmap?', answer: 'Once 3+ independent customers require the exact same capability—extract the general abstraction and retire the one-off script.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'vibe-coding-automation',
    title: 'Vibe Coding & Automation',
    aliases: ['Vibe coding & automation', 'Vibe Coding', 'AI-Assisted Dev', 'Workflow Automation'],
    domain: 'swe-data',
    summary:
      'High-velocity AI-assisted software creation with architectural discipline: spec-driven prompting, diff auditing, verification loops, n8n/Zapier/Python automation, and browser scripting.',
    estimatedDays: 7,
    tier: 2,
    prerequisites: ['prompting-ai-tools', 'git-github', 'python-core'],
    unlocks: ['agentic-ai', 'freelance-business'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'vcod-d1',
        dayRange: 'Day 1 – 2',
        title: 'Spec-Driven Vibe Coding & Context Hygiene',
        objective: 'Turn natural language into modular, maintainable code via crisp specs and context files.',
        topics: [
          {
            id: 'vcod-t1',
            title: 'Spec-First Generation, Modular Context & Guardrail Rules',
            summary: 'Keep files small, define interfaces before implementations, and prevent hallucinated packages.',
            resources: [
              { title: 'Anthropic Claude Code / AI Coding Best Practices', provider: 'Anthropic', url: 'https://www.anthropic.com/engineering/claude-code-best-practices', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'vcod-d2',
        dayRange: 'Day 3 – 4',
        title: 'Verification Loops, Diff Auditing & Security Hygiene',
        objective: 'Never ship unverified AI code—pair generation with TypeScript, linters, tests, and secret scans.',
        topics: [
          {
            id: 'vcod-t2',
            title: 'Automated Type-Check/Test Feedback Loops & Slopsquatting Defense',
            summary: 'Verify every generated dependency exists and inspect auth/SQL/XSS diffs line-by-line.',
            resources: [
              { title: 'OWASP Secure Coding Practices Quick Reference', provider: 'OWASP', url: 'https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'vcod-d3',
        dayRange: 'Day 5 – 7',
        title: 'No-Code + Code Automation (n8n, Webhooks & Cron)',
        objective: 'Automate CRM, Slack, email, invoice, and scraping pipelines with idempotent error alerts.',
        topics: [
          {
            id: 'vcod-t3',
            title: 'n8n / Make Workflows, Cron Jobs & Playwright Headless Automation',
            summary: 'Combine visual webhook orchestrators with custom Python/TS nodes and retry alerts.',
            resources: [
              { title: 'n8n Official Self-Hosted Docs & Templates', provider: 'n8n', url: 'https://docs.n8n.io/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Impact of AI on Developer Productivity: Evidence from GitHub Copilot',
        authors: 'Sida Peng, Eirini Kalliamvakou, Peter Cihon, Mert Demirer',
        year: 2023,
        venue: 'arXiv:2302.06590',
        url: 'https://arxiv.org/abs/2302.06590',
        takeaway: 'Controlled study showing developers completed coding tasks 55.8% faster with AI pair programming.',
      },
      {
        title: 'Lost in the Middle / Context Engineering for Repository-Level Code Synthesis',
        authors: 'Carlos E. Jimenez et al. (SWE-bench)',
        year: 2024,
        venue: 'ICLR / arXiv:2310.06770',
        url: 'https://arxiv.org/abs/2310.06770',
        takeaway: 'Demonstrates that grounding AI edits in real test execution and repo context drives genuine issue resolution.',
      },
      {
        title: 'Asleep at the Keyboard? Assessing the Security of AI-Generated Code',
        authors: 'Hammond Pearce, Baleegh Ahmad, Benjamin Tan, Brendan Dolan-Gavitt, Ramesh Karri',
        year: 2022,
        venue: 'IEEE Symposium on Security and Privacy',
        url: 'https://arxiv.org/abs/2108.09293',
        takeaway: 'Proves human security review and static analysis remain mandatory when accepting AI-generated code.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Spec-to-Ship Full Micro-SaaS Prototype with 100% Test Pass',
          tier: 'Required',
          scope: 'Start from a 1-page Markdown spec + test suite first, then use AI-assisted loops until all unit & Playwright tests pass.',
          stack: 'TypeScript, React, Vitest, Playwright',
          resumeBullet: 'Shipped spec-driven full-stack MVP in 48 hours using test-first AI iteration with 100% passing Playwright checks.',
        },
        {
          title: 'Self-Hosted n8n / Python Lead-to-Invoice Automation Pipeline',
          tier: 'Required',
          scope: 'Webhook intake → Pydantic enrichment → CRM update → PDF invoice generation → Slack alert with dead-letter retry.',
          stack: 'n8n / Python, Webhooks, Docker',
          resumeBullet: 'Automated end-to-end lead intake, enrichment, and invoicing pipeline eliminating 10+ hours/week of manual ops.',
        },
      ],
      scalable: [
        {
          title: 'Automated Repository Hygiene & PR Triage Bot',
          tier: 'Scalable Capstone',
          scope: 'GitHub Action combining deterministic AST/lint checks with structured AI diff summaries and missing-test alerts.',
          stack: 'TypeScript, GitHub Actions, OpenAPI/AST',
          resumeBullet: 'Built automated PR triage bot pairing deterministic SAST checks with structured risk summaries on every pull request.',
        },
      ],
    },
    certifications: [
      { name: 'n8n Official Automation Courses (Level 1 & 2)', issuer: 'n8n Academy', url: 'https://docs.n8n.io/courses/', costNote: '100% Free Badges', focus: 'APIs, webhooks, error workflows, and data transformation' },
      { name: 'Building Systems with ChatGPT / Claude Coding Workflows', issuer: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/short-courses/', costNote: 'Free Short Courses', focus: 'Agentic coding loops, testing, and refactoring' },
      { name: 'Microsoft Learn: Automate Tasks with Power Automate / Scripts', issuer: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/', costNote: '100% Free', focus: 'Event triggers, connectors, and approval flows' },
    ],
    flashcards: [
      { id: 'vcod-fc1', topicId: 'vcod-t1', topicTitle: 'Test-First Vibe Coding', question: 'What single habit prevents AI-assisted coding from spiraling into broken spaghetti patches?', answer: 'Define types and automated tests/Playwright checks first so the model iterates against real compiler and runtime verification.', difficulty: 'Core' },
      { id: 'vcod-fc2', topicId: 'vcod-t2', topicTitle: 'Package Hallucination', question: 'What security risk is "slopsquatting" in AI-generated code?', answer: 'LLMs occasionally invent plausible non-existent npm/PyPI package names; attackers register those names with malware to hijack blind `npm install` runs.', difficulty: 'Deep Dive' },
      { id: 'vcod-fc3', topicId: 'vcod-t1', topicTitle: 'Checkpoint Commits', question: 'Why run `git commit` immediately after each working AI-assisted milestone?', answer: 'If the next prompt corrupts working state, `git diff` and `git reset` give instant zero-stress rollback.', difficulty: 'Core' },
      { id: 'vcod-fc4', topicId: 'vcod-t3', topicTitle: 'Idempotent Automations', question: 'Why must n8n or webhook automations check a unique event ID before sending customer emails or invoices?', answer: 'Webhook providers retry on timeouts; without deduplication, a blip sends duplicate emails or double-bills clients.', difficulty: 'Applied' },
      { id: 'vcod-fc5', topicId: 'vcod-t2', topicTitle: 'Diff Discipline', question: 'Which 3 areas of AI-generated code require manual line-by-line security audit every time?', answer: 'Auth/RBAC checks, raw SQL/shell string interpolation, and secret/env-var handling.', difficulty: 'Core' },
      { id: 'vcod-fc6', topicId: 'vcod-t3', topicTitle: 'Error Workflows', question: 'Why wire an explicit Error Trigger path in every production automation?', answer: 'Silent background failures go unnoticed for weeks until a client complains; error handlers alert Slack/email with the exact failing payload.', difficulty: 'Core' },
      { id: 'vcod-fc7', topicId: 'vcod-t1', topicTitle: 'Context Bloat', question: 'Why does starting a fresh chat with a concise summary outperform a 200-turn rambling AI session?', answer: 'Old failed attempts and stale file versions pollute context attention, causing the model to repeat earlier mistakes.', difficulty: 'Applied' },
      { id: 'vcod-fc8', topicId: 'vcod-t3', topicTitle: 'Rate Limits in Scrapers', question: 'Why add randomized jitter delays and caching to automated Playwright/API workflows?', answer: 'Respects target server limits, avoids IP bans, and cuts unnecessary re-scraping costs.', difficulty: 'Applied' },
    ],
  },
];
