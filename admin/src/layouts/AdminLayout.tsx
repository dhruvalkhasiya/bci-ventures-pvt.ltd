import { useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Inbox, BookOpen, Award, LogOut, Globe, ExternalLink, Menu, X } from "lucide-react";
import { clearAdminSession, hasAdminSession } from "../services/api";
import logo from "../assets/images/bci-logo.png";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/registrations", label: "Registrations", icon: Users },
  { to: "/students", label: "Students", icon: Users },
  { to: "/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/certificates", label: "Certificates", icon: Award },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearAdminSession();
    navigate("/login");
  };

  if (!hasAdminSession()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const websiteUrl = window.location.port === "5174" ? "http://localhost:5173" : "/";

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col md:flex-row">
      {/* Mobile Top Navigation Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden shadow-xs">
        <div className="flex items-center gap-2">
          <img src={logo} alt="BCI Logo" className="h-8 w-auto object-contain" />
          <div>
            <h1 className="text-xs font-bold text-brand-700 leading-tight">Billionaire Concept Ingenuity</h1>
            <p className="text-[9px] font-bold text-gold-600 uppercase tracking-wider">Admin Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 border border-brand-200"
          >
            <Globe size={14} /> Website ↗
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-b border-slate-200 bg-white p-4 space-y-2 md:hidden">
          {links.map((l) => {
            const Icon = l.icon;
            const active = location.pathname === l.to || (l.to === "/dashboard" && location.pathname === "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                  active ? "bg-brand-700 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} /> {l.label}
              </Link>
            );
          })}
          <button
            onClick={() => { setMobileOpen(false); handleLogout(); }}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-6 md:flex shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <img src={logo} alt="Billionaire Concept Ingenuity" className="h-10 w-auto object-contain" />
          <div>
            <h1 className="text-xs font-extrabold text-brand-700 leading-tight">Billionaire Concept Ingenuity</h1>
            <p className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = location.pathname === l.to || (l.to === "/dashboard" && location.pathname === "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                  active ? "bg-brand-700 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} /> {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Public Website Button */}
        <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold text-brand-700 bg-brand-50/80 hover:bg-brand-100 transition-all border border-brand-200/60 shadow-xs"
          >
            <span className="flex items-center gap-2">
              <Globe size={16} className="text-brand-700" /> Public Website
            </span>
            <ExternalLink size={14} className="text-brand-500" />
          </a>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
