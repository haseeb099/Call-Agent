import type { LandingMessages } from "@/marketing/i18n/types"

export const en = {
  common: {
    home: "Home",
    tryFree: "Try for free",
    viewPricing: "View pricing",
    seePricing: "See pricing",
    startFree: "Start free",
    contactUs: "Contact us",
    noCreditCard: "No credit card required",
    cancelAnytime: "Cancel anytime",
    noCreditCardCancelAnytime: "No credit card required. Cancel anytime.",
    commonQuestions: "Common questions",
    relatedResources: "Related resources",
    featured: "Featured",
    latestBlogPosts: "Latest blog posts",
    productResources: "Product resources",
    readComparison: "Read comparison",
    viewSolution: "View solution",
    seeFullFeatureList: "See the full feature list",
  },
  setupPrompts: {
    title: "Let your AI assistant set it up",
    intro:
      "Copy a prompt and paste it into your assistant. It reads our docs, shows you a plan, and stops when it needs you.",
    copy: "Copy prompt",
    copied: "Copied",
    blocked: "Your browser blocked copying. Copy the prompt from here:",
  },
  routes: {
    "/": {
      title: "AI Receptionist Software for Small Businesses | Ringwise",
      description:
        "Ringwise answers your business calls 24/7, books appointments into your calendar, and transfers urgent calls to your team. Open source, with a free plan.",
    },
    "/features/": {
      title: "AI receptionist features for calls, booking, and alerts",
      description:
        "Explore Ringwise features for phone answering, appointment booking, call transfers, owner alerts, and call summaries.",
    },
    "/pricing/": {
      title: "AI Receptionist Pricing for Small Businesses",
      description:
        "Compare Ringwise AI receptionist pricing for Free, Starter, Pro, and Enterprise plans, including voice minutes, annual billing, SMS alerts, and overage rates.",
    },
    "/pricing/self-hosted/": {
      title: "Self-Hosted AI Receptionist Pricing and Support | Ringwise",
      description:
        "Self-host Ringwise's AI receptionist free with every feature, or add Premium or Enterprise support for email or Slack help, faster replies and upgrades.",
    },
    "/solutions/": {
      title: "AI Receptionist Solutions | Ringwise",
      description:
        "Find a Ringwise AI receptionist for phone answering, booking, after-hours coverage, home services, dental offices, salons, or self-hosting.",
    },
    "/solutions/ai-phone-answering/": {
      title: "AI Phone Answering Service for Small Businesses | Ringwise",
      description:
        "Answer business calls 24/7 with Ringwise. Qualify callers, capture details, book appointments, and route urgent requests to the right person.",
    },
    "/solutions/ai-appointment-scheduler/": {
      title: "AI Appointment Scheduler and Answering Service | Ringwise",
      description:
        "Ringwise is an answering service with appointment scheduling built in. It books appointments during calls, captures caller details, sends confirmations, and routes urgent requests.",
    },
    "/solutions/ai-receptionist-for-home-services/": {
      title: "Home Services Answering Service with AI | Ringwise",
      description:
        "Ringwise is an AI answering service for home services teams. It answers HVAC, plumbing, electrical, roofing, and landscaping calls while crews are on the job.",
    },
    "/missed-call-revenue-calculator/": {
      title: "Missed Call Revenue Calculator | Ringwise",
      description:
        "Estimate weekly, monthly, and annual revenue at risk from missed contractor calls. Calculate how much you could recover with a 24/7 receptionist.",
    },
    "/blog/": {
      title: "AI Receptionist Blog and Product Updates",
      description:
        "Read Ringwise product updates and practical guides about AI receptionists, phone answering, appointment booking, and small-business call automation.",
    },
    "/changelog/": {
      title: "Ringwise AI Receptionist Changelog",
      description:
        "Follow Ringwise releases, including AI receptionist improvements, dashboard changes, booking and telephony integrations, and newly shipped workflows.",
    },
    "/docs/api/": {
      title: "Ringwise Public API Documentation",
      description:
        "Explore Ringwise public discovery endpoints, OpenAPI metadata, service status, JSON-LD graphs, RSS, Markdown resources, and integration documentation.",
    },
    "/privacy/": {
      title: "Privacy Policy - Ringwise",
      description:
        "Privacy Policy for Ringwise, including call, SMS, consent, appointment, account, billing, analytics, and support data.",
    },
    "/cookie-policy/": {
      title: "Cookie Policy - Ringwise",
      description:
        "Cookie Policy for Ringwise, including necessary cookies, analytics storage, browser controls, and cookie preferences.",
    },
    "/terms/": {
      title: "Terms of Service - Ringwise",
      description:
        "Terms of Service for Ringwise, the business AI receptionist platform for calls, SMS alerts, booking, and call transfers.",
    },
    "/search/": {
      title: "Search - Ringwise",
      description:
        "Search Ringwise pages, blog posts, product resources, pricing details, and public agent-discovery documentation.",
    },
    "/features/mcp/": {
      title: "AI Receptionist MCP Server for Claude and ChatGPT | Ringwise",
      description:
        "Connect Claude, ChatGPT, Cursor or VS Code to the Ringwise AI receptionist MCP server. Review calls, book appointments, edit contacts and change your hours.",
    },
    "/white-label/": {
      title: "Open-source white-label AI receptionist | Ringwise",
      description:
        "Resell a white-label AI receptionist under your agency's brand and domain. Bill clients on your own Stripe, share one pool of minutes, and start free.",
    },
    "/affiliate-program/": {
      title: "Ringwise Affiliate Program | Earn 20% Commission",
      description:
        "Refer businesses to hosted Ringwise plans and earn 20% of their payments for 12 months. Referrals save 5% at signup. PayPal payouts monthly.",
    },
    "/404/": {
      title: "Page not found - Ringwise",
      description:
        "The Ringwise page you requested could not be found. Search or return to the homepage.",
    },
  },
} satisfies LandingMessages
