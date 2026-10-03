import { useEffect, useState } from "react";
import { Users, Inbox, ClipboardList, BookOpen } from "lucide-react";
import { fetchRegistrations, fetchEnquiries, fetchAdminCourses } from "../services/api";

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([fetchRegistrations(), fetchEnquiries(), fetchAdminCourses()])
      .then(([registrationRecords, enquiryRecords, courses]) => {
        if (!active) return;
        setRegistrations(registrationRecords || []);
        setEnquiries(enquiryRecords || []);
        setCourseCount((courses || []).filter((course) => course.status === "published").length);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load the admin dashboard."))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const stats = [
    { label: "Total Registrations", value: registrations.length, icon: ClipboardList },
    { label: "New Enquiries", value: enquiries.filter((e: any) => e.status === "New").length, icon: Inbox },
    { label: "Published Courses", value: courseCount, icon: BookOpen },
    { label: "Enrolled Students", value: new Set(registrations.map(r => r.email)).size, icon: Users },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-brand-700">BCI Admin Dashboard</h1>
      <p className="mb-8 text-sm text-slate-500">Overview of registrations, enquiries, and courses.</p>
      {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      {loading && <p className="mb-4 text-sm text-slate-500">Loading dashboard...</p>}

      <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card p-6 shadow-sm border border-slate-200">
              <Icon className="mb-3 text-gold-500" size={24} />
              <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-sm font-semibold text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6 shadow-sm border border-slate-200">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Recent Registrations</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading registrations...</p>
        ) : registrations.length === 0 ? (
          <p className="text-sm text-slate-500">No registrations yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                <th className="pb-3">Name</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations.slice(0, 5).map((r: any) => (
                <tr key={r.id || r._id || Math.random()}>
                  <td className="py-3 font-medium text-slate-900">{r.fullName || r.name}</td>
                  <td className="py-3 text-slate-600">{r.course}</td>
                  <td className="py-3 text-slate-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recent"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
