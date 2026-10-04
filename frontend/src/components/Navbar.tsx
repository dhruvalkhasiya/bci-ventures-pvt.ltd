import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/bci-logo.png";
import { LanguagePicker } from "./LanguageSelector";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Services", to: "/services" },
  { label: "Startups", to: "/startups" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-glass" : "bg-transparent"
        }`}
    >
      <nav className="section-container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="BCI - Billionaire Concept Ingenuity" className="h-9 w-auto md:h-10" />
          <span className="max-w-[190px] font-display text-sm font-bold leading-tight text-brand-700 md:max-w-none md:text-base">
            Billionaire Concept Ingenuity
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-brand-700 ${isActive ? "text-brand-700" : "text-ink/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/login" className="text-sm font-medium text-ink/80 transition-colors hover:text-brand-700">
              Login
            </Link>
            <Link to="/register" className="btn-primary !py-2 !px-5 text-sm">
              Register Now
            </Link>
          </div>
          <LanguagePicker />

          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="section-container flex flex-col gap-4 border-t border-[#E3EAF0] bg-white/95 py-6 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-ink/90 hover:text-brand-700"
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="text-ink/90 hover:text-brand-700">
            Login
          </Link>
          <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-sm">
            Register Now
          </Link>
        </div>
      )}
    </header>
  );
}
