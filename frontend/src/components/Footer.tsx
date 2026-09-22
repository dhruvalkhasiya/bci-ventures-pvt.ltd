import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/images/bci-logo.png";
import { company } from "../data/company";
import { getPublishedCourses } from "../services/api";

export default function Footer() {
  const courses = getPublishedCourses();
  return (
    <footer className="border-t border-[#E3EAF0] bg-white pt-16 pb-8">
      <div className="section-container grid gap-10 md:grid-cols-4">
        <div>
          <img src={logo} alt="BCI - Billionaire Concept Ingenuity" className="mb-3 h-10 w-auto" />
          <p className="text-sm text-ink/60">{company.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-brand-700">Courses</h4>
          <ul className="space-y-2 text-sm text-ink/70">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link to={`/courses/${c.slug}`} className="hover:text-brand-700">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-brand-700">Company</h4>
          <ul className="space-y-2 text-sm text-ink/70">
            <li><Link to="/about" className="hover:text-brand-700">About Us</Link></li>
            <li><Link to="/certification" className="hover:text-brand-700">Certification</Link></li>
            <li><Link to="/certificate/verify" className="hover:text-brand-700">Verify Certificate</Link></li>
            <li><Link to="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-brand-700">Contact</h4>
          <ul className="space-y-3 text-sm text-ink/70">
            <li className="flex items-center gap-2"><Mail size={16} className="text-gold-500" /> {company.contact.email}</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-gold-500" /> {company.contact.phone}</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-gold-500" /> {company.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="section-container mt-12 border-t border-[#E3EAF0] pt-6 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
