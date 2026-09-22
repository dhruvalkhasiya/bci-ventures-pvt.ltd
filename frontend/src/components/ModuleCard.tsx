import { motion } from "framer-motion";
import { Module } from "../data/modules";

export default function ModuleCard({ module, index }: { module: Module; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="glass-card flex gap-4 border-gold-100 p-5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-700 font-display font-bold text-gold-100">
        {String(module.number).padStart(2, "0")}
      </span>
      <div>
        <h4 className="mb-1 font-semibold">{module.title}</h4>
        <p className="text-sm text-ink/60">{module.description}</p>
      </div>
    </motion.div>
  );
}
