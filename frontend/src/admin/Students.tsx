import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { fetchAdminStudents, saveStudentStatus, STUDENT_STATUSES, getAllCourses, StudentRecord } from "../services/api";

export default function Students() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [viewing, setViewing] = useState<StudentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const courses = getAllCourses();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetchAdminStudents({ search, course: courseFilter || undefined })
      .then((records) => { if (active) setStudents(records); })
      .catch((err) => { if (active) setError(err instanceof Error ? err.message : "Unable to load students."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, courseFilter]);

  const handleStatusChange = async (email: string, status: string) => {
    try {
      await saveStudentStatus(email, status);
      setStudents((current) => current.map((student) => student.email === email ? { ...student, status } : student));
      if (viewing?.email === email) setViewing({ ...viewing, status });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update student status.");
    }
  };

  const courseName = (slug: string) => courses.find((c) => c.slug === slug)?.title || slug;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Students</h1>
      <p className="mb-6 text-sm text-ink/50">Everyone who has registered for a course, grouped by email.</p>
      {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="input-field sm:w-56">
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
        </select>
      </div>

      <div className="glass-card overflow-x-auto p-6">
        {loading ? (
          <p className="text-sm text-ink/50">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-sm text-ink/50">No students found. They'll appear here once someone registers for a course.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3EAF0] text-ink/50">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Courses</th>
                <th className="pb-2">Status</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.email} className="border-b border-white/5">
                  <td className="py-2">{s.name}</td>
                  <td className="py-2 text-ink/60">{s.email}</td>
                  <td className="py-2 text-ink/60">{s.courses.map(courseName).join(", ")}</td>
                  <td className="py-2">
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s.email, e.target.value)}
                      className="rounded border border-[#E3EAF0] bg-white/5 px-2 py-1 text-xs"
                    >
                      {STUDENT_STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2">
                    <button onClick={() => setViewing(s)} className="text-xs font-medium text-brand-700 hover:underline">
                      View Registration
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={() => setViewing(null)}>
          <div className="glass-card w-full max-w-lg bg-navy-900 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{viewing.name}'s Registrations</h2>
              <button onClick={() => setViewing(null)}><X size={18} className="text-ink/50" /></button>
            </div>
            <div className="space-y-3">
              {viewing.registrations.map((r: any) => (
                <div key={r.id} className="rounded-lg bg-white/5 p-4 text-sm">
                  <p><span className="text-ink/50">Course:</span> {courseName(r.course)}</p>
                  <p><span className="text-ink/50">City:</span> {r.city}</p>
                  <p><span className="text-ink/50">Profession:</span> {r.profession || "—"}</p>
                  <p><span className="text-ink/50">Preferred Batch:</span> {r.preferredBatch || "—"}</p>
                  <p><span className="text-ink/50">Submitted:</span> {new Date(r.createdAt).toLocaleString()}</p>
                  {r.message && <p><span className="text-ink/50">Message:</span> {r.message}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
