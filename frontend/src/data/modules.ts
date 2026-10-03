export interface Module {
  number: number;
  title: string;
  description: string;
}

export const demoModules: Module[] = [
  { number: 1, title: "Introduction to GenAI & AI Landscape", description: "Understand ChatGPT, Claude, Gemini, LLMs, and real-world digital transformation across industries." },
  { number: 2, title: "Prompt Engineering Foundations", description: "Master zero-shot, few-shot, system prompts, role prompting, and clear instruction rules." },
  { number: 3, title: "Top Practical AI Tools Showcase", description: "Guided tour of top productivity tools for text generation, graphics, research, and slides." },
  { number: 4, title: "Creative AI Content & Copywriting", description: "Generate high-impact social media posts, marketing emails, blogs, and persuasive creative copy." },
  { number: 5, title: "AI for Career, Students & Daily Productivity", description: "Resume optimization, study workflows, note summarization, and daily task acceleration." },
  { number: 6, title: "Hands-On Practical Mini-Project", description: "Apply everything learned to build your first AI-assisted practical project during the live session." },
  { number: 7, title: "BCI Learning Roadmap & Next Steps", description: "Personal growth roadmap, career guidance, and pathways for continuing into full AI batches." },
];

export const beginnerModules: Module[] = [
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

export const advancedModules: Module[] = [
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

export const agentModules: Module[] = [
  { number: 1, title: "Autonomous Agent Architecture", description: "Core concepts of AI agents, task decomposition, planning loops, and memory stores." },
  { number: 2, title: "Building Custom GPTs & Assistants", description: "Configuring system instructions, knowledge retrieval files, and custom OpenAPI actions." },
  { number: 3, title: "AutoGPT & CrewAI Workflows", description: "Setting up multi-agent networks where specialized agents collaborate to complete complex goals." },
  { number: 4, title: "Agentic Tool Execution & Web Browsing", description: "Equipping agents with python, web search, code execution, and database connection tools." },
  { number: 5, title: "Agent Deployment & Live Project Launch", description: "Hosting autonomous agents live on servers with error recovery and performance monitoring." },
];

export const automationModules: Module[] = [
  { number: 1, title: "Introduction to n8n & Make Automation", description: "Understanding triggers, nodes, webhooks, JSON payloads, and workflow execution logic." },
  { number: 2, title: "Integrating AI APIs into Automated Pipelines", description: "Connecting OpenAI, Claude, and Gemini API nodes inside automated n8n & Make workflows." },
  { number: 3, title: "Automated Lead Funnels & Email Systems", description: "Building instant AI response bots for email, WhatsApp, CRM updates, and lead capture." },
  { number: 4, title: "Database & Google Sheets Auto-Sync", description: "Auto-syncing real-time customer data, order updates, and report generation using webhooks." },
  { number: 5, title: "Enterprise Automation Blueprint & Deployment", description: "Deploying high-reliability automated pipelines with error alerts, retries, and monitoring." },
];

export const webModules: Module[] = [
  { number: 1, title: "AI Web Design & Structure Basics", description: "Creating sitemaps, wireframes, and UI layouts in under 30 minutes using AI design tools." },
  { number: 2, title: "Building Modern Websites with AI Coders", description: "Prompting AI assistants to generate clean, responsive HTML/CSS/Tailwind & React code." },
  { number: 3, title: "Custom Branding & High-Converting Copy", description: "Generating brand typography, color palettes, hero section copy, and features with AI." },
  { number: 4, title: "Live Domain Connection, SSL & Hosting", description: "Deploying websites live to Vercel/Netlify with custom domain DNS configuration." },
  { number: 5, title: "AI-Powered SEO & Growth Optimization", description: "Optimizing page speed, meta tags, schema markup, and organic search ranking with AI." },
];

export const appModules: Module[] = [
  { number: 1, title: "Full-Stack AI Application Architecture", description: "Setting up frontend, backend API, authentication, and AI LLM endpoints." },
  { number: 2, title: "Vector Databases & RAG (Retrieval Augmented Gen)", description: "Indexing private PDFs/docs into vector stores for accurate AI question answering." },
  { number: 3, title: "Embedding AI Chatbots on Websites", description: "Building custom interactive chatbot widgets and embedding them on any live website." },
  { number: 4, title: "User Auth, Database & State Management", description: "Handling user accounts, chat history persistence, and database CRUD operations." },
  { number: 5, title: "Publishing & Hosting AI Applications", description: "Deploying production-grade AI web apps live with rate limiting and security headers." },
];

export const creativeModules: Module[] = [
  { number: 1, title: "Midjourney & DALL-E 3 Masterclass", description: "Writing photorealistic prompts, aspect ratios, style parameters, and image variations." },
  { number: 2, title: "Canva AI & Brand Asset Generation", description: "Creating professional logos, social media posts, presentation decks, and marketing banners." },
  { number: 3, title: "AI Video Ads & Avatar Creation", description: "Generating AI digital presenters, video scripts, voiceovers, and promotional reels." },
  { number: 4, title: "High-Converting AI Copywriting", description: "Writing ad headlines, email newsletters, sales letters, and landing page text." },
  { number: 5, title: "Creative Brand Kit Portfolio", description: "Assembling a complete visual brand kit portfolio for client presentation." },
];

export const proModules: Module[] = [
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
