import {
  Cpu,
  Search,
  Rocket,
  FileCheck,
  Code2,
  Layout,
  Smartphone,
  Award,
  Palette,
  TrendingUp,
  Server,
  Globe,
  Megaphone,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Cpu,
    title: "AI Training",
    description: "Comprehensive practical training in Artificial Intelligence, prompt engineering, AI tools, and automation for students & professionals.",
  },
  {
    icon: Search,
    title: "Findup",
    description: "Strategic investor discovery, partnership matching, and market opportunity mapping for emerging ventures and entrepreneurs.",
  },
  {
    icon: Rocket,
    title: "Startup",
    description: "Complete startup incubation, legal entity formation, business strategy planning, and foundational business creation services.",
  },
  {
    icon: FileCheck,
    title: "Windup",
    description: "Structured legal compliance, business exit strategy, corporate restructuring, and formal company wind-down services.",
  },
  {
    icon: Code2,
    title: "Website Development",
    description: "High-performance full-stack web application development, custom web platforms, backend APIs, and scalable software solutions.",
  },
  {
    icon: Layout,
    title: "Website Design",
    description: "Modern UI/UX design, responsive layouts, aesthetic user interfaces, and conversion-focused landing page design.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile app development for Android & iOS with intuitive interfaces and seamless cloud backends.",
  },
  {
    icon: Award,
    title: "Motivation",
    description: "Entrepreneurial mindset coaching, leadership workshops, youth empowerment programs, and corporate motivational sessions.",
  },
  {
    icon: Palette,
    title: "Graphics Designing",
    description: "Professional brand identity design, logos, marketing banners, corporate stationery, and social media creative graphics.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Results-driven performance marketing, SEO optimization, social media management, pay-per-click ads, and lead generation.",
  },
  {
    icon: Server,
    title: "Website Hosting",
    description: "High-speed cloud server hosting, 99.9% uptime guarantee, free SSL certificates, automated backups, and 24/7 server management.",
  },
  {
    icon: Globe,
    title: "Domain Registration",
    description: "Instant domain search, TLD registration (.com, .in, .co), DNS configuration, and brand domain protection services.",
  },
  {
    icon: Megaphone,
    title: "Branding and Promotion",
    description: "End-to-end brand positioning, public relations, promotional campaigns, influencer outreach, and brand identity building.",
  },
  {
    icon: Briefcase,
    title: "Techno Create Business",
    description: "Technology-driven business transformation, digital product innovation, and tech ecosystem creation for modern companies.",
  },
];

export default function OurServices() {
  return (
    <section id="services" className="section-container py-20">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-brand-700">
          What We Offer
        </span>
        <h2 className="text-3xl font-bold md:text-4xl text-brand-700">Our Services</h2>
        <p className="mx-auto mt-3 max-w-3xl text-ink/70">
          From AI Training and Tech Development to Digital Marketing and Startup Incubation — Explore BCI's complete suite of professional services.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="glass-card group relative flex flex-col p-6 transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-brand-700 shadow-md">
                <Icon size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink group-hover:text-brand-700 transition-colors">
                {service.title}
              </h3>
              <p className="flex-1 text-xs leading-relaxed text-ink/70">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
          Inquire About Any Service <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
