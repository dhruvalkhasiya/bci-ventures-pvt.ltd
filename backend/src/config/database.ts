import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import User from "../models/User";
import Course from "../models/Course";
import Certificate from "../models/Certificate";

const demoModules = [
  { number: 1, title: "Introduction to GenAI & AI Landscape", description: "Understand ChatGPT, Claude, Gemini, LLMs, and real-world digital transformation across industries." },
  { number: 2, title: "Prompt Engineering Foundations", description: "Master zero-shot, few-shot, system prompts, role prompting, and clear instruction rules." },
  { number: 3, title: "Top Practical AI Tools Showcase", description: "Guided tour of top productivity tools for text generation, graphics, research, and slides." },
  { number: 4, title: "Creative AI Content & Copywriting", description: "Generate high-impact social media posts, marketing emails, blogs, and persuasive creative copy." },
  { number: 5, title: "AI for Career, Students & Daily Productivity", description: "Resume optimization, study workflows, note summarization, and daily task acceleration." },
  { number: 6, title: "Hands-On Practical Mini-Project", description: "Apply everything learned to build your first AI-assisted practical project during the live session." },
  { number: 7, title: "BCI Learning Roadmap & Next Steps", description: "Personal growth roadmap, career guidance, and pathways for continuing into full AI batches." },
];

const beginnerModules = [
  { number: 1, title: "Mastering Prompt Engineering", description: "Advanced role prompting, chain-of-thought reasoning, prompt constraints, and reusable prompt libraries." },
  { number: 2, title: "Context Engineering & Memory", description: "Structuring clean context windows, custom system instructions, and long-form document synthesis." },
  { number: 3, title: "Daily Workflow Automation with ChatGPT & Claude", description: "Automate web research, email writing, data formatting, report generation, and meeting summaries." },
  { number: 4, title: "AI Presentations & Slide Decks", description: "Create professional pitch decks, presentation slides, and visual outlines using Gamma & AI tools." },
  { number: 5, title: "No-Code AI App & Tool Creation", description: "Build custom interactive tools, calculators, and workflow helpers without writing code." },
  { number: 6, title: "AI Image Generation & Graphic Design", description: "Create brand logos, social media marketing banners, and visual artwork with Midjourney, DALL-E 3 & Canva AI." },
  { number: 7, title: "AI Video Creation & Voiceovers", description: "Produce short-form videos, digital avatar presentations, and natural voiceovers for social media & ads." },
  { number: 8, title: "No-Code AI Website Building", description: "Design, build, and launch a fully responsive business website using AI builders in under 60 minutes." },
  { number: 9, title: "AI Branding, Social Media & Marketing", description: "Craft complete brand identity packages, content calendars, ad copy, and social media campaigns." },
  { number: 10, title: "Capstone Project & Portfolio Launch", description: "Publish your live beginner capstone project and receive your official BCI Certificate of Completion." },
];

const advancedModules = [
  { number: 1, title: "Enterprise Prompt & System Architecture", description: "Complex multi-role prompting, JSON schema outputs, system instruction design, and API-ready prompts." },
  { number: 2, title: "Structured Data & Knowledge Base Engineering", description: "Retrieval concepts, vector search, embeddings, document indexing, and context structuring." },
  { number: 3, title: "Autonomous AI Agents (AutoGPT, CrewAI, GPTs)", description: "Design and deploy single and multi-agent workflows capable of autonomous task execution." },
  { number: 4, title: "Multi-Step Business Automation with n8n & Make", description: "Connect apps, webhooks, databases, and LLM endpoints into automated enterprise pipelines." },
  { number: 5, title: "Full-Stack Web Development with AI Assistants", description: "Build modern web applications, dashboards, and client portals using AI coding assistants." },
  { number: 6, title: "Live Website Deployment, Custom Domains & SEO", description: "Host websites live, configure custom domains, SSL certificates, and AI-driven SEO strategies." },
  { number: 7, title: "Building AI Chatbots & Customer Assistants", description: "Train custom AI chatbots on private business documentation and embed them live on web applications." },
  { number: 8, title: "Personal Branding & Executive Content Engine", description: "Build an automated personal branding content engine for LinkedIn, YouTube, and X." },
  { number: 9, title: "Strategic AI Integration for Business Operations", description: "Streamline HR, finance, sales pipelines, and customer support using custom AI integrations." },
  { number: 10, title: "AI Agency Setup & Client Acquisition", description: "Package AI automation services, structure monthly retainer pricing, and pitch to global clients." },
  { number: 11, title: "End-to-End Enterprise Automation Pipelines", description: "Build production-grade automated workflows with failover handling, logging, and notifications." },
  { number: 12, title: "Portfolio Showcase & Advanced Certification", description: "Publish a client-ready project portfolio and earn the BCI Advanced Level Certificate of Completion." },
];

const agentModules = [
  { number: 1, title: "Autonomous Agent Architecture", description: "Core concepts of AI agents, task decomposition, planning loops, and memory stores." },
  { number: 2, title: "Building Custom GPTs & Assistants", description: "Configuring system instructions, knowledge retrieval files, and custom OpenAPI actions." },
  { number: 3, title: "AutoGPT & CrewAI Workflows", description: "Setting up multi-agent networks where specialized agents collaborate to complete complex goals." },
  { number: 4, title: "Agentic Tool Execution & Web Browsing", description: "Equipping agents with python, web search, code execution, and database connection tools." },
  { number: 5, title: "Agent Deployment & Live Project Launch", description: "Hosting autonomous agents live on servers with error recovery and performance monitoring." },
];

const automationModules = [
  { number: 1, title: "Introduction to n8n & Make Automation", description: "Understanding triggers, nodes, webhooks, JSON payloads, and workflow execution logic." },
  { number: 2, title: "Integrating AI APIs into Automated Pipelines", description: "Connecting OpenAI, Claude, and Gemini API nodes inside automated n8n & Make workflows." },
  { number: 3, title: "Automated Lead Funnels & Email Systems", description: "Building instant AI response bots for email, WhatsApp, CRM updates, and lead capture." },
  { number: 4, title: "Database & Google Sheets Auto-Sync", description: "Auto-syncing real-time customer data, order updates, and report generation using webhooks." },
  { number: 5, title: "Enterprise Automation Blueprint & Deployment", description: "Deploying high-reliability automated pipelines with error alerts, retries, and monitoring." },
];

const webModules = [
  { number: 1, title: "AI Web Design & Structure Basics", description: "Creating sitemaps, wireframes, and UI layouts in under 30 minutes using AI design tools." },
  { number: 2, title: "Building Modern Websites with AI Coders", description: "Prompting AI assistants to generate clean, responsive HTML/CSS/Tailwind & React code." },
  { number: 3, title: "Custom Branding & High-Converting Copy", description: "Generating brand typography, color palettes, hero section copy, and features with AI." },
  { number: 4, title: "Live Domain Connection, SSL & Hosting", description: "Deploying websites live to Vercel/Netlify with custom domain DNS configuration." },
  { number: 5, title: "AI-Powered SEO & Growth Optimization", description: "Optimizing page speed, meta tags, schema markup, and organic search ranking with AI." },
];

const appModules = [
  { number: 1, title: "Full-Stack AI Application Architecture", description: "Setting up frontend, backend API, authentication, and AI LLM endpoints." },
  { number: 2, title: "Vector Databases & RAG (Retrieval Augmented Gen)", description: "Indexing private PDFs/docs into vector stores for accurate AI question answering." },
  { number: 3, title: "Embedding AI Chatbots on Websites", description: "Building custom interactive chatbot widgets and embedding them on any live website." },
  { number: 4, title: "User Auth, Database & State Management", description: "Handling user accounts, chat history persistence, and database CRUD operations." },
  { number: 5, title: "Publishing & Hosting AI Applications", description: "Deploying production-grade AI web apps live with rate limiting and security headers." },
];

const creativeModules = [
  { number: 1, title: "Midjourney & DALL-E 3 Masterclass", description: "Writing photorealistic prompts, aspect ratios, style parameters, and image variations." },
  { number: 2, title: "Canva AI & Brand Asset Generation", description: "Creating professional logos, social media posts, presentation decks, and marketing banners." },
  { number: 3, title: "AI Video Ads & Avatar Creation", description: "Generating AI digital presenters, video scripts, voiceovers, and promotional reels." },
  { number: 4, title: "High-Converting AI Copywriting", description: "Writing ad headlines, email newsletters, sales letters, and landing page text." },
  { number: 5, title: "Creative Brand Kit Portfolio", description: "Assembling a complete visual brand kit portfolio for client presentation." },
];

const proModules = [
  { number: 1, title: "Professional AI Skills Overview & Toolstack Setup", description: "Orientation, developer environment setup, professional AI toolstack configuration, and workflow design." },
  { number: 2, title: "Advanced Prompt & Context Engineering for Developers", description: "High-accuracy prompts, XML/JSON parsing, system instruction rules, and multi-turn context handling." },
  { number: 3, title: "Enterprise AI Automation Workflows (n8n & Make)", description: "Automate complex multi-app business processes using webhooks, REST APIs, and automated triggers." },
  { number: 4, title: "Autonomous AI Agent Networks & Custom GPTs", description: "Multi-agent collaboration, delegation strategies, custom action OpenAPI schemas, and execution loops." },
  { number: 5, title: "Professional Web Design & Full-Stack AI Creation", description: "Rapid building of high-converting web platforms and client software using AI assistants." },
  { number: 6, title: "AI Content, Graphic & Media Production Suite", description: "Studio-grade graphic assets, video ads, sales copy, and UI mockups generated with top AI models." },
  { number: 7, title: "Database & API Integration for AI Applications", description: "Connecting databases (MongoDB, Firebase) and RESTful APIs to custom AI frontends." },
  { number: 8, title: "Business Process Automation & Operations", description: "Eliminate operational bottlenecks by deploying automated AI triggers across core workflows." },
  { number: 9, title: "Monetization, Freelancing & AI Agency Systems", description: "Freelance client strategies, proposal templates, pricing models, and scaling an AI agency." },
  { number: 10, title: "Professional BCI Pro Certification & Project Launch", description: "Final live client project verification, portfolio review, and BCI Pro Master Certificate issuance." },
];

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUri = process.env.MONGO_URI;

  if (mongoUri && !mongoUri.includes("127.0.0.1:27017")) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
      console.log("[Database] Connected to external MONGO_URI");
      await seedInitialData();
      return;
    } catch (err) {
      console.warn("[Database] Could not connect to external MONGO_URI:", err);
      if (process.env.VERCEL || process.env.NODE_ENV === "production") {
        console.error("[Database] Production deployment requires a valid MONGO_URI. Please set MONGO_URI in Vercel Environment Variables.");
        return;
      }
    }
  }

  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    console.error("[Database] MONGO_URI missing. Please set MONGO_URI in Vercel Environment Variables.");
    return;
  }

  try {
    const dbDir = path.join(__dirname, "../../data/mongodb");
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
    
    console.log("Starting disk-backed local MongoDB database engine...");
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create({
      instance: { dbPath: dbDir, storageEngine: "wiredTiger" },
    });
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log(`Disk-backed MongoDB database engine running live at ${uri}`);
    await seedInitialData();
  } catch (error) {
    console.error("[Database] Error starting MongoDB engine:", error);
  }
}

async function seedInitialData() {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@bciventures.in").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    let existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: process.env.ADMIN_NAME || "BCI Administrator",
        email: adminEmail,
        passwordHash,
        role: "admin",
      });
      console.log(`[Seed] Created admin account: ${adminEmail}`);
    } else {
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
      console.log(`[Seed] Verified admin password for: ${adminEmail}`);
    }

    const defaultCourses = [
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
        overview: "A short, hands-on introduction to the world of AI — perfect if you're curious about AI but not sure where to start.",
        audience: "Anyone new to AI who wants a practical first taste before committing to a full course.",
        modules: demoModules,
        ctaLabel: "Join Demo",
        status: "published",
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
        overview: "A complete beginner-friendly path covering prompt engineering, AI content creation, and website building — no prior experience needed.",
        audience: "Students, professionals, and career-switchers who want practical AI skills without needing to code.",
        modules: beginnerModules,
        ctaLabel: "View Beginner Course",
        status: "published",
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
        overview: "A deep, practical program covering AI agents, automation, website deployment, and building an AI-powered business or agency.",
        audience: "Beginner-batch graduates or professionals ready to build, launch, and monetize with AI.",
        modules: advancedModules,
        ctaLabel: "View Advanced Course",
        status: "published",
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
        overview: "Master single & multi-agent systems, AutoGPT, CrewAI, and Custom GPTs that execute autonomous tasks for real-world projects.",
        audience: "Developers, entrepreneurs, and AI enthusiasts looking to build autonomous AI agent networks.",
        modules: agentModules,
        ctaLabel: "Enroll in AI Agents",
        status: "published",
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
        overview: "Build automated business pipelines with n8n, Make, webhooks, databases, and AI API endpoints to eliminate manual work.",
        audience: "Business owners, marketers, and operations managers wanting to automate business workflows end-to-end.",
        modules: automationModules,
        ctaLabel: "Enroll in AI Automation",
        status: "published",
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
        overview: "Design, build, and deploy high-converting responsive business websites and landing pages using AI-assisted workflows.",
        audience: "Freelancers, agency founders, and students who want to build and launch client websites using AI.",
        modules: webModules,
        ctaLabel: "Enroll in AI Web Building",
        status: "published",
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
        overview: "Build custom AI applications, vector search RAG systems, OpenAI API integrations, and embed intelligent chatbots on live web apps.",
        audience: "Software engineers, tech leads, and product builders wanting to develop functional AI applications.",
        modules: appModules,
        ctaLabel: "Enroll in AI App Dev",
        status: "published",
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
        overview: "Generate studio-grade brand logos, marketing graphics, social media banners, AI video ads, and copy using Midjourney & Canva AI.",
        audience: "Content creators, social media managers, graphic designers, and marketers wanting to supercharge output with AI.",
        modules: creativeModules,
        ctaLabel: "Enroll in AI Content & Design",
        status: "published",
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
        overview: "Master professional AI tools, autonomous AI agents, web creation, and business automation to launch your career or AI agency.",
        audience: "Professionals, web developers, entrepreneurs, and ambitious learners looking to master professional AI skills.",
        modules: proModules,
        ctaLabel: "Enroll in BCI Pro",
        status: "published",
      },
    ];

    for (const item of defaultCourses) {
      const existing = await Course.findOne({ slug: item.slug });
      if (!existing) {
        await Course.create(item);
      } else {
        await Course.updateOne({ slug: item.slug }, { $set: { modules: item.modules, status: item.status } });
      }
    }
    console.log("[Seed] Synced all 9 courses and module topics to disk");

    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.create({
        certificateId: "BCI-DEMO-0001",
        studentName: "Rahul Sharma",
        courseName: "AI Beginner Batch",
        issueDate: new Date(),
        status: "valid",
      });
    }
  } catch (error) {
    console.error("[Seed] Error seeding data:", error);
  }
}