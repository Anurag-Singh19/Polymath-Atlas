import { SkillNode } from '../types/curriculum';

export const SKILLS_QUANT_FINANCE: SkillNode[] = [
  {
    id: 'quant',
    title: 'Quant (Dev, Finance, Trading & Engineering)',
    aliases: ['Quant - Dev,Finance,Trade,Engg', 'Quantitative Finance', 'Algo Trading', 'Quant Research'],
    domain: 'quant-finance',
    summary:
      'Stochastic calculus, derivatives pricing, alpha factor research, statistical arbitrage, low-latency C++ order books, and portfolio risk engineering.',
    estimatedDays: 18,
    tier: 4,
    prerequisites: ['python-dsa', 'cpp', 'ai-ml'],
    unlocks: ['fintech', 'fund-management', 'asset-management'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'qnt-d1',
        dayRange: 'Day 1 – 5',
        title: 'Probability, Stochastic Calculus & Derivatives Pricing',
        objective: 'Master Ito’s Lemma, Black-Scholes PDE, Monte Carlo variance reduction, and Greeks.',
        topics: [
          {
            id: 'qnt-t1',
            title: 'Brownian Motion, Ito’s Lemma & Black-Scholes-Merton PDE',
            summary: 'Derive delta-hedged replication, risk-neutral pricing, and implied volatility smiles.',
            resources: [
              { title: 'MIT 18.S096 Topics in Mathematics with Applications in Finance', provider: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/', kind: 'Course' },
              { title: 'QuantLib C++/Python Documentation', provider: 'QuantLib', url: 'https://www.quantlib.org/docs.shtml', kind: 'Docs' },
            ],
          },
          {
            id: 'qnt-t2',
            title: 'Monte Carlo Path Simulation & Variance Reduction',
            summary: 'Antithetic variates, control variates, and Quasi-Monte Carlo Sobol sequences.',
            resources: [
              { title: 'QuantEcon Python Lectures', provider: 'QuantEcon', url: 'https://python.quantecon.org/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'qnt-d2',
        dayRange: 'Day 6 – 10',
        title: 'Quant Research & Systematic Alpha Signals',
        objective: 'Build leakage-free backtests, factor neutrality, and transaction-cost models.',
        topics: [
          {
            id: 'qnt-t3',
            title: 'Cross-Sectional Factors, Cointegration & Statistical Arbitrage',
            summary: 'Ornstein-Uhlenbeck mean reversion, Engle-Granger cointegration, and Deflated Sharpe Ratio.',
            resources: [
              { title: 'Hudson & Thames Research Articles', provider: 'Hudson & Thames', url: 'https://hudsonthames.org/blog/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'qnt-d3',
        dayRange: 'Day 11 – 14',
        title: 'Market Microstructure & Quant Dev (C++ Order Books)',
        objective: 'Engineer lock-free limit order books, FIX/ITCH parsers, and execution algos.',
        topics: [
          {
            id: 'qnt-t4',
            title: 'Limit Order Book Matching, Queue Priority & VWAP/TWAP Execution',
            summary: 'Adverse selection, market impact (Almgren-Chriss), and cache-friendly C++ matching.',
            resources: [
              { title: 'CppCon Low-Latency Trading Talks Archive', provider: 'CppCon / YouTube', url: 'https://www.youtube.com/@CppCon', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'qnt-d4',
        dayRange: 'Day 15 – 18',
        title: 'Portfolio Optimization & Tail Risk Engineering',
        objective: 'Implement mean-variance shrinkage, Kelly sizing, VaR, and Expected Shortfall.',
        topics: [
          {
            id: 'qnt-t5',
            title: 'Ledoit-Wolf Covariance Shrinkage, Risk Parity & Kelly Criterion',
            summary: 'Avoid Markowitz error maximization via Hierarchical Risk Parity (HRP) and CVaR constraints.',
            resources: [
              { title: 'PyPortfolioOpt Documentation', provider: 'PyPortfolioOpt', url: 'https://pyportfolioopt.readthedocs.io/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Pricing of Options and Corporate Liabilities',
        authors: 'Fischer Black, Myron Scholes',
        year: 1973,
        venue: 'Journal of Political Economy',
        url: 'https://www.journals.uchicago.edu/doi/10.1086/260062',
        takeaway: 'Derived continuous-time option valuation via dynamic delta hedging.',
      },
      {
        title: 'Optimal Execution of Portfolio Transactions',
        authors: 'Robert Almgren, Neil Chriss',
        year: 2001,
        venue: 'Journal of Risk',
        url: 'https://www.smallake.kr/wp-content/uploads/2016/03/optexec.pdf',
        takeaway: 'Foundational trade-off between permanent/temporary market impact and volatility risk.',
      },
      {
        title: 'The Deflated Sharpe Ratio: Correcting for Selection Bias, Backtest Overfitting, and Non-Normality',
        authors: 'David H. Bailey, Marcos López de Prado',
        year: 2014,
        venue: 'Journal of Portfolio Management',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551',
        takeaway: 'Quantifies false-discovery inflation when testing hundreds of backtest variations.',
      },
      {
        title: 'Building Diversified Portfolios that Outperform Out-of-Sample (HRP)',
        authors: 'Marcos López de Prado',
        year: 2016,
        venue: 'Journal of Portfolio Management',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2708678',
        takeaway: 'Hierarchical Risk Parity replaces unstable matrix inversion with graph clustering.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Low-Latency C++20 Limit Order Book & Matching Engine',
          tier: 'Required',
          scope: 'Cache-aligned price-time priority matching engine with flat-map/pool allocator handling limit, market, IOC, and FOK orders.',
          stack: 'C++20, Google Benchmark, CMake',
          resumeBullet: 'Built a lock-free C++20 limit order book matching 1.8M orders/sec with sub-microsecond p99 insertion latency.',
        },
        {
          title: 'Black-Scholes & Local/Heston Volatility Surface Calibrator',
          tier: 'Required',
          scope: 'Compute implied vol surfaces from option chains, Greeks sensitivities, and Monte Carlo exotic payoff pricer.',
          stack: 'Python, NumPy/SciPy, QuantLib',
          resumeBullet: 'Engineered Heston stochastic volatility calibrator and Sobol Monte Carlo pricer for barrier options.',
        },
      ],
      scalable: [
        {
          title: 'Walk-Forward Statistical Arbitrage & Deflated Sharpe Backtester',
          tier: 'Scalable Capstone',
          scope: 'Event-driven backtester incorporating realistic bid-ask spread, slippage, borrow costs, and DSR overfitting penalties.',
          stack: 'Python, Polars, Cython/Rust bindings',
          resumeBullet: 'Developed event-driven stat-arb research engine with Almgren-Chriss slippage modeling and Deflated Sharpe validation.',
        },
        {
          title: 'Real-Time Risk Engine (VaR / CVaR / Stress Testing)',
          tier: 'Scalable Capstone',
          scope: 'Stream synthetic positions and compute intraday parametric/historical VaR, factor beta exposure, and Greek limits.',
          stack: 'C++/Python, Redis Streams, FastAPI',
          resumeBullet: 'Architected streaming portfolio risk monitor calculating intraday CVaR and factor exposures across 10k instruments.',
        },
      ],
    },
    certifications: [
      { name: 'MIT 18.S096 Mathematical Finance (OpenCourseWare)', issuer: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/', costNote: '100% Free Courseware', focus: 'Stochastic processes, linear algebra, and quantitative finance' },
      { name: 'QuantConnect Algorithmic Trading Boot Camp', issuer: 'QuantConnect', url: 'https://www.quantconnect.com/learning', costNote: '100% Free', focus: 'Systematic factor strategies, options, and LEAN backtesting' },
      { name: 'Financial Engineering & Risk Management (Free Audit)', issuer: 'Columbia University via Coursera', url: 'https://www.coursera.org/learn/financial-engineering-1', costNote: 'Free Audit', focus: 'Derivatives pricing, binomial models, and portfolio optimization' },
    ],
    flashcards: [
      { id: 'qnt-fc1', topicId: 'qnt-t1', topicTitle: 'Ito’s Lemma', question: 'Why does Ito’s Lemma include a second-derivative (0.5 * sigma^2 * d^2f/dS^2) term unlike ordinary calculus?', answer: 'Brownian motion has non-zero quadratic variation ((dW)^2 = dt), so second-order Taylor terms do not vanish as dt -> 0.', difficulty: 'Deep Dive' },
      { id: 'qnt-fc2', topicId: 'qnt-t3', topicTitle: 'Backtest Overfitting', question: 'Why is a raw Sharpe Ratio of 3.0 meaningless without knowing how many parameter trials were tested?', answer: 'Multiple testing inflates the expected maximum Sharpe by pure luck; the Deflated Sharpe Ratio adjusts for trial count and non-normal skewness/kurtosis.', difficulty: 'Applied' },
      { id: 'qnt-fc3', topicId: 'qnt-t4', topicTitle: 'Limit Order Book', question: 'What is adverse selection for a market maker posting passive limit orders?', answer: 'Informed flow hits stale quotes right before price moves against the maker, while uninformed flow misses or trades symmetrically.', difficulty: 'Applied' },
      { id: 'qnt-fc4', topicId: 'qnt-t5', topicTitle: 'Markowitz Instability', question: 'Why does classic mean-variance optimization often produce extreme, unstable weights out of sample?', answer: 'Inverting a noisy sample covariance matrix amplifies tiny estimation errors in expected returns and small eigenvalues.', difficulty: 'Core' },
      { id: 'qnt-fc5', topicId: 'qnt-t2', topicTitle: 'Variance Reduction', question: 'How do antithetic variates reduce Monte Carlo pricing variance?', answer: 'Pairing each random path Z with -Z creates negative correlation across pairs without bias, shrinking estimator standard error.', difficulty: 'Applied' },
      { id: 'qnt-fc6', topicId: 'qnt-t3', topicTitle: 'Cointegration vs Correlation', question: 'Why can two correlated assets diverge permanently while cointegrated assets support pairs trading?', answer: 'Correlation measures short-term co-movement of returns; cointegration guarantees a stationary mean-reverting linear spread over time.', difficulty: 'Core' },
      { id: 'qnt-fc7', topicId: 'qnt-t5', topicTitle: 'Kelly Criterion', question: 'Why do practitioners use Half-Kelly or Fractional Kelly instead of Full Kelly?', answer: 'Full Kelly maximizes asymptotic log-wealth only with exact edge estimates; parameter uncertainty causes huge drawdowns under Full Kelly.', difficulty: 'Applied' },
      { id: 'qnt-fc8', topicId: 'qnt-t1', topicTitle: 'Put-Call Parity', question: 'What does European Put-Call Parity relate?', answer: 'C - P = S - K * exp(-rT) (absent dividends), ensuring arbitrage-free consistency between call, put, stock, and zero-coupon bond.', difficulty: 'Core' },
    ],
  },
  {
    id: 'fintech',
    title: 'FinTech',
    aliases: ['Fintech', 'Payments', 'Ledgers', 'Open Banking'],
    domain: 'quant-finance',
    summary:
      'Double-entry immutable ledgers, payment rails (ACH, FedNow, SEPA, UPI, cards), PCI-DSS compliance, KYC/AML fraud checks, and idempotent settlement.',
    estimatedDays: 10,
    tier: 3,
    prerequisites: ['sql', 'web-apis', 'system-design'],
    unlocks: ['quant', 'venture-capital'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'fin-d1',
        dayRange: 'Day 1 – 3',
        title: 'Double-Entry Ledger Architecture',
        objective: 'Build race-condition-free ACID financial ledgers with zero floating-point error.',
        topics: [
          {
            id: 'fin-t1',
            title: 'Immutable Double-Entry Ledgers, Integer Minor Units & Idempotency',
            summary: 'Every debit equals a credit; use integer cents/basis points and serializable locks.',
            resources: [
              { title: 'TigerBeetle Financial Accounting Docs', provider: 'TigerBeetle', url: 'https://docs.tigerbeetle.com/', kind: 'Docs' },
              { title: 'Stripe Engineering: Designing Robust Idempotent APIs', provider: 'Stripe Blog', url: 'https://stripe.com/blog/idempotency', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fin-d2',
        dayRange: 'Day 4 – 6',
        title: 'Global Payment Rails & Clearing',
        objective: 'Understand card authorization vs capture, ACH settlement, ISO 20022, and real-time rails.',
        topics: [
          {
            id: 'fin-t2',
            title: 'Card Networks (Auth/Clearing/Settlement), ACH, RTP & ISO 20022',
            summary: 'Pending holds vs posted balances, chargebacks, and T+1/T+0 settlement windows.',
            resources: [
              { title: 'Stripe Payments Guide', provider: 'Stripe Docs', url: 'https://docs.stripe.com/payments', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'fin-d3',
        dayRange: 'Day 7 – 8',
        title: 'KYC/AML, Sanctions & Fraud Scoring',
        objective: 'Design compliance screening, velocity checks, and chargeback mitigation.',
        topics: [
          {
            id: 'fin-t3',
            title: 'KYC/KYB, AML Transaction Monitoring & PCI-DSS Tokenization',
            summary: 'Isolate raw PAN data in vaults and trigger velocity/graph fraud rules.',
            resources: [
              { title: 'PCI Security Standards Overview', provider: 'PCI SSC', url: 'https://www.pcisecuritystandards.org/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'fin-d4',
        dayRange: 'Day 9 – 10',
        title: 'Reconciliation & Open Banking APIs',
        objective: 'Automate three-way settlement reconciliation and webhook verification.',
        topics: [
          {
            id: 'fin-t4',
            title: 'Automated Three-Way Reconciliation & Webhook HMAC Security',
            summary: 'Detect penny drifts between internal ledger, PSP webhooks, and bank statements.',
            resources: [
              { title: 'Modern Treasury Journal: Ledger Architecture', provider: 'Modern Treasury', url: 'https://www.moderntreasury.com/journal', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Bitcoin: A Peer-to-Peer Electronic Cash System (Distributed Ledger Mechanics)',
        authors: 'Satoshi Nakamoto',
        year: 2008,
        venue: 'Whitepaper',
        url: 'https://bitcoin.org/bitcoin.pdf',
        takeaway: 'Solved double-spending without a central clearinghouse via cryptographic proof chains.',
      },
      {
        title: 'FinTech and Financial Inclusion: The Economics of Digital Payments',
        authors: 'Thorsten Beck, Asli Demirgüç-Kunt et al.',
        year: 2020,
        venue: 'World Bank / BIS Working Papers',
        url: 'https://www.bis.org/publ/work835.htm',
        takeaway: 'Empirical analysis of fast payment systems reducing transaction friction and credit gaps.',
      },
      {
        title: 'Central Bank Digital Currencies: Foundational Principles and Core Features',
        authors: 'Bank for International Settlements (BIS)',
        year: 2020,
        venue: 'BIS Report',
        url: 'https://www.bis.org/publ/othp33.htm',
        takeaway: 'Analyzes settlement finality, offline resilience, and privacy-compliance balance.',
      },
    ],
    projects: {
      required: [
        {
          title: 'ACID Double-Entry Wallet & Ledger Engine',
          tier: 'Required',
          scope: 'PostgreSQL serializable transactions, integer minor-unit math, idempotency keys, and balance invariant checks.',
          stack: 'TypeScript/Go, PostgreSQL, Redis',
          resumeBullet: 'Built ACID double-entry ledger engine enforcing zero-drift balance invariants under concurrent transfer stress tests.',
        },
        {
          title: 'Three-Way Bank Statement Reconciliation Worker',
          tier: 'Required',
          scope: 'Ingest simulated ISO 20022 / CSV bank feeds and auto-match against ledger postings with discrepancy alerts.',
          stack: 'Python, SQL, FastAPI',
          resumeBullet: 'Automated three-way settlement reconciliation flagging missing or duplicated PSP payouts within seconds.',
        },
      ],
      scalable: [
        {
          title: 'Idempotent Payment Orchestrator with Velocity Fraud Engine',
          tier: 'Scalable Capstone',
          scope: 'Multi-PSP routing with circuit breakers, HMAC webhook verification, and sliding-window Redis fraud scoring.',
          stack: 'Node/Go, Postgres, Redis, OpenTelemetry',
          resumeBullet: 'Architected fault-tolerant payment router with idempotent retries and sub-10ms Redis velocity fraud checks.',
        },
      ],
    },
    certifications: [
      { name: 'FinTech Security and Regulation (Free Audit)', issuer: 'HKUST via Coursera', url: 'https://www.coursera.org/learn/fintech-security-and-regulation', costNote: 'Free Audit', focus: 'Open banking, RegTech, and payment compliance' },
      { name: 'Wharton FinTech Foundations & Applications (Free Audit)', issuer: 'Wharton / Coursera', url: 'https://www.coursera.org/specializations/wharton-fintech', costNote: 'Free Audit', focus: 'Digital payments, lending marketplaces, and insurtech' },
      { name: 'CFTE Open FinTech Courses & Resources', issuer: 'CFTE', url: 'https://courses.cfte.education/', costNote: 'Free Introductory Tracks', focus: 'Payment ecosystems and API banking' },
    ],
    flashcards: [
      { id: 'fin-fc1', topicId: 'fin-t1', topicTitle: 'Integer Minor Units', question: 'Why must financial ledgers NEVER store money in IEEE 754 float/double columns?', answer: 'Binary floats cannot represent 0.1 or 0.2 exactly (0.1 + 0.2 !== 0.3), causing rounding leaks; store integer minor units (cents) or fixed NUMERIC.', difficulty: 'Core' },
      { id: 'fin-fc2', topicId: 'fin-t1', topicTitle: 'Idempotency Keys', question: 'What happens if a mobile client retries a POST /transfer request after a network timeout without an idempotency key?', answer: 'The user risks being double-charged; an idempotency key guarantees the server executes once and replays the stored response.', difficulty: 'Core' },
      { id: 'fin-fc3', topicId: 'fin-t2', topicTitle: 'Authorization vs Settlement', question: 'Why is an authorized card transaction not immediately final cash in the merchant bank account?', answer: 'Authorization only reserves funds; clearing and net settlement happen later in batch cycles and remain subject to reversals/chargebacks.', difficulty: 'Applied' },
      { id: 'fin-fc4', topicId: 'fin-t1', topicTitle: 'Double-Entry Accounting', question: 'Why never overwrite a user balance column directly without an append-only ledger journal?', answer: 'Mutable balance updates destroy auditability and make reconciliation or dispute forensics impossible.', difficulty: 'Core' },
      { id: 'fin-fc5', topicId: 'fin-t3', topicTitle: 'PCI-DSS Scope', question: 'How do hosted payment fields / tokenization reduce PCI-DSS compliance burden?', answer: 'Raw card numbers never touch your backend servers; your frontend receives an opaque single-use token directly from the vault.', difficulty: 'Applied' },
      { id: 'fin-fc6', topicId: 'fin-t4', topicTitle: 'Webhook Security', question: 'How do you verify a payment webhook truly came from Stripe/Adyen and was not replayed?', answer: 'Verify the HMAC-SHA256 signature header with the webhook secret using constant-time comparison and enforce timestamp tolerance.', difficulty: 'Applied' },
      { id: 'fin-fc7', topicId: 'fin-t2', topicTitle: 'ACH Returns', question: 'Why do fintech apps place a hold on freshly deposited ACH funds for 3-5 business days?', answer: 'ACH is pull-based and can return NSF (R01) or unauthorized days after initiation.', difficulty: 'Core' },
      { id: 'fin-fc8', topicId: 'fin-t1', topicTitle: 'Hot Account Contention', question: 'How do high-throughput ledgers avoid row-lock bottlenecks on a single platform fee account?', answer: 'Shard hot system accounts into N sub-accounts or batch asynchronous fee sweeps.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'investment-banking',
    title: 'Investment Banking',
    aliases: ['Investment Banking', 'IB', 'M&A', 'DCF', 'Valuation'],
    domain: 'quant-finance',
    summary:
      'Three-statement financial modeling, DCF & WACC valuation, trading/transaction comps, M&A accretion/dilution, and pitchbook structuring.',
    estimatedDays: 14,
    tier: 3,
    prerequisites: ['excel-back-office'],
    unlocks: ['private-equity', 'venture-capital', 'asset-management'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'ib-d1',
        dayRange: 'Day 1 – 4',
        title: 'Accounting & Three-Statement Linkage',
        objective: 'Link Income Statement, Balance Sheet, and Cash Flow dynamically with zero circular breaks.',
        topics: [
          {
            id: 'ib-t1',
            title: '3-Statement Modeling, Working Capital & Enterprise vs Equity Value',
            summary: 'Bridge EV to Equity Value (net debt, preferred stock, minority interest) cleanly.',
            resources: [
              { title: 'Aswath Damodaran Valuation Lectures (NYU Stern)', provider: 'NYU Stern', url: 'https://pages.stern.nyu.edu/~adamodar/', kind: 'Course' },
              { title: 'CFI Accounting & Financial Modeling Guides', provider: 'Corporate Finance Institute', url: 'https://corporatefinanceinstitute.com/resources/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'ib-d2',
        dayRange: 'Day 5 – 8',
        title: 'DCF, WACC & Comparable Valuation',
        objective: 'Build unlevered FCF projections, CAPM beta un/re-levering, and football-field charts.',
        topics: [
          {
            id: 'ib-t2',
            title: 'Unlevered Free Cash Flow, WACC & Terminal Value (Gordon vs Exit Multiple)',
            summary: 'Sensitivity tables over WACC and terminal growth rates.',
            resources: [
              { title: 'Damodaran DCF Datasets & Spreadsheets', provider: 'NYU Stern', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/spreadsh.htm', kind: 'Lab' },
            ],
          },
          {
            id: 'ib-t3',
            title: 'Public Trading Comps & Precedent M&A Transactions',
            summary: 'Normalize EBITDA for one-time items, SBC, and calendarization.',
            resources: [
              { title: 'SEC EDGAR 10-K / S-4 Filing Explorer', provider: 'SEC EDGAR', url: 'https://www.sec.gov/edgar/searchedgar/companysearch', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ib-d3',
        dayRange: 'Day 9 – 11',
        title: 'M&A Accretion / Dilution & Deal Mechanics',
        objective: 'Model cash vs stock vs debt acquisition structures and breakeven synergies.',
        topics: [
          {
            id: 'ib-t4',
            title: 'Merger Model, Goodwill Creation, PPA & EPS Accretion/Dilution',
            summary: 'Analyze buyer vs seller P/E dynamics and pro-forma leverage.',
            resources: [
              { title: 'Forage Investment Banking Virtual Experience', provider: 'Forage', url: 'https://www.theforage.com/', kind: 'Lab' },
            ],
          },
        ],
      },
      {
        id: 'ib-d4',
        dayRange: 'Day 12 – 14',
        title: 'Debt Capital Markets & Pitchbook Storytelling',
        objective: 'Present crisp executive transaction theses and buyer lists.',
        topics: [
          {
            id: 'ib-t5',
            title: 'CIMs, Buyer Universe Screening & Football Field Valuation',
            summary: 'Synthesize valuation ranges and strategic rationale into board-ready slides.',
            resources: [
              { title: 'Khan Academy Finance & Capital Markets', provider: 'Khan Academy', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Cost of Capital, Corporation Finance and the Theory of Investment',
        authors: 'Franco Modigliani, Merton H. Miller',
        year: 1958,
        venue: 'American Economic Review',
        url: 'https://www.jstor.org/stable/1809766',
        takeaway: 'Foundational theorem explaining capital structure irrelevance absent taxes and distress costs.',
      },
      {
        title: 'Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk',
        authors: 'William F. Sharpe',
        year: 1964,
        venue: 'Journal of Finance',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1964.tb02865.x',
        takeaway: 'Introduced CAPM beta used to compute cost of equity inside WACC.',
      },
      {
        title: 'Agency Costs of Free Cash Flow, Corporate Finance, and Takeovers',
        authors: 'Michael C. Jensen',
        year: 1986,
        venue: 'American Economic Review',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=99580',
        takeaway: 'Explains the disciplining role of debt in M&A and corporate capital allocation.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Public Company 3-Statement + DCF + Comps Valuation Model',
          tier: 'Required',
          scope: 'Pull real 10-K filings from SEC EDGAR, project 5-year unlevered FCF, compute WACC, and plot football-field summary.',
          stack: 'Excel/Sheets, SEC EDGAR 10-K',
          resumeBullet: 'Built fully linked 3-statement and DCF valuation model from SEC 10-K filings with WACC sensitivity matrices.',
        },
        {
          title: 'Strategic M&A Accretion / Dilution Case Memo',
          tier: 'Required',
          scope: 'Model a mock acquisition comparing 100% cash, 100% stock, and 50/50 mixes with synergy breakeven analysis.',
          stack: 'Excel, Financial Modeling',
          resumeBullet: 'Constructed M&A accretion/dilution model quantifying goodwill, PPA amortization, and pro-forma EPS sensitivity.',
        },
      ],
      scalable: [
        {
          title: 'Automated SEC EDGAR Comps & Valuation Screener',
          tier: 'Scalable Capstone',
          scope: 'Ingest XBRL 10-K/10-Q API data to auto-populate EV/EBITDA, EV/Revenue, and ROIC peer comps.',
          stack: 'Python, SEC EDGAR API, Excel/OpenPyXL',
          resumeBullet: 'Automated peer trading comps pipeline parsing SEC XBRL filings into live Excel valuation templates.',
        },
      ],
    },
    certifications: [
      { name: 'NYU Stern Valuation & Corporate Finance (Open Online)', issuer: 'Prof. Aswath Damodaran / NYU', url: 'https://pages.stern.nyu.edu/~adamodar/', costNote: '100% Free Lectures & Models', focus: 'Intrinsic DCF, relative valuation, and narrative & numbers' },
      { name: 'Investment Banking Virtual Job Simulation', issuer: 'Forage (JPMorgan / Citi / Bank of America)', url: 'https://www.theforage.com/', costNote: '100% Free Certificate', focus: 'M&A screening, DCF, and client pitch decks' },
      { name: 'Accounting & Financial Statement Analysis Basics', issuer: 'CFI Free Courses', url: 'https://corporatefinanceinstitute.com/courses/', costNote: 'Free Tier Courses', focus: '3-statement linkages and financial ratios' },
    ],
    flashcards: [
      { id: 'ib-fc1', topicId: 'ib-t1', topicTitle: 'Enterprise Value', question: 'Why is cash subtracted when bridging from Equity Value to Enterprise Value?', answer: 'Acquiring 100% of equity lets the buyer use the target’s cash immediately to pay down debt or reduce net purchase cost.', difficulty: 'Core' },
      { id: 'ib-fc2', topicId: 'ib-t2', topicTitle: 'Unlevered FCF', question: 'Why does a standard DCF discount Unlevered Free Cash Flow by WACC rather than Cost of Equity?', answer: 'Unlevered FCF belongs to both debt and equity holders, so it must be discounted at the blended weighted average cost of capital (WACC).', difficulty: 'Core' },
      { id: 'ib-fc3', topicId: 'ib-t1', topicTitle: 'Accounting Linkages', question: 'Trace a $10 increase in Depreciation across all three financial statements (assuming 25% tax rate).', answer: 'IS: Pre-tax income -10, Net Income -7.50. CFS: NI -7.50 + D&A +10 = Cash +2.50. BS: Cash +2.50, PP&E -10 = Assets -7.50; Retained Earnings -7.50.', difficulty: 'Applied' },
      { id: 'ib-fc4', topicId: 'ib-t4', topicTitle: 'All-Stock M&A Rule', question: 'In an all-stock acquisition with zero synergies, when is the deal immediately EPS accretive?', answer: 'When the acquirer’s P/E multiple is higher than the target’s effective purchase P/E multiple.', difficulty: 'Applied' },
      { id: 'ib-fc5', topicId: 'ib-t2', topicTitle: 'Beta Unlevering', question: 'Why unlever peer equity betas before re-levering to the target’s capital structure?', answer: 'Observed equity beta reflects both business risk and financial leverage; unlevering isolates pure operating asset risk.', difficulty: 'Deep Dive' },
      { id: 'ib-fc6', topicId: 'ib-t3', topicTitle: 'Precedent vs Trading Comps', question: 'Why do precedent M&A multiples typically exceed public trading multiples?', answer: 'Acquirers pay a control premium plus expected revenue/cost synergies to buy an entire company.', difficulty: 'Core' },
      { id: 'ib-fc7', topicId: 'ib-t4', topicTitle: 'Goodwill Creation', question: 'How is Goodwill calculated in Purchase Price Allocation?', answer: 'Equity Purchase Price minus Target Book Value of Equity, minus asset write-ups (net of DTL).', difficulty: 'Applied' },
      { id: 'ib-fc8', topicId: 'ib-t5', topicTitle: 'DCF Terminal Value', question: 'What is a red flag when Terminal Value accounts for 90%+ of total DCF Enterprise Value?', answer: 'The explicit forecast period is too short or terminal growth/exit multiple assumptions dominate the model excessively.', difficulty: 'Core' },
    ],
  },
  {
    id: 'private-equity',
    title: 'Private Equity',
    aliases: ['Privte Equtity', 'LBO', 'Buyouts', 'Growth Equity'],
    domain: 'quant-finance',
    summary:
      'LBO modeling, debt tranches & covenants, IRR/MOIC value creation bridges, commercial due diligence, and portfolio operational levers.',
    estimatedDays: 12,
    tier: 4,
    prerequisites: ['investment-banking', 'excel-back-office'],
    unlocks: ['fund-management'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'pe-d1',
        dayRange: 'Day 1 – 3',
        title: 'LBO Mechanics & Debt Capital Structures',
        objective: 'Model sources & uses, revolver sweeps, term loans, and mezzanine PIK tranches.',
        topics: [
          {
            id: 'pe-t1',
            title: 'Paper LBOs, Debt Tranches, Cash Sweeps & Covenants',
            summary: 'Senior secured Term Loan A/B, high-yield bonds, maintenance vs incurrence covenants.',
            resources: [
              { title: 'CFI Leveraged Buyout (LBO) Guide', provider: 'CFI', url: 'https://corporatefinanceinstitute.com/resources/valuation/lbo-modeling/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'pe-d2',
        dayRange: 'Day 4 – 6',
        title: 'Returns Attribution & Value Creation Bridges',
        objective: 'Decompose MOIC/IRR into deleveraging, EBITDA growth, and multiple expansion.',
        topics: [
          {
            id: 'pe-t2',
            title: 'IRR, MOIC, Management Option Pools & Returns Attribution',
            summary: 'Sensitivity across entry/exit multiples, leverage turns, and holding period.',
            resources: [
              { title: 'Multiple Expansion vs Operational Growth Analysis', provider: 'Bain Global PE Insights', url: 'https://www.bain.com/insights/topics/global-private-equity-report/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'pe-d3',
        dayRange: 'Day 7 – 9',
        title: 'Commercial & Operational Due Diligence',
        objective: 'Evaluate unit economics, customer cohort retention, and roll-up synergies.',
        topics: [
          {
            id: 'pe-t3',
            title: 'Quality of Earnings (QoE), Cohort NRR & Roll-Up M&A',
            summary: 'Spot customer concentration, working-capital pegs, and recurring vs one-time revenue.',
            resources: [
              { title: 'Stanford GSB Search Fund & PE Primer', provider: 'Stanford GSB', url: 'https://www.gsb.stanford.edu/faculty-research/centers-initiatives/ces/research/search-funds', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'pe-d4',
        dayRange: 'Day 10 – 12',
        title: 'Investment Committee Memos',
        objective: 'Defend downside protection, covenant headroom, and exit pathways.',
        topics: [
          {
            id: 'pe-t4',
            title: 'IC Deal Thesis, Downside Case & Exit Optionality',
            summary: 'Write crisp bull/base/bear investment memos focused on capital preservation.',
            resources: [
              { title: 'Forage Private Equity Virtual Experience', provider: 'Forage', url: 'https://www.theforage.com/', kind: 'Lab' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Eclipse of the Public Corporation',
        authors: 'Michael C. Jensen',
        year: 1989,
        venue: 'Harvard Business Review',
        url: 'https://hbr.org/1989/09/eclipse-of-the-public-corporation',
        takeaway: 'Explained how concentrated governance and debt incentives drive operational efficiency in buyouts.',
      },
      {
        title: 'Private Equity Performance: Returns, Persistence, and Capital Flows',
        authors: 'Steven N. Kaplan, Antoinette Schoar',
        year: 2005,
        venue: 'Journal of Finance',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.2005.00780.x',
        takeaway: 'Foundational empirical study on PME benchmarking and GP persistence.',
      },
      {
        title: 'How Do Private Equity Firms Create Value?',
        authors: 'Steven N. Kaplan, Per Strömberg',
        year: 2009,
        venue: 'Journal of Economic Perspectives',
        url: 'https://www.aeaweb.org/articles?id=10.1257/jep.23.1.121',
        takeaway: 'Separates financial, governance, and operational engineering levers in LBOs.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Full Multi-Tranche LBO Model with Debt Sweep & IRR Grid',
          tier: 'Required',
          scope: 'Sources & Uses, Revolver + TLA + Subordinated PIK notes, interest coverage tests, and returns attribution.',
          stack: 'Excel/Sheets',
          resumeBullet: 'Built full multi-tranche LBO model with automated cash sweep, PIK interest, and entry/exit MOIC sensitivity tables.',
        },
        {
          title: '2-Page Investment Committee (IC) Buyout Case Memo',
          tier: 'Required',
          scope: 'Evaluate a public-to-private candidate including bull/base/bear downside debt service coverage analysis.',
          stack: 'Financial Modeling, Docs',
          resumeBullet: 'Authored IC buyout memo analyzing QoE adjustments, customer churn, and downside covenant headroom.',
        },
      ],
      scalable: [
        {
          title: 'Roll-Up Acquisition & Cohort QoE Analyzer',
          tier: 'Scalable Capstone',
          scope: 'Python/Excel pipeline computing customer NRR cohorts, add-on multiple arbitrage, and consolidated debt capacity.',
          stack: 'Python, Pandas, Excel',
          resumeBullet: 'Automated SaaS/services cohort retention and add-on multiple arbitrage engine for platform roll-up underwriting.',
        },
      ],
    },
    certifications: [
      { name: 'Private Equity & Venture Capital (Free Audit)', issuer: 'Bocconi University via Coursera', url: 'https://www.coursera.org/learn/private-equity', costNote: 'Free Audit', focus: 'Buyouts, valuation, and fund structures' },
      { name: 'Private Equity Virtual Experience Program', issuer: 'Forage', url: 'https://www.theforage.com/', costNote: '100% Free Certificate', focus: 'LBO screening and commercial due diligence' },
      { name: 'Bain & Co. Global Private Equity Insights', issuer: 'Bain & Company', url: 'https://www.bain.com/insights/topics/global-private-equity-report/', costNote: 'Free Annual Industry Benchmark', focus: 'Buyout multiples, dry powder, and value creation' },
    ],
    flashcards: [
      { id: 'pe-fc1', topicId: 'pe-t1', topicTitle: 'Ideal LBO Candidate', question: 'What 4 business traits define a strong LBO target?', answer: 'Predictable high-margin recurring cash flows, low CapEx needs, defensible market position, and tangible asset/collateral base.', difficulty: 'Core' },
      { id: 'pe-fc2', topicId: 'pe-t2', topicTitle: 'IRR vs MOIC', question: 'Why track both IRR and MOIC rather than IRR alone?', answer: 'A quick 6-month flip can generate a huge IRR with a tiny 1.3x MOIC, failing to return meaningful dollar multiples on fund capital.', difficulty: 'Core' },
      { id: 'pe-fc3', topicId: 'pe-t1', topicTitle: 'Paper LBO Rule', question: 'Roughly what IRR corresponds to doubling your money (2.0x MOIC) in 5 years vs 3 years?', answer: 'Rule of 72: 2.0x in 5 years ≈ 14.9% IRR; 2.0x in 3 years ≈ 26.0% IRR.', difficulty: 'Applied' },
      { id: 'pe-fc4', topicId: 'pe-t1', topicTitle: 'PIK Debt', question: 'Why do LBOs use Payment-In-Kind (PIK) notes in junior tranches?', answer: 'PIK capitalizes interest onto principal rather than draining cash, preserving operating liquidity during early debt paydown.', difficulty: 'Applied' },
      { id: 'pe-fc5', topicId: 'pe-t3', topicTitle: 'Net Working Capital Peg', question: 'Why negotiate a NWC peg at close in a buyout?', answer: 'Prevents the seller from starving inventory or accelerating receivables collection right before handover to artificially boost cash.', difficulty: 'Deep Dive' },
      { id: 'pe-fc6', topicId: 'pe-t2', topicTitle: 'Value Creation Bridge', question: 'What are the 3 mathematical drivers of equity return in an LBO?', answer: 'EBITDA growth, debt paydown (deleveraging), and exit-vs-entry multiple expansion.', difficulty: 'Core' },
      { id: 'pe-fc7', topicId: 'pe-t1', topicTitle: 'Maintenance vs Incurrence', question: 'Contrast maintenance covenants with incurrence covenants.', answer: 'Maintenance covenants are tested quarterly (e.g. Leverage < 5x); incurrence covenants trigger only when taking an action like issuing new debt.', difficulty: 'Deep Dive' },
      { id: 'pe-fc8', topicId: 'pe-t3', topicTitle: 'Quality of Earnings', question: 'What does a Quality of Earnings (QoE) audit uncover beyond GAAP financial statements?', answer: 'Aggressive revenue recognition, non-recurring pandemic/one-off spikes, and hidden add-back adjustments to true sustainable EBITDA.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'venture-capital',
    title: 'Venture Capital',
    aliases: ['Venture Capital', 'VC', 'Startups', 'Term Sheets'],
    domain: 'quant-finance',
    summary:
      'Power-law venture economics, SaaS/marketplace unit economics, cap tables & dilution math, SAFE/priced term sheets, and market-map theses.',
    estimatedDays: 10,
    tier: 3,
    prerequisites: ['investment-banking', 'product-thinking'],
    unlocks: ['fund-management', 'freelance-business'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'vc-d1',
        dayRange: 'Day 1 – 3',
        title: 'Power-Law Economics & Fund Math',
        objective: 'Understand 2/20 fees, TVPI/DPI, reserve ratios, and portfolio construction.',
        topics: [
          {
            id: 'vc-t1',
            title: 'Power Law Returns, TVPI/DPI & Follow-On Reserves',
            summary: 'Why one 50x outlier defines fund returns and how GP carry waterfalls operate.',
            resources: [
              { title: 'YC Startup Library: Investor & Fundraising Guides', provider: 'Y Combinator', url: 'https://www.ycombinator.com/library', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'vc-d2',
        dayRange: 'Day 4 – 6',
        title: 'Cap Tables, SAFEs & Term Sheets',
        objective: 'Model post-money SAFEs, option pool shuffles, and liquidation preferences.',
        topics: [
          {
            id: 'vc-t2',
            title: 'Post-Money SAFEs, Pro-Rata Rights & Liquidation Preferences',
            summary: '1x non-participating vs participating preferred, anti-dilution ratchets, and vesting.',
            resources: [
              { title: 'Y Combinator SAFE User Guide', provider: 'Y Combinator', url: 'https://www.ycombinator.com/documents', kind: 'Docs' },
              { title: 'NVCA Model Legal Documents', provider: 'NVCA', url: 'https://nvca.org/model-legal-documents/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'vc-d3',
        dayRange: 'Day 7 – 8',
        title: 'Startup Metrics & Sector Diligence',
        objective: 'Evaluate LTV/CAC, Magic Number, Burn Multiple, and Net Dollar Retention.',
        topics: [
          {
            id: 'vc-t3',
            title: 'SaaS, Marketplace & AI Infrastructure Unit Economics',
            summary: 'Gross margin reality checks for AI startups, payback periods, and cohort retention.',
            resources: [
              { title: 'a16z 16 Startup Metrics Guide', provider: 'Andreessen Horowitz', url: 'https://a16z.com/16-startup-metrics/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'vc-d4',
        dayRange: 'Day 9 – 10',
        title: 'Sourcing, Market Mapping & Investment Memos',
        objective: 'Author contrarian thesis memos modeled on Bessemer’s public IC memos.',
        topics: [
          {
            id: 'vc-t4',
            title: 'Why Now? Market Maps & Bessemer-Style Deal Memos',
            summary: 'Bottoms-up TAM sizing, moat analysis, and founder-market fit evaluation.',
            resources: [
              { title: 'Bessemer Venture Partners Investment Memos Archive', provider: 'BVP', url: 'https://www.bvp.com/memos', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'How Do Venture Capitalists Make Decisions?',
        authors: 'Paul A. Gompers, Will Gornall, Steven N. Kaplan, Ilya A. Strebulaev',
        year: 2020,
        venue: 'Journal of Financial Economics / NBER',
        url: 'https://www.nber.org/papers/w22587',
        takeaway: 'Surveys 885 VCs showing team quality outweighs business model and how VCs manage deal flow.',
      },
      {
        title: 'Squaring Venture Capital Valuations with Reality',
        authors: 'Will Gornall, Ilya A. Strebulaev',
        year: 2020,
        venue: 'Journal of Financial Economics',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2955455',
        takeaway: 'Shows headline post-money valuations overstate fair value when seniority and liquidation preferences exist.',
      },
      {
        title: 'What Do Early Stage Investors Value? (AngelList / Seed Field Study)',
        authors: 'Shai Bernstein, Arthur Korteweg, Kevin Laws',
        year: 2017,
        venue: 'Journal of Finance',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/jofi.12470',
        takeaway: 'Randomized experiment proving founding team credentials dominate angel investment decisions.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Multi-Round Cap Table & SAFE Conversion Waterfall Model',
          tier: 'Required',
          scope: 'Model Pre-Seed post-money SAFE, Seed priced round with option pool refresh, Series A, and exit payout waterfall.',
          stack: 'Excel/Sheets',
          resumeBullet: 'Built multi-round VC cap table and liquidation preference waterfall modeling post-money SAFE dilution.',
        },
        {
          title: 'Bessemer-Style Contrarian Deal Memo & Market Map',
          tier: 'Required',
          scope: 'Bottoms-up TAM, competitor matrix, unit economics breakdown, and key diligence risks on an emerging startup.',
          stack: 'Research, Modeling, Docs',
          resumeBullet: 'Published Bessemer-format VC deal memo with bottoms-up TAM sizing and cohort unit economics diligence.',
        },
      ],
      scalable: [
        {
          title: 'VC Fund Portfolio Simulator (Monte Carlo Power-Law Engine)',
          tier: 'Scalable Capstone',
          scope: 'Simulate 10,000 30-company seed funds under power-law exit distributions, follow-on reserves, and 2/20 fee drag.',
          stack: 'Python, NumPy, Matplotlib',
          resumeBullet: 'Built Monte Carlo VC fund simulator quantifying DPI/TVPI sensitivity to follow-on reserve ratios.',
        },
      ],
    },
    certifications: [
      { name: 'Y Combinator Startup School', issuer: 'Y Combinator', url: 'https://www.startupschool.org/', costNote: '100% Free', focus: 'Product-market fit, metrics, fundraising, and growth' },
      { name: 'Venture Capital University / NVCA Open Resources', issuer: 'NVCA', url: 'https://nvca.org/model-legal-documents/', costNote: 'Free Legal & Industry Resources', focus: 'Term sheets, SAFEs, and governance mechanics' },
      { name: 'Entrepreneurial Finance & VC (Free Audit)', issuer: 'Duke / Bocconi via Coursera', url: 'https://www.coursera.org/learn/private-equity', costNote: 'Free Audit', focus: 'Startup valuation and VC fund math' },
    ],
    flashcards: [
      { id: 'vc-fc1', topicId: 'vc-t2', topicTitle: 'Post-Money SAFE', question: 'Why do founders get surprised when stacking multiple post-money SAFEs?', answer: 'Each post-money SAFE locks in its investor ownership percentage against total post-SAFE shares, so all SAFE dilution falls purely on founders before Series A.', difficulty: 'Applied' },
      { id: 'vc-fc2', topicId: 'vc-t2', topicTitle: 'Liquidation Preference', question: 'Contrast 1x non-participating preferred vs 1x participating preferred on a modest $30M exit where VC invested $10M for 25%.', answer: 'Non-participating takes max($10M, 25%*$30M=$7.5M) = $10M; participating takes $10M first PLUS 25% of the remaining $20M = $15M.', difficulty: 'Deep Dive' },
      { id: 'vc-fc3', topicId: 'vc-t3', topicTitle: 'Burn Multiple', question: 'How is Burn Multiple defined and why is it critical in tighter capital markets?', answer: 'Net Burn / Net New ARR; measures capital efficiency—under 1.5x is healthy, while >3x signals unsustainable growth spend.', difficulty: 'Core' },
      { id: 'vc-fc4', topicId: 'vc-t1', topicTitle: 'DPI vs TVPI', question: 'Why do LPs prioritize DPI over high paper TVPI in mature funds?', answer: 'TVPI includes unrealized paper markups; DPI (Distributed to Paid-In) measures actual cash returned to LPs.', difficulty: 'Core' },
      { id: 'vc-fc5', topicId: 'vc-t3', topicTitle: 'Net Dollar Retention', question: 'Why can a SaaS startup with 125% NRR still grow even with zero new customer acquisition?', answer: 'Expansion revenue (upsells/seats) from existing cohorts outweighs logo churn and contraction by 25% annually.', difficulty: 'Core' },
      { id: 'vc-fc6', topicId: 'vc-t2', topicTitle: 'Option Pool Shuffle', question: 'Who absorbs the dilution when a VC requires a 15% unallocated option pool pre-money?', answer: 'Existing founders/shareholders absorb 100% of the option pool expansion prior to the new investor’s priced shares.', difficulty: 'Applied' },
      { id: 'vc-fc7', topicId: 'vc-t4', topicTitle: 'Bottoms-Up TAM', question: 'Why is top-down "1% of a $100B market" rejected by seasoned VCs?', answer: 'Bottoms-up TAM (# target buyers * realistic ACV) proves concrete pricing power and customer segmentation.', difficulty: 'Core' },
      { id: 'vc-fc8', topicId: 'vc-t1', topicTitle: 'Pro-Rata Rights', question: 'Why do early seed VCs value pro-rata rights so highly?', answer: 'It guarantees their right to double down in breakout winners at Series A/B, concentrating capital in the power-law tail.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'fund-management',
    title: 'Fund Management',
    aliases: ['fund management', 'Hedge Funds', 'LP/GP', 'Portfolio Construction'],
    domain: 'quant-finance',
    summary:
      'Fund structures (GP/LP, hedge fund vs closed-end), fee & high-water-mark mechanics, risk budgeting, drawdown limits, and liquidity management.',
    estimatedDays: 10,
    tier: 4,
    prerequisites: ['quant', 'private-equity'],
    unlocks: ['asset-management'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'fm-d1',
        dayRange: 'Day 1 – 3',
        title: 'Fund Structures, Waterfalls & Fee Accounting',
        objective: 'Model management fees, high-water marks, hurdle rates, and GP catch-up waterfalls.',
        topics: [
          {
            id: 'fm-t1',
            title: 'Master-Feeder, Closed-End Waterfalls & High-Water Marks',
            summary: 'Deal-by-deal vs whole-fund European waterfalls, clawbacks, and crystallization.',
            resources: [
              { title: 'CFA Institute Fund Performance & Fee Concepts', provider: 'CFA Institute', url: 'https://www.cfainstitute.org/en/research', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fm-d2',
        dayRange: 'Day 4 – 6',
        title: 'Multi-PM Pods, Risk Budgeting & Gross/Net Exposure',
        objective: 'Manage leverage, factor neutrality, and drawdown stop-outs across sleeves.',
        topics: [
          {
            id: 'fm-t2',
            title: 'Gross vs Net Exposure, Factor Neutralization & Drawdown Controls',
            summary: 'Decompose alpha vs beta/style factors and enforce pod volatility budgets.',
            resources: [
              { title: 'AQR Research Library', provider: 'AQR Capital', url: 'https://www.aqr.com/Insights/Research', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'fm-d3',
        dayRange: 'Day 7 – 8',
        title: 'Liquidity Mismatch, Redemptions & Cash Drag',
        objective: 'Prevent forced fire-sales via redemption gates, lockups, and liquidity buckets.',
        topics: [
          {
            id: 'fm-t3',
            title: 'Asset-Liability Liquidity Matching & Redemption Gates',
            summary: 'Stress-test days-to-liquidate under 3x volume spikes.',
            resources: [
              { title: 'IOSCO Liquidity Risk Management Principles', provider: 'IOSCO', url: 'https://www.iosco.org/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'fm-d4',
        dayRange: 'Day 9 – 10',
        title: 'LP Reporting & Performance Attribution',
        objective: 'Compute Brinson-Fachler attribution, TWR vs IRR, and quarterly LP letters.',
        topics: [
          {
            id: 'fm-t4',
            title: 'Time-Weighted Return (TWR) vs Money-Weighted (MWR) & Brinson Attribution',
            summary: 'Separate allocation effect from security selection effect in LP reports.',
            resources: [
              { title: 'GIPS Standards Overview', provider: 'CFA Institute GIPS', url: 'https://www.gipsstandards.org/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'A Quantitative Approach to Tactical Asset Allocation',
        authors: 'Mebane T. Faber',
        year: 2007,
        venue: 'Journal of Wealth Management',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=962461',
        takeaway: 'Shows simple trend-following risk overlays sharply cut fund maximum drawdowns.',
      },
      {
        title: 'Buffett’s Alpha',
        authors: 'Andrea Frazzini, David Kabiller, Lasse Heje Pedersen',
        year: 2018,
        venue: 'Financial Analysts Journal / NBER',
        url: 'https://www.nber.org/papers/w19681',
        takeaway: 'Decomposes Berkshire returns into cheap float leverage plus quality-minus-junk and low-beta factors.',
      },
      {
        title: 'High-Water Marks and Hedge Fund Management Contracts',
        authors: 'William N. Goetzmann, Jonathan E. Ingersoll Jr., Stephen A. Ross',
        year: 2003,
        venue: 'Journal of Finance',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/1540-6261.00580',
        takeaway: 'Models incentive fees with high-water marks as call options and analyzes risk-shifting behavior.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Hedge Fund High-Water Mark & Waterfall Fee Engine',
          tier: 'Required',
          scope: 'Calculate monthly NAV, management fee accrual, HWM carryforward, and European hurdle catch-up waterfall.',
          stack: 'Python/Excel',
          resumeBullet: 'Built automated fund administration model computing monthly NAV, hurdle rates, and high-water-mark incentive fees.',
        },
        {
          title: 'Brinson-Fachler Performance Attribution Dashboard',
          tier: 'Required',
          scope: 'Decompose portfolio alpha vs benchmark into sector allocation, selection, and interaction effects.',
          stack: 'Python, Pandas, Plotly',
          resumeBullet: 'Implemented Brinson-Fachler performance attribution separating sector allocation from stock-selection alpha.',
        },
      ],
      scalable: [
        {
          title: 'Multi-Strategy Risk Budget & Liquidity Stress Simulator',
          tier: 'Scalable Capstone',
          scope: 'Simulate correlated market shocks, days-to-liquidate thresholds, and margin call spirals across pod sleeves.',
          stack: 'Python, NumPy, FastAPI',
          resumeBullet: 'Engineered multi-sleeve fund risk allocator enforcing volatility parity and redemption liquidity stress buffers.',
        },
      ],
    },
    certifications: [
      { name: 'Investment Management Specialization (Free Audit)', issuer: 'University of Geneva via Coursera', url: 'https://www.coursera.org/specializations/investment-management', costNote: 'Free Audit', focus: 'Portfolio risk, behavioral finance, and asset allocation' },
      { name: 'AQR Capital Factor Investing & Fund Research Library', issuer: 'AQR', url: 'https://www.aqr.com/Insights/Research', costNote: '100% Free Research', focus: 'Factor portfolios, risk parity, and drawdown control' },
      { name: 'CFA Institute GIPS & Investment Foundations Resources', issuer: 'CFA Institute', url: 'https://www.cfainstitute.org/en/programs/investment-foundations', costNote: 'Free Curriculum Readings', focus: 'Fund governance, ethics, and attribution' },
    ],
    flashcards: [
      { id: 'fm-fc1', topicId: 'fm-t1', topicTitle: 'High-Water Mark', question: 'How does a High-Water Mark protect LPs from paying double performance fees?', answer: 'The GP earns incentive fees only on net gains above the fund’s historical peak NAV—losses must be fully recovered first.', difficulty: 'Core' },
      { id: 'fm-fc2', topicId: 'fm-t2', topicTitle: 'Gross vs Net Exposure', question: 'If a long/short equity fund holds $120M long and $80M short on $100M NAV, what are its Gross and Net Exposures?', answer: 'Gross Exposure = (120 + 80)/100 = 200%; Net Exposure = (120 - 80)/100 = +40% net long.', difficulty: 'Core' },
      { id: 'fm-fc3', topicId: 'fm-t4', topicTitle: 'TWR vs MWR (IRR)', question: 'Why evaluate a mutual/hedge fund manager using Time-Weighted Return (TWR) rather than MWR?', answer: 'TWR strips out the timing of investor deposits and withdrawals, which the portfolio manager does not control.', difficulty: 'Applied' },
      { id: 'fm-fc4', topicId: 'fm-t3', topicTitle: 'Liquidity Mismatch', question: 'What structural flaw causes open-end funds holding illiquid assets to collapse during crises?', answer: 'Offering daily redemptions backed by illiquid assets creates a first-mover advantage where early redeemers get cash and remaining LPs hold illiquid fire-sale losses.', difficulty: 'Applied' },
      { id: 'fm-fc5', topicId: 'fm-t1', topicTitle: 'European vs American Waterfall', question: 'Why do LPs prefer whole-fund (European) waterfalls over deal-by-deal (American) waterfalls?', answer: 'In European waterfalls, the GP receives carry only after 100% of contributed capital plus hurdle rate is returned across the entire fund.', difficulty: 'Deep Dive' },
      { id: 'fm-fc6', topicId: 'fm-t2', topicTitle: 'De-grossing Spirals', question: 'What triggers forced de-grossing in multi-manager pod shops?', answer: 'Strict drawdown limits force pods to liquidate crowded positions simultaneously, amplifying factor momentum crashes.', difficulty: 'Deep Dive' },
      { id: 'fm-fc7', topicId: 'fm-t4', topicTitle: 'Brinson Attribution', question: 'What does a positive Allocation Effect mean in Brinson attribution?', answer: 'The manager overweighted sectors/asset classes that outperformed the overall benchmark return.', difficulty: 'Core' },
      { id: 'fm-fc8', topicId: 'fm-t1', topicTitle: 'GP Clawback', question: 'What is a GP clawback provision?', answer: 'A legal obligation requiring the GP to return excess carry collected early if later losing deals drop overall fund return below the agreed split.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'asset-management',
    title: 'Asset Management',
    aliases: ['Asset management', 'Wealth & Institutional Portfolios', 'ESG & Fixed Income'],
    domain: 'quant-finance',
    summary:
      'Strategic asset allocation, multi-asset portfolio construction (equities, fixed income, alts), duration/convexity hedging, tax-loss harvesting, and IPS design.',
    estimatedDays: 10,
    tier: 3,
    prerequisites: ['investment-banking', 'excel-back-office'],
    unlocks: ['fund-management'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'am-d1',
        dayRange: 'Day 1 – 3',
        title: 'Investment Policy Statements & Strategic Allocation',
        objective: 'Translate client liabilities, horizon, and tax constraints into target weights.',
        topics: [
          {
            id: 'am-t1',
            title: 'IPS Constraints (RRTTLLU), Capital Market Assumptions & Rebalancing',
            summary: 'Threshold vs calendar rebalancing bands and asset-liability matching.',
            resources: [
              { title: 'Vanguard Research on Asset Allocation & Rebalancing', provider: 'Vanguard Research', url: 'https://corporate.vanguard.com/content/corporatesite/us/en/corp/articles.html', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'am-d2',
        dayRange: 'Day 4 – 6',
        title: 'Fixed Income, Yield Curves & Duration/Convexity',
        objective: 'Immunize bond portfolios against parallel and non-parallel rate shifts.',
        topics: [
          {
            id: 'am-t2',
            title: 'Yield Curve Dynamics, Modified Duration, DV01 & Convexity',
            summary: 'Ladders, barbells, bullets, and credit spread duration.',
            resources: [
              { title: 'Yale Financial Markets (Robert Shiller Open Course)', provider: 'Open Yale Courses', url: 'https://oyc.yale.edu/economics/econ-252', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'am-d3',
        dayRange: 'Day 7 – 8',
        title: 'Factor Tilts, ETFs & Direct Indexing',
        objective: 'Construct low-fee factor-tilted cores with automated tax-loss harvesting.',
        topics: [
          {
            id: 'am-t3',
            title: 'Fama-French Factors, ETF Tracking Error & Tax-Loss Harvesting',
            summary: 'Wash-sale rules, fee drag compounding, and smart-beta construction.',
            resources: [
              { title: 'Bogleheads & Fama-French Data Library', provider: 'Kenneth French Data Library', url: 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'am-d4',
        dayRange: 'Day 9 – 10',
        title: 'Institutional Alternatives & Endowment Models',
        objective: 'Blend real assets, TIPS, and private credit for inflation resilience.',
        topics: [
          {
            id: 'am-t4',
            title: 'Yale Endowment Model, Inflation Hedges & Currency Hedging',
            summary: 'Uncorrelated return streams and FX carry vs hedged bond sleeves.',
            resources: [
              { title: 'BlackRock Investment Institute Insights', provider: 'BlackRock', url: 'https://www.blackrock.com/corporate/insights/blackrock-investment-institute', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Portfolio Selection',
        authors: 'Harry Markowitz',
        year: 1952,
        venue: 'Journal of Finance',
        url: 'https://www.jstor.org/stable/2975974',
        takeaway: 'Launched Modern Portfolio Theory and the mean-variance efficient frontier.',
      },
      {
        title: 'Determinants of Portfolio Performance',
        authors: 'Gary P. Brinson, L. Randolph Hood, Gilbert L. Beebower',
        year: 1986,
        venue: 'Financial Analysts Journal',
        url: 'https://www.cfainstitute.org/en/research/financial-analysts-journal',
        takeaway: 'Demonstrated that strategic asset allocation policy explains the vast majority of return variance.',
      },
      {
        title: 'Common Risk Factors in the Returns on Stocks and Bonds',
        authors: 'Eugene F. Fama, Kenneth R. French',
        year: 1993,
        venue: 'Journal of Financial Economics',
        url: 'https://www.sciencedirect.com/science/article/pii/0304405X93900235',
        takeaway: 'Established size, value, term, and default factors explaining asset returns.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Bond Duration, Convexity & Yield-Curve Immunization Lab',
          tier: 'Required',
          scope: 'Compute DV01, Macaulay/Modified duration, convexity, and immunize a 10-year liability under rate shocks.',
          stack: 'Python, SciPy, Plotly',
          resumeBullet: 'Built fixed-income immunization tool matching liability duration and maximizing positive convexity under +/-200bps shocks.',
        },
        {
          title: 'Institutional IPS & Rebalancing Backtest Engine',
          tier: 'Required',
          scope: 'Compare buy-and-hold, annual, and 5%-band threshold rebalancing across 30 years of multi-asset data.',
          stack: 'Python, Pandas, Kenneth French Data',
          resumeBullet: 'Evaluated threshold vs calendar rebalancing across 30-year multi-asset series improving Sharpe while trimming turnover.',
        },
      ],
      scalable: [
        {
          title: 'Direct Indexing & Automated Tax-Loss Harvesting Simulator',
          tier: 'Scalable Capstone',
          scope: 'Track S&P-like index exposure with <0.4% tracking error while harvesting losses without wash-sale violations.',
          stack: 'Python, CVXPY, SQL',
          resumeBullet: 'Implemented convex-optimized direct indexing engine harvesting tax alpha while bounding tracking error below 35 bps.',
        },
      ],
    },
    certifications: [
      { name: 'Financial Markets (Free Audit)', issuer: 'Yale University (Robert Shiller) via Coursera', url: 'https://www.coursera.org/learn/financial-markets-global', costNote: 'Free Audit', focus: 'Risk management, behavioral finance, and capital markets' },
      { name: 'Asset Management Virtual Experience', issuer: 'Forage (JPMorgan / BlackRock)', url: 'https://www.theforage.com/', costNote: '100% Free Certificate', focus: 'Client IPS creation and multi-asset allocation' },
      { name: 'Fama-French Empirical Factor Library', issuer: 'Tuck School / Dartmouth', url: 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html', costNote: 'Free Open Dataset', focus: 'Empirical factor benchmarking' },
    ],
    flashcards: [
      { id: 'am-fc1', topicId: 'am-t2', topicTitle: 'Duration & Convexity', question: 'Why is positive convexity desirable in a bond portfolio?', answer: 'Bond prices rise more when yields fall than they drop when yields rise by the same amount, creating asymmetric upside during rate volatility.', difficulty: 'Core' },
      { id: 'am-fc2', topicId: 'am-t1', topicTitle: 'Threshold Rebalancing', question: 'Why does corridor/threshold rebalancing often beat fixed monthly rebalancing?', answer: 'It trades only when drift exceeds a volatility-calibrated band, capturing mean reversion while minimizing transaction and tax costs.', difficulty: 'Applied' },
      { id: 'am-fc3', topicId: 'am-t3', topicTitle: 'Tax-Loss Harvesting', question: 'Is tax-loss harvesting pure free return, or largely tax deferral?', answer: 'Primarily tax deferral + tax-rate arbitrage (offsetting high short-term gains while resetting cost basis lower), compounding saved tax dollars.', difficulty: 'Deep Dive' },
      { id: 'am-fc4', topicId: 'am-t2', topicTitle: 'DV01', question: 'What does DV01 measure?', answer: 'Dollar Value of an 01: the dollar price change of a bond or portfolio for a 1-basis-point (0.01%) change in yield.', difficulty: 'Core' },
      { id: 'am-fc5', topicId: 'am-t4', topicTitle: 'FX Hedging Bonds vs Equities', question: 'Why do institutional asset managers usually hedge currency risk on foreign bonds but leave foreign equities partially unhedged?', answer: 'FX volatility (~10%) dwarfs bond yield volatility (~4%), erasing diversification; equity volatility (~16%) absorbs FX noise.', difficulty: 'Deep Dive' },
      { id: 'am-fc6', topicId: 'am-t1', topicTitle: 'IPS Constraints', question: 'What are the 5 standard constraint categories in an institutional Investment Policy Statement?', answer: 'Liquidity, Time Horizon, Tax concerns, Legal/Regulatory factors, and Unique circumstances (LLTTU).', difficulty: 'Core' },
      { id: 'am-fc7', topicId: 'am-t3', topicTitle: 'ETF Tracking Difference', question: 'How does tracking difference differ from tracking error?', answer: 'Tracking difference is total return gap vs benchmark (mostly expense ratio + sampling); tracking error is the standard deviation of that gap.', difficulty: 'Applied' },
      { id: 'am-fc8', topicId: 'am-t4', topicTitle: 'Liability Immunization', question: 'What two conditions immunize a single future liability against small parallel yield shifts?', answer: 'Portfolio PV >= Liability PV and Portfolio Modified Duration equals Liability Duration (with greater convexity).', difficulty: 'Applied' },
    ],
  },
];
