import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "../data/company";

const mentors = [
  {
    name: "Neel Varandani",
    role: "AI & Technology Mentor",
    description:
      "Focused on helping students understand AI tools, emerging technologies, and practical applications through simple, hands-on learning.",
    focus: "AI • Tools • Practical Learning",
  },
  {
    name: "Prithish Kansara",
    role: "AI & Technology Mentor",
    description:
      "Focused on AI, digital tools, and technology education, helping students learn modern technologies through practical examples and projects.",
    focus: "AI • Digital Tools • Projects",
  },
  {
    name: "Malhar Kathechiya",
    role: "Technology Mentor",
    description:
      "Focused on making technology and digital concepts simple and accessible through practical teaching and hands-on learning.",
    focus: "Technology • Digital Skills • Learning",
  },
  {
    name: "Parmar Shlok",
    role: "Technology Tutor",
    description:
      "Focused on supporting students with technology concepts, practical learning, and hands-on guidance throughout their learning journey.",
    focus: "Technology • Guidance • Practical Learning",
  },
];

export default function About() {
  return (
    <div className="section-container py-20">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1.5 text-xs font-medium text-brand-700">
          <Rocket size={14} /> BCI VENTURES
        </span>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Meet Our Team</h1>
        <p className="mb-5 text-xl font-semibold text-brand-700">Learn Technology. Build Skills. Create With Confidence.</p>
        <p className="mx-auto max-w-3xl leading-relaxed text-ink/70">
          At BCI Ventures Private Limited, our teaching team focuses on making modern technology simple, practical, and accessible.
        </p>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-ink/70">
          From Artificial Intelligence and digital tools to practical technology skills, our mentors help students understand concepts, explore real tools, and turn what they learn into practical projects.
        </p>
        <p className="mt-6 font-semibold text-brand-700">Less theory. More practice. Real-world learning.</p>
      </div>

      <section className="mx-auto max-w-5xl text-center">
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Meet Our Founders</h2>
          <div className="mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
            {company.founders.map((founder) => (
              <article key={founder.name} className="glass-card flex h-full flex-col p-8 text-left">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-700">{founder.role}</p>
                <h3 className="mb-4 text-2xl font-bold">{founder.name}</h3>
                <p className="mb-6 flex-1 leading-relaxed text-ink/70">{founder.description}</p>
                <div className="border-t border-brand-700/15 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Focus</p>
                  <p className="mt-2 font-medium text-ink/80">{founder.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <h2 className="mb-8 text-3xl font-bold md:text-4xl">Meet Our Mentors</h2>
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {mentors.map((mentor) => (
            <article key={mentor.name} className="glass-card flex h-full flex-col p-8 text-left">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-700">{mentor.role}</p>
              <h2 className="mb-4 text-2xl font-bold">{mentor.name}</h2>
              <p className="mb-6 flex-1 leading-relaxed text-ink/70">{mentor.description}</p>
              <div className="border-t border-brand-700/15 pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Focus</p>
                <p className="mt-2 font-medium text-ink/80">{mentor.focus}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-y border-brand-700/15 py-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-700">Our Teaching Approach</p>
          <h2 className="mb-4 text-3xl font-bold">Learn. Create. Innovate.</h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-ink/70">
            We believe students learn technology best when they can understand it, use it, and build with it.
          </p>
          <p className="mt-6 font-semibold text-brand-700">BCI Ventures Private Limited</p>
          <p className="mt-1 text-sm text-ink/60">Learn. Create. Innovate.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
            Explore BCI <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
