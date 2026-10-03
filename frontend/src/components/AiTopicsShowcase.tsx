import { motion } from "framer-motion";
import { Bot, Zap, Cpu, Globe, Code2, Palette, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const aiTopics = [
  {
    title: "AI Agents & Autonomous Systems",
    icon: Bot,
    color: "from-blue-600 to-indigo-700",
    badge: "High Demand",
    description: "Build single & multi-agent networks (AutoGPT, CrewAI, Custom GPTs) that execute complex tasks autonomously.",
    points: ["Multi-Agent Collaboration", "Custom Action APIs", "OpenAI Assistant Schemas"],
  },
  {
    title: "AI Business Automation (n8n & Make)",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    badge: "Enterprise",
    description: "Automate end-to-end business workflows by connecting apps, databases, webhooks, and LLM API endpoints.",
    points: ["n8n & Make Pipelines", "Automated Lead Funnels", "Database & CRM Triggers"],
  },
  {
    title: "Prompt & Context Engineering",
    icon: Cpu,
    color: "from-purple-600 to-pink-600",
    badge: "Core Skill",
    description: "Master system instructions, zero-shot/few-shot prompts, and structured XML/JSON context windows.",
    points: ["Enterprise System Prompts", "Structured JSON/XML Parsing", "Chain-of-Thought Logic"],
  },
  {
    title: "No-Code & Full-Stack AI Web Creation",
    icon: Globe,
    color: "from-emerald-600 to-teal-700",
    badge: "Practical",
    description: "Design, build, and deploy modern responsive websites, landing pages, and web apps with AI assistants.",
    points: ["60-Min AI Web Builder", "Custom Domain & SSL Hosting", "AI-Driven SEO Strategies"],
  },
  {
    title: "AI App Development & Custom Chatbots",
    icon: Code2,
    color: "from-cyan-600 to-blue-700",
    badge: "Advanced",
    description: "Train custom AI chatbots on private business documents and embed them live on web applications.",
    points: ["Vector Search & RAG", "Custom Business Chatbots", "Full-Stack AI Portals"],
  },
  {
    title: "AI Content, Graphic & Media Suite",
    icon: Palette,
    color: "from-rose-500 to-red-600",
    badge: "Creative",
    description: "Generate studio-grade logos, marketing banners, video ads, digital avatars, and copy with top AI models.",
    points: ["Midjourney & DALL-E 3", "Canva AI & Ad Copy", "AI Video & Avatars"],
  },
  {
    title: "AI Agency & Freelance Systems",
    icon: Briefcase,
    color: "from-gold-500 to-amber-600",
    badge: "Monetization",
    description: "Package AI automation services, structure monthly retainer packages, and pitch to global clients.",
    points: ["Client Proposal Templates", "Retainer Pricing Models", "Scaling AI Services"],
  },
];

export default function AiTopicsShowcase() {
  return (
    <section className="bg-gradient-to-b from-white via-brand-700/5 to-white py-20">
      <div className="section-container">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-5 py-2 text-xs font-bold text-brand-700 uppercase tracking-widest backdrop-blur-sm">
            <Sparkles size={16} className="text-gold-500" /> Complete AI Master Syllabus
          </div>
          <h2 className="text-3xl font-extrabold md:text-5xl text-brand-700 tracking-tight">
            AI TOPICS & SKILLS YOU WILL MASTER
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-ink/70">
            From autonomous AI agents and n8n/Make business automation to full-stack web creation and AI agency setups.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aiTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card group relative flex flex-col p-6 transition-all duration-300 hover:shadow-gold hover:-translate-y-1 bg-white border border-gold-100"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${topic.color} text-white shadow-md`}>
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full bg-gold-500/15 px-2.5 py-1 text-[11px] font-bold text-brand-700 border border-gold-500/30">
                    {topic.badge}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-ink group-hover:text-brand-700 transition-colors">
                  {topic.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-ink/70">
                  {topic.description}
                </p>

                <ul className="mb-6 space-y-1.5 text-xs font-medium text-ink/80 border-t border-gold-100 pt-3">
                  {topic.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-gold-500 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Link
                    to="/courses"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-brand-700/5 px-3 py-2 text-xs font-bold text-brand-700 group-hover:bg-brand-700 group-hover:text-gold-400 transition-all"
                  >
                    View Course Syllabus →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
