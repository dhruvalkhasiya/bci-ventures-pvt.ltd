import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Course } from "../data/courses";

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group relative flex flex-col overflow-hidden p-8 transition-shadow hover:shadow-gold"
    >
      <span className="mb-4 font-display text-4xl font-bold text-brand-700/30">{course.tag}</span>
      <h3 className="mb-2 text-2xl font-semibold">{course.title}</h3>
      <p className="mb-5 text-sm text-ink/60">{course.overview}</p>

      <ul className="mb-6 space-y-2 text-sm text-ink/70">
        {course.modules.slice(0, 4).map((m) => (
          <li key={m.number} className="flex items-center gap-2">
            <CheckCircle2 size={14} className="shrink-0 text-gold-500" /> {m.title}
          </li>
        ))}
      </ul>

      <div className="mb-6 flex items-center gap-4 text-xs text-ink/50">
        <span className="flex items-center gap-1"><Clock size={13} /> {course.duration}</span>
        <span>{course.coding}</span>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex max-w-[12rem] items-center rounded-full border-2 border-gold-500 bg-gold-100 px-4 py-2 font-display text-sm font-bold leading-tight text-brand-700">
          {course.priceLabel}
        </span>
        <Link
          to={`/courses/${course.slug}`}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-brand-700"
        >
          {course.ctaLabel} <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
