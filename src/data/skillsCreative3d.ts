import { SkillNode } from '../types/curriculum';

export const SKILLS_CREATIVE_3D: SkillNode[] = [
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    aliases: ['UI/UX design', 'Design Systems', 'Product Design', 'Figma'],
    domain: 'creative-3d',
    summary:
      'Visual hierarchy, spatial grids, design systems & tokens, interactive prototyping in Figma, WCAG accessibility, and usability testing.',
    estimatedDays: 10,
    tier: 1,
    prerequisites: [],
    unlocks: ['web-apis', 'full-stack-mern-mean', 'game-design-dev', 'product-thinking'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'ux-d1',
        dayRange: 'Day 1 – 3',
        title: 'Typography, Grid Math & Visual Hierarchy',
        objective: 'Design disciplined 8px spatial rhythms, modular type scales, and 60-30-10 palettes.',
        topics: [
          {
            id: 'ux-t1',
            title: '8px Grid Rhythm, Nested Radius Math & Typographic Scales',
            summary: 'Optical balance, line-length (65ch), and avoiding decorative clutter.',
            resources: [
              { title: 'Material Design 3 Guidelines', provider: 'Google Design', url: 'https://m3.material.io/', kind: 'Docs' },
              { title: 'Refactoring UI & Laws of UX', provider: 'Laws of UX', url: 'https://lawsofux.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ux-d2',
        dayRange: 'Day 4 – 6',
        title: 'Figma Auto-Layout, Variables & Component Systems',
        objective: 'Build token-driven multi-theme design systems with component variants.',
        topics: [
          {
            id: 'ux-t2',
            title: 'Design Tokens, Figma Variables & Accessible Component Variants',
            summary: 'Semantic color tokens, interactive states (hover/focus/disabled), and responsive constraints.',
            resources: [
              { title: 'Figma Learn Design Course (Free)', provider: 'Figma', url: 'https://help.figma.com/hc/en-us/categories/360002051613', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'ux-d3',
        dayRange: 'Day 7 – 8',
        title: 'UX Research, Information Architecture & Flows',
        objective: 'Map user journeys, error recovery states, and empty/loading states.',
        topics: [
          {
            id: 'ux-t3',
            title: 'User Flows, Card Sorting & Heuristic Evaluation',
            summary: 'Nielsen’s 10 usability heuristics applied to complex SaaS and consumer flows.',
            resources: [
              { title: 'Nielsen Norman Group UX Articles', provider: 'NN/g', url: 'https://www.nngroup.com/articles/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ux-d4',
        dayRange: 'Day 9 – 10',
        title: 'WCAG Accessibility & Micro-Interaction Craft',
        objective: 'Guarantee 4.5:1 contrast, keyboard navigation, and 150ms spring motion.',
        topics: [
          {
            id: 'ux-t4',
            title: 'WCAG 2.2 AA Contrast, Focus Order & Motion Choreography',
            summary: 'Never signal state by hue alone; design inclusive keyboard and screen-reader flows.',
            resources: [
              { title: 'WebAIM WCAG Contrast & Checklist', provider: 'WebAIM', url: 'https://webaim.org/standards/wcag/checklist', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Information-Processing Capacity of Human Observers (Fitts’s Law)',
        authors: 'Paul M. Fitts',
        year: 1954,
        venue: 'Journal of Experimental Psychology',
        url: 'https://psycnet.apa.org/record/1955-02059-001',
        takeaway: 'Target acquisition time scales logarithmically with distance-to-size ratio, guiding button sizing and edge placement.',
      },
      {
        title: '10 Usability Heuristics for User Interface Design',
        authors: 'Jakob Nielsen, Rolf Molich',
        year: 1990,
        venue: 'ACM CHI',
        url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
        takeaway: 'Universal evaluation checklist covering visibility of system status, error prevention, and recognition over recall.',
      },
      {
        title: 'The Magical Number Seven, Plus or Minus Two (Chunking)',
        authors: 'George A. Miller',
        year: 1956,
        venue: 'Psychological Review',
        url: 'https://psycnet.apa.org/record/1957-02914-001',
        takeaway: 'Defines working-memory limits that shape navigation grouping and progressive disclosure.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Tokenized Multi-Theme Design System in Figma',
          tier: 'Required',
          scope: 'Semantic light/dark color tokens, 8px spacing scale, accessible form primitives, and component documentation.',
          stack: 'Figma Variables, Auto-Layout, WCAG Contrast Checker',
          resumeBullet: 'Built WCAG AA-compliant Figma design system with 40+ tokenized components cutting design-to-dev handoff time by 45%.',
        },
        {
          title: 'End-to-End UX Case Study & Moderated Usability Audit',
          tier: 'Required',
          scope: 'Redesign a complex checkout or analytics workflow, run 5 think-aloud usability tests, and iterate.',
          stack: 'Figma Prototyping, Maze/User Interviews',
          resumeBullet: 'Led usability redesign across 5 moderated user sessions raising task completion rate from 64% to 94%.',
        },
      ],
      scalable: [
        {
          title: 'Design-Token-to-Tailwind Code Sync Pipeline',
          tier: 'Scalable Capstone',
          scope: 'Export W3C Design Tokens JSON from Figma directly into CSS custom properties and React Storybook stories.',
          stack: 'Figma Tokens Studio, Style Dictionary, Storybook',
          resumeBullet: 'Automated Figma-to-CSS token pipeline syncing 120+ design tokens into production React components with zero visual drift.',
        },
      ],
    },
    certifications: [
      { name: 'Google UX Design Professional Certificate (Free Audit)', issuer: 'Google via Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design', costNote: 'Free Audit', focus: 'Wireframing, prototyping, and UX research' },
      { name: 'Figma Free Design & Prototyping Courses', issuer: 'Figma', url: 'https://help.figma.com/hc/en-us/categories/360002051613', costNote: '100% Free', focus: 'Auto-layout, variables, and interactive prototypes' },
      { name: 'Web Accessibility (WAI) Fundamentals', issuer: 'W3C / edX', url: 'https://www.w3.org/WAI/courses/foundations-course/', costNote: '100% Free Audit', focus: 'WCAG AA accessibility and inclusive design' },
    ],
    flashcards: [
      { id: 'ux-fc1', topicId: 'ux-t1', topicTitle: 'Fitts’s Law', question: 'How does Fitts’s Law apply to primary action buttons on mobile and desktop UIs?', answer: 'Larger targets positioned closer to natural thumb/cursor resting zones require significantly less movement time and reduce misclicks.', difficulty: 'Core' },
      { id: 'ux-fc2', topicId: 'ux-t1', topicTitle: 'Nested Radius Math', question: 'If an outer card has rounded-2xl (16px) and 12px padding, what inner corner radius looks optically concentric?', answer: 'r_inner = r_outer - padding = 16px - 12px = 4px (or adjust padding/radius so inner >= 4px).', difficulty: 'Applied' },
      { id: 'ux-fc3', topicId: 'ux-t3', topicTitle: 'Recognition vs Recall', question: 'Give an example of applying "Recognition rather than Recall" in UI design.', answer: 'Showing recent search queries or inline keyboard shortcut hints instead of forcing users to memorize command syntax.', difficulty: 'Core' },
      { id: 'ux-fc4', topicId: 'ux-t4', topicTitle: 'Color-Blind Accessibility', question: 'Why is a red/green dot alone insufficient for form validation or status?', answer: 'Roughly 8% of men have red-green color deficiency; always pair color with explicit text labels or distinct icon shapes.', difficulty: 'Core' },
      { id: 'ux-fc5', topicId: 'ux-t2', topicTitle: 'Semantic Design Tokens', question: 'Why map components to --surface-danger rather than --red-500 directly?', answer: 'Semantic tokens decouple intent from palette, allowing seamless dark/light mode or brand theming without rewriting components.', difficulty: 'Applied' },
      { id: 'ux-fc6', topicId: 'ux-t3', topicTitle: 'Hick’s Law', question: 'How does Hick’s Law guide SaaS onboarding and pricing tables?', answer: 'Decision time rises logarithmically with the number of choices; reducing options and highlighting a recommended path lowers drop-off.', difficulty: 'Core' },
      { id: 'ux-fc7', topicId: 'ux-t4', topicTitle: 'Minimum Contrast', question: 'What are the WCAG 2.2 AA minimum contrast ratios for normal text vs large text?', answer: '4.5:1 for normal body text and 3.0:1 for large text (>=18pt or >=14pt bold) and UI components.', difficulty: 'Applied' },
      { id: 'ux-fc8', topicId: 'ux-t4', topicTitle: 'Focus Visible', question: 'Why use :focus-visible instead of removing outlines or showing focus rings on mouse click?', answer: ':focus-visible preserves crisp high-contrast focus indicators for keyboard users without visual clutter on pointer clicks.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'blender-3d-rendering',
    title: 'Blender, 3D Design & Graphic Rendering',
    aliases: ['blender/3d desigen n grapic rendering', '3D Modeling', 'PBR Shaders', 'Cycles/WebGL'],
    domain: 'creative-3d',
    summary:
      'Subdivision modeling, clean quad topology, UV unwrapping, procedural PBR shading, Cycles/EEVEE lighting, Geometry Nodes, and glTF web export.',
    estimatedDays: 14,
    tier: 2,
    prerequisites: [],
    unlocks: ['game-design-dev', 'video-filmmaking-music'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'bl-d1',
        dayRange: 'Day 1 – 4',
        title: 'Hard-Surface & Subdivision Modeling',
        objective: 'Master quad topology, bevel modifiers, booleans, and clean edge-flow.',
        topics: [
          {
            id: 'bl-t1',
            title: 'Quad Topology, Edge Loops, Support Creases & Modifiers',
            summary: 'Avoid n-gons and shading artifacts on curved hard-surface geometry.',
            resources: [
              { title: 'Blender Official Manual & Fundamentals', provider: 'Blender Foundation', url: 'https://docs.blender.org/manual/en/latest/', kind: 'Docs' },
              { title: 'Blender Guru Donut & Modeling Series', provider: 'Blender Guru', url: 'https://www.youtube.com/@blenderguru', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'bl-d2',
        dayRange: 'Day 5 – 8',
        title: 'UV Unwrapping & PBR Shader Nodes',
        objective: 'Author physically plausible metallic, glass, and procedural surface materials.',
        topics: [
          {
            id: 'bl-t2',
            title: 'UV Seams, Texel Density & Principled BSDF PBR Shaders',
            summary: 'Roughness maps, normal baking, anisotropic metals, and subsurface scattering.',
            resources: [
              { title: 'Physically Based Rendering Book (Free Online)', provider: 'PBRT', url: 'https://www.pbr-book.org/', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'bl-d3',
        dayRange: 'Day 9 – 11',
        title: 'Geometry Nodes & Procedural Animation',
        objective: 'Generate parametric arrays, scatter environments, and motion-graphics rigs.',
        topics: [
          {
            id: 'bl-t3',
            title: 'Blender Geometry Nodes, Instancing & Keyframe Graph Editor',
            summary: 'Non-destructive procedural modeling and smooth Bezier easing curves.',
            resources: [
              { title: 'Blender Studio Free Training Tracks', provider: 'Blender Studio', url: 'https://studio.blender.org/training/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'bl-d4',
        dayRange: 'Day 12 – 14',
        title: 'Cycles Path Tracing, Lighting & glTF Real-Time Export',
        objective: 'Set up 3-point studio lighting, HDRIs, compositing, and Draco-compressed glTF for Three.js.',
        topics: [
          {
            id: 'bl-t4',
            title: 'Cycles Raytracing, ACES Filmic Color & glTF/Three.js Pipeline',
            summary: 'Bake lighting/normal maps for 60fps real-time browser rendering.',
            resources: [
              { title: 'Khronos glTF 2.0 Specification & Blender Exporter', provider: 'Khronos Group', url: 'https://www.khronos.org/gltf/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Rendering Equation',
        authors: 'James T. Kajiya',
        year: 1986,
        venue: 'ACM SIGGRAPH',
        url: 'https://dl.acm.org/doi/10.1145/15922.15902',
        takeaway: 'Formulated the integral equation governing global illumination and modern path tracers like Cycles.',
      },
      {
        title: 'Physically Based Shading at Disney (Principled BSDF)',
        authors: 'Brent Burley',
        year: 2012,
        venue: 'SIGGRAPH Course Notes',
        url: 'https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf',
        takeaway: 'Created the artist-friendly metallic/roughness PBR model adopted directly by Blender and Three.js.',
      },
      {
        title: 'Catmull-Clark Subdivision Surfaces',
        authors: 'Edwin Catmull, James Clark',
        year: 1978,
        venue: 'Computer-Aided Design',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/0010448578901100',
        takeaway: 'Mathematical foundation of Blender’s Subdivision Surface modifier for smooth organic/hard forms.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Hero Hard-Surface Product Render (Cycles + Studio Rig)',
          tier: 'Required',
          scope: 'Model a mechanical object (watch, headphones, or camera lens) with clean quad bevels, baked normals, and 3-point lighting.',
          stack: 'Blender 4, Cycles, ACES/AgX Color Management',
          resumeBullet: 'Modeled and lit photorealistic hard-surface product renders using quad subdivision topology and custom PBR shader nodes.',
        },
        {
          title: 'Procedural Geometry Nodes Motion Loop',
          tier: 'Required',
          scope: 'Create a 10-second seamless looping procedural 3D animation driven by Geometry Nodes.',
          stack: 'Blender Geometry Nodes, EEVEE/Cycles',
          resumeBullet: 'Built parametric Geometry Nodes motion system generating procedural architectural loops at 60fps.',
        },
      ],
      scalable: [
        {
          title: 'Web-Ready Baked PBR Asset Pipeline (Blender → Three.js)',
          tier: 'Scalable Capstone',
          scope: 'Retopologize high-poly sculpt to <30k tris, bake 2K normal/AO/roughness maps, Draco-compress glTF, and embed in WebGL.',
          stack: 'Blender, glTF-Transform, Three.js',
          resumeBullet: 'Engineered Blender-to-WebGL optimization pipeline cutting glTF payload from 48MB to 2.1MB via baking and Draco compression.',
        },
      ],
    },
    certifications: [
      { name: 'Blender Fundamentals & Open Training', issuer: 'Blender Foundation', url: 'https://www.blender.org/support/tutorials/', costNote: '100% Free Official Training', focus: 'Modeling, rigging, shading, and Cycles rendering' },
      { name: 'Pixar in a Box (Rendering, Simulation & Color)', issuer: 'Pixar / Khan Academy', url: 'https://www.khanacademy.org/computing/pixar', costNote: '100% Free Course', focus: '3D rendering math, subdivision, and virtual cameras' },
      { name: 'CG Cookie Free Blender Basics Track', issuer: 'CG Cookie', url: 'https://cgcookie.com/courses/blender-basics-an-introduction-to-blender-4-x', costNote: 'Free Core Track', focus: 'Viewport mastery, modifiers, and materials' },
    ],
    flashcards: [
      { id: 'bl-fc1', topicId: 'bl-t1', topicTitle: 'Quad Topology', question: 'Why avoid triangles and n-gons on curved surfaces using Subdivision Surface?', answer: 'Triangles and n-gons pinch Catmull-Clark subdivision flow, creating visible surface ripples and broken specular highlights.', difficulty: 'Core' },
      { id: 'bl-fc2', topicId: 'bl-t2', topicTitle: 'Energy Conservation in PBR', question: 'What does energy conservation mean in Principled BSDF materials?', answer: 'A surface cannot reflect more light than hits it; rougher microfacets spread reflections wider and appear dimmer.', difficulty: 'Applied' },
      { id: 'bl-fc3', topicId: 'bl-t2', topicTitle: 'Normal Map Color Space', question: 'Why must Normal and Roughness image textures be set to Non-Color (linear) instead of sRGB?', answer: 'Gamma correction distorts mathematical surface vectors and roughness values, corrupting lighting angles.', difficulty: 'Applied' },
      { id: 'bl-fc4', topicId: 'bl-t4', topicTitle: 'AgX vs Standard sRGB', question: 'Why use AgX / ACES Filmic view transforms instead of Standard sRGB in bright scenes?', answer: 'AgX compresses bright highlights smoothly toward white without harsh hue clipping or neon color shifts.', difficulty: 'Deep Dive' },
      { id: 'bl-fc5', topicId: 'bl-t1', topicTitle: 'Apply Scale (Ctrl+A)', question: 'Why do Bevel widths or UV unwraps behave asymmetrically before running Apply Scale?', answer: 'Non-uniform object-level scale skews edit-mode geometry operators until baked into mesh data.', difficulty: 'Core' },
      { id: 'bl-fc6', topicId: 'bl-t3', topicTitle: 'Geometry Nodes Instancing', question: 'Why instance a collection in Geometry Nodes instead of duplicating real mesh data?', answer: 'Instancing shares one mesh in memory with per-instance transform matrices, rendering millions of copies smoothly.', difficulty: 'Applied' },
      { id: 'bl-fc7', topicId: 'bl-t4', topicTitle: 'High-to-Low Poly Baking', question: 'How do real-time 3D games and WebGL apps look high-detail with low polygon counts?', answer: 'High-poly bevels and micro-grooves are baked into tangent-space Normal and Ambient Occlusion maps applied to a low-poly mesh.', difficulty: 'Core' },
      { id: 'bl-fc8', topicId: 'bl-t2', topicTitle: 'Texel Density', question: 'What happens when adjacent props in a scene have wildly mismatched texel density?', answer: 'One object looks razor sharp next to blurry pixelated textures, breaking visual realism.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'game-design-dev',
    title: 'Game Design & Development',
    aliases: ['Game Desigener/dev', 'Game Mechanics', 'Unity/Godot/Unreal', 'Shaders'],
    domain: 'creative-3d',
    summary:
      'Core game loops, player feel & juice, entity-component architectures, physics & collision, AI state machines/behavior trees, and shader pipelines.',
    estimatedDays: 14,
    tier: 3,
    prerequisites: ['cpp', 'blender-3d-rendering', 'ui-ux-design'],
    unlocks: [],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'gd-d1',
        dayRange: 'Day 1 – 4',
        title: 'Game Loops, Input Buffering & Player Feel',
        objective: 'Implement fixed-timestep physics, coyote time, hitstop, and responsive cameras.',
        topics: [
          {
            id: 'gd-t1',
            title: 'Fixed-Timestep Physics, Frame Independence & Game Feel',
            summary: 'Separate fixed simulation ticks from interpolated rendering frames.',
            resources: [
              { title: 'Game Programming Patterns (Free Book)', provider: 'Robert Nystrom', url: 'https://gameprogrammingpatterns.com/', kind: 'Book' },
              { title: 'Godot Engine Official Docs', provider: 'Godot', url: 'https://docs.godotengine.org/en/stable/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'gd-d2',
        dayRange: 'Day 5 – 8',
        title: 'ECS Architecture, Physics & AI Behavior',
        objective: 'Build decoupled Entity-Component-System patterns, A* pathfinding, and state machines.',
        topics: [
          {
            id: 'gd-t2',
            title: 'State Machines, Behavior Trees, A* Pathfinding & Spatial Grids',
            summary: 'Hierarchical FSMs for characters and spatial hashing for O(1) collision broadphases.',
            resources: [
              { title: 'Red Blob Games Interactive Pathfinding & Grids', provider: 'Amit Patel', url: 'https://www.redblobgames.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'gd-d3',
        dayRange: 'Day 9 – 11',
        title: 'Game Design Systems, Economy & Level Pacing',
        objective: 'Balance risk-reward curves, onboarding without walls of text, and telemetry playtesting.',
        topics: [
          {
            id: 'gd-t3',
            title: 'Core Loops, Progression Curves & Level Flow Architecture',
            summary: 'Apply MDA (Mechanics-Dynamics-Aesthetics) framework to design cohesive mechanics.',
            resources: [
              { title: 'Unreal / Epic Dev Community Free Courses', provider: 'Epic Games', url: 'https://dev.epicgames.com/community/learning', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'gd-d4',
        dayRange: 'Day 12 – 14',
        title: 'Real-Time Shaders, Audio & Profiling',
        objective: 'Write custom GLSL/HLSL shaders, object pooling, and frame-time profiling.',
        topics: [
          {
            id: 'gd-t4',
            title: 'Custom Fragment/Vertex Shaders, Object Pooling & Draw Call Batching',
            summary: 'Eliminate GC spikes and hit consistent 60/120fps frame budgets.',
            resources: [
              { title: 'The Book of Shaders', provider: 'Patricio Gonzalez Vivo', url: 'https://thebookofshaders.com/', kind: 'Book' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'MDA: A Formal Approach to Game Design and Game Research',
        authors: 'Robin Hunicke, Marc LeBlanc, Robert Zubek',
        year: 2004,
        venue: 'AAAI Workshop on Challenges in Game AI',
        url: 'https://users.cs.northwestern.edu/~hunicke/MDA.pdf',
        takeaway: 'Connects low-level rule Mechanics to emergent Dynamics and player emotional Aesthetics.',
      },
      {
        title: 'A Formal Basis for the Heuristic Determination of Minimum Cost Paths (A*)',
        authors: 'Peter E. Hart, Nils J. Nilsson, Bertram Raphael',
        year: 1968,
        venue: 'IEEE Transactions on Systems Science and Cybernetics',
        url: 'https://ieeexplore.ieee.org/document/4082128',
        takeaway: 'Proved admissibility and optimality of A* search powering nearly all game AI navigation.',
      },
      {
        title: 'Steering Behaviors For Autonomous Characters',
        authors: 'Craig W. Reynolds',
        year: 1999,
        venue: 'Game Developers Conference (GDC)',
        url: 'https://www.red3d.com/cwr/steer/gdc99/',
        takeaway: 'Defined seek, flee, arrival, separation, and flocking behaviors for natural NPC movement.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Tight-Control 2D/3D Vertical Slice with Juice & FSM',
          tier: 'Required',
          scope: 'Implement coyote time, jump input buffering, hitstop, camera shake, and finite-state enemy AI.',
          stack: 'Godot / Unity / Three.js + TypeScript',
          resumeBullet: 'Shipped playable 60fps vertical slice featuring input buffering, fixed-timestep physics, and hierarchical FSM enemy AI.',
        },
        {
          title: 'A* NavMesh & Flocking Crowd Simulation Sandbox',
          tier: 'Required',
          scope: 'Interactive grid/navmesh demo combining A* pathfinding with Reynolds boids obstacle avoidance.',
          stack: 'TypeScript/C++, WebGL/Godot',
          resumeBullet: 'Implemented spatial-hashed Reynolds boids and A* navigation supporting 1,000+ concurrent agents at 60fps.',
        },
      ],
      scalable: [
        {
          title: 'Data-Driven ECS Action Prototype with Custom Shaders',
          tier: 'Scalable Capstone',
          scope: 'Entity-Component-System engine, object-pooled projectiles, custom dissolve/rim shaders, and telemetry heatmaps.',
          stack: 'C++/C#/TS, GLSL Shaders, JSON/Scriptable Data',
          resumeBullet: 'Engineered zero-GC object-pooled ECS combat prototype with custom GLSL shaders maintaining 120fps under stress tests.',
        },
      ],
    },
    certifications: [
      { name: 'Unity Learn Junior Programmer & Creative Core', issuer: 'Unity Learn', url: 'https://learn.unity.com/', costNote: '100% Free Pathways', focus: 'C# scripting, physics, shaders, and lighting' },
      { name: 'CS50’s Introduction to Game Development', issuer: 'HarvardX via edX / OpenCourseWare', url: 'https://cs50.harvard.edu/games/', costNote: '100% Free Lectures & Projects', focus: 'Game loops, collision, state machines, and 3D basics' },
      { name: 'Epic Games Unreal Engine Learning Library', issuer: 'Epic Games', url: 'https://dev.epicgames.com/community/learning', costNote: '100% Free', focus: 'Blueprints, C++, Niagara VFX, and level design' },
    ],
    flashcards: [
      { id: 'gd-fc1', topicId: 'gd-t1', topicTitle: 'Fixed Timestep', question: 'Why run physics in fixed dt ticks (e.g. 1/60s) rather than variable frame delta?', answer: 'Variable dt makes jumps, collisions, and integrations non-deterministic and prone to tunneling during frame spikes.', difficulty: 'Core' },
      { id: 'gd-fc2', topicId: 'gd-t1', topicTitle: 'Coyote Time & Input Buffer', question: 'How do coyote time and jump buffering improve platformer feel?', answer: 'Coyote time permits jumping ~100ms after leaving a ledge; input buffering remembers a jump pressed slightly before landing.', difficulty: 'Core' },
      { id: 'gd-fc3', topicId: 'gd-t2', topicTitle: 'A* Admissibility', question: 'When is A* guaranteed to find the shortest path?', answer: 'When the heuristic h(n) never overestimates the true remaining cost to the goal (admissible heuristic).', difficulty: 'Applied' },
      { id: 'gd-fc4', topicId: 'gd-t4', topicTitle: 'Object Pooling', question: 'Why pool bullets/particles instead of instantiating and destroying them dynamically?', answer: 'Pre-allocating reusable instances eliminates memory allocation and garbage-collection frame hitches.', difficulty: 'Core' },
      { id: 'gd-fc5', topicId: 'gd-t3', topicTitle: 'MDA Framework', question: 'In MDA, how do designers and players experience a game differently?', answer: 'Designers build Mechanics → Dynamics → Aesthetics, while players experience Aesthetics first and uncover Mechanics last.', difficulty: 'Applied' },
      { id: 'gd-fc6', topicId: 'gd-t2', topicTitle: 'Behavior Trees vs FSM', question: 'Why scale complex NPC AI with Behavior Trees instead of flat Finite State Machines?', answer: 'Flat FSMs suffer quadratic transition explosion as states grow; Behavior Trees compose modular reusable subtrees cleanly.', difficulty: 'Deep Dive' },
      { id: 'gd-fc7', topicId: 'gd-t4', topicTitle: 'Draw Call Batching', question: 'Why do 500 distinct materials cripple GPU framerate even with low polygon counts?', answer: 'Each unique material/shader state change triggers a separate CPU-to-GPU draw call overhead.', difficulty: 'Applied' },
      { id: 'gd-fc8', topicId: 'gd-t2', topicTitle: 'Spatial Hashing', question: 'How does spatial hashing speed up broadphase collision checks?', answer: 'Partitioning space into grid cells narrows checks from O(N^2) all-pairs down to nearby cell neighbors only.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'video-filmmaking-music',
    title: 'Video Editing, Filmmaking, Cinematography & Music',
    aliases: ['Video editing', 'video editing/flimmakig/cenimetogrphy/music', 'Color Grading', 'Sound Design'],
    domain: 'creative-3d',
    summary:
      'Visual storytelling, camera blocking & lighting ratios, continuity & montage editing, DaVinci Resolve color grading, and DAW sound design/scoring.',
    estimatedDays: 14,
    tier: 2,
    prerequisites: [],
    unlocks: ['blender-3d-rendering', 'freelance-business'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'vid-d1',
        dayRange: 'Day 1 – 4',
        title: 'Cinematography, Framing & Lighting Ratios',
        objective: 'Master focal lengths, 180-degree rule, motivated key/fill/rim lighting, and blocking.',
        topics: [
          {
            id: 'vid-t1',
            title: 'Exposure Triangle, Motivated Lighting & 180-Degree Continuity',
            summary: 'Use focal length perspective, eye-lines, and negative fill to shape emotion.',
            resources: [
              { title: 'Pixar in a Box: Storytelling & Virtual Cameras', provider: 'Khan Academy / Pixar', url: 'https://www.khanacademy.org/computing/pixar', kind: 'Course' },
              { title: 'StudioBinder Cinematography & Shot List Guides', provider: 'StudioBinder', url: 'https://www.studiobinder.com/blog/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'vid-d2',
        dayRange: 'Day 5 – 8',
        title: 'Editorial Rhythm, J/L Cuts & Pacing',
        objective: 'Cut on action, manipulate Kuleshov juxtaposition, and structure narrative arcs.',
        topics: [
          {
            id: 'vid-t2',
            title: 'Walter Murch’s Rule of Six, J/L Cuts & Montage Pacing',
            summary: 'Prioritize emotion and story over mechanical continuity.',
            resources: [
              { title: 'DaVinci Resolve Free Official Training', provider: 'Blackmagic Design', url: 'https://www.blackmagicdesign.com/products/davinciresolve/training', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'vid-d3',
        dayRange: 'Day 9 – 11',
        title: 'Color Science, Scopes & Resolve Grading',
        objective: 'Read Parade/Waveform/Vectorscope and grade Log footage in node trees.',
        topics: [
          {
            id: 'vid-t3',
            title: 'Log-to-Rec.709 Color Management, Scopes & Shot Matching',
            summary: 'Primary balance, skin-tone line on vectorscope, and secondary power windows.',
            resources: [
              { title: 'Blackmagic DaVinci Resolve Colorist Guide', provider: 'Blackmagic Design', url: 'https://www.blackmagicdesign.com/products/davinciresolve/training', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'vid-d4',
        dayRange: 'Day 12 – 14',
        title: 'Sound Design, Foley, LUFS Mixing & Scoring',
        objective: 'Layer dialogue, room tone, foley, and emotional music cues to broadcast LUFS.',
        topics: [
          {
            id: 'vid-t4',
            title: 'EQ/Compression, Foley Layering, Leitmotifs & -14 LUFS Mastering',
            summary: 'Carve vocal frequencies, glue stems with sidechain ducking, and compose tension.',
            resources: [
              { title: 'Learning Music & Sound Synthesis Interactive', provider: 'Ableton', url: 'https://learningmusic.ableton.com/', kind: 'Lab' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Film Editing and Event Segmentation: The Perceptual Continuity of Cuts',
        authors: 'Jeffrey M. Zacks, Nicole K. Speer, Jeremy R. Reynolds',
        year: 2009,
        venue: 'Cognitive, Affective, & Behavioral Neuroscience / Washington Univ.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19403893/',
        takeaway: 'Neuroscience study showing how edits aligned with event boundaries remain invisible ("edit blindness") to viewers.',
      },
      {
        title: 'Shot Length, Motion, and Attention in Motion Pictures',
        authors: 'James E. Cutting, Jordan E. DeLong, Christine E. Nothelfer',
        year: 2010,
        venue: 'Psychological Science',
        url: 'https://journals.sagepub.com/doi/10.1177/0956797610361679',
        takeaway: 'Quantified how pacing, luminance, and shot-scale rhythms synchronize viewer attention.',
      },
      {
        title: 'Emotion and Music in Film: The Congruence-Associationist Model',
        authors: 'Annabel J. Cohen',
        year: 2013,
        venue: 'Oxford Handbook of Music and Emotion',
        url: 'https://academic.oup.com/edited-volume/34375',
        takeaway: 'Explains how musical tempo, mode, and timbre steer narrative interpretation of identical visuals.',
      },
    ],
    projects: {
      required: [
        {
          title: '90-Second Visual Essay with Color Grade & Soundscape',
          tier: 'Required',
          scope: 'Shoot/assemble a tight 90s narrative cut with J/L cuts, matched Log-to-Rec.709 grade, and multi-track sound design.',
          stack: 'DaVinci Resolve (Free), Fairlight/DAW',
          resumeBullet: 'Directed, edited, and color-graded 90s documentary visual essay with multi-stem foley and -14 LUFS loudness mastering.',
        },
        {
          title: 'Original 60-Second Film Cue & Foley Rescore',
          tier: 'Required',
          scope: 'Strip audio from a film scene and rebuild dialogue clarity, footsteps/cloth foley, ambience, and original synth/orchestral score.',
          stack: 'Reaper / Ableton / DaVinci Fairlight',
          resumeBullet: 'Composed original sync score and rebuilt 18-track foley + ambience mix for narrative action sequence.',
        },
      ],
      scalable: [
        {
          title: 'Repeatable Retention-Engineered Long-Form Video Production System',
          tier: 'Scalable Capstone',
          scope: 'Build modular Resolve LUTs, Fusion motion templates, audio vocal chains, and shot-list pre-vis pipeline.',
          stack: 'DaVinci Resolve Fusion, LUTs, DAW Templates',
          resumeBullet: 'Systematized post-production pipeline using custom Resolve node templates and vocal presets cutting edit turnaround by 50%.',
        },
      ],
    },
    certifications: [
      { name: 'DaVinci Resolve Official Certification (Editing, Color, Fairlight)', issuer: 'Blackmagic Design', url: 'https://www.blackmagicdesign.com/products/davinciresolve/training', costNote: '100% Free Training & Online Exam', focus: 'NLE editing, node color grading, Fusion VFX, and audio' },
      { name: 'Ableton Learning Music & Learning Synths', issuer: 'Ableton', url: 'https://learningmusic.ableton.com/', costNote: '100% Free Interactive Labs', focus: 'Rhythm, chords, basslines, and synthesis' },
      { name: 'Pixar in a Box: The Art of Storytelling', issuer: 'Pixar / Khan Academy', url: 'https://www.khanacademy.org/computing/pixar/storytelling', costNote: '100% Free', focus: 'Visual story structure and camera grammar' },
    ],
    flashcards: [
      { id: 'vid-fc1', topicId: 'vid-t1', topicTitle: '180-Degree Rule', question: 'What breaks when the camera crosses the 180-degree axis of action mid-dialogue?', answer: 'Characters suddenly appear to face the same direction or swap left/right screen positions, disorienting viewer spatial geography.', difficulty: 'Core' },
      { id: 'vid-fc2', topicId: 'vid-t2', topicTitle: 'J-Cuts & L-Cuts', question: 'Distinguish a J-cut from an L-cut in editorial pacing.', answer: 'J-cut: audio from the next scene enters BEFORE the video cut. L-cut: audio from the current scene lingers OVER the next video shot.', difficulty: 'Core' },
      { id: 'vid-fc3', topicId: 'vid-t3', topicTitle: 'Vectorscope Skin Tone', question: 'How do colorists verify natural skin tones regardless of ethnicity using a Vectorscope?', answer: 'Healthy human skin hues cluster closely along the ~10:30 "skin tone line" between red and yellow; only saturation and luma vary.', difficulty: 'Applied' },
      { id: 'vid-fc4', topicId: 'vid-t2', topicTitle: 'Rule of Six', question: 'According to Walter Murch’s Rule of Six, what is the #1 highest priority for making a cut?', answer: 'Emotion (51%), followed by Story (23%), Rhythm (10%), Eye-trace (7%), 2D plane (5%), and 3D space (4%).', difficulty: 'Applied' },
      { id: 'vid-fc5', topicId: 'vid-t4', topicTitle: 'LUFS Loudness', question: 'Why mix web/YouTube audio to roughly -14 LUFS integrated instead of maximizing 0dB peak volume?', answer: 'Streaming platforms normalize playback to ~-14 LUFS; over-compressed mixes get turned down and sound lifeless compared to dynamic mixes.', difficulty: 'Applied' },
      { id: 'vid-fc6', topicId: 'vid-t1', topicTitle: 'Negative Fill', question: 'Why place a black flag ("negative fill") on the shadow side of a subject’s face?', answer: 'To absorb ambient wall bounce and deepen contrast ratio, sculpting dramatic three-dimensional depth.', difficulty: 'Deep Dive' },
      { id: 'vid-fc7', topicId: 'vid-t4', topicTitle: 'EQ Masking', question: 'How do you keep background music from muddying spoken dialogue without dropping music volume completely?', answer: 'Apply a subtle dynamic EQ dip around 1–4 kHz on the music bus triggered by the dialogue vocal stem.', difficulty: 'Applied' },
      { id: 'vid-fc8', topicId: 'vid-t3', topicTitle: '180-Degree Shutter Rule', question: 'At 24fps, what shutter speed produces natural cinematic motion blur?', answer: '1/48s (or 1/50s)—double the frame rate, matching a 180-degree mechanical shutter angle.', difficulty: 'Core' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics',
    aliases: ['Robotics', 'ROS2', 'SLAM', 'Control Theory', 'Embodied AI'],
    domain: 'creative-3d',
    summary:
      'Rigid-body kinematics, PID & LQR/MPC control, sensor fusion (Kalman filters), SLAM localization, ROS 2 middleware, and sim-to-real policy transfer.',
    estimatedDays: 16,
    tier: 4,
    prerequisites: ['cpp', 'python-dsa', 'neural-networks'],
    unlocks: [],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'rob-d1',
        dayRange: 'Day 1 – 4',
        title: 'Transforms, Kinematics & Dynamics',
        objective: 'Master SO(3)/SE(3) transforms, forward/inverse kinematics, and Jacobians.',
        topics: [
          {
            id: 'rob-t1',
            title: 'SE(3) Homogeneous Transforms, Forward/Inverse Kinematics & Jacobians',
            summary: 'Prevent gimbal lock with quaternions and solve damped least-squares IK.',
            resources: [
              { title: 'Modern Robotics (Northwestern Open Book & Course)', provider: 'Kevin Lynch & Frank Park', url: 'https://hades.mech.northwestern.edu/index.php/Modern_Robotics', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'rob-d2',
        dayRange: 'Day 5 – 8',
        title: 'Control Theory & State Estimation',
        objective: 'Implement PID, LQR, MPC, and Extended Kalman Filter sensor fusion.',
        topics: [
          {
            id: 'rob-t2',
            title: 'PID, LQR/MPC Trajectory Control & Extended Kalman Filters (EKF)',
            summary: 'Fuse noisy IMU + wheel odometry + LiDAR/vision measurements optimally.',
            resources: [
              { title: 'MIT Underactuated Robotics (Open Textbook)', provider: 'Russ Tedrake / MIT', url: 'https://underactuated.mit.edu/', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'rob-d3',
        dayRange: 'Day 9 – 12',
        title: 'SLAM, Path Planning & ROS 2',
        objective: 'Architect real-time pub/sub nodes in ROS 2 with RRT* / A* motion planning.',
        topics: [
          {
            id: 'rob-t3',
            title: 'ROS 2 Nodes/DDS, Occupancy Grids, SLAM & RRT* Motion Planning',
            summary: 'Real-time QoS policies, TF2 transform trees, and collision-free trajectory generation.',
            resources: [
              { title: 'ROS 2 Official Tutorials', provider: 'Open Robotics', url: 'https://docs.ros.org/en/humble/Tutorials.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'rob-d4',
        dayRange: 'Day 13 – 16',
        title: 'Physics Simulation & Sim-to-Real RL',
        objective: 'Train locomotion/manipulation policies in MuJoCo/Isaac with domain randomization.',
        topics: [
          {
            id: 'rob-t4',
            title: 'MuJoCo / PyBullet Simulation & Domain Randomization',
            summary: 'Bridge the reality gap by randomizing friction, mass, latency, and sensor noise.',
            resources: [
              { title: 'MuJoCo Documentation & Colab Labs', provider: 'Google DeepMind', url: 'https://mujoco.readthedocs.io/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Probabilistic Robotics (Bayes Filters & SLAM Foundations)',
        authors: 'Sebastian Thrun, Wolfram Burgard, Dieter Fox',
        year: 2005,
        venue: 'MIT Press',
        url: 'https://docs.ufpr.br/~daniel/probabilistic_robotics/',
        takeaway: 'Unified particle filters, EKF-SLAM, and POMDP planning under sensor uncertainty.',
      },
      {
        title: 'Learning Dexterous In-Hand Manipulation (Domain Randomization)',
        authors: 'OpenAI: Marcin Andrychowicz et al.',
        year: 2019,
        venue: 'IJRR / arXiv:1808.00177',
        url: 'https://arxiv.org/abs/1808.00177',
        takeaway: 'Proved RL policies trained purely in simulation transfer to physical robot hands via domain randomization.',
      },
      {
        title: 'Sampling-Based Algorithms for Optimal Motion Planning (RRT*)',
        authors: 'Sertac Karaman, Emilio Frazzoli',
        year: 2011,
        venue: 'IJRR / arXiv:1105.1186',
        url: 'https://arxiv.org/abs/1105.1186',
        takeaway: 'Fixed RRT’s suboptimality by adding near-neighbor rewiring for asymptotically optimal paths.',
      },
    ],
    projects: {
      required: [
        {
          title: '2D Differential-Drive EKF-SLAM & RRT* Simulator',
          tier: 'Required',
          scope: 'Simulate noisy wheel encoders + landmark range/bearing sensors fused via Extended Kalman Filter with RRT* planner.',
          stack: 'Python/C++, NumPy, Matplotlib',
          resumeBullet: 'Implemented EKF-SLAM landmark localization and asymptotically optimal RRT* obstacle avoidance in Python/C++.',
        },
        {
          title: '6-DOF Robotic Arm Inverse Kinematics & Trajectory Controller',
          tier: 'Required',
          scope: 'Compute damped least-squares Jacobian IK and minimum-jerk cubic splines in MuJoCo/PyBullet.',
          stack: 'Python, MuJoCo, Pinocchio/SciPy',
          resumeBullet: 'Built 6-DOF manipulator damped-Jacobian IK solver with singularity avoidance and smooth cubic trajectory tracking.',
        },
      ],
      scalable: [
        {
          title: 'ROS 2 Autonomous Navigation Stack with Sim-to-Real Randomization',
          tier: 'Scalable Capstone',
          scope: 'Containerized ROS 2 Humble stack integrating TF2, Nav2 costmaps, and domain-randomized MuJoCo RL controller.',
          stack: 'C++, ROS 2, MuJoCo, Docker',
          resumeBullet: 'Architected ROS 2 autonomous navigation pipeline with real-time DDS QoS tuning and domain-randomized policy validation.',
        },
      ],
    },
    certifications: [
      { name: 'Modern Robotics: Mechanics, Planning, and Control (Free Audit)', issuer: 'Northwestern University via Coursera', url: 'https://www.coursera.org/specializations/modernrobotics', costNote: 'Free Audit + Free Textbook', focus: 'Kinematics, dynamics, motion planning, and manipulation' },
      { name: 'MIT 6.832 Underactuated Robotics', issuer: 'MIT OpenCourseWare', url: 'https://underactuated.mit.edu/', costNote: '100% Free Lectures & Notebooks', focus: 'Optimal control, LQR, trajectory optimization, and RL' },
      { name: 'ROS 2 Humble Official Academy Tutorials', issuer: 'Open Robotics', url: 'https://docs.ros.org/en/humble/Tutorials.html', costNote: '100% Free', focus: 'DDS middleware, TF2, URDF, and Nav2' },
    ],
    flashcards: [
      { id: 'rob-fc1', topicId: 'rob-t1', topicTitle: 'Quaternions vs Euler', question: 'Why represent 3D robot orientations with unit quaternions instead of Euler angles?', answer: 'Euler angles suffer gimbal lock when pitch approaches +/-90 degrees and interpolate poorly; quaternions avoid singularities and support smooth SLERP.', difficulty: 'Core' },
      { id: 'rob-fc2', topicId: 'rob-t2', topicTitle: 'EKF Prediction vs Update', question: 'What happens to state covariance in the EKF prediction step vs measurement update step?', answer: 'Prediction (motion model + process noise) increases uncertainty; measurement update incorporates sensor readings to shrink covariance.', difficulty: 'Applied' },
      { id: 'rob-fc3', topicId: 'rob-t3', topicTitle: 'RRT vs RRT*', question: 'What single algorithmic step makes RRT* asymptotically optimal compared to basic RRT?', answer: 'Tree rewiring: checking if nearby existing nodes achieve lower total path cost through the newly sampled node.', difficulty: 'Applied' },
      { id: 'rob-fc4', topicId: 'rob-t1', topicTitle: 'Manipulator Singularity', question: 'What happens physically and mathematically at a robotic arm kinematic singularity?', answer: 'The manipulator Jacobian loses rank, making infinite joint velocities appear necessary to move in certain end-effector directions.', difficulty: 'Deep Dive' },
      { id: 'rob-fc5', topicId: 'rob-t4', topicTitle: 'Sim-to-Real Gap', question: 'Why do RL policies trained on exact deterministic physics fail instantly on physical hardware?', answer: 'Real motors exhibit backlash, latency, unmodeled friction, and sensor noise; domain randomization trains policies robust across those variations.', difficulty: 'Core' },
      { id: 'rob-fc6', topicId: 'rob-t2', topicTitle: 'PID Integral Windup', question: 'What causes PID integral windup and how is it prevented?', answer: 'When an actuator saturates while error persists, the integral term accumulates massively, causing huge overshoot; prevent via clamping or back-calculation.', difficulty: 'Applied' },
      { id: 'rob-fc7', topicId: 'rob-t3', topicTitle: 'SLAM Loop Closure', question: 'Why is loop closure essential in long-horizon SLAM?', answer: 'Without recognizing previously visited landmarks, odometry integration error accumulates unbounded drift over time.', difficulty: 'Core' },
      { id: 'rob-fc8', topicId: 'rob-t2', topicTitle: 'MPC vs LQR', question: 'When choose Model Predictive Control (MPC) over infinite-horizon LQR?', answer: 'When the robot has hard inequality constraints (joint limits, obstacle avoidance, torque bounds) that LQR cannot enforce natively.', difficulty: 'Deep Dive' },
    ],
  },
];
