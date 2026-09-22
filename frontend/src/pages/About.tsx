import { company } from "../data/company";
import { Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="section-container py-20">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1.5 text-xs font-medium text-brand-700">
          <Rocket size={14} /> ABOUT US
        </span>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{company.name}</h1>
        <p className="mx-auto max-w-2xl text-ink/70">{company.description}</p>
      </div>

      <div className="mb-16 grid gap-6 md:grid-cols-4">
        {company.tagline.split(" | ").map((word) => (
          <div key={word} className="glass-card p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-brand-700">{word}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
