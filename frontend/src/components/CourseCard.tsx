import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  MessageCircle,
  Bot,
  Zap,
  Globe,
  Code2,
  Palette,
  Crown,
  GraduationCap,
  Sparkles,
  Cpu,
} from "lucide-react";
import { Course } from "../data/courses";
import { getWhatsAppUrl } from "../utils/whatsapp";

const courseMetaMap: Record<
  string,
  { icon: any; color: string; badge: string }
> = {
  "demo-class": {
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    badge: "Orientation",
  },
  beginner: {
    icon: Sparkles,
    color: "from-blue-600 to-indigo-700",
    badge: "Beginner Path",
  },
  advanced: {
    icon: Zap,
    color: "from-purple-600 to-pink-600",
    badge: "Advanced Mastery",
  },
  "ai-agent": {
    icon: Bot,
    color: "from-blue-600 to-indigo-700",
    badge: "High Demand",
  },
  "ai-automation": {
    icon: Cpu,
    color: "from-amber-500 to-orange-600",
    badge: "Enterprise",
  },
  "ai-website-building": {
    icon: Globe,
    color: "from-emerald-600 to-teal-700",
    badge: "Practical",
  },
  "ai-app-development": {
    icon: Code2,
    color: "from-cyan-600 to-blue-700",
    badge: "Advanced",
  },
  "ai-content-design": {
    icon: Palette,
    color: "from-rose-500 to-red-600",
    badge: "Creative",
  },
  "bci-pro": {
    icon: Crown,
    color: "from-gold-500 to-amber-600",
    badge: "Pro Masterclass",
  },
};

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  const courseWhatsappUrl = getWhatsAppUrl({ type: "course", courseName: course.title });
  const meta = courseMetaMap[course.slug] || {
    icon: Sparkles,
    color: "from-brand-700 to-gold-600",
    badge: "AI Course",
  };
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card group relative flex flex-col overflow-hidden p-8 transition-all duration-300 hover:shadow-gold hover:-translate-y-1 bg-white border border-gold-100"
    >
      {/* Header: Icon, Badge & Tag */}
      <div className="mb-5 flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white shadow-md`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[11px] font-bold text-brand-700 border border-gold-500/30">
            {meta.badge}
          </span>
          <span className="font-display text-xl font-bold text-brand-700/40">{course.tag}</span>
        </div>
      </div>

      <h3 className="mb-2 text-2xl font-bold text-ink group-hover:text-brand-700 transition-colors">
        {course.title}
      </h3>
      <p className="mb-5 text-xs md:text-sm leading-relaxed text-ink/60">{course.overview}</p>

      {/* Module Topics Checklist */}
      <div className="mb-6 border-t border-gold-100 pt-4">
        <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-brand-700">Key Module Topics:</h4>
        <ul className="space-y-2 text-xs font-medium text-ink/80">
          {course.modules.slice(0, 4).map((m) => (
            <li key={m.number} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-gold-500 mt-0.5" />
              <span>{m.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Course Duration & Coding Specs */}
      <div className="mb-6 flex items-center justify-between gap-4 text-xs font-semibold text-ink/50 border-t border-gold-100 pt-4">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-700" /> {course.duration}</span>
        <span>{course.coding}</span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border-2 border-gold-500 bg-gold-100 px-3 py-1.5 font-display text-xs font-bold leading-tight text-brand-700 shadow-sm">
            {course.priceLabel}
          </span>
          <Link
            to={`/courses/${course.slug}`}
            className="flex items-center gap-1.5 text-xs font-bold text-ink transition-colors group-hover:text-brand-700"
          >
            {course.ctaLabel} <ArrowRight size={16} />
          </Link>
        </div>

        <a
          href={courseWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 px-3 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors border border-emerald-300 shadow-sm"
        >
          <MessageCircle size={15} className="text-emerald-600" /> Batch Info on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
