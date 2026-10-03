import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Inbox, BookOpen, Award, LogOut } from "lucide-react";
import logo from "../assets/images/bci-logo.png";
import { clearAdminSession, hasAdminSession } from "../services/api";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/registrations", label: "Registrations", icon: Users },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  if (!hasAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E3EAF0] bg-white p-6 md:flex">
        <img src={logo} alt="BCI Admin" className="mb-8 h-8 w-auto" />
        <nav className="flex-1 space-y-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-gold-500/10 text-brand-700" : "text-ink/70 hover:bg-white/5"
                  }`}
              >
                <Icon size={17} /> {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink/50 transition-colors hover:bg-white/5 hover:text-ink/80"
        >
          <LogOut size={17} /> Logout
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
