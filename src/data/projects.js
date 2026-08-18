/**
 * Single source of truth for the work section and the /work/:slug case pages.
 *
 * `caseStudy` is optional — its presence is what adds a "Read case study" link
 * to the card and makes the route resolve. Everything written here is grounded
 * in the actual repositories and the engagements themselves; no invented
 * metrics.
 */

export const CATEGORIES = ["All", "Founded", "Client work", "Backend", "Full-stack"];

export const projects = [
  /* ─────────────  FEATURED  ───────────── */
  {
    slug: "stayza-pro",
    title: "Stayza Pro",
    subtitle: "Multi-Tenant Realtor Booking SaaS",
    role: "Founder / Product & Full-Stack Engineer",
    status: "In Development",
    featured: true,
    categories: ["Founded", "Full-stack", "Backend"],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Paystack", "Mapbox"],
    summary:
      "B2B booking infrastructure for Nigerian shortlet operators. Multi-tenant property and booking management, wallet and payouts, 50/50 escrow, a 3-lane dispute model, cancellation and pricing rules, WhatsApp-first guest communication, and branded subdomain storefronts.",
    demoUrl: null,
    github: null,
    caseStudy: {
      problem:
        "Nigerian shortlet operators run their businesses across WhatsApp threads, spreadsheets and personal bank transfers. There is no trusted intermediary holding money between a guest paying and an operator delivering, so both sides carry risk on every booking. Off-the-shelf international platforms assume card-first payments, address-based discovery and dispute processes that do not map to how the market actually works.",
      approach:
        "Rather than building another listings site, I designed the product as booking infrastructure that operators put their own brand on. Each operator gets an isolated tenant with a branded subdomain storefront, so they keep their customer relationship while the platform handles money movement, state and disputes underneath.",
      architecture: [
        "Multi-tenant PostgreSQL schema with tenant isolation enforced at the query layer through Prisma, not just in application code",
        "Booking lifecycle modelled as an explicit state machine so every transition is validated and auditable rather than inferred from flags",
        "Escrow ledger holding funds across a 50/50 split, releasing against delivery milestones",
        "Three-lane dispute model routing cases by severity and evidence, so routine cancellations never queue behind genuine conflicts",
        "Paystack for payment collection, wallets, and instant operator withdrawals",
        "WhatsApp-first notification layer, since that is where Nigerian guests and operators already communicate",
        "Mapbox for location and discovery",
      ],
      decisions: [
        {
          title: "White-label over marketplace",
          body: "A marketplace would have put the platform between operators and their customers and forced a demand-generation problem I could not solve on day one. White-label subdomains let operators bring existing demand while still getting escrow, payouts and dispute handling.",
        },
        {
          title: "State machine over boolean flags",
          body: "Bookings touch money, so 'cancelled' and 'refunded' and 'disputed' cannot be independent booleans that drift out of sync. Modelling transitions explicitly made illegal states unrepresentable and gave the audit trail for free.",
        },
        {
          title: "WhatsApp before email",
          body: "Email open rates in this market are poor and operators do not check dashboards. Building notifications around WhatsApp meant the product met users where they already were, at the cost of a more complex integration.",
        },
      ],
      outcome:
        "The platform covers the full operator workflow end to end: listing and property management, guest booking, escrowed payment, milestone release, disputes, cancellations, pricing rules and withdrawals. I own both the business model and the technical architecture.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Paystack", "Mapbox", "WhatsApp API"],
      sections: [
        {
          heading: "SABI — the AI intelligence layer",
          body: "SABI is the AI layer built into Stayza Pro. It handles inbound WhatsApp leads, property recommendations, guest qualification, booking assistance, payment links, follow-ups and operator intelligence. The distinction that matters: it is wired into real backend tools and business workflows through function calling, so it can actually check availability, generate a payment link or qualify a guest against live data — rather than producing plausible text about doing so. Every action it can take is a bounded, auditable operation against the same state machine the rest of the product uses.",
        },
      ],
    },
  },
  {
    slug: "paymarka",
    title: "Paymarka",
    subtitle: "Contract-to-Payment Platform",
    role: "Founder / Product Engineer",
    status: "Client Delivery",
    featured: true,
    categories: ["Founded", "Full-stack", "Backend"],
    tags: ["Next.js", "TypeScript", "Express", "Prisma", "Paystack", "OpenAI"],
    summary:
      "Formerly Receipta. Transaction and deal management across the proposal → agreement → invoice → payment → receipt lifecycle, with AI-assisted proposals, e-signatures, escrow milestone deposits, verifiable transaction records and a full audit trail.",
    demoUrl: null,
    github: null,
    caseStudy: {
      problem:
        "Independent professionals and small agencies lose money in the gap between agreeing work and getting paid for it. The proposal lives in one tool, the contract in another, the invoice in a third, and the payment record nowhere verifiable. When a client disputes scope or timing, there is no single artefact that proves what was agreed and what was delivered.",
      approach:
        "I modelled the entire commercial relationship as one continuous, append-only record rather than a series of disconnected documents. A proposal becomes an agreement, an agreement generates invoices, invoices settle into receipts — each step referencing the last, so the transaction history is verifiable end to end.",
      architecture: [
        "Multi-tenant Express + Prisma API with per-tenant data isolation",
        "Document lifecycle as a linked chain: proposal → agreement → invoice → payment → receipt, each stage immutable once executed",
        "E-signature capture bound to the agreement version that was actually signed, so later edits cannot rewrite history",
        "Escrow milestone deposits via Paystack, releasing against agreed delivery points",
        "AI-assisted proposal drafting scoped to structured inputs, with human review before anything is sent",
        "Append-only audit trail covering every state transition",
      ],
      decisions: [
        {
          title: "Immutability at execution, not at creation",
          body: "Drafts need to be freely editable or the tool is painful to use. Locking documents only at the moment of signature or payment kept authoring fast while making the executed record trustworthy.",
        },
        {
          title: "AI drafts, humans send",
          body: "Generated proposal text is a starting point, never an outbound artefact. Anything the model produces is labelled as a draft and requires explicit human approval — a commercial document sent without review is a liability, not a feature.",
        },
        {
          title: "Escrow as opt-in, not default",
          body: "Escrow adds friction and only earns it on larger or lower-trust engagements. Making it a per-milestone choice let small, high-trust jobs stay frictionless.",
        },
      ],
      outcome:
        "A single product covering the commercial lifecycle that most freelancers currently stitch together from four tools. I own the product model, UX, pricing and branding alongside the implementation.",
      stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Paystack", "OpenAI"],
    },
  },
  {
    slug: "tin",
    title: "T.I.N. — This Is Naija",
    subtitle: "Cultural, Social & Accountability Platform",
    role: "Full-Stack / Product Development",
    status: "In Active Development",
    featured: true,
    categories: ["Client work", "Full-stack", "Backend"],
    tags: ["Next.js 16", "React 19", "Node 24", "Prisma", "Socket.IO", "Expo"],
    summary:
      "Nigerian cultural, social and accountability platform spanning web, API and mobile. Social feeds, news, community, trivia, music, football and trends, plus reputation systems and a fact-checking pipeline. Ships products including the YNDW Watchlist, Naija Rising and Naija Score.",
    demoUrl: null,
    github: null,
    caseStudy: {
      problem:
        "Nigerian social platforms optimise for engagement, which rewards whichever claim spreads fastest regardless of whether it is true. Building a platform that carries news and public accountability content means the misinformation problem is not a moderation afterthought — it is the core product surface. A claim about a public figure needs a verdict, sourcing, and a path to appeal, not just a report button.",
      approach:
        "Fact-checking was designed as first-class domain logic rather than a moderation queue bolted onto a feed. Claims move through cases, assessments and decisions with recorded sourcing and independence tracking, and the result is surfaced back into the feed as structured data — so a reader sees the verdict attached to the claim, not buried in a separate section.",
      architecture: [
        "Three surfaces from one API: Next.js 16 / React 19 web app, Node 24 + Prisma backend, Expo mobile client with EAS builds",
        "Fact-checking domain: cases, assessments, decisions, verdicts, source typing, independence tracking and a multi-stage appeals process",
        "Media forensics and community notes as separate verification signals feeding the same verdict model",
        "Official identity verification with trust tiers, so claims about and by public figures carry provenance",
        "Moderation with explicit appeal states, plus legal and data-request handling",
        "Realtime feeds over Socket.IO using short-lived, single-use tickets rather than long-lived tokens",
        "Reputation and scoring systems powering Naija Score and Naija Rising",
      ],
      decisions: [
        {
          title: "Verification as domain model, not moderation tooling",
          body: "Treating fact-checks as first-class entities with their own lifecycle meant verdicts could be queried, appealed, audited and rendered inline. A moderation queue would have made verification invisible to readers, which defeats the purpose.",
        },
        {
          title: "Single-use realtime tickets",
          body: "Handing browsers a long-lived credential for the socket layer would have widened the blast radius of any leak. Short-lived, single-use tickets meant a captured token is worthless almost immediately.",
        },
        {
          title: "Shared API across web and mobile from the start",
          body: "Building the Expo client against the same API as the web app forced the backend to stay presentation-agnostic early, rather than accumulating web-shaped endpoints that a mobile client would later have to work around.",
        },
      ],
      outcome:
        "An actively developed platform across three surfaces, with the accountability products — YNDW Watchlist, Naija Rising and Naija Score — built on shared verification and reputation infrastructure.",
      stack: ["Next.js 16", "React 19", "Node 24", "TypeScript", "Prisma", "PostgreSQL", "Socket.IO", "Expo", "Cloudinary"],
    },
  },
  {
    slug: "emblue-africa",
    title: "Emblue Africa",
    subtitle: "Social Intelligence Platform",
    role: "Full-Stack Engineer (Client)",
    status: "Client Delivery",
    featured: true,
    categories: ["Client work", "Full-stack", "Backend"],
    tags: ["Next.js", "TypeScript", "Prisma", "Supabase Auth", "Playwright"],
    summary:
      "Delivered major platform functionality for Emblue Africa: the Reply Engine, Dashboard, Approval Queue and “Engage the Engagers.” Supabase Auth with Prisma-backed RBAC, a campaign lifecycle engine, and Playwright end-to-end coverage.",
    demoUrl: null,
    github: null,
    caseStudy: {
      problem:
        "Social engagement at scale is a governance problem before it is a volume problem. Letting a system generate and publish replies on a brand's behalf without review is how brands get into trouble; making a human approve every single one destroys the throughput that made automation worth doing.",
      approach:
        "I built the platform around an explicit approval boundary. Generation and publication are separate stages with a queue between them, so throughput and oversight are tuned independently rather than traded off against each other.",
      architecture: [
        "Reply Engine generating candidate responses as drafts, never as published output",
        "Approval Queue as the control point between generation and publication, with role-gated actions",
        "“Engage the Engagers” targeting the accounts already interacting with a brand rather than broadcasting outward",
        "Dashboard surfacing campaign state, queue depth and engagement outcomes",
        "Supabase Auth for identity, with authorisation resolved from Prisma tables — identity and permission deliberately kept separate",
        "Campaign lifecycle engine with explicit states rather than status strings",
        "Playwright end-to-end coverage plus schema-contract and RBAC-policy checks running in CI",
      ],
      decisions: [
        {
          title: "Supabase proves identity; Prisma decides permission",
          body: "Letting the auth provider also own roles couples authorisation to a vendor and makes object-level permission checks awkward. Keeping RBAC in application tables meant permissions could be reasoned about, tested and audited independently of who issued the token.",
        },
        {
          title: "RBAC policy assertions in CI",
          body: "Permission regressions are silent and expensive. Running policy checks as part of the pipeline meant a change that widened access failed the build rather than shipping quietly.",
        },
        {
          title: "Approval queue over per-reply sign-off",
          body: "Batching review into a dedicated queue with role-gated bulk actions preserved human oversight without making a reviewer the bottleneck on every individual reply.",
        },
      ],
      outcome:
        "Delivered the core platform surfaces on someone else's commercial product, in an active codebase — Reply Engine, Dashboard, Approval Queue and Engage the Engagers — with end-to-end test coverage and CI-enforced access policy.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase Auth", "Playwright"],
    },
  },
  {
    slug: "vortex-island",
    title: "Vortex Island",
    subtitle: "Event Ticketing Platform",
    role: "Backend Developer",
    status: "Live",
    featured: true,
    categories: ["Client work", "Backend"],
    tags: ["TypeScript", "Express", "Prisma", "PostgreSQL", "Paystack"],
    summary:
      "SaaS ticketing platform with event creation, guest checkout, quota-based subscriptions, FIFO stock management and Paystack payment integration.",
    demoUrl: "https://www.vortex-island.com/",
    github: "https://github.com/Beenflexxin01/vortex-backend.git",
    caseStudy: {
      problem:
        "Ticketing is a concurrency problem wearing a CRUD costume. The moment a popular event opens, many buyers contend for the same limited stock, and any gap between checking availability and committing a sale becomes an oversell — which means refunds, angry customers and a damaged organiser relationship.",
      approach:
        "I treated inventory as the hard constraint and designed allocation to be correct under contention first, then made the surrounding checkout as frictionless as possible — including buying without an account, since forcing registration at the moment of purchase is where ticket sales die.",
      architecture: [
        "FIFO stock allocation so tickets are released in the order they were made available",
        "Availability checks and sale commitment kept in a single transactional boundary to prevent overselling under concurrent load",
        "Guest checkout path requiring no account, with the ticket bound to the purchase rather than a user record",
        "Quota-based subscription tiers governing what organisers can list and sell",
        "Ticket lifecycle handled as explicit states from issue through redemption",
        "Paystack integration with webhook reconciliation, so payment truth comes from the provider rather than the client",
      ],
      decisions: [
        {
          title: "Guest checkout as a first-class path",
          body: "Account creation at the point of purchase is a conversion cliff for one-off ticket buyers. Making guest checkout a real path rather than a fallback meant the data model had to treat a ticket as independent of a user account.",
        },
        {
          title: "Webhooks as source of payment truth",
          body: "Client-side confirmation can be lost, replayed or forged. Reconciling against Paystack webhooks meant a dropped browser session never produced a paid-but-unissued ticket.",
        },
      ],
      outcome:
        "A live ticketing platform handling event creation, quota-governed organiser subscriptions and the full purchase-to-redemption lifecycle.",
      stack: ["TypeScript", "Express", "Prisma", "PostgreSQL", "Paystack"],
    },
  },

  /* ─────────────  STANDARD  ───────────── */
  {
    slug: "gigaeden",
    title: "GigaEden",
    subtitle: "Proptech Marketplace",
    role: "Product Engineer",
    status: "In Development",
    featured: false,
    categories: ["Founded", "Full-stack"],
    tags: ["Product Definition", "System Architecture", "TypeScript", "PostgreSQL"],
    summary:
      "Property and venue marketplace built from a full PRD and technical architecture. Verified listings, booking engine, payments, concierge functionality and 3D property walkthroughs.",
    demoUrl: null,
    github: null,
  },
  {
    slug: "mar-abu-pm",
    title: "MAR ABU — Project Management System",
    role: "Full Stack Developer (Contract)",
    status: "Delivered",
    featured: false,
    categories: ["Client work", "Full-stack"],
    tags: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL", "Redis"],
    summary:
      "Enterprise-grade JIRA-like PM system with Agile/Waterfall/Kanban, sprint management, RBAC, and real-time Kanban boards.",
    demoUrl: null,
    github: "https://github.com/MAR-ABU-PROJECTS/TaskManagement-Workflow",
  },
  {
    slug: "mar-abu-booking",
    title: "MAR ABU Booking Platform",
    role: "Full Stack Developer (Contract)",
    status: "Live",
    featured: false,
    categories: ["Client work", "Full-stack", "Backend"],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Express"],
    summary:
      "Backend-heavy booking platform with NextAuth.js authentication, booking workflow orchestration, Prisma ORM, and PostgreSQL.",
    demoUrl: "https://booking.marabuprojects.com/",
    github: "https://github.com/MAR-ABU-PROJECTS/Booking-System.git",
  },
  {
    slug: "tekari-employment",
    title: "Custom Employment Platform",
    role: "Full-Stack Developer (Contract)",
    status: "Client Delivery",
    featured: false,
    categories: ["Client work", "Full-stack"],
    tags: ["Full-Stack", "Client Project"],
    summary:
      "Commercially contracted custom employment platform delivered for Tekari Studios, scoped and shipped under a formal proposal and contract.",
    demoUrl: null,
    github: null,
  },
  {
    slug: "novnuga",
    title: "Novnuga — E-Commerce Backend",
    role: "Backend Developer (Contract)",
    status: "Live",
    featured: false,
    categories: ["Client work", "Backend"],
    tags: ["TypeScript", "Express", "Prisma", "PostgreSQL", "Paystack"],
    summary:
      "113+ endpoint e-commerce API with 2FA, traffic analytics, Cloudinary uploads, Paystack payments, and GDPR data export.",
    demoUrl: "https://novnuga.com/",
    github: "https://github.com/Beenflexxin01/Novnuga-Backend.git",
  },
  {
    slug: "oa-softwares",
    title: "OA Softwares Backend",
    role: "Backend Developer (Contract)",
    status: "Live",
    featured: false,
    categories: ["Client work", "Backend"],
    tags: ["TypeScript", "Express", "Prisma", "PostgreSQL", "Jest"],
    summary:
      "Milestone-based web development platform API with consultation management, CI/CD, and structured logging.",
    demoUrl: "https://oa-softwares.com/",
    github: "https://github.com/Beenflexxin01/OA-Backend",
  },
  {
    slug: "jointearn",
    title: "JoinTearn Admin Dashboard",
    role: "Backend Developer (Contract)",
    status: "Delivered",
    featured: false,
    categories: ["Client work", "Backend"],
    tags: ["TypeScript", "Express", "Prisma", "PostgreSQL", "Redis"],
    summary:
      "Backend API for a gamified content platform with RBAC, content moderation, reward points, challenges, and Swagger docs.",
    demoUrl: null,
    github: "https://github.com/Jointearn/admin-portal-backend.git",
  },
  {
    slug: "finance-tracker",
    title: "Finance Tracker API",
    role: "Personal Backend Project",
    status: "Live",
    featured: false,
    categories: ["Backend"],
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "React"],
    summary:
      "Backend-first personal finance system with JWT authentication, email verification and password resets, income and expense tracking, an analytics dashboard, and Excel export.",
    demoUrl: "https://finance-tracker-blue-nine.vercel.app",
    github: "https://github.com/Sylester-Oputa/finance-tracker.git",
  },
  {
    slug: "pos-system",
    title: "Phone Accessory Store — POS System",
    role: "Full-Stack Developer",
    status: "Delivered",
    featured: false,
    categories: ["Full-stack"],
    tags: ["Electron", "React", "TypeScript", "Express", "SQLite", "Prisma"],
    summary:
      "Offline-first desktop inventory & POS with FIFO stock allocation, receipt printing, profit tracking, and database backup/restore.",
    demoUrl: null,
    github: "https://github.com/Sylester-Oputa/Inventory-management-system",
  },
  {
    slug: "upwey",
    title: "Upwey Real Estate",
    role: "Junior Web Developer",
    status: "Live",
    featured: false,
    categories: ["Client work", "Full-stack"],
    tags: ["React", "Redux Toolkit", "Tailwind CSS"],
    summary: "Real estate platform with real-time property updates.",
    demoUrl: "https://upwey.com.ng/",
    github: "https://github.com/JimOluwaseyi/upwey-frontend.git",
  },
  {
    slug: "ego-oputa",
    title: "Ego Oputa — Professional Portfolio",
    role: "Full-Stack Developer (Client)",
    status: "Live",
    featured: false,
    categories: ["Client work", "Full-stack"],
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    summary:
      "Client portfolio site for a virtual assistance and customer service professional, with experience timeline, testimonials and contact routing.",
    demoUrl: "https://ego-oputa.vercel.app",
    github: "https://github.com/Sylester-Oputa/Ego-oputa",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const standardProjects = projects.filter((p) => !p.featured);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const caseStudies = projects.filter((p) => p.caseStudy);
