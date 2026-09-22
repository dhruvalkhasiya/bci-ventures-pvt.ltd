import { demoModules, beginnerModules, advancedModules, Module } from "./modules";

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
];

export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
