import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import { company } from "../data/company";
import logo from "../assets/images/bci-logo.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-400/60"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="section-container relative grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-500/60 bg-brand-700/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-100">
            <Sparkles size={14} /> {company.shortName} · {company.name.toUpperCase()}
          </span>
          <h1 className="mb-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            {company.heading.split(" AI").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="ml-2 inline-block rounded-lg bg-gold-500 px-2 pb-1 text-brand-700 shadow-gold">AI</span>
                </span>
              ) : (
                part
              )
            )}
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/80">{company.subheading}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/courses" className="btn-primary">
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link to="/courses/demo-class" className="btn-secondary border-white bg-white text-brand-700 hover:border-gold-100 hover:bg-gold-100 hover:text-brand-700">
              <PlayCircle size={18} /> Free Demo Class
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto flex h-80 w-80 items-center justify-center md:h-[26rem] md:w-[26rem]"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(13,61,109,0.2)] md:h-[20rem] md:w-[20rem]">
            <img src={logo} alt="BCI" className="h-40 w-40 rounded-full object-contain md:h-56 md:w-56" />
          </div>
          {["Prompt Engineering", "AI Agents", "Automation", "Branding"].map((label, i) => (
            <motion.div
              key={label}
              className="glass-card absolute px-3 py-1.5 text-xs font-semibold text-brand-700"
              style={{
                top: `${[10, 70, 15, 75][i]}%`,
                left: `${[5, 0, 70, 65][i]}%`,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
