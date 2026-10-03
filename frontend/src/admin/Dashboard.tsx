import { useEffect, useState } from "react";
import { Users, Inbox, ClipboardList, BookOpen } from "lucide-react";
import { fetchRegistrations, fetchEnquiries, fetchAdminCourses, fetchAdminStudents } from "../services/api";

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([fetchRegistrations(), fetchEnquiries(), fetchAdminCourses(), fetchAdminStudents()])
      .then(([registrationRecords, enquiryRecords, courses, students]) => {
        if (!active) return;
        setRegistrations(registrationRecords);
        setEnquiries(enquiryRecords);
        setCourseCount(courses.filter((course) => course.status === "published").length);
        setStudentCount(students.length);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load the admin dashboard."))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const stats = [
    { label: "Total Students", value: studentCount, icon: Users },
    { label: "New Enquiries", value: enquiries.filter((e: any) => e.status === "New").length, icon: Inbox },
    { label: "Total Registrations", value: registrations.length, icon: ClipboardList },
    { label: "Published Courses", value: courseCount, icon: BookOpen },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">BCI Admin Dashboard</h1>
      <p className="mb-8 text-sm text-ink/50">Overview of registrations, enquiries, and courses.</p>
      {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="mb-4 text-sm text-ink/50">Loading dashboard...</p>}

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
        {loading ? (
          <p className="text-sm text-ink/50">Loading registrations...</p>
        ) : registrations.length === 0 ? (
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
              {registrations.slice(0, 5).map((r: any) => (
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
