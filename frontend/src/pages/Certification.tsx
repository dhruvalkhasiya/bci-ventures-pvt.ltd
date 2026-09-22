import { Link } from "react-router-dom";
import { Award, ShieldCheck, BadgeCheck } from "lucide-react";

export default function Certification() {
  return (
    <div className="section-container py-20">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1.5 text-xs font-medium text-brand-700">
          <Award size={14} /> CERTIFICATION
        </span>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get Certified in AI</h1>
        <p className="mx-auto max-w-2xl text-ink/70">
          Every BCI course ends with an official Certificate of Completion — a credential that proves your practical AI skills.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card p-8 text-center">
          <BadgeCheck className="mx-auto mb-4 text-gold-500" size={36} />
          <h3 className="mb-2 font-semibold">Recognized Credential</h3>
          <p className="text-sm text-ink/60">Add it to your resume, LinkedIn, and portfolio.</p>
        </div>
        <div className="glass-card p-8 text-center">
          <Award className="mx-auto mb-4 text-gold-500" size={36} />
          <h3 className="mb-2 font-semibold">Course-Specific Levels</h3>
          <p className="text-sm text-ink/60">Demo, Beginner, and Advanced certificates reflect your actual skill level.</p>
        </div>
        <div className="glass-card p-8 text-center">
          <ShieldCheck className="mx-auto mb-4 text-gold-500" size={36} />
          <h3 className="mb-2 font-semibold">Instantly Verifiable</h3>
          <p className="text-sm text-ink/60">Anyone can verify a certificate's authenticity online.</p>
        </div>
      </div>

      <div className="mt-14 text-center">
        <Link to="/certificate/verify" className="btn-primary">Verify a Certificate</Link>
      </div>
    </div>
  );
}
