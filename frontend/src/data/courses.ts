import {
  demoModules,
  beginnerModules,
  advancedModules,
  agentModules,
  automationModules,
  webModules,
  appModules,
  creativeModules,
  proModules,
  Module,
} from "./modules";

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  tag: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  timing: string;
  coding: string;
  certificate: string;
  overview: string;
  audience: string;
  modules: Module[];
  ctaLabel: string;
}

export const courses: Course[] = [
  {
    slug: "demo-class",
    title: "AI Demo Class",
    shortTitle: "Demo Class",
    tag: "01",
    price: 249,
    priceLabel: "₹249",
    duration: "Single Session",
    timing: "1 Hour",
    coding: "No Coding Required",
    certificate: "Certificate of Participation",
    overview:
      "A short, hands-on introduction to the world of AI — perfect if you're curious about AI but not sure where to start.",
    audience: "Anyone new to AI who wants a practical first taste before committing to a full course.",
    modules: demoModules,
    ctaLabel: "Join Demo",
  },
  {
    slug: "beginner",
    title: "AI Beginner Batch",
    shortTitle: "Beginner Batch",
    tag: "02",
    price: 1499,
    priceLabel: "₹1,499",
    duration: "10–12 Days",
    timing: "1 Hour Per Day",
    coding: "No Coding Required",
    certificate: "Certificate of Completion",
    overview:
      "A complete beginner-friendly path covering prompt engineering, AI content creation, and website building — no prior experience needed.",
    audience: "Students, professionals, and career-switchers who want practical AI skills without needing to code.",
    modules: beginnerModules,
    ctaLabel: "View Beginner Course",
  },
  {
    slug: "advanced",
    title: "AI Advanced Batch",
    shortTitle: "Advanced Batch",
    tag: "03",
    price: null,
    priceLabel: "Contact for Pricing",
    duration: "12–15 Days",
    timing: "1 Hour Per Day",
    coding: "Some Technical Concepts Introduced",
    certificate: "Advanced Level Certificate of Completion",
    overview:
      "A deep, practical program covering AI agents, automation, website deployment, and building an AI-powered business or agency.",
    audience: "Beginner-batch graduates or professionals ready to build, launch, and monetize with AI.",
    modules: advancedModules,
    ctaLabel: "View Advanced Course",
  },
  {
    slug: "ai-agent",
    title: "AI Agent Masterclass",
    shortTitle: "AI Agent Batch",
    tag: "04",
    price: 2499,
    priceLabel: "₹2,499",
    duration: "10–12 Days",
    timing: "1 Hour Per Day",
    coding: "No Coding / Low-Code AI Agents",
    certificate: "AI Agent Specialist Certificate",
    overview:
      "Master single & multi-agent systems, AutoGPT, CrewAI, and Custom GPTs that execute autonomous tasks for real-world projects.",
    audience: "Developers, entrepreneurs, and AI enthusiasts looking to build autonomous AI agent networks.",
    modules: agentModules,
    ctaLabel: "Enroll in AI Agents",
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Workflows (n8n & Make)",
    shortTitle: "AI Automation Batch",
    tag: "05",
    price: 2999,
    priceLabel: "₹2,999",
    duration: "12–15 Days",
    timing: "1 Hour Per Day",
    coding: "No Coding / Webhooks & APIs",
    certificate: "AI Automation Engineer Certificate",
    overview:
      "Build automated business pipelines with n8n, Make, webhooks, databases, and AI API endpoints to eliminate manual work.",
    audience: "Business owners, marketers, and operations managers wanting to automate business workflows end-to-end.",
    modules: automationModules,
    ctaLabel: "Enroll in AI Automation",
  },
  {
    slug: "ai-website-building",
    title: "AI Website Building & Web Development",
    shortTitle: "AI Web Batch",
    tag: "06",
    price: 1999,
    priceLabel: "₹1,999",
    duration: "8–10 Days",
    timing: "1 Hour Per Day",
    coding: "No Coding / Low-Code Web",
    certificate: "AI Web Developer Certificate",
    overview:
      "Design, build, and deploy high-converting responsive business websites and landing pages using AI-assisted workflows.",
    audience: "Freelancers, agency founders, and students who want to build and launch client websites using AI.",
    modules: webModules,
    ctaLabel: "Enroll in AI Web Building",
  },
  {
    slug: "ai-app-development",
    title: "AI App Development & Custom Chatbots",
    shortTitle: "AI App Batch",
    tag: "07",
    price: 3499,
    priceLabel: "₹3,499",
    duration: "14–16 Days",
    timing: "1 Hour Per Day",
    coding: "Some Technical Concepts Introduced",
    certificate: "AI Application Developer Certificate",
    overview:
      "Build custom AI applications, vector search RAG systems, OpenAI API integrations, and embed intelligent chatbots on live web apps.",
    audience: "Software engineers, tech leads, and product builders wanting to develop functional AI applications.",
    modules: appModules,
    ctaLabel: "Enroll in AI App Dev",
  },
  {
    slug: "ai-content-design",
    title: "AI Content Creation & Graphic Design",
    shortTitle: "AI Creative Batch",
    tag: "08",
    price: 1499,
    priceLabel: "₹1,499",
    duration: "7–10 Days",
    timing: "1 Hour Per Day",
    coding: "No Coding Required",
    certificate: "AI Creative Designer Certificate",
    overview:
      "Generate studio-grade brand logos, marketing graphics, social media banners, AI video ads, and copy using Midjourney & Canva AI.",
    audience: "Content creators, social media managers, graphic designers, and marketers wanting to supercharge output with AI.",
    modules: creativeModules,
    ctaLabel: "Enroll in AI Content & Design",
  },
  {
    slug: "bci-pro",
    title: "BCI PRO - Professional AI Skills",
    shortTitle: "BCI Pro Batch",
    tag: "09",
    price: 2999,
    priceLabel: "₹2,999",
    duration: "15–20 Days",
    timing: "1 Hour Per Day",
    coding: "No Coding / Low-Code AI Integration",
    certificate: "BCI Pro Professional Certificate",
    overview:
      "Master professional AI tools, autonomous AI agents, web creation, and business automation to launch your career or AI agency.",
    audience: "Professionals, web developers, entrepreneurs, and ambitious learners looking to master professional AI skills.",
    modules: proModules,
    ctaLabel: "Enroll in BCI Pro",
  },
];

export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
