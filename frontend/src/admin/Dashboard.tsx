import { Users, Inbox, ClipboardList, BookOpen } from "lucide-react";
import { getStoredRegistrations, getStoredEnquiries, getAllCourses, getStudents } from "../services/api";

export default function Dashboard() {
  const registrations = getStoredRegistrations();
  const enquiries = getStoredEnquiries();
  const courses = getAllCourses();
  const students = getStudents();

  const stats = [
    { label: "Total Students", value: students.length, icon: Users },
    { label: "New Enquiries", value: enquiries.filter((e: any) => e.status === "New").length, icon: Inbox },
    { label: "Total Registrations", value: registrations.length, icon: ClipboardList },
    { label: "Published Courses", value: courses.filter((c) => c.status === "published").length, icon: BookOpen },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">BCI Admin Dashboard</h1>
      <p className="mb-8 text-sm text-ink/50">Overview of registrations, enquiries, and courses.</p>

      <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card p-6">
              <Icon className="mb-3 text-gold-500" size={22} />
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-ink/50">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6">
        <h2 className="mb-4 font-semibold">Recent Registrations</h2>
        {registrations.length === 0 ? (
          <p className="text-sm text-ink/50">No registrations yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3EAF0] text-ink/50">
                <th className="pb-2">Name</th>
                <th className="pb-2">Course</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.slice(-5).reverse().map((r: any) => (
                <tr key={r.id} className="border-b border-white/5">
                  <td className="py-2">{r.fullName}</td>
                  <td className="py-2">{r.course}</td>
                  <td className="py-2 text-ink/50">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
