import { SkillNode } from '../types/curriculum';

export const SKILLS_CLOUD_SEC: SkillNode[] = [
  {
    id: 'cloud',
    title: 'Cloud Foundations & Architecture',
    aliases: ['Cloud', 'AWS', 'GCP', 'Azure'],
    domain: 'cloud-sec',
    summary:
      'Compute, object storage, IAM least-privilege, serverless vs containers, managed databases, and cloud cost architecture.',
    estimatedDays: 10,
    tier: 2,
    prerequisites: ['web-apis', 'git-github'],
    unlocks: ['cloud-engineering', 'devops', 'mlops'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'cld-d1',
        dayRange: 'Day 1 – 3',
        title: 'IAM, Identity & Cloud Resource Boundaries',
        objective: 'Design zero-trust IAM roles, policies, and multi-account isolation.',
        topics: [
          {
            id: 'cld-t1',
            title: 'IAM Users, Roles, Short-Lived Credentials & Policy Evaluation',
            summary: 'Explicit deny precedence, OIDC federation, and least-privilege boundaries.',
            resources: [
              { title: 'AWS Skill Builder Cloud Essentials', provider: 'AWS', url: 'https://explore.skillbuilder.aws/', kind: 'Course' },
              { title: 'Google Cloud IAM Overview', provider: 'Google Cloud', url: 'https://cloud.google.com/iam/docs/overview', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'cld-d2',
        dayRange: 'Day 4 – 6',
        title: 'Compute, Storage & Managed Databases',
        objective: 'Select between VMs, serverless functions, object storage, and managed SQL.',
        topics: [
          {
            id: 'cld-t2',
            title: 'EC2/GCE, Lambda/Cloud Run & S3 Lifecycle Tiers',
            summary: 'Cold starts, container scaling to zero, pre-signed URLs, and durability guarantees.',
            resources: [
              { title: 'AWS Well-Architected Framework', provider: 'AWS', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', kind: 'Guide' },
            ],
          },
          {
            id: 'cld-t3',
            title: 'Managed RDS/Cloud SQL, Read Replicas & Backups',
            summary: 'Multi-AZ failover, RPO/RTO targets, and automated point-in-time recovery.',
            resources: [
              { title: 'Google Cloud Architecture Center', provider: 'Google Cloud', url: 'https://cloud.google.com/architecture', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'cld-d3',
        dayRange: 'Day 7 – 8',
        title: 'Edge, CDN & Event-Driven Queues',
        objective: 'Decouple bursty workloads with pub/sub queues and CDN caching.',
        topics: [
          {
            id: 'cld-t4',
            title: 'CloudFront/Cloudflare CDN, SQS/PubSub & Dead-Letter Queues',
            summary: 'Cache-Control headers, at-least-once delivery, and idempotent consumers.',
            resources: [
              { title: 'Cloudflare Learning Center: What is a CDN?', provider: 'Cloudflare', url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'cld-d4',
        dayRange: 'Day 9 – 10',
        title: 'FinOps & Cost Optimization',
        objective: 'Prevent runaway bills with budgets, spot instances, and right-sizing.',
        topics: [
          {
            id: 'cld-t5',
            title: 'Reserved vs Spot Compute, Egress Traps & Billing Alerts',
            summary: 'Model total cost of ownership across data transfer and compute tiers.',
            resources: [
              { title: 'FinOps Foundation Open Framework', provider: 'FinOps Foundation', url: 'https://www.finops.org/framework/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'A View of Cloud Computing',
        authors: 'Michael Armbrust et al. (UC Berkeley)',
        year: 2010,
        venue: 'Communications of the ACM',
        url: 'https://cacm.acm.org/research/a-view-of-cloud-computing/',
        takeaway: 'Formalized elasticity, pay-as-you-go economics, and top obstacles of cloud adoption.',
      },
      {
        title: 'Cloud Programming Simplified: A Berkeley View on Serverless Computing',
        authors: 'Eric Jonas et al.',
        year: 2019,
        venue: 'UC Berkeley / arXiv:1902.03383',
        url: 'https://arxiv.org/abs/1902.03383',
        takeaway: 'Analyzes FaaS statelessness, cold starts, and the future of autoscaling compute.',
      },
      {
        title: 'The Google File System / Colossus Evolution',
        authors: 'Sanjay Ghemawat, Howard Gobioff, Shun-Tak Leung',
        year: 2003,
        venue: 'SOSP',
        url: 'https://research.google/pubs/the-google-file-system/',
        takeaway: 'Foundational blueprint for fault-tolerant distributed storage on commodity hardware.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Serverless Pre-Signed Media Upload & Processing Pipeline',
          tier: 'Required',
          scope: 'Direct-to-object-storage pre-signed URLs triggering async thumbnail/metadata worker functions via queue.',
          stack: 'AWS/GCP Free Tier, Cloud Run/Lambda, S3/GCS, SQS',
          resumeBullet: 'Built event-driven media ingestion pipeline using pre-signed URLs and dead-letter queues handling 10x burst spikes.',
        },
        {
          title: 'Least-Privilege OIDC Multi-Environment IAM Blueprint',
          tier: 'Required',
          scope: 'Zero long-lived static keys; GitHub Actions deploys via short-lived OIDC tokens scoped per environment.',
          stack: 'IAM, OIDC, GitHub Actions',
          resumeBullet: 'Eliminated static cloud access keys by migrating deployment pipelines to short-lived OIDC IAM federation.',
        },
      ],
      scalable: [
        {
          title: 'Multi-Region Static + API Edge Architecture with Failover',
          tier: 'Scalable Capstone',
          scope: 'CDN edge caching, read-replica database routing, and health-checked DNS failover.',
          stack: 'Cloudflare/CloudFront, Postgres Replicas, Cloud Run',
          resumeBullet: 'Architected multi-region edge-cached web platform maintaining <65ms global TTFB and automated regional failover.',
        },
      ],
    },
    certifications: [
      { name: 'AWS Cloud Quest: Cloud Practitioner', issuer: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws/', costNote: '100% Free Digital Badge', focus: 'Hands-on AWS compute, IAM, and storage labs' },
      { name: 'Google Cloud Computing Foundations', issuer: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', costNote: 'Free Badges & Labs', focus: 'Cloud architecture, networking, and data services' },
      { name: 'Microsoft Learn Azure Fundamentals (AZ-900 Prep)', issuer: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/', costNote: '100% Free Learning Path', focus: 'Cloud models, IAM, and core services' },
    ],
    flashcards: [
      { id: 'cld-fc1', topicId: 'cld-t1', topicTitle: 'IAM Policy Evaluation', question: 'In cloud IAM, if one policy allows an action and another explicitly denies it, what happens?', answer: 'Explicit Deny always overrides any Allow across all attached policies.', difficulty: 'Core' },
      { id: 'cld-fc2', topicId: 'cld-t2', topicTitle: 'Pre-Signed URLs', question: 'Why upload large user files directly to S3/GCS via pre-signed URLs instead of proxying through your API server?', answer: 'It removes bandwidth bottlenecks and worker memory exhaustion on your API servers while keeping buckets private.', difficulty: 'Applied' },
      { id: 'cld-fc3', topicId: 'cld-t3', topicTitle: 'RPO vs RTO', question: 'Define Recovery Point Objective (RPO) vs Recovery Time Objective (RTO).', answer: 'RPO is max tolerable data loss window (backup frequency); RTO is max tolerable downtime to restore service.', difficulty: 'Core' },
      { id: 'cld-fc4', topicId: 'cld-t4', topicTitle: 'Dead-Letter Queues', question: 'Why attach a Dead-Letter Queue (DLQ) to async message queues?', answer: 'Poison-pill messages that fail repeatedly are quarantined into the DLQ instead of blocking the queue or retrying infinitely.', difficulty: 'Core' },
      { id: 'cld-fc5', topicId: 'cld-t5', topicTitle: 'Cloud Egress Costs', question: 'Why can multi-cloud or cross-AZ architectures unexpectedly spike cloud bills?', answer: 'Inter-AZ and internet data egress is billed per GB, whereas intra-AZ or CDN-cached traffic is far cheaper.', difficulty: 'Applied' },
      { id: 'cld-fc6', topicId: 'cld-t2', topicTitle: 'Containers vs FaaS', question: 'When does Cloud Run / ECS Fargate beat Lambda functions?', answer: 'For steady concurrency, WebSockets, longer request timeouts, or heavy dependencies that suffer cold starts.', difficulty: 'Applied' },
      { id: 'cld-fc7', topicId: 'cld-t1', topicTitle: 'OIDC Federation', question: 'Why prefer OIDC federation over storing cloud IAM keys in CI secrets?', answer: 'OIDC issues temporary scoped tokens per job run, eliminating leaked permanent credentials.', difficulty: 'Deep Dive' },
      { id: 'cld-fc8', topicId: 'cld-t4', topicTitle: 'Idempotent Consumers', question: 'Why must queue consumers be idempotent in distributed cloud queues?', answer: 'Standard queues guarantee at-least-once delivery, meaning duplicate deliveries can occur under network retries.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'cloud-engineering',
    title: 'Cloud Engineering, Computing & Networking',
    aliases: ['Cloud Engg/computing/networking', 'VPC', 'Terraform', 'Distributed Cloud'],
    domain: 'cloud-sec',
    summary:
      'VPC subnets, NAT/IGW routing, load balancing, Terraform Infrastructure-as-Code, Kubernetes orchestration, and multi-AZ resilience.',
    estimatedDays: 14,
    tier: 3,
    prerequisites: ['cloud', 'network-engineering'],
    unlocks: ['devops', 'system-design', 'cybersecurity'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'ce-d1',
        dayRange: 'Day 1 – 4',
        title: 'Cloud Networking: VPCs, Subnets & Load Balancers',
        objective: 'Architect private/public subnets, route tables, NAT gateways, and L4/L7 LBs.',
        topics: [
          {
            id: 'ce-t1',
            title: 'VPC CIDR Planning, Route Tables, Security Groups & NACLs',
            summary: 'Stateful vs stateless firewall evaluation and private subnet egress via NAT.',
            resources: [
              { title: 'AWS VPC Networking Fundamentals', provider: 'AWS Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html', kind: 'Docs' },
            ],
          },
          {
            id: 'ce-t2',
            title: 'L4 (NLB) vs L7 (ALB) Load Balancing & VPC Peering / PrivateLink',
            summary: 'TLS termination, sticky sessions, and private service exposure without public IPs.',
            resources: [
              { title: 'NGINX / Envoy Load Balancing Concepts', provider: 'Envoy Docs', url: 'https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ce-d2',
        dayRange: 'Day 5 – 8',
        title: 'Infrastructure as Code (Terraform / OpenTofu)',
        objective: 'Provision repeatable multi-tier cloud topologies with remote locked state.',
        topics: [
          {
            id: 'ce-t3',
            title: 'Terraform Modules, Remote State Locking & Plan/Apply Workflows',
            summary: 'Prevent state corruption and drift across team environments.',
            resources: [
              { title: 'HashiCorp Terraform Tutorials', provider: 'HashiCorp Developer', url: 'https://developer.hashicorp.com/terraform/tutorials', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'ce-d3',
        dayRange: 'Day 9 – 11',
        title: 'Container Orchestration & Kubernetes',
        objective: 'Deploy resilient workloads with Pods, Services, HPA, and Ingress.',
        topics: [
          {
            id: 'ce-t4',
            title: 'Kubernetes Control Plane, Deployments, Services & Probes',
            summary: 'Readiness vs liveness probes, resource requests/limits, and Horizontal Pod Autoscaling.',
            resources: [
              { title: 'Kubernetes Official Interactive Tutorials', provider: 'Kubernetes.io', url: 'https://kubernetes.io/docs/tutorials/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'ce-d4',
        dayRange: 'Day 12 – 14',
        title: 'Cloud Resilience & Chaos Testing',
        objective: 'Design fault-isolated cells and run failure-injection drills.',
        topics: [
          {
            id: 'ce-t5',
            title: 'Multi-AZ Failover, Cellular Architecture & Fault Injection',
            summary: 'Eliminate blast radius via shuffle sharding and graceful degradation.',
            resources: [
              { title: 'AWS Builders Library (Distributed Reliability)', provider: 'Amazon Builders Library', url: 'https://aws.amazon.com/builders-library/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Borg, Omega, and Kubernetes',
        authors: 'Brendan Burns, Brian Grant, David Oppenheimer, Eric Brewer, John Wilkes',
        year: 2016,
        venue: 'ACM Queue / CACM',
        url: 'https://research.google/pubs/borg-omega-and-kubernetes/',
        takeaway: 'Traces the decade of cluster scheduler lessons that shaped Kubernetes.',
      },
      {
        title: 'Maglev: A Fast and Reliable Software Network Load Balancer',
        authors: 'Daniel E. Eisenbud et al.',
        year: 2016,
        venue: 'USENIX NSDI',
        url: 'https://research.google/pubs/maglev-a-fast-and-reliable-software-network-balancer/',
        takeaway: 'Consistent hashing and kernel-bypass packet forwarding for cloud-scale load balancers.',
      },
      {
        title: 'Andromeda: Performance, Isolation, and Velocity at Scale in Cloud Network Virtualization',
        authors: 'Michael Dalton et al.',
        year: 2018,
        venue: 'USENIX NSDI',
        url: 'https://www.usenix.org/conference/nsdi18/presentation/dalton',
        takeaway: 'Explains how software-defined cloud VPCs isolate tenant packets at line rate.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Modular Terraform 3-Tier VPC & Private Subnet Stack',
          tier: 'Required',
          scope: 'Provision public ALB, private app subnets, isolated DB subnet, NAT gateway, and remote state locking.',
          stack: 'Terraform/OpenTofu, AWS/GCP, GitHub Actions',
          resumeBullet: 'Authored reusable Terraform VPC modules provisioning 3-tier isolated network topologies with automated plan checks in CI.',
        },
        {
          title: 'Kubernetes Autoscaling Microservice Cluster',
          tier: 'Required',
          scope: 'Deploy multi-service app on K8s/kind with readiness probes, ConfigMaps, HPA load scaling, and NetworkPolicies.',
          stack: 'Kubernetes, Helm, Docker, kind/minikube',
          resumeBullet: 'Configured Kubernetes HPA and zero-downtime rolling deployments with strict pod NetworkPolicies.',
        },
      ],
      scalable: [
        {
          title: 'Zero-Downtime Multi-AZ Platform with Automated Chaos Drills',
          tier: 'Scalable Capstone',
          scope: 'Simulate AZ isolation and pod kills while tracking SLO error budgets and automated DNS/LB draining.',
          stack: 'Terraform, Kubernetes, Prometheus, Chaos Mesh',
          resumeBullet: 'Validated 99.95% availability target by automating AZ-failure chaos drills across Terraform-managed Kubernetes clusters.',
        },
      ],
    },
    certifications: [
      { name: 'Introduction to Kubernetes (LFS158)', issuer: 'Linux Foundation / edX', url: 'https://training.linuxfoundation.org/training/introduction-to-kubernetes/', costNote: '100% Free Audit', focus: 'K8s architecture, pods, services, and deployments' },
      { name: 'HashiCorp Terraform Learning Tracks', issuer: 'HashiCorp Developer', url: 'https://developer.hashicorp.com/terraform/tutorials', costNote: '100% Free', focus: 'IaC modules, state management, and workspaces' },
      { name: 'Kubernetes Basics Interactive Labs', issuer: 'CNCF / Kubernetes.io', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', costNote: '100% Free', focus: 'Container orchestration and scaling' },
    ],
    flashcards: [
      { id: 'ce-fc1', topicId: 'ce-t1', topicTitle: 'Security Groups vs NACLs', question: 'How do Cloud Security Groups differ from Network ACLs?', answer: 'Security Groups are stateful (return traffic automatically allowed) and allow-only; NACLs are stateless and support explicit deny rules at the subnet boundary.', difficulty: 'Core' },
      { id: 'ce-fc2', topicId: 'ce-t2', topicTitle: 'L4 vs L7 Load Balancing', question: 'When should you pick an L4 Network Load Balancer over an L7 Application Load Balancer?', answer: 'When handling non-HTTP TCP/UDP protocols, needing static IPs, or requiring ultra-low microsecond passthrough latency.', difficulty: 'Applied' },
      { id: 'ce-fc3', topicId: 'ce-t3', topicTitle: 'Terraform State Locking', question: 'Why is remote state locking critical for team Terraform workflows?', answer: 'Concurrent terraform apply runs without locking can corrupt the state file and create duplicate or orphaned cloud infrastructure.', difficulty: 'Core' },
      { id: 'ce-fc4', topicId: 'ce-t4', topicTitle: 'Liveness vs Readiness Probes', question: 'What happens if you mistakenly use a heavy DB-dependent check as a Kubernetes liveness probe?', answer: 'A brief DB hiccup causes K8s to restart all app pods simultaneously, triggering a cascading outage instead of just pausing traffic (readiness).', difficulty: 'Deep Dive' },
      { id: 'ce-fc5', topicId: 'ce-t5', topicTitle: 'Shuffle Sharding', question: 'How does shuffle sharding reduce noisy-neighbor blast radius?', answer: 'Assigning each tenant a unique random subset of workers ensures a single bad tenant only overlaps partially with any other tenant.', difficulty: 'Deep Dive' },
      { id: 'ce-fc6', topicId: 'ce-t1', topicTitle: 'NAT Gateway vs IGW', question: 'Why does a private subnet reach the internet through a NAT Gateway rather than an Internet Gateway directly?', answer: 'NAT allows outbound package/API downloads while blocking unsolicited inbound internet connections to private instances.', difficulty: 'Core' },
      { id: 'ce-fc7', topicId: 'ce-t4', topicTitle: 'HPA & Resource Requests', question: 'Why must container CPU/memory requests be defined for Kubernetes HPA to work?', answer: 'HPA calculates utilization percentage relative to requested resources; without requests, scaling metrics cannot compute.', difficulty: 'Applied' },
      { id: 'ce-fc8', topicId: 'ce-t2', topicTitle: 'PrivateLink', question: 'Why connect two VPCs via PrivateLink instead of traversing public internet endpoints?', answer: 'Traffic stays on private cloud backbone links, improving security posture and avoiding public IP exposure.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    aliases: ['Dev Ops', 'CI/CD', 'SRE', 'Observability'],
    domain: 'cloud-sec',
    summary:
      'Linux internals, multi-stage Docker builds, GitHub Actions CI/CD, GitOps, OpenTelemetry observability, Prometheus/Grafana, and SRE SLOs.',
    estimatedDays: 12,
    tier: 3,
    prerequisites: ['git-github', 'cloud'],
    unlocks: ['mlops', 'cloud-engineering', 'system-design'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'do-d1',
        dayRange: 'Day 1 – 3',
        title: 'Linux, Containers & Image Hardening',
        objective: 'Understand namespaces, cgroups, and slim rootless multi-stage Dockerfiles.',
        topics: [
          {
            id: 'do-t1',
            title: 'Linux Processes, Systemd, File Descriptors & cgroups',
            summary: 'Diagnose CPU steal, OOM kills, open sockets, and disk IO bottlenecks.',
            resources: [
              { title: 'Linux Journey', provider: 'Linux Journey', url: 'https://linuxjourney.com/', kind: 'Course' },
            ],
          },
          {
            id: 'do-t2',
            title: 'Multi-Stage Dockerfiles, Layer Caching & Distroless Images',
            summary: 'Minimize image attack surface and shrink container sizes by 80%.',
            resources: [
              { title: 'Docker Best Practices Guide', provider: 'Docker Docs', url: 'https://docs.docker.com/build/building/best-practices/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'do-d2',
        dayRange: 'Day 4 – 6',
        title: 'CI/CD Pipelines & GitOps',
        objective: 'Automate lint, test, security scan, build, and progressive delivery.',
        topics: [
          {
            id: 'do-t3',
            title: 'GitHub Actions Matrix Builds, SBOMs & Artifact Signing',
            summary: 'Deterministic builds, container vulnerability scanning (Trivy), and release gates.',
            resources: [
              { title: 'GitHub Actions Documentation', provider: 'GitHub', url: 'https://docs.github.com/en/actions', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'do-d3',
        dayRange: 'Day 7 – 9',
        title: 'Observability: Logs, Metrics & Distributed Traces',
        objective: 'Instrument apps with OpenTelemetry, Prometheus RED/USE metrics, and Grafana.',
        topics: [
          {
            id: 'do-t4',
            title: 'OpenTelemetry Traces, Structured JSON Logs & Prometheus',
            summary: 'Correlate trace_id across microservices and measure p50/p95/p99 histograms.',
            resources: [
              { title: 'OpenTelemetry Official Docs', provider: 'CNCF OpenTelemetry', url: 'https://opentelemetry.io/docs/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'do-d4',
        dayRange: 'Day 10 – 12',
        title: 'SRE Principles, Error Budgets & Blameless Postmortems',
        objective: 'Balance release velocity against reliability with SLIs, SLOs, and runbooks.',
        topics: [
          {
            id: 'do-t5',
            title: 'SLIs, SLOs, Burn-Rate Alerts & Incident Response',
            summary: 'Alert on user-facing symptom burn rate rather than noisy CPU spikes.',
            resources: [
              { title: 'Google SRE Book (Free Online)', provider: 'Google', url: 'https://sre.google/sre-book/table-of-contents/', kind: 'Book' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Site Reliability Engineering: Measuring and Managing Reliability (Ch. 3–4)',
        authors: 'Betsy Beyer, Chris Jones, Jennifer Petoff, Niall Richard Murphy',
        year: 2016,
        venue: 'Google / O’Reilly Open Book',
        url: 'https://sre.google/sre-book/service-level-objectives/',
        takeaway: 'Formalized SLIs, SLOs, and error budgets to align engineering velocity with reliability.',
      },
      {
        title: 'Dapper, a Large-Scale Distributed Systems Tracing Infrastructure',
        authors: 'Benjamin H. Sigelman et al.',
        year: 2010,
        venue: 'Google Technical Report',
        url: 'https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/',
        takeaway: 'Laid the architectural foundation for Zipkin, Jaeger, and OpenTelemetry tracing.',
      },
      {
        title: 'Accelerate / DORA State of DevOps Research',
        authors: 'Nicole Forsgren, Jez Humble, Gene Kim',
        year: 2018,
        venue: 'DORA Research Program',
        url: 'https://dora.dev/research/',
        takeaway: 'Empirically established the 4 DORA metrics linking CI/CD automation to organizational performance.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Hardened CI/CD Pipeline with Trivy & Distroless Containers',
          tier: 'Required',
          scope: 'Multi-stage rootless Docker build, automated unit/integration tests, CVE gate, and zero-downtime deploy.',
          stack: 'Docker, GitHub Actions, Trivy, Nginx/Caddy',
          resumeBullet: 'Cut container image footprint by 82% and blocked critical CVEs in CI using multi-stage distroless builds and Trivy.',
        },
        {
          title: 'Full-Stack OpenTelemetry + Prometheus + Grafana Stack',
          tier: 'Required',
          scope: 'Instrument API + worker + Postgres with OTel traces, p99 latency histograms, and multi-window burn-rate alerts.',
          stack: 'OpenTelemetry, Prometheus, Grafana, Loki',
          resumeBullet: 'Implemented unified OpenTelemetry tracing and SLO burn-rate dashboards reducing mean-time-to-diagnose by 60%.',
        },
      ],
      scalable: [
        {
          title: 'GitOps Progressive Delivery Platform (ArgoCD + Canary)',
          tier: 'Scalable Capstone',
          scope: 'Declarative GitOps sync with automated canary metric checks and auto-promotion/rollback.',
          stack: 'Kubernetes, ArgoCD, Prometheus, Helm',
          resumeBullet: 'Deployed declarative GitOps progressive delivery with Argo Rollouts automating canary verification against live error budgets.',
        },
      ],
    },
    certifications: [
      { name: 'Introduction to DevOps and SRE (LFS162)', issuer: 'Linux Foundation / edX', url: 'https://training.linuxfoundation.org/training/introduction-to-devops-and-site-reliability-engineering-lfs162/', costNote: '100% Free Audit', focus: 'CI/CD, observability, and SRE reliability practices' },
      { name: 'GitHub Foundations & Actions Learning Paths', issuer: 'Microsoft Learn / GitHub', url: 'https://learn.microsoft.com/en-us/training/paths/automate-workflow-github-actions/', costNote: '100% Free', focus: 'Workflow automation and security hardening' },
      { name: 'Google SRE Books & Workbook', issuer: 'Google SRE', url: 'https://sre.google/books/', costNote: '100% Free Books', focus: 'SLOs, incident response, and distributed ops' },
    ],
    flashcards: [
      { id: 'do-fc1', topicId: 'do-t2', topicTitle: 'Multi-Stage Dockerfiles', question: 'Why use multi-stage Docker builds instead of one single FROM ubuntu image?', answer: 'Compilers, dev headers, and build caches stay in the builder stage so the final runtime image is tiny and has minimal CVE exposure.', difficulty: 'Core' },
      { id: 'do-fc2', topicId: 'do-t4', topicTitle: 'Prometheus Histograms', question: 'Why can you not simply average p95 latencies across microservice pods?', answer: 'Averaging percentiles is mathematically invalid; you must aggregate raw histogram bucket counters before computing quantiles.', difficulty: 'Deep Dive' },
      { id: 'do-fc3', topicId: 'do-t5', topicTitle: 'Error Budgets', question: 'What happens operationally when a service burns through 100% of its monthly error budget?', answer: 'Feature launches pause and engineering shifts strictly to reliability, testing, and tech-debt remediation until budget recovers.', difficulty: 'Core' },
      { id: 'do-fc4', topicId: 'do-t1', topicTitle: 'Containers Internals', question: 'Which two Linux kernel primitives power containers?', answer: 'Namespaces (isolate what a process can see: PID, net, mount) and cgroups (limit CPU, memory, and I/O resources).', difficulty: 'Applied' },
      { id: 'do-fc5', topicId: 'do-t4', topicTitle: 'Cardinality Explosion', question: 'Why should you never put unbounded user_id or UUID values into Prometheus metric labels?', answer: 'Each unique label combination creates a new time series, exploding Prometheus RAM and crashing the TSDB.', difficulty: 'Deep Dive' },
      { id: 'do-fc6', topicId: 'do-t3', topicTitle: 'SBOMs', question: 'What is an SBOM and why generate it in CI?', answer: 'A Software Bill of Materials lists every package and transitive dependency in a build, enabling instant impact triage when new CVEs drop.', difficulty: 'Applied' },
      { id: 'do-fc7', topicId: 'do-t5', topicTitle: 'Multi-Window Burn Alerts', question: 'Why prefer SLO burn-rate alerts over static CPU > 80% alerts?', answer: 'CPU alerts page engineers when users aren’t affected; burn-rate alerts trigger only when user error rate threatens the SLO.', difficulty: 'Applied' },
      { id: 'do-fc8', topicId: 'do-t2', topicTitle: 'Layer Caching', question: 'Why copy package.json and run npm ci BEFORE copying source code in a Dockerfile?', answer: 'Source code changes frequently; installing dependencies earlier lets Docker reuse the cached dependency layer.', difficulty: 'Core' },
    ],
  },
  {
    id: 'network-engineering',
    title: 'Network Engineering',
    aliases: ['Network Engg', 'TCP/IP', 'BGP', 'DNS'],
    domain: 'cloud-sec',
    summary:
      'OSI/TCP-IP stack, subnetting, DNS, BGP routing, TLS handshakes, packet capture diagnostics with Wireshark/tcpdump, and HTTP/2-3.',
    estimatedDays: 10,
    tier: 2,
    prerequisites: [],
    unlocks: ['cloud-engineering', 'cybersecurity', 'system-design'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'net-d1',
        dayRange: 'Day 1 – 3',
        title: 'IP Addressing, Subnetting & Switching',
        objective: 'Calculate CIDR blocks, ARP resolution, VLANs, and L2/L3 forwarding.',
        topics: [
          {
            id: 'net-t1',
            title: 'CIDR Subnetting, ARP, NAT & L2/L3 Packet Flow',
            summary: 'Trace a packet from Ethernet frame MAC lookup to IP gateway routing.',
            resources: [
              { title: 'Beej’s Guide to Network Concepts', provider: 'Beej', url: 'https://beej.us/guide/bgnet0/', kind: 'Book' },
              { title: 'Cisco Networking Basics', provider: 'Cisco Skills for All', url: 'https://skillsforall.com/', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'net-d2',
        dayRange: 'Day 4 – 6',
        title: 'TCP/UDP, Congestion Control & TLS 1.3',
        objective: 'Analyze 3-way handshakes, flow windows, BBR/CUBIC, and 1-RTT TLS.',
        topics: [
          {
            id: 'net-t2',
            title: 'TCP State Machine, Congestion Windows & TLS 1.3 Handshakes',
            summary: 'SYN/ACK, head-of-line blocking, and why QUIC/HTTP3 solves TCP HOL blocking.',
            resources: [
              { title: 'High Performance Browser Networking (Free Book)', provider: 'Ilya Grigorik', url: 'https://hpbn.co/', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'net-d3',
        dayRange: 'Day 7 – 8',
        title: 'DNS, Anycast & BGP Internet Routing',
        objective: 'Understand recursive vs authoritative DNS and AS-path BGP announcements.',
        topics: [
          {
            id: 'net-t3',
            title: 'DNS Resolution Hierarchy, Anycast & BGP Autonomous Systems',
            summary: 'How BGP prefixes propagate and why route hijacks or DNS TTL misconfigs cause outages.',
            resources: [
              { title: 'Cloudflare Learning Center: How BGP Works', provider: 'Cloudflare', url: 'https://www.cloudflare.com/learning/security/glossary/what-is-bgp/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'net-d4',
        dayRange: 'Day 9 – 10',
        title: 'Packet Capture & Network Forensics',
        objective: 'Debug retransmissions, MTU black holes, and latency with Wireshark/tcpdump.',
        topics: [
          {
            id: 'net-t4',
            title: 'Wireshark, tcpdump, mtr & ss Socket Diagnostics',
            summary: 'Identify packet loss hops, TCP zero-window stalls, and TLS cipher negotiation.',
            resources: [
              { title: 'Wireshark User’s Guide', provider: 'Wireshark', url: 'https://www.wireshark.org/docs/wsug_html_chunked/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'End-to-End Arguments in System Design',
        authors: 'J. H. Saltzer, D. P. Reed, D. D. Clark',
        year: 1984,
        venue: 'ACM Transactions on Computer Systems',
        url: 'https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf',
        takeaway: 'Explains why reliability and integrity belong at endpoints rather than inside intermediate routers.',
      },
      {
        title: 'Congestion Avoidance and Control',
        authors: 'Van Jacobson',
        year: 1988,
        venue: 'ACM SIGCOMM',
        url: 'https://ee.lbl.gov/papers/congavoid.pdf',
        takeaway: 'Saved the early internet from congestion collapse via slow start and AIMD.',
      },
      {
        title: 'BBR: Congestion-Based Congestion Control',
        authors: 'Neal Cardwell, Yuchung Cheng, C. Stephen Gunn, Soheil Hassas Yeganeh, Van Jacobson',
        year: 2016,
        venue: 'ACM Queue',
        url: 'https://queue.acm.org/detail.cfm?id=3022184',
        takeaway: 'Models bottleneck bandwidth and round-trip propagation time instead of relying on packet loss.',
      },
    ],
    projects: {
      required: [
        {
          title: 'HTTP/1.1 & TLS Diagnostics Packet Analyzer Lab',
          tier: 'Required',
          scope: 'Capture and annotate SYN/ACK, TLS 1.3 handshake, DNS lookups, and TCP retransmissions via tcpdump/Wireshark.',
          stack: 'Wireshark, tcpdump, curl, Linux netns',
          resumeBullet: 'Diagnosed TCP retransmission and MTU fragmentation anomalies across simulated WAN links using tcpdump and Wireshark.',
        },
        {
          title: 'Multi-Subnet Virtual Network Lab (Linux Namespaces)',
          tier: 'Required',
          scope: 'Build isolated virtual routers, veth pairs, NAT iptables rules, and static routing tables locally.',
          stack: 'Linux iproute2, netns, iptables/nftables',
          resumeBullet: 'Constructed multi-hop Linux network namespace topologies verifying CIDR routing, NAT masquerading, and firewall filtering.',
        },
      ],
      scalable: [
        {
          title: 'eBPF / Socket-Level Latency & Flow Telemetry Probe',
          tier: 'Scalable Capstone',
          scope: 'Track per-PID TCP RTT, retransmits, and DNS latency spikes in real time with Prometheus export.',
          stack: 'Python/Go, Linux sockets, Prometheus',
          resumeBullet: 'Built low-overhead TCP RTT and retransmission exporter pinpointing cross-zone network degradation within seconds.',
        },
      ],
    },
    certifications: [
      { name: 'Networking Basics & Network Addressing', issuer: 'Cisco Networking Academy (Skills for All)', url: 'https://skillsforall.com/', costNote: '100% Free Badge', focus: 'IPv4/IPv6, subnetting, Ethernet, and routing' },
      { name: 'Cloudflare Learning Center Tracks', issuer: 'Cloudflare', url: 'https://www.cloudflare.com/learning/', costNote: '100% Free', focus: 'DNS, BGP, TLS, Anycast, and DDoS defense' },
      { name: 'High Performance Browser Networking', issuer: 'O’Reilly / Ilya Grigorik (Free Online)', url: 'https://hpbn.co/', costNote: '100% Free Book', focus: 'TCP, UDP, TLS, HTTP/2, WebSockets' },
    ],
    flashcards: [
      { id: 'net-fc1', topicId: 'net-t1', topicTitle: 'CIDR Subnetting', question: 'How many usable host IPv4 addresses exist in a /26 subnet?', answer: '64 total addresses minus 2 (network + broadcast) = 62 usable host addresses.', difficulty: 'Core' },
      { id: 'net-fc2', topicId: 'net-t2', topicTitle: 'QUIC vs TCP', question: 'How does HTTP/3 over QUIC eliminate TCP head-of-line blocking?', answer: 'QUIC multiplexes independent streams over UDP, so a lost packet in stream A does not stall delivery of stream B.', difficulty: 'Applied' },
      { id: 'net-fc3', topicId: 'net-t2', topicTitle: 'TLS 1.3', question: 'Why is a TLS 1.3 handshake faster than TLS 1.2?', answer: 'TLS 1.3 combines key share and cipher selection in the first flight, cutting handshake overhead from 2-RTT to 1-RTT (or 0-RTT resumption).', difficulty: 'Applied' },
      { id: 'net-fc4', topicId: 'net-t3', topicTitle: 'Anycast DNS', question: 'How does Anycast route a user to the nearest DNS or CDN edge node?', answer: 'Multiple geographic PoPs announce the exact same IP prefix via BGP, so routers naturally forward packets along the shortest AS path.', difficulty: 'Deep Dive' },
      { id: 'net-fc5', topicId: 'net-t1', topicTitle: 'ARP Resolution', question: 'Why is ARP confined to a single Layer-2 broadcast domain?', answer: 'ARP resolves IP addresses to local MAC addresses using Ethernet broadcasts, which routers do not forward across subnets.', difficulty: 'Core' },
      { id: 'net-fc6', topicId: 'net-t4', topicTitle: 'MTU Black Hole', question: 'What symptom indicates an MTU Path Discovery black hole?', answer: 'Small packets (ping/SSH) succeed, while large payloads (TLS certs/file transfers) hang when ICMP Fragmentation Needed is blocked.', difficulty: 'Deep Dive' },
      { id: 'net-fc7', topicId: 'net-t3', topicTitle: 'DNS TTL Trade-off', question: 'What happens if your primary web DNS record has a 24-hour TTL during an emergency failover?', answer: 'Recursive resolvers cache the dead IP for up to 24 hours, delaying traffic cutover.', difficulty: 'Core' },
      { id: 'net-fc8', topicId: 'net-t2', topicTitle: 'BBR vs Loss-Based TCP', question: 'Why does CUBIC degrade on lossy wireless links while BBR stays fast?', answer: 'CUBIC mistakes random packet loss for congestion and halves its window; BBR measures actual bottleneck bandwidth and min-RTT.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    aliases: ['Cybersecurity', 'AppSec', 'Pentesting', 'Threat Modeling'],
    domain: 'cloud-sec',
    summary:
      'OWASP Top 10 exploitation & defense, applied cryptography, IAM/OAuth security, network pentesting, threat modeling, and SOC incident forensics.',
    estimatedDays: 14,
    tier: 3,
    prerequisites: ['web-apis', 'network-engineering'],
    unlocks: ['cloud-engineering', 'system-design'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'sec-d1',
        dayRange: 'Day 1 – 4',
        title: 'Web Application Security (OWASP Top 10)',
        objective: 'Exploit and remediate SQLi, XSS, CSRF, SSRF, and broken access control.',
        topics: [
          {
            id: 'sec-t1',
            title: 'IDOR/BOLA, SQL Injection, XSS & Content Security Policy',
            summary: 'Parameterized queries, context-aware output encoding, and strict CSP nonces.',
            resources: [
              { title: 'PortSwigger Web Security Academy (Free Labs)', provider: 'PortSwigger', url: 'https://portswigger.net/web-security', kind: 'Lab' },
              { title: 'OWASP Cheat Sheet Series', provider: 'OWASP', url: 'https://cheatsheetseries.owasp.org/', kind: 'Guide' },
            ],
          },
          {
            id: 'sec-t2',
            title: 'SSRF, CSRF, Auth Session Hardening & OAuth2 Pitfalls',
            summary: 'PKCE, HttpOnly/SameSite cookies, JWT alg:none defense, and metadata IP blocking.',
            resources: [
              { title: 'PortSwigger OAuth & SSRF Labs', provider: 'PortSwigger', url: 'https://portswigger.net/web-security/ssrf', kind: 'Lab' },
            ],
          },
        ],
      },
      {
        id: 'sec-d2',
        dayRange: 'Day 5 – 8',
        title: 'Applied Cryptography & Secrets Management',
        objective: 'Choose modern ciphers, key derivation, and envelope encryption safely.',
        topics: [
          {
            id: 'sec-t3',
            title: 'AES-GCM, Ed25519, Argon2id & PKI Certificate Chains',
            summary: 'Authenticated encryption (AEAD), nonce reuse hazards, and password hashing.',
            resources: [
              { title: 'CryptoHack Interactive Challenges', provider: 'CryptoHack', url: 'https://cryptohack.org/', kind: 'Lab' },
            ],
          },
        ],
      },
      {
        id: 'sec-d3',
        dayRange: 'Day 9 – 11',
        title: 'Threat Modeling & Cloud/Container Hardening',
        objective: 'Run STRIDE reviews and secure supply chains.',
        topics: [
          {
            id: 'sec-t4',
            title: 'STRIDE Threat Modeling, Supply-Chain CVEs & Least Privilege',
            summary: 'Map trust boundaries, attack trees, and container privilege escalation vectors.',
            resources: [
              { title: 'OWASP Threat Modeling Cheat Sheet', provider: 'OWASP', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'sec-d4',
        dayRange: 'Day 12 – 14',
        title: 'Detection Engineering & Incident Forensics',
        objective: 'Triage alerts, map MITRE ATT&CK TTPs, and write Sigma detection rules.',
        topics: [
          {
            id: 'sec-t5',
            title: 'MITRE ATT&CK, Log Forensics & Detection Rules',
            summary: 'Identify lateral movement, credential stuffing, and anomalous process trees.',
            resources: [
              { title: 'MITRE ATT&CK Matrix', provider: 'MITRE', url: 'https://attack.mitre.org/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'The Protection of Information in Computer Systems',
        authors: 'Jerome H. Saltzer, Michael D. Schroeder',
        year: 1975,
        venue: 'Proceedings of the IEEE',
        url: 'https://web.mit.edu/Saltzer/www/publications/protection/',
        takeaway: 'Established the 8 enduring security design principles including Least Privilege and Economy of Mechanism.',
      },
      {
        title: 'Reflections on Trusting Trust',
        authors: 'Ken Thompson',
        year: 1984,
        venue: 'Communications of the ACM (Turing Lecture)',
        url: 'https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf',
        takeaway: 'Proved why supply-chain and compiler trust cannot rely solely on source code inspection.',
      },
      {
        title: 'Smashing The Stack For Fun And Profit',
        authors: 'Aleph One (Elias Levy)',
        year: 1996,
        venue: 'Phrack Magazine #49',
        url: 'https://phrack.org/issues/49/14.html',
        takeaway: 'Seminal explanation of stack buffer overflows that spurred ASLR, DEP, and memory-safe languages.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Vulnerable-to-Hardened Web App Remediation Suite',
          tier: 'Required',
          scope: 'Audit an intentionally vulnerable API, document PoC exploits for 6 OWASP flaws, and ship automated regression fixes.',
          stack: 'TypeScript/Python, PortSwigger Burp Community, Semgrep',
          resumeBullet: 'Remediated SQLi, SSRF, and BOLA vulnerabilities across an API suite and enforced Semgrep SAST gates in CI.',
        },
        {
          title: 'STRIDE Threat Model & Envelope Encryption Vault',
          tier: 'Required',
          scope: 'Implement AES-256-GCM envelope encryption with Argon2id key derivation and complete STRIDE diagram.',
          stack: 'Python/Node crypto, Argon2id, Threat Dragon',
          resumeBullet: 'Built zero-knowledge secrets vault using Argon2id and AES-GCM AEAD backed by a full STRIDE trust-boundary audit.',
        },
      ],
      scalable: [
        {
          title: 'Automated API Security Fuzzer & Sigma SOC Alert Pipeline',
          tier: 'Scalable Capstone',
          scope: 'OpenAPI-driven auth/BOLA fuzzer paired with structured JSON audit log ingestion and Sigma anomaly alerts.',
          stack: 'Python, OpenAPI, Sigma, Elasticsearch/Loki',
          resumeBullet: 'Engineered automated BOLA/IDOR API fuzzer and Sigma detection rules flagging anomalous token reuse in real time.',
        },
      ],
    },
    certifications: [
      { name: 'PortSwigger Web Security Practitioner Learning Path', issuer: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', costNote: '100% Free Labs & Curriculum', focus: 'SQLi, XSS, SSRF, OAuth, and JWT exploitation' },
      { name: 'ISC2 Certified in Cybersecurity (CC) Online Training', issuer: 'ISC2', url: 'https://www.isc2.org/landing/1mcc', costNote: 'Free Training & First-Time Exam Promo', focus: 'Security principles, access control, and incident response' },
      { name: 'Introduction to Cybersecurity', issuer: 'Cisco Skills for All', url: 'https://skillsforall.com/', costNote: '100% Free Badge', focus: 'Threat landscape, network defense, and cryptography basics' },
    ],
    flashcards: [
      { id: 'sec-fc1', topicId: 'sec-t1', topicTitle: 'BOLA / IDOR', question: 'Why does checking "is user logged in?" fail to prevent Broken Object Level Authorization (IDOR)?', answer: 'Authentication verifies identity, not ownership; every handler must enforce authorization comparing resource.ownerId === session.userId.', difficulty: 'Core' },
      { id: 'sec-fc2', topicId: 'sec-t2', topicTitle: 'SSRF Defense', question: 'How does Server-Side Request Forgery threaten cloud-hosted applications?', answer: 'Attackers trick the backend into fetching internal VPC endpoints like cloud instance metadata (169.254.169.254) to steal IAM role credentials.', difficulty: 'Applied' },
      { id: 'sec-fc3', topicId: 'sec-t3', topicTitle: 'AES-GCM Nonce Reuse', question: 'Why is reusing the same nonce/IV with the same key catastrophic in AES-GCM?', answer: 'XORing two ciphertexts cancels the keystream, exposing plaintext differences and allowing authentication tag key recovery.', difficulty: 'Deep Dive' },
      { id: 'sec-fc4', topicId: 'sec-t3', topicTitle: 'Argon2id vs SHA-256', question: 'Why must passwords be hashed with Argon2id instead of SHA-256?', answer: 'SHA-256 is blazing fast on GPUs; Argon2id is memory-hard and time-tuned to resist GPU/ASIC brute-force cracking.', difficulty: 'Core' },
      { id: 'sec-fc5', topicId: 'sec-t2', topicTitle: 'SameSite & CSRF', question: 'How do HttpOnly + SameSite=Lax cookies protect session tokens?', answer: 'HttpOnly blocks JS/XSS from reading the token, while SameSite=Lax withholds cookies on cross-site state-changing POST requests.', difficulty: 'Applied' },
      { id: 'sec-fc6', topicId: 'sec-t4', topicTitle: 'STRIDE Framework', question: 'What does the STRIDE acronym stand for in threat modeling?', answer: 'Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.', difficulty: 'Core' },
      { id: 'sec-fc7', topicId: 'sec-t1', topicTitle: 'CSP & XSS', question: 'Why does "unsafe-inline" defeat Content Security Policy protection against XSS?', answer: 'It allows injected inline <script> tags to execute; modern CSPs require cryptographic nonces or hashes.', difficulty: 'Applied' },
      { id: 'sec-fc8', topicId: 'sec-t5', topicTitle: 'MITRE ATT&CK', question: 'What is the purpose of mapping alerts to MITRE ATT&CK techniques?', answer: 'It provides a shared taxonomy of adversary tactics and behaviors to spot blind spots in detection coverage.', difficulty: 'Core' },
    ],
  },
];
