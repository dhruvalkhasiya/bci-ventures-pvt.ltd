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
      <div className="mx-auto w-full max-w-xl overflow-hidden border-2 border-gold-500/40 bg-white shadow-[0_12px_30px_rgba(13,61,109,0.12)]">
        <img
          src="/WhatsApp%20Image%202026-09-27%20at%205.05.31%20PM.jpeg"
          alt="BCI Certificate of Completion"
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}
