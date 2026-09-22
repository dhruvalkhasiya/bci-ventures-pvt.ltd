import { Award, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function CertificateSection() {
  return (
    <section className="section-container grid items-center gap-12 py-20 md:grid-cols-2">
      <div>
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1.5 text-xs font-medium text-brand-700">
          <Award size={14} /> CERTIFICATION
        </span>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Earn a Verified AI Certificate</h2>
        <p className="mb-6 text-ink/70">
          Every BCI course ends with a Certificate of Completion — a credential you can add to your resume,
          LinkedIn, or portfolio to prove your AI skills to employers and clients.
        </p>
        <Link to="/certificate/verify" className="btn-secondary inline-flex">
          <ShieldCheck size={18} /> Verify a Certificate
        </Link>
      </div>
      <div className="glass-card mx-auto flex w-full max-w-md flex-col items-center gap-3 border-2 border-gold-500/40 p-10 text-center">
        <Award size={48} className="text-gold-500" />
        <p className="text-xs uppercase tracking-widest text-ink/50">Certificate of Completion</p>
        <h3 className="font-display text-xl font-bold">Billionaire Concept Ingenuity</h3>
        <p className="text-sm text-ink/60">This certifies that the bearer has successfully completed the program</p>
      </div>
    </section>
  );
}
