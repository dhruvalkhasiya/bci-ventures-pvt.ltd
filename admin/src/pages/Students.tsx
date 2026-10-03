import { useEffect, useState } from "react";
import { fetchRegistrations } from "../services/api";

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const registrations = await fetchRegistrations();
      const byEmail = new Map<string, any>();
      for (const r of registrations) {
        const key = (r.email || "").toLowerCase();
        if (!key) continue;
        if (!byEmail.has(key)) {
          byEmail.set(key, {
            name: r.fullName || r.name,
            email: r.email,
            phone: r.mobile || r.phone,
            city: r.city,
            courses: [r.course],
            status: r.status || "Enrolled",
          });
        } else {
          const item = byEmail.get(key);
          if (!item.courses.includes(r.course)) item.courses.push(r.course);
        }
      }
      setStudents(Array.from(byEmail.values()));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load student directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-700">Student Directory</h1>
        <p className="text-sm text-slate-500">View enrolled students and their assigned AI courses.</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-sm text-slate-500">No enrolled students found.</p>
      ) : (
        <div className="glass-card overflow-hidden shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Enrolled Courses</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.email}>
                    <td className="p-4 font-bold text-slate-900">{s.name}</td>
                    <td className="p-4 font-medium text-slate-600">{s.email}</td>
                    <td className="p-4 text-slate-600">{s.phone}</td>
                    <td className="p-4 text-slate-500">{s.city || "-"}</td>
                    <td className="p-4 font-semibold text-brand-700">{s.courses.join(", ")}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
