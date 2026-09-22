import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, Award, Code, Users, ArrowRight } from "lucide-react";
import ModuleCard from "../components/ModuleCard";
import { getCourseBySlugAdmin } from "../services/api";

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourseBySlugAdmin(slug || "");

  if (!course || course.status !== "published") return <Navigate to="/courses" replace />;

  const faqs = [
    { q: "Do I need any prior experience?", a: course.coding === "No Coding Required" ? "No prior experience is needed — this course is designed for complete beginners." : "Basic familiarity with the beginner batch or general computer use is helpful." },
    { q: "How long do I have access to the material?", a: "You'll have access to all course materials and recordings for the full duration of the batch and beyond." },
    { q: "Will I get a certificate?", a: `Yes — you'll receive a ${course.certificate.toLowerCase()} upon finishing the program.` },
  ];

  return (
    <div>
      <section className="bg-hero-gradient py-20">
        <div className="section-container text-center">
          <span className="mb-3 inline-block rounded-full border border-gold-500/60 bg-brand-700/50 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-gold-100">
            {course.tag} — AI Program
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gold-500 md:text-5xl">{course.title}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80">{course.overview}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-700">
            <span className="glass-card flex items-center gap-2 border-white/80 px-4 py-2"><Clock size={16} className="text-brand-700" /> {course.duration}</span>
            <span className="glass-card flex items-center gap-2 border-white/80 px-4 py-2"><Code size={16} className="text-brand-700" /> {course.coding}</span>
            <span className="glass-card flex items-center gap-2 border-white/80 px-4 py-2"><Award size={16} className="text-brand-700" /> {course.certificate}</span>
          </div>
        </div>
      </section>

      <section className="section-container py-16">
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="glass-card p-8">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold"><Users size={20} className="text-gold-500" /> Who Is This For?</h2>
            <p className="text-ink/70">{course.audience}</p>
          </div>
          <div className="glass-card flex flex-col justify-between p-8">
            <div>
              <h2 className="mb-1 text-sm uppercase tracking-widest text-ink/50">Course Fee</h2>
              <p className="font-display text-3xl font-bold text-brand-700">{course.priceLabel}</p>
            </div>
            <Link to={`/register?course=${course.slug}`} className="btn-primary mt-4">
              {course.ctaLabel} <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold">Course Modules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {course.modules.map((m, i) => (
            <ModuleCard key={m.number} module={m} index={i} />
          ))}
        </div>
      </section>

      <section className="section-container pb-20">
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="glass-card p-6">
              <h3 className="mb-2 font-semibold text-brand-700">{f.q}</h3>
              <p className="text-sm text-ink/70">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to={`/register?course=${course.slug}`} className="btn-primary">
            Register Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
