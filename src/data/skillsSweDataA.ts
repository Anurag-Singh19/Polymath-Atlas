import { SkillNode } from '../types/curriculum';

export const SKILLS_SWE_DATA_A: SkillNode[] = [
  {
    id: 'python-core',
    title: 'Python Core Engineering',
    aliases: ['Python', 'Pythonic Patterns', 'Asyncio', 'Packaging'],
    domain: 'swe-data',
    summary:
      'Python data model & dunder protocols, type hints (mypy/pyright), iterators/generators, decorators, asyncio concurrency, and uv/pytest tooling.',
    estimatedDays: 10,
    tier: 1,
    prerequisites: [],
    unlocks: ['python-dsa', 'data-analysis', 'data-engineering', 'web-apis', 'vibe-coding-automation'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'pyc-d1',
        dayRange: 'Day 1 – 3',
        title: 'Python Data Model, Types & Tooling',
        objective: 'Write clean typed Python using dataclasses, Protocols, uv, and ruff.',
        topics: [
          {
            id: 'pyc-t1',
            title: 'Dunder Protocols, Dataclasses, Type Hints & Ruff/Pytest',
            summary: 'Avoid mutable default arguments, leverage structural subtyping (Protocol), and automate checks.',
            resources: [
              { title: 'Python Official Tutorial & Docs', provider: 'Python.org', url: 'https://docs.python.org/3/tutorial/', kind: 'Docs' },
              { title: 'CS50’s Introduction to Programming with Python', provider: 'Harvard CS50P', url: 'https://cs50.harvard.edu/python/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'pyc-d2',
        dayRange: 'Day 4 – 6',
        title: 'Generators, Context Managers & Decorators',
        objective: 'Stream gigabytes in O(1) memory and build clean resource wrappers.',
        topics: [
          {
            id: 'pyc-t2',
            title: 'Lazy Generators, itertools, Context Managers & Closures',
            summary: 'Use yield pipelines, contextlib, and functools.wraps cleanly.',
            resources: [
              { title: 'Real Python: Generators & Context Managers', provider: 'Real Python', url: 'https://realpython.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'pyc-d3',
        dayRange: 'Day 7 – 8',
        title: 'Concurrency: GIL, Threading, Multiprocessing & Asyncio',
        objective: 'Match I/O-bound vs CPU-bound workloads to the right concurrency primitive.',
        topics: [
          {
            id: 'pyc-t3',
            title: 'Event Loops, asyncio.TaskGroup, ThreadPools & Multiprocessing',
            summary: 'Understand the GIL and avoid blocking the asyncio event loop.',
            resources: [
              { title: 'Python Asyncio Official Documentation', provider: 'Python.org', url: 'https://docs.python.org/3/library/asyncio.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'pyc-d4',
        dayRange: 'Day 9 – 10',
        title: 'Testing, Profiling & Packaging',
        objective: 'Profile hotspots with cProfile and ship reproducible wheel packages.',
        topics: [
          {
            id: 'pyc-t4',
            title: 'Pytest Fixtures/Parametrize, cProfile & pyproject.toml',
            summary: 'Modern reproducible dependency locking with uv and hypothesis property tests.',
            resources: [
              { title: 'Pytest Official Documentation', provider: 'Pytest', url: 'https://docs.pytest.org/en/stable/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'PEP 8 & The Zen of Python (PEP 20) — Readability & Idiomatic Design',
        authors: 'Guido van Rossum, Barry Warsaw, Tim Peters',
        year: 2001,
        venue: 'Python Enhancement Proposals',
        url: 'https://peps.python.org/pep-0020/',
        takeaway: 'Establishes explicit-over-implicit and simplicity principles governing Pythonic architecture.',
      },
      {
        title: 'PEP 484 & Gradual Type Systems in Dynamic Languages',
        authors: 'Guido van Rossum, Jukka Lehtosalo, Łukasz Langa',
        year: 2014,
        venue: 'Python Enhancement Proposals / POPL Theory',
        url: 'https://peps.python.org/pep-0484/',
        takeaway: 'Enabled static verification and IDE safety across multi-million-line Python codebases.',
      },
      {
        title: 'Unclogging Python’s GIL: PEP 703 Free-Threaded CPython Architecture',
        authors: 'Sam Gross',
        year: 2023,
        venue: 'Python Enhancement Proposals',
        url: 'https://peps.python.org/pep-0703/',
        takeaway: 'Details reference-counting, biased locking, and mimalloc design enabling GIL-free multicore Python.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Async Rate-Limited Web Crawler & Structured Exporter',
          tier: 'Required',
          scope: 'Build an asyncio + httpx crawler with token-bucket rate limiting, retries, and streaming JSONL output.',
          stack: 'Python 3.12, asyncio, httpx, pydantic, pytest',
          resumeBullet: 'Built concurrent asyncio crawler with token-bucket rate limiting processing 500 pages/min in O(1) memory.',
        },
        {
          title: 'Typed CLI Log Stream Processor (Zero-Copy Generators)',
          tier: 'Required',
          scope: 'Parse multi-GB compressed log files via lazy generator pipelines with full mypy strict mode & pytest suite.',
          stack: 'Python, dataclasses, pytest, ruff, mypy',
          resumeBullet: 'Engineered streaming generator CLI parsing 4GB log archives under 40MB peak RAM with 98% pytest coverage.',
        },
      ],
      scalable: [
        {
          title: 'Distributed Task Worker Pool with Backpressure & Dead-Letter Queue',
          tier: 'Scalable Capstone',
          scope: 'Async worker supervisor supporting graceful SIGTERM shutdown, exponential backoff, and Prometheus metrics.',
          stack: 'Python, asyncio, Redis, uv, Docker',
          resumeBullet: 'Developed resilient Python task worker engine with graceful drain shutdowns and bounded concurrency backpressure.',
        },
      ],
    },
    certifications: [
      { name: 'CS50’s Introduction to Programming with Python (CS50P)', issuer: 'Harvard University (Free OpenCourseWare)', url: 'https://cs50.harvard.edu/python/', costNote: '100% Free Certificate (Harvard CS50)', focus: 'Functions, exceptions, unit tests, OOP, and libraries' },
      { name: 'Scientific Computing with Python', issuer: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', costNote: '100% Free Certificate', focus: 'Algorithmic thinking, OOP, and Pythonic structures' },
      { name: 'Kaggle Python Micro-Course', issuer: 'Kaggle Learn', url: 'https://www.kaggle.com/learn/python', costNote: '100% Free Certificate', focus: 'Syntax, comprehensions, and standard libraries' },
    ],
    flashcards: [
      { id: 'pyc-fc1', topicId: 'pyc-t1', topicTitle: 'Mutable Default Trap', question: 'Why is def add_item(x, items=[]): a classic Python bug?', answer: 'Default parameter expressions evaluate once at function definition time, so every call shares and mutates the exact same list object.', difficulty: 'Core' },
      { id: 'pyc-fc2', topicId: 'pyc-t2', topicTitle: 'Generators vs Lists', question: 'Why return a generator (yield) instead of a list when processing a 10GB file?', answer: 'Generators compute one item lazily on demand in O(1) memory rather than loading all 10GB into RAM upfront.', difficulty: 'Core' },
      { id: 'pyc-fc3', topicId: 'pyc-t3', topicTitle: 'GIL & Workload Choice', question: 'When should you use multiprocessing instead of threading or asyncio in standard CPython?', answer: 'For CPU-bound math/parsing loops where the Global Interpreter Lock would serialize Python bytecode threads.', difficulty: 'Applied' },
      { id: 'pyc-fc4', topicId: 'pyc-t3', topicTitle: 'Blocking the Event Loop', question: 'What happens if you call synchronous time.sleep(5) or requests.get() inside an async def coroutine?', answer: 'It freezes the entire single-threaded event loop, blocking all other concurrent tasks from making progress.', difficulty: 'Applied' },
      { id: 'pyc-fc5', topicId: 'pyc-t1', topicTitle: 'is vs ==', question: 'When should you use "is" versus "==" in Python?', answer: '"is" checks object identity (memory address—use for None/sentinels); "==" checks value equality via __eq__.', difficulty: 'Core' },
      { id: 'pyc-fc6', topicId: 'pyc-t2', topicTitle: 'Context Managers', question: 'What guarantee does a "with open(...) as f:" context manager provide?', answer: 'Its __exit__ method runs deterministically to release files/locks even if an exception is raised inside the block.', difficulty: 'Core' },
      { id: 'pyc-fc7', topicId: 'pyc-t4', topicTitle: 'functools.wraps', question: 'Why always decorate wrapper functions inside custom decorators with @functools.wraps(func)?', answer: 'It preserves the wrapped function’s __name__, __doc__, and type introspection metadata for debugging and frameworks.', difficulty: 'Applied' },
      { id: 'pyc-fc8', topicId: 'pyc-t1', topicTitle: 'Protocol vs ABC', question: 'How does typing.Protocol differ from Abstract Base Classes (ABC)?', answer: 'Protocol enables static structural duck-typing without forcing classes to explicitly inherit from a shared base class.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'python-dsa',
    title: 'Python & DSA',
    aliases: ['Python & DSA', 'Algorithms', 'Competitive & Coding Interviews'],
    domain: 'swe-data',
    summary:
      'Asymptotic complexity, sliding window & two pointers, trees/tries/heaps, graph BFS/DFS/Dijkstra, dynamic programming, and clean problem patterns.',
    estimatedDays: 16,
    tier: 2,
    prerequisites: ['python-core'],
    unlocks: ['ai-ml', 'neural-networks', 'quant', 'robotics', 'system-design'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'dsa-d1',
        dayRange: 'Day 1 – 4',
        title: 'Complexity, Hashing, Two Pointers & Sliding Window',
        objective: 'Recognize O(N) linear patterns replacing nested O(N^2) brute-force scans.',
        topics: [
          {
            id: 'dsa-t1',
            title: 'Amortized O(1) Hash Maps, Two Pointers & Sliding Windows',
            summary: 'Prefix sums, monotonic deques, and frequency counters.',
            resources: [
              { title: 'NeetCode Roadmap & Pattern Explanations', provider: 'NeetCode', url: 'https://neetcode.io/roadmap', kind: 'Course' },
              { title: 'Python TimeComplexity Reference', provider: 'Python Wiki', url: 'https://wiki.python.org/moin/TimeComplexity', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'dsa-d2',
        dayRange: 'Day 5 – 8',
        title: 'Stacks, Monotonic Queues, Heaps & Binary Search',
        objective: 'Solve search-on-answer and top-k streaming problems cleanly.',
        topics: [
          {
            id: 'dsa-t2',
            title: 'Binary Search on Answer Space, heapq & Monotonic Stacks',
            summary: 'Kth largest elements, median-of-stream dual heaps, and next-greater-element.',
            resources: [
              { title: 'CP-Algorithms (E-Maxx) Reference', provider: 'CP-Algorithms', url: 'https://cp-algorithms.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'dsa-d3',
        dayRange: 'Day 9 – 12',
        title: 'Trees, Tries & Graph Algorithms',
        objective: 'Master BFS/DFS, topological sort, Union-Find (DSU), and Dijkstra shortest paths.',
        topics: [
          {
            id: 'dsa-t3',
            title: 'Trees, Tries, Union-Find (DSU), Topological Sort & Dijkstra',
            summary: 'Cycle detection, connected components, and priority-queue shortest paths.',
            resources: [
              { title: 'VisuAlgo Interactive Algorithm Visualizations', provider: 'VisuAlgo (NUS)', url: 'https://visualgo.net/en', kind: 'Lab' },
            ],
          },
        ],
      },
      {
        id: 'dsa-d4',
        dayRange: 'Day 13 – 16',
        title: 'Backtracking & Dynamic Programming',
        objective: 'Convert recursive state transitions into memoized and bottom-up DP tables.',
        topics: [
          {
            id: 'dsa-t4',
            title: '1D/2D DP, Knapsack, Intervals & State-Space Pruning',
            summary: 'Identify overlapping subproblems, recurrence invariants, and O(N) space rolling arrays.',
            resources: [
              { title: 'MIT 6.006 Introduction to Algorithms', provider: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'A Note on Two Problems in Connexion with Graphs (Dijkstra’s Algorithm)',
        authors: 'Edsger W. Dijkstra',
        year: 1959,
        venue: 'Numerische Mathematik',
        url: 'https://ir.cwi.nl/pub/9256/9256D.pdf',
        takeaway: 'Invented the greedy single-source shortest path algorithm powering routing and map navigation.',
      },
      {
        title: 'Efficiency of a Good But Not Linear Set Union Algorithm (Union-Find)',
        authors: 'Robert Endre Tarjan',
        year: 1975,
        venue: 'Journal of the ACM',
        url: 'https://dl.acm.org/doi/10.1145/321879.321884',
        takeaway: 'Proved path compression + union by rank yields inverse-Ackermann O(alpha(N)) amortized time.',
      },
      {
        title: 'Skip Lists: A Probabilistic Alternative to Balanced Trees',
        authors: 'William Pugh',
        year: 1990,
        venue: 'Communications of the ACM',
        url: 'https://dl.acm.org/doi/10.1145/78973.78977',
        takeaway: 'Showed randomized multi-level linked lists match balanced tree O(log N) bounds with simpler concurrency (used in Redis).',
      },
    ],
    projects: {
      required: [
        {
          title: 'LRU/LFU Cache & Autocomplete Trie Engine',
          tier: 'Required',
          scope: 'Implement O(1) LRU Cache (doubly linked list + dict) and prefix-frequency Trie with top-k suggestions.',
          stack: 'Python, Pytest, Benchmarks',
          resumeBullet: 'Implemented O(1) LRU/LFU eviction caches and ranked prefix Trie serving autocomplete queries in <1ms.',
        },
        {
          title: 'Multi-Algorithm Graph & Pathfinding Visualizer',
          tier: 'Required',
          scope: 'Compare BFS, Dijkstra, A*, and Kruskal MST/Union-Find over weighted grids and road graphs.',
          stack: 'Python / FastAPI or Interactive Canvas',
          resumeBullet: 'Built weighted graph routing suite implementing Dijkstra, A*, and path-compressed Union-Find MST.',
        },
      ],
      scalable: [
        {
          title: 'In-Memory Inverted Index & Ranked Search Engine',
          tier: 'Scalable Capstone',
          scope: 'Tokenize 100k documents into compressed posting lists with BM25 heap ranking and phrase queries.',
          stack: 'Python, heapq, bisect, pytest',
          resumeBullet: 'Engineered in-memory inverted search index with BM25 min-heap top-k retrieval over 100k documents.',
        },
      ],
    },
    certifications: [
      { name: 'MIT 6.006 Introduction to Algorithms', issuer: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', costNote: '100% Free Courseware', focus: 'Hashing, graphs, shortest paths, and dynamic programming' },
      { name: 'Algorithms Part I & II (Free Audit)', issuer: 'Princeton University via Coursera', url: 'https://www.coursera.org/learn/algorithms-part1', costNote: 'Free Audit', focus: 'Union-Find, tries, graphs, and string algorithms' },
      { name: 'Data Structures & Algorithms in Python', issuer: 'freeCodeCamp / Jovian Open Course', url: 'https://www.freecodecamp.org/news/learn-data-structures-and-algorithms-in-python/', costNote: '100% Free', focus: 'Binary search, trees, graphs, and DP' },
    ],
    flashcards: [
      { id: 'dsa-fc1', topicId: 'dsa-t1', topicTitle: 'list vs deque', question: 'Why is list.pop(0) slow in Python and what structure fixes it?', answer: 'list.pop(0) shifts every remaining element in O(N); collections.deque.popleft() runs in O(1).', difficulty: 'Core' },
      { id: 'dsa-fc2', topicId: 'dsa-t3', topicTitle: 'Dijkstra Constraint', question: 'When does standard Dijkstra’s algorithm produce wrong shortest paths?', answer: 'When the graph contains negative-weight edges (use Bellman-Ford instead).', difficulty: 'Core' },
      { id: 'dsa-fc3', topicId: 'dsa-t2', topicTitle: 'Binary Search on Answer', question: 'How do you recognize a "Binary Search on Answer" problem?', answer: 'You need the minimum/maximum feasible value X where feasibility is monotonic (false...false, true...true) and check(X) is easy in O(N).', difficulty: 'Applied' },
      { id: 'dsa-fc4', topicId: 'dsa-t3', topicTitle: 'Topological Sort', question: 'What does Kahn’s BFS algorithm detect if the output list contains fewer than V vertices?', answer: 'At least one cycle exists in the directed graph (not a valid DAG).', difficulty: 'Core' },
      { id: 'dsa-fc5', topicId: 'dsa-t4', topicTitle: '0/1 vs Unbounded Knapsack', question: 'How does the loop direction differ between 0/1 Knapsack and Unbounded Knapsack in 1D DP?', answer: '0/1 Knapsack iterates capacity backward (to reuse each item at most once); Unbounded iterates forward.', difficulty: 'Deep Dive' },
      { id: 'dsa-fc6', topicId: 'dsa-t2', topicTitle: 'Monotonic Stack', question: 'What class of problems drops from O(N^2) to O(N) with a monotonic stack?', answer: 'Finding the next/previous greater or smaller element (e.g., daily temperatures, largest rectangle in histogram).', difficulty: 'Applied' },
      { id: 'dsa-fc7', topicId: 'dsa-t3', topicTitle: 'Union-Find Complexity', question: 'What is the amortized time per operation of Union-Find with path compression + union by rank?', answer: 'O(alpha(N)), where alpha is the inverse Ackermann function (effectively <= 4 for any realistic N).', difficulty: 'Deep Dive' },
      { id: 'dsa-fc8', topicId: 'dsa-t1', topicTitle: 'Sliding Window', question: 'When can a subarray problem use a variable sliding window instead of prefix-sum + hashmap?', answer: 'When all numbers are non-negative so expanding the right pointer monotonically increases the window sum/metric.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'cpp',
    title: 'C++',
    aliases: ['C++', 'Modern C++20', 'Systems Programming', 'Low-Latency'],
    domain: 'swe-data',
    summary:
      'RAII & smart pointers, move semantics, CPU cache locality, STL containers, templates/concepts, lock-free atomics, and profiling.',
    estimatedDays: 14,
    tier: 2,
    prerequisites: [],
    unlocks: ['quant', 'robotics', 'game-design-dev', 'system-design'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'cpp-d1',
        dayRange: 'Day 1 – 4',
        title: 'Memory Ownership, RAII & Smart Pointers',
        objective: 'Eliminate leaks and use-after-free via RAII, unique_ptr, and spans.',
        topics: [
          {
            id: 'cpp-t1',
            title: 'Stack vs Heap, RAII, unique_ptr/shared_ptr & Rule of Five/Zero',
            summary: 'Deterministic destructors, std::span views, and zero undefined behavior.',
            resources: [
              { title: 'LearnCpp.com Comprehensive Tutorial', provider: 'LearnCpp', url: 'https://www.learncpp.com/', kind: 'Course' },
              { title: 'cppreference.com Standard Library Reference', provider: 'cppreference', url: 'https://en.cppreference.com/w/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'cpp-d2',
        dayRange: 'Day 5 – 7',
        title: 'Move Semantics, Templates & C++20 Concepts',
        objective: 'Write zero-overhead generic abstractions with rvalue references and concepts.',
        topics: [
          {
            id: 'cpp-t2',
            title: 'Lvalues/Rvalues, std::move, Perfect Forwarding & Concepts',
            summary: 'Eliminate unnecessary deep copies and produce clean template diagnostics.',
            resources: [
              { title: 'C++ Core Guidelines', provider: 'Bjarne Stroustrup & Herb Sutter', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'cpp-d3',
        dayRange: 'Day 8 – 10',
        title: 'Cache Locality & Data-Oriented Performance',
        objective: 'Beat linked pointers using contiguous arrays, struct-of-arrays, and custom arenas.',
        topics: [
          {
            id: 'cpp-t3',
            title: 'CPU Cache Lines, False Sharing, std::vector vs std::map & Arena Allocators',
            summary: 'Align structs to 64-byte cache lines and measure real cycles with Quick Bench.',
            resources: [
              { title: 'Compiler Explorer (Godbolt) & Quick Bench', provider: 'Godbolt', url: 'https://godbolt.org/', kind: 'Lab' },
            ],
          },
        ],
      },
      {
        id: 'cpp-d4',
        dayRange: 'Day 11 – 14',
        title: 'Concurrency, Atomics & Sanitizers',
        objective: 'Build lock-free SPSC queues and validate safety with ASan/UBSan/TSan.',
        topics: [
          {
            id: 'cpp-t4',
            title: 'std::atomic Memory Orders, SPSC Ring Buffers & Sanitizers',
            summary: 'Acquire-release ordering and catching data races deterministically.',
            resources: [
              { title: 'CppCon Back to Basics Playlist', provider: 'CppCon', url: 'https://www.youtube.com/@CppCon', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'What Every Programmer Should Know About Memory',
        authors: 'Ulrich Drepper',
        year: 2007,
        venue: 'Red Hat Technical Paper',
        url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
        takeaway: 'Explains DRAM, L1/L2/L3 cache lines, TLB misses, and NUMA costs critical to C++ speed.',
      },
      {
        title: 'Foundations of the C++ Concurrency Memory Model',
        authors: 'Hans-J. Boehm, Sarita V. Adve',
        year: 2008,
        venue: 'ACM PLDI',
        url: 'https://dl.acm.org/doi/10.1145/1375581.1375591',
        takeaway: 'Defined happens-before guarantees and data-race semantics standardized in C++11+.',
      },
      {
        title: 'Zero-Overhead Principle & C++20 Concepts Design',
        authors: 'Gabriel Dos Reis, Bjarne Stroustrup',
        year: 2017,
        venue: 'ISO C++ / POPL',
        url: 'https://stroustrup.com/papers.html',
        takeaway: 'Explains how compile-time constraints preserve runtime efficiency without virtual dispatch overhead.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Custom Arena Allocator & Small-Buffer-Optimized Vector',
          tier: 'Required',
          scope: 'Implement a bump/arena allocator and SBO vector passing ASan/UBSan and Google Benchmark vs std::allocator.',
          stack: 'C++20, CMake, GoogleTest, ASan/UBSan',
          resumeBullet: 'Built custom arena allocator and SBO container reducing dynamic heap allocations by 90% in parser benchmarks.',
        },
        {
          title: 'Lock-Free Single-Producer Single-Consumer (SPSC) Ring Buffer',
          tier: 'Required',
          scope: 'Cache-line padded acquire/release atomic ring buffer tested under ThreadSanitizer.',
          stack: 'C++20, std::atomic, TSan, Google Benchmark',
          resumeBullet: 'Implemented cache-padded lock-free SPSC ring buffer transferring 45M messages/sec verified with ThreadSanitizer.',
        },
      ],
      scalable: [
        {
          title: 'Multithreaded In-Memory Key-Value Store (RESP Protocol)',
          tier: 'Scalable Capstone',
          scope: 'Non-blocking epoll/asio server with sharded hash maps, TTL min-heap, and benchmark parity tests.',
          stack: 'C++20, Linux sockets/Asio, CMake',
          resumeBullet: 'Engineered epoll-based C++20 in-memory KV store achieving 320k ops/sec with sharded lock striping.',
        },
      ],
    },
    certifications: [
      { name: 'LearnCpp Complete Modern C++ Track', issuer: 'LearnCpp', url: 'https://www.learncpp.com/', costNote: '100% Free Curriculum', focus: 'RAII, templates, move semantics, and concurrency' },
      { name: 'C++ Core Guidelines & CppCon Back to Basics', issuer: 'ISO C++ Foundation', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines', costNote: '100% Free', focus: 'Safe modern C++ idioms and zero-overhead patterns' },
      { name: 'CS106L Standard C++ Programming', issuer: 'Stanford Engineering Open Course', url: 'https://web.stanford.edu/class/cs106l/', costNote: '100% Free Lectures & Labs', focus: 'STL containers, iterators, templates, and RAII' },
    ],
    flashcards: [
      { id: 'cpp-fc1', topicId: 'cpp-t1', topicTitle: 'RAII', question: 'What does RAII (Resource Acquisition Is Initialization) guarantee?', answer: 'Resources (heap memory, file handles, mutexes) are acquired in constructors and released deterministically in destructors when leaving scope—even during exceptions.', difficulty: 'Core' },
      { id: 'cpp-fc2', topicId: 'cpp-t3', topicTitle: 'False Sharing', question: 'How does false sharing silently destroy multithreaded C++ performance?', answer: 'Two threads updating independent variables sitting on the same 64-byte CPU cache line cause constant cache-coherency invalidations; fix with alignas(64).', difficulty: 'Deep Dive' },
      { id: 'cpp-fc3', topicId: 'cpp-t2', topicTitle: 'std::move', question: 'Does calling std::move(x) actually move any bytes in memory?', answer: 'No—std::move is simply an unconditional cast to an rvalue reference, permitting the move constructor/assignment operator to steal internal pointers.', difficulty: 'Applied' },
      { id: 'cpp-fc4', topicId: 'cpp-t3', topicTitle: 'vector vs list', question: 'Why does iterating std::vector almost always beat std::list even for mid-size insertions?', answer: 'Contiguous memory maximizes CPU prefetcher and L1 cache hits, whereas std::list pointer-chasing stalls on cache misses.', difficulty: 'Core' },
      { id: 'cpp-fc5', topicId: 'cpp-t1', topicTitle: 'unique_ptr vs shared_ptr', question: 'Why prefer std::unique_ptr by default over std::shared_ptr?', answer: 'unique_ptr has zero runtime overhead over a raw pointer; shared_ptr allocates a control block and performs expensive atomic reference counting.', difficulty: 'Core' },
      { id: 'cpp-fc6', topicId: 'cpp-t4', topicTitle: 'Acquire-Release Atomics', question: 'What guarantee does memory_order_release / memory_order_acquire give between producer and consumer threads?', answer: 'All memory writes made before the producer’s atomic store-release become visible to the consumer after its matching load-acquire.', difficulty: 'Deep Dive' },
      { id: 'cpp-fc7', topicId: 'cpp-t1', topicTitle: 'std::string_view', question: 'What dangling bug can std::string_view cause if returned from a function?', answer: 'string_view is non-owning; returning a view into a local temporary std::string leaves a dangling pointer after the string is destroyed.', difficulty: 'Applied' },
      { id: 'cpp-fc8', topicId: 'cpp-t2', topicTitle: 'C++20 Concepts', question: 'What problem do C++20 Concepts solve compared to legacy SFINAE?', answer: 'They enforce readable compile-time type constraints cleanly on templates, replacing pages of unreadable template error dumps.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'sql',
    title: 'SQL & Relational Databases',
    aliases: ['Sql', 'PostgreSQL', 'Query Optimization', 'ACID'],
    domain: 'swe-data',
    summary:
      'Relational normalization, window functions & CTEs, B-Tree/GIN indexing, EXPLAIN ANALYZE query tuning, transactions/MVCC, and schema migrations.',
    estimatedDays: 9,
    tier: 1,
    prerequisites: [],
    unlocks: ['data-analysis', 'data-engineering', 'ai-ml', 'fintech', 'full-stack-mern-mean'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'sql-d1',
        dayRange: 'Day 1 – 3',
        title: 'Joins, Aggregations & Window Functions',
        objective: 'Write analytical SQL with ROW_NUMBER, LAG/LEAD, running totals, and CTEs.',
        topics: [
          {
            id: 'sql-t1',
            title: 'INNER/LEFT/ANTI Joins, CTEs & Analytical Window Functions',
            summary: 'Solve cohort retention, sessionization, and top-N-per-group queries cleanly.',
            resources: [
              { title: 'PostgreSQL Exercises (PGExercises)', provider: 'PGExercises', url: 'https://pgexercises.com/', kind: 'Lab' },
              { title: 'Mode SQL Tutorial (Basic to Window Functions)', provider: 'Mode', url: 'https://mode.com/sql-tutorial/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'sql-d2',
        dayRange: 'Day 4 – 6',
        title: 'Indexing & EXPLAIN ANALYZE Tuning',
        objective: 'Read query execution plans and design composite, covering, and partial indexes.',
        topics: [
          {
            id: 'sql-t2',
            title: 'B-Tree Composite Indexes, Partial Indexes & EXPLAIN ANALYZE',
            summary: 'Eliminate sequential scans, N+1 queries, and keyset vs OFFSET pagination stalls.',
            resources: [
              { title: 'Use The Index, Luke! (SQL Indexing Guide)', provider: 'Markus Winand', url: 'https://use-the-index-luke.com/', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'sql-d3',
        dayRange: 'Day 7 – 8',
        title: 'Transactions, Isolation Levels & MVCC',
        objective: 'Prevent lost updates, dirty reads, and deadlocks using Postgres MVCC.',
        topics: [
          {
            id: 'sql-t3',
            title: 'ACID, Isolation Levels (Read Committed → Serializable) & Locks',
            summary: 'SELECT FOR UPDATE, optimistic versioning, and avoiding lock contention.',
            resources: [
              { title: 'PostgreSQL Concurrency Control Docs', provider: 'PostgreSQL', url: 'https://www.postgresql.org/docs/current/mvcc.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'sql-d4',
        dayRange: 'Day 9',
        title: 'Schema Design & Zero-Downtime Migrations',
        objective: 'Normalize 3NF OLTP schemas and apply expand-and-contract migrations safely.',
        topics: [
          {
            id: 'sql-t4',
            title: '3NF Modeling, Constraints & Expand-Contract Migrations',
            summary: 'Add nullable columns/indexes CONCURRENTLY without locking production writes.',
            resources: [
              { title: 'PostgreSQL Tutorial & Internals', provider: 'Postgres', url: 'https://www.postgresql.org/docs/current/tutorial.html', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'A Relational Model of Data for Large Shared Data Banks',
        authors: 'Edgar F. Codd',
        year: 1970,
        venue: 'Communications of the ACM',
        url: 'https://dl.acm.org/doi/10.1145/362384.362685',
        takeaway: 'Invented relational algebra and data independence, forming the bedrock of SQL databases.',
      },
      {
        title: 'A Critique of ANSI SQL Isolation Levels',
        authors: 'Hal Berenson, Phil Bernstein, Jim Gray, Jim Melton, Elizabeth O’Neil, Patrick O’Neil',
        year: 1995,
        venue: 'ACM SIGMOD',
        url: 'https://www.microsoft.com/en-us/research/publication/a-critique-of-ansi-sql-isolation-levels/',
        takeaway: 'Clarified snapshot isolation and write skew anomalies missing from early ANSI definitions.',
      },
      {
        title: 'The Design of POSTGRES',
        authors: 'Michael Stonebraker, Lawrence A. Rowe',
        year: 1986,
        venue: 'ACM SIGMOD',
        url: 'https://dsf.berkeley.edu/papers/ERL-M85-95.pdf',
        takeaway: 'Introduced extensible types, rules, and storage architecture powering modern PostgreSQL.',
      },
    ],
    projects: {
      required: [
        {
          title: 'SaaS Cohort Retention & Revenue SQL Analytics Pack',
          tier: 'Required',
          scope: 'Write window-function SQL scripts computing D1/D7/D30 retention cohorts, LTV, and NRR without Python loops.',
          stack: 'PostgreSQL / DuckDB',
          resumeBullet: 'Authored window-function SQL cohort and NRR analytics suite running directly inside PostgreSQL in <120ms.',
        },
        {
          title: '10M-Row Query Optimization & Indexing Case Study',
          tier: 'Required',
          scope: 'Seed 10M synthetic orders, profile slow queries with EXPLAIN ANALYZE, and slash p99 via composite/partial indexes & keyset pagination.',
          stack: 'PostgreSQL, pgbench, EXPLAIN ANALYZE',
          resumeBullet: 'Reduced 10M-row query p99 latency from 4.2s to 8ms using covering composite indexes and keyset pagination.',
        },
      ],
      scalable: [
        {
          title: 'Multi-Tenant PostgreSQL Booking Engine with Deadlock Prevention',
          tier: 'Scalable Capstone',
          scope: 'Exclusion constraints (btree_gist) preventing overlapping reservations + concurrency load test suite.',
          stack: 'PostgreSQL, TypeScript/Python, Docker',
          resumeBullet: 'Enforced race-condition-free booking invariants at the database layer using PostgreSQL exclusion constraints.',
        },
      ],
    },
    certifications: [
      { name: 'Intro to SQL & Advanced SQL', issuer: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', costNote: '100% Free Certificates', focus: 'Joins, analytic window functions, and nested data' },
      { name: 'Relational Database Certification', issuer: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/relational-database/', costNote: '100% Free Certificate', focus: 'PostgreSQL modeling, bash, and SQL queries' },
      { name: 'Databases: Relational Databases and SQL', issuer: 'Stanford Online (edX)', url: 'https://online.stanford.edu/courses/soe-ydatabases0005-databases-relational-databases-and-sql', costNote: '100% Free Self-Paced', focus: 'Relational algebra, triggers, views, and constraints' },
    ],
    flashcards: [
      { id: 'sql-fc1', topicId: 'sql-t1', topicTitle: 'WHERE vs HAVING', question: 'What is the execution order difference between WHERE and HAVING?', answer: 'WHERE filters individual rows BEFORE GROUP BY aggregation; HAVING filters aggregated groups AFTER GROUP BY.', difficulty: 'Core' },
      { id: 'sql-fc2', topicId: 'sql-t2', topicTitle: 'Composite Index Column Order', question: 'Given INDEX(status, created_at), which query uses the index efficiently: WHERE created_at > X, or WHERE status = "open" AND created_at > X?', answer: 'Only the second (or WHERE status = "open"); B-Tree indexes follow the leftmost prefix rule.', difficulty: 'Applied' },
      { id: 'sql-fc3', topicId: 'sql-t2', topicTitle: 'OFFSET Pagination Trap', question: 'Why does OFFSET 500000 LIMIT 20 get slower as pages deepen?', answer: 'The database still fetches and discards all 500,000 preceding rows; keyset pagination (WHERE id > last_seen_id LIMIT 20) stays O(log N).', difficulty: 'Applied' },
      { id: 'sql-fc4', topicId: 'sql-t3', topicTitle: 'Write Skew Anomaly', question: 'How can two concurrent Snapshot Isolation transactions violate an invariant without touching the same row?', answer: 'Each reads an aggregate condition (e.g. "at least 1 doctor on call") and updates a DIFFERENT row to go off-call; Serializable SSI catches this.', difficulty: 'Deep Dive' },
      { id: 'sql-fc5', topicId: 'sql-t1', topicTitle: 'RANK vs DENSE_RANK', question: 'For scores [100, 100, 90], what do ROW_NUMBER, RANK, and DENSE_RANK return?', answer: 'ROW_NUMBER: 1,2,3; RANK: 1,1,3; DENSE_RANK: 1,1,2.', difficulty: 'Core' },
      { id: 'sql-fc6', topicId: 'sql-t4', topicTitle: 'CREATE INDEX CONCURRENTLY', question: 'Why use CREATE INDEX CONCURRENTLY in production PostgreSQL?', answer: 'Standard CREATE INDEX locks out all table INSERT/UPDATE/DELETE writes until finished; CONCURRENTLY builds the index without blocking writes.', difficulty: 'Applied' },
      { id: 'sql-fc7', topicId: 'sql-t2', topicTitle: 'Partial Index', question: 'When is a partial index (WHERE deleted_at IS NULL) much faster and smaller than a full index?', answer: 'When 95%+ of rows are archived/processed and active queries only ever inspect the 5% live subset.', difficulty: 'Applied' },
      { id: 'sql-fc8', topicId: 'sql-t1', topicTitle: 'NULL in NOT IN', question: 'Why can "WHERE id NOT IN (SELECT user_id FROM bans)" return ZERO rows unexpectedly?', answer: 'If the subquery returns even one NULL, SQL three-valued logic evaluates id != NULL as UNKNOWN, collapsing the entire predicate.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    aliases: ['Data analysis', 'Pandas', 'Polars', 'BI & Storytelling'],
    domain: 'swe-data',
    summary:
      'Exploratory data analysis, Pandas/Polars vectorized wrangling, hypothesis testing & p-values, Simpson’s paradox awareness, and crisp visual storytelling.',
    estimatedDays: 10,
    tier: 2,
    prerequisites: ['python-core', 'sql', 'excel-back-office'],
    unlocks: ['data-engineering', 'ai-ml', 'product-thinking'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'da-d1',
        dayRange: 'Day 1 – 3',
        title: 'Vectorized Wrangling with Pandas, Polars & DuckDB',
        objective: 'Clean, join, melt, and aggregate million-row datasets cleanly without row-by-row loops.',
        topics: [
          {
            id: 'da-t1',
            title: 'Tidy Data, Vectorized Joins & DuckDB Local Analytics',
            summary: 'Handle missingness mechanisms (MCAR/MAR/MNAR), timezones, and Parquet files.',
            resources: [
              { title: 'Kaggle Data Cleaning & Pandas Courses', provider: 'Kaggle Learn', url: 'https://www.kaggle.com/learn/pandas', kind: 'Course' },
              { title: 'Polars User Guide', provider: 'Polars', url: 'https://docs.pola.rs/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'da-d2',
        dayRange: 'Day 4 – 6',
        title: 'Statistical Inference & Causal Pitfalls',
        objective: 'Run t-tests, chi-square, bootstrap confidence intervals, and catch confounding.',
        topics: [
          {
            id: 'da-t2',
            title: 'Confidence Intervals, Multiple Testing & Simpson’s Paradox',
            summary: 'Distinguish statistical significance from practical effect size.',
            resources: [
              { title: 'Seeing Theory: Visual Intro to Probability & Statistics', provider: 'Brown University', url: 'https://seeing-theory.brown.edu/', kind: 'Lab' },
            ],
          },
        ],
      },
      {
        id: 'da-d3',
        dayRange: 'Day 7 – 8',
        title: 'Data Visualization & Executive Storytelling',
        objective: 'Pick perceptual encodings, direct labeling, and zero-chartjunk dashboards.',
        topics: [
          {
            id: 'da-t3',
            title: 'Cleveland-McGill Perceptual Hierarchy & Annotated Charts',
            summary: 'Kill pie charts and dual-axis traps; pair charts with explicit decision headlines.',
            resources: [
              { title: 'From Data to Viz Decision Tree', provider: 'Data to Viz', url: 'https://www.data-to-viz.com/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'da-d4',
        dayRange: 'Day 9 – 10',
        title: 'Self-Serve BI & Metric Definitions',
        objective: 'Define unambiguous funnel, retention, and cohort semantics in Metabase/Looker/Superset.',
        topics: [
          {
            id: 'da-t4',
            title: 'Funnel Attribution, Cohort Heatmaps & KPI Governance',
            summary: 'Eliminate conflicting team numbers with canonical SQL metric definitions.',
            resources: [
              { title: 'Apache Superset / Metabase Learn', provider: 'Metabase', url: 'https://www.metabase.com/learn/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Tidy Data',
        authors: 'Hadley Wickham',
        year: 2014,
        venue: 'Journal of Statistical Software',
        url: 'https://vita.had.co.nz/papers/tidy-data.pdf',
        takeaway: 'Formalized variable-per-column, observation-per-row structure that unifies cleaning and plotting.',
      },
      {
        title: 'Graphical Perception: Theory, Experimentation, and Application',
        authors: 'William S. Cleveland, Robert McGill',
        year: 1984,
        venue: 'Journal of the American Statistical Association',
        url: 'https://www.jstor.org/stable/2288400',
        takeaway: 'Ranked human accuracy across visual encodings (position > length > angle > area > color saturation).',
      },
      {
        title: 'Simpson’s Paradox in Psychological Science & Data Analysis',
        authors: 'R. A. Kievit, W. E. Frankenhuis, L. J. Waldorp, D. Borsboom',
        year: 2013,
        venue: 'Frontiers in Psychology',
        url: 'https://www.frontiersin.org/articles/10.3389/fpsyg.2013.00513/full',
        takeaway: 'Explains how aggregated trends reverse inside subgroups, preventing catastrophic business misreads.',
      },
    ],
    projects: {
      required: [
        {
          title: 'End-to-End Marketplace Funnel & Simpson’s Paradox Audit',
          tier: 'Required',
          scope: 'Analyze multi-million-row e-commerce/rideshare events in DuckDB/Polars, expose segment confounding, and propose KPI fixes.',
          stack: 'Python, DuckDB, Polars, Plotly',
          resumeBullet: 'Uncovered segment-level Simpson’s paradox in conversion funnel using DuckDB/Polars, guiding a 9% checkout lift.',
        },
        {
          title: 'Bootstrap A/B Experiment & Retention Analysis Notebook',
          tier: 'Required',
          scope: 'Compute non-parametric bootstrap CIs, Mann-Whitney vs Welch t-test power, and cohort survival curves.',
          stack: 'Python, SciPy, Matplotlib',
          resumeBullet: 'Built non-parametric bootstrap A/B evaluation notebook eliminating false positives from skewed revenue distributions.',
        },
      ],
      scalable: [
        {
          title: 'Automated Executive Weekly Metric Digest & Anomaly Detector',
          tier: 'Scalable Capstone',
          scope: 'Query warehouse tables, detect z-score/seasonal anomalies, and generate clean annotated charts + Slack/HTML digest.',
          stack: 'Python, DuckDB/Postgres, Jinja2, Plotly',
          resumeBullet: 'Automated weekly KPI anomaly detection and annotated executive briefing replacing 4 hours of manual reporting.',
        },
      ],
    },
    certifications: [
      { name: 'Data Analysis with Python', issuer: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', costNote: '100% Free Certificate', focus: 'NumPy, Pandas, cleaning, and visualization' },
      { name: 'Pandas & Data Visualization Micro-Courses', issuer: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', costNote: '100% Free Certificates', focus: 'Grouping, cleaning, and Seaborn/Matplotlib' },
      { name: 'Google Data Analytics Professional Certificate (Free Audit)', issuer: 'Google via Coursera', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', costNote: 'Free Audit', focus: 'SQL, spreadsheets, R/Python, and storytelling' },
    ],
    flashcards: [
      { id: 'da-fc1', topicId: 'da-t2', topicTitle: 'Simpson’s Paradox', question: 'How can Product A have a higher conversion rate than Product B on both Desktop and Mobile, yet lose overall?', answer: 'Confounding mix shift: if Product A receives mostly low-converting Mobile traffic while B gets mostly Desktop traffic, the pooled average flips.', difficulty: 'Applied' },
      { id: 'da-fc2', topicId: 'da-t3', topicTitle: 'Graphical Perception', question: 'According to Cleveland & McGill, why do aligned bar charts beat pie charts for comparing magnitudes?', answer: 'Humans judge position along a common scale far more accurately than angles or circular slice areas.', difficulty: 'Core' },
      { id: 'da-fc3', topicId: 'da-t2', topicTitle: 'P-Value Meaning', question: 'Does p = 0.03 mean there is a 97% probability that the treatment works?', answer: 'No—it means assuming the null hypothesis (no effect) is true, observing data this extreme happens 3% of the time.', difficulty: 'Core' },
      { id: 'da-fc4', topicId: 'da-t1', topicTitle: 'Mean vs Median on Revenue', question: 'Why report median and p90 alongside mean on user spend or page latency?', answer: 'A handful of whale buyers or 60s timeout outliers drag the arithmetic mean far away from the typical user experience.', difficulty: 'Core' },
      { id: 'da-fc5', topicId: 'da-t2', topicTitle: 'Survivorship Bias', question: 'What is survivorship bias in SaaS customer feedback analysis?', answer: 'Surveying only currently active customers misses 100% of the reasons churned users actually left.', difficulty: 'Core' },
      { id: 'da-fc6', topicId: 'da-t1', topicTitle: 'Polars vs Pandas', question: 'Why is Polars often 5–20x faster than single-threaded Pandas on large CSV/Parquet transforms?', answer: 'Polars uses Rust Apache Arrow columnar memory, multi-core parallelism, and lazy query optimization (predicate/projection pushdown).', difficulty: 'Applied' },
      { id: 'da-fc7', topicId: 'da-t2', topicTitle: 'Multiple Comparisons', question: 'If you test 20 independent slices (browser, country, device) at alpha = 0.05, what happens?', answer: 'Even with zero real effect, you expect ~1 false-positive "significant" result by pure chance unless correcting (Bonferroni/FDR).', difficulty: 'Deep Dive' },
      { id: 'da-fc8', topicId: 'da-t4', topicTitle: 'Metric Attribution', question: 'Why must a funnel conversion rate specify a fixed time window (e.g. "signup → purchase within 7 days")?', answer: 'Without a bounded window, older cohorts have months to convert while yesterday’s cohort has hours, artificially showing declining conversion.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    aliases: ['Data Engg', 'ETL/ELT', 'dbt', 'Spark', 'Kafka', 'Lakehouse'],
    domain: 'swe-data',
    summary:
      'Dimensional modeling (Kimball star schemas), Apache Parquet/Iceberg lakehouses, dbt transformations, Airflow/Prefect DAGs, and Kafka streaming.',
    estimatedDays: 14,
    tier: 3,
    prerequisites: ['python-core', 'sql', 'data-analysis'],
    unlocks: ['mlops', 'system-design'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'de-d1',
        dayRange: 'Day 1 – 4',
        title: 'Dimensional Modeling & Analytical Warehouses',
        objective: 'Design Kimball fact/dimension tables, SCD Type 2 history, and columnar partitioning.',
        topics: [
          {
            id: 'de-t1',
            title: 'Star Schemas, SCD Type 2 & Columnar Parquet / Iceberg Formats',
            summary: 'Row-oriented OLTP vs columnar OLAP compression, predicate pushdown, and Z-ordering.',
            resources: [
              { title: 'Data Engineering Zoomcamp (Free Full Course)', provider: 'DataTalks.Club', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'de-d2',
        dayRange: 'Day 5 – 8',
        title: 'ELT with dbt, Testing & Idempotent Pipelines',
        objective: 'Build tested, documented SQL transformation DAGs with dbt and incremental models.',
        topics: [
          {
            id: 'de-t2',
            title: 'dbt Staging/Marts, Incremental MERGE & Data Quality Tests',
            summary: 'Functional idempotent backfills (avoid duplicate rows on retry) and freshness SLAs.',
            resources: [
              { title: 'dbt Labs Free Learn Courses', provider: 'dbt Labs', url: 'https://courses.getdbt.com/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'de-d3',
        dayRange: 'Day 9 – 11',
        title: 'Distributed Processing (Spark / DuckDB) & Orchestration',
        objective: 'Process terabytes cleanly while avoiding shuffle skew and small-file explosions.',
        topics: [
          {
            id: 'de-t3',
            title: 'PySpark Partitioning, Skew Salting & Airflow/Prefect DAGs',
            summary: 'Handle late-arriving data, catchup backfills, and compact small Parquet files.',
            resources: [
              { title: 'Apache Spark Official Docs', provider: 'Apache Spark', url: 'https://spark.apache.org/docs/latest/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'de-d4',
        dayRange: 'Day 12 – 14',
        title: 'Streaming Ingestion & Change Data Capture (CDC)',
        objective: 'Stream real-time events via Kafka/Redpanda and Debezium CDC with exactly-once semantics.',
        topics: [
          {
            id: 'de-t4',
            title: 'Kafka Partitions, Consumer Groups, Watermarks & Debezium CDC',
            summary: 'Handle out-of-order events via event-time watermarks and schema registries.',
            resources: [
              { title: 'Confluent Kafka 101 Free Courses', provider: 'Confluent Developer', url: 'https://developer.confluent.io/courses/', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Dremel: Interactive Analysis of Web-Scale Datasets',
        authors: 'Sergey Melnik et al.',
        year: 2010,
        venue: 'VLDB',
        url: 'https://research.google/pubs/dremel-interactive-analysis-of-web-scale-datasets/',
        takeaway: 'Introduced nested columnar storage and tree-aggregation powering BigQuery and Apache Parquet.',
      },
      {
        title: 'Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics',
        authors: 'Michael Armbrust, Ali Ghodsi, Reynold Xin, Matei Zaharia',
        year: 2021,
        venue: 'CIDR',
        url: 'https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf',
        takeaway: 'Explains how ACID transaction logs (Delta/Iceberg) over object storage replace fragile two-tier data lakes.',
      },
      {
        title: 'Kafka: A Distributed Messaging System for Log Processing',
        authors: 'Jay Kreps, Neha Narkhede, Jun Rao',
        year: 2011,
        venue: 'NetDB Workshop',
        url: 'https://notes.stephenholiday.com/Kafka.pdf',
        takeaway: 'Established partitioned append-only commit logs for high-throughput streaming pipelines.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Idempotent Lakehouse ELT Pipeline (DuckDB/Postgres + dbt)',
          tier: 'Required',
          scope: 'Ingest raw JSON/CSV into partitioned Parquet bronze/silver/gold layers with dbt schema tests and SCD Type 2 snapshots.',
          stack: 'Python, dbt-core, DuckDB/PostgreSQL, Parquet',
          resumeBullet: 'Built idempotent medallion ELT pipeline with dbt-core and SCD Type 2 snapshots enforcing 100% schema test coverage.',
        },
        {
          title: 'Real-Time Kafka/Redpanda Clickstream Aggregator',
          tier: 'Required',
          scope: 'Stream synthetic click events through partitioned topics into tumbling window session metrics with Schema Registry.',
          stack: 'Redpanda/Kafka, Python/Spark Streaming, Docker',
          resumeBullet: 'Implemented partitioned clickstream pipeline processing 15k events/sec with Avro schema validation and dead-letter routing.',
        },
      ],
      scalable: [
        {
          title: 'CDC-to-Iceberg Streaming Warehouse with Automated Compaction',
          tier: 'Scalable Capstone',
          scope: 'Capture PostgreSQL WAL changes via Debezium into Iceberg/Parquet tables with automated small-file compaction.',
          stack: 'PostgreSQL, Debezium, Kafka, PyIceberg/Spark, Airflow',
          resumeBullet: 'Architected near-real-time Postgres CDC-to-Iceberg lakehouse pipeline cutting analytical data freshness SLA from 24h to 90s.',
        },
      ],
    },
    certifications: [
      { name: 'Data Engineering Zoomcamp', issuer: 'DataTalks.Club', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', costNote: '100% Free Cohort & Self-Paced', focus: 'Docker, Terraform, Spark, Kafka, dbt, and warehouses' },
      { name: 'dbt Fundamentals & Analytics Engineering', issuer: 'dbt Labs', url: 'https://courses.getdbt.com/', costNote: '100% Free Certificate', focus: 'Modular SQL, testing, documentation, and snapshots' },
      { name: 'Apache Kafka & Event-Driven Architecture 101', issuer: 'Confluent Developer', url: 'https://developer.confluent.io/courses/', costNote: '100% Free', focus: 'Partitions, consumer groups, and Kafka Connect' },
    ],
    flashcards: [
      { id: 'de-fc1', topicId: 'de-t1', topicTitle: 'Columnar vs Row Storage', question: 'Why is Apache Parquet vastly faster than CSV or Postgres rows for "SELECT SUM(amount) FROM 1B_orders"?', answer: 'Columnar storage reads only the 1 needed column off disk with dictionary/RLE compression and min/max row-group skipping.', difficulty: 'Core' },
      { id: 'de-fc2', topicId: 'de-t2', topicTitle: 'Idempotent Pipelines', question: 'What makes a daily ETL backfill job idempotent?', answer: 'Re-running the same date partition 5 times produces the exact same end table without duplicate rows (via DELETE+INSERT or MERGE).', difficulty: 'Core' },
      { id: 'de-fc3', topicId: 'de-t1', topicTitle: 'SCD Type 2', question: 'How does Slowly Changing Dimension Type 2 preserve historical accuracy when a customer moves states?', answer: 'It closes the old row (effective_to, is_current=false) and inserts a new row with the new state so historical fact joins remain accurate.', difficulty: 'Applied' },
      { id: 'de-fc4', topicId: 'de-t3', topicTitle: 'Small Files Problem', question: 'Why do thousands of tiny 50KB Parquet files cripple Spark/Trino queries?', answer: 'Object storage metadata listing, file-open HTTP overhead, and planner task scheduling dominate actual data reading time.', difficulty: 'Applied' },
      { id: 'de-fc5', topicId: 'de-t4', topicTitle: 'Kafka Consumer Groups', question: 'If a Kafka topic has 4 partitions and a consumer group scales to 6 instances, how many consumers stay idle?', answer: '2 consumers sit idle—each partition can be read by at most 1 consumer within the same consumer group.', difficulty: 'Applied' },
      { id: 'de-fc6', topicId: 'de-t3', topicTitle: 'Spark Data Skew', question: 'How do you fix 99% of Spark executors finishing in 5s while 1 executor hangs for 40 minutes on a join?', answer: 'Data skew on a hot key (e.g. null or top tenant); fix via broadcast hash join (if one side is small) or salted key splitting.', difficulty: 'Deep Dive' },
      { id: 'de-fc7', topicId: 'de-t4', topicTitle: 'Event Time vs Processing Time', question: 'Why window streaming metrics by Event Time with watermarks rather than Processing Time?', answer: 'Mobile clients go offline and replay batches later; Event Time places late events in the true historical bucket they occurred in.', difficulty: 'Deep Dive' },
      { id: 'de-fc8', topicId: 'de-t2', topicTitle: 'dbt Source Freshness', question: 'Why configure dbt source freshness checks before running downstream mart models?', answer: 'To detect silent upstream ingestion stalls early instead of publishing stale dashboards as up-to-date.', difficulty: 'Core' },
    ],
  },
  {
    id: 'git-github',
    title: 'Git & GitHub',
    aliases: ['Git & GitHub', 'Git/Git Hub', 'Version Control', 'CI Workflows'],
    domain: 'swe-data',
    summary:
      'Git object graph (blobs/trees/commits), interactive rebase & bisect, conflict resolution, stacked PRs, GitHub Actions, and clean release workflows.',
    estimatedDays: 6,
    tier: 1,
    prerequisites: [],
    unlocks: ['web-apis', 'devops', 'cloud', 'software-testing-qa', 'vibe-coding-automation'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'git-d1',
        dayRange: 'Day 1 – 2',
        title: 'Git Internals & Everyday Hygiene',
        objective: 'Understand HEAD, index, commits as snapshots, and clean atomic commits.',
        topics: [
          {
            id: 'git-t1',
            title: 'Snapshots, Branches as Pointers, Merge vs Rebase & Reflog Rescue',
            summary: 'Recover from almost any mistake safely using git reflog.',
            resources: [
              { title: 'Learn Git Branching (Interactive Visual Sandbox)', provider: 'LearnGitBranching', url: 'https://learngitbranching.js.org/', kind: 'Lab' },
              { title: 'Pro Git Book (Official Free Book)', provider: 'Git SCM', url: 'https://git-scm.com/book/en/v2', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'git-d2',
        dayRange: 'Day 3 – 4',
        title: 'Debugging & History Mastery',
        objective: 'Locate regressions in O(log N) commits with git bisect and curate clean PRs.',
        topics: [
          {
            id: 'git-t2',
            title: 'Interactive Rebase, Cherry-Pick, Worktrees & Git Bisect',
            summary: 'Squash noisy WIP commits and bisect bugs automatically with test scripts.',
            resources: [
              { title: 'GitHub Skills Interactive Courses', provider: 'GitHub', url: 'https://skills.github.com/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'git-d3',
        dayRange: 'Day 5 – 6',
        title: 'GitHub Collaboration, Security & Actions',
        objective: 'Enforce branch protection, CODEOWNERS, PR templates, and CI checks.',
        topics: [
          {
            id: 'git-t3',
            title: 'PR Review Discipline, Branch Protection, Secret Scanning & Releases',
            summary: 'Keep PRs small (<300 lines), sign commits, and automate semantic changelogs.',
            resources: [
              { title: 'GitHub Docs: Pull Requests & Branch Protection', provider: 'GitHub Docs', url: 'https://docs.github.com/en/pull-requests', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Software Configuration Management & Content-Addressable DAGs (Git Architecture)',
        authors: 'Scott Chacon, Ben Straub / Linus Torvalds Design Notes',
        year: 2014,
        venue: 'Pro Git / Git Internals',
        url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects',
        takeaway: 'Explains how SHA-addressed immutable blobs, trees, and commits guarantee cryptographic history integrity.',
      },
      {
        title: 'Modern Code Review: A Case Study at Google',
        authors: 'Caitlin Sadowski, Emma Söderberg, Luke Church, Michal Sipko, Alberto Bacchelli',
        year: 2018,
        venue: 'ACM ICSE-SEIP',
        url: 'https://research.google/pubs/modern-code-review-a-case-study-at-google/',
        takeaway: 'Empirical findings showing small, focused changelists receive faster, higher-quality reviews.',
      },
      {
        title: 'Trunk-Based Development & Continuous Integration Empirical Study',
        authors: 'Nicole Forsgren, Jez Humble (DORA Research)',
        year: 2018,
        venue: 'DORA / Accelerate',
        url: 'https://dora.dev/capabilities/trunk-based-development/',
        takeaway: 'Shows short-lived branches merged daily correlate with fewer merge conflicts and higher deployment stability.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Open-Source Style Repo with Protected Trunk & CI Gate',
          tier: 'Required',
          scope: 'Configure PR template, CODEOWNERS, branch protection, conventional commits check, and automated GitHub Actions tests.',
          stack: 'Git, GitHub Actions, YAML',
          resumeBullet: 'Standardized trunk-based GitHub workflow with CODEOWNERS, conventional commit checks, and automated CI PR gates.',
        },
        {
          title: 'Automated Git Bisect Regression Finder Demo',
          tier: 'Required',
          scope: 'Script `git bisect run` across a 50-commit repo to pinpoint the exact breaking commit automatically.',
          stack: 'Git, Bash/Python, Pytest/Vitest',
          resumeBullet: 'Automated binary-search regression isolation with `git bisect run`, locating faulty commits across deep histories in seconds.',
        },
      ],
      scalable: [
        {
          title: 'Monorepo Release & Semantic Changelog Automation Pipeline',
          tier: 'Scalable Capstone',
          scope: 'Automated versioning, signed tags, release notes generation, and path-filtered CI jobs.',
          stack: 'GitHub Actions, Release-Please / Changesets',
          resumeBullet: 'Built path-filtered monorepo CI/release pipeline automating semantic versioning and signed GitHub releases.',
        },
      ],
    },
    certifications: [
      { name: 'GitHub Skills Interactive Courses', issuer: 'GitHub', url: 'https://skills.github.com/', costNote: '100% Free', focus: 'PRs, merge conflicts, GitHub Actions, and Pages' },
      { name: 'GitHub Foundations Learning Path', issuer: 'Microsoft Learn / GitHub', url: 'https://learn.microsoft.com/en-us/training/paths/github-foundations/', costNote: '100% Free', focus: 'Repos, branching, collaboration, and security' },
      { name: 'Missing Semester: Version Control (Git)', issuer: 'MIT CSAIL', url: 'https://missing.csail.mit.edu/2020/version-control/', costNote: '100% Free Lecture & Exercises', focus: 'Git data model, staging, branching, and internals' },
    ],
    flashcards: [
      { id: 'git-fc1', topicId: 'git-t1', topicTitle: 'Rebase Golden Rule', question: 'Why should you NEVER rebase a shared public branch like main that others have pulled?', answer: 'Rebase rewrites commit SHA hashes, diverging history for everyone else and causing messy duplicate commits on merge.', difficulty: 'Core' },
      { id: 'git-fc2', topicId: 'git-t1', topicTitle: 'git reflog', question: 'You accidentally ran `git reset --hard` and lost 3 local commits—how do you recover them?', answer: 'Run `git reflog` to find the previous HEAD SHA before the reset and create a branch or reset back to that hash.', difficulty: 'Core' },
      { id: 'git-fc3', topicId: 'git-t2', topicTitle: 'git bisect', question: 'How many test runs does `git bisect` need to find 1 bad commit across 1,000 commits?', answer: 'At most ~10 steps (log2(1024) = 10) via binary search.', difficulty: 'Applied' },
      { id: 'git-fc4', topicId: 'git-t1', topicTitle: 'Git Internals', question: 'What are the 4 core object types stored inside .git/objects?', answer: 'Blob (file contents), Tree (directory listing), Commit (snapshot pointer + parent + metadata), and Annotated Tag.', difficulty: 'Deep Dive' },
      { id: 'git-fc5', topicId: 'git-t2', topicTitle: 'git worktree', question: 'How does `git worktree` help when an urgent hotfix interrupts an unfinished feature branch?', answer: 'It checks out a second branch into a separate folder sharing the same .git database without stashing or losing editor state.', difficulty: 'Applied' },
      { id: 'git-fc6', topicId: 'git-t3', topicTitle: 'Force Push Safety', question: 'Why always use `git push --force-with-lease` instead of `--force` after rebasing a PR branch?', answer: '--force-with-lease aborts if someone else pushed new commits to the remote branch you haven’t seen yet.', difficulty: 'Applied' },
      { id: 'git-fc7', topicId: 'git-t1', topicTitle: 'git revert vs reset', question: 'How do you safely undo a buggy commit that was already pushed to main?', answer: 'Use `git revert <sha>`, which creates a new inverse commit preserving public history rather than rewriting it.', difficulty: 'Core' },
      { id: 'git-fc8', topicId: 'git-t3', topicTitle: 'Secret Leaks', question: 'If an API key is committed and pushed, is deleting it in the next commit enough?', answer: 'No—the key remains permanently in Git history; immediately revoke/rotate the key first, then purge history if needed.', difficulty: 'Core' },
    ],
  },
];
