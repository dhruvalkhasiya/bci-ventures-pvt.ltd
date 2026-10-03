import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import ReferralBanner from "../components/ReferralBanner";
import OurServices from "../components/OurServices";
import OurStartups from "../components/OurStartups";
import { fetchPublishedCourses, AdminCourse } from "../services/api";
import { company } from "../data/company";

export default function Home() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchPublishedCourses().then((data) => {
      if (isMounted) setCourses(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Hero />

      {/* About BCI */}
      <section className="section-container py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{company.name}</h2>
        <p className="mx-auto max-w-2xl text-ink/70">{company.description}</p>
      </section>

      {/* Courses */}
      <section className="section-container py-16">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-brand-700">
            Our AI Programs
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">Choose Your AI Learning Path</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </section>

      {/* Referral Offer Banner (Placed Directly Under AI Courses) */}
      <ReferralBanner />

      {/* Our Services Section */}
      <OurServices />

      {/* Our Startups Section */}
      <OurStartups />

      {/* Why BCI */}
      <section className="bg-white py-20">
        <div className="section-container">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-brand-700">
              Why BCI
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">Built For Real Results</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {company.whyBci.map((item) => (
              <div key={item.title} className="glass-card p-6">
                <CheckCircle2 className="mb-3 text-gold-500" size={24} />
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-ink/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container py-20 text-center">
        <div className="glass-card mx-auto max-w-3xl border-2 border-gold-500/30 p-12">
          <h2 className="mb-4 text-3xl font-bold">Ready to Build Your Future With AI?</h2>
          <p className="mb-8 text-ink/70">Join thousands of learners already growing with BCI.</p>
          <Link to="/register" className="btn-primary">
            Register Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
