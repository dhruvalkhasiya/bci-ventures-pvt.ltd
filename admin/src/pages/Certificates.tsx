import { useEffect, useState } from "react";
import { Plus, Award, CheckCircle } from "lucide-react";
import { fetchCertificates, issueCertificate } from "../services/api";

export default function Certificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ studentName: "", courseName: "" });
  const [issuing, setIssuing] = useState(false);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      setCertificates(await fetchCertificates());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.courseName) return;
    setIssuing(true);
    try {
      await issueCertificate(form);
      setForm({ studentName: "", courseName: "" });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to issue certificate.");
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-700">Certificates Management</h1>
        <p className="text-sm text-slate-500">Issue, track, and manage official BCI student completion certificates.</p>
      </div>

      {/* Issue Certificate Form */}
      <form onSubmit={handleIssue} className="glass-card mb-8 p-6 shadow-sm border border-slate-200">
        <h2 className="mb-4 text-base font-bold text-slate-900 flex items-center gap-2">
          <Award size={20} className="text-gold-500" /> Issue New Certificate
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Student Full Name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            className="input-field"
          />
          <input
            required
            placeholder="Course Name (e.g. AI Beginner Batch)"
            value={form.courseName}
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
            className="input-field"
          />
        </div>
        <button type="submit" disabled={issuing} className="btn-primary mt-4">
          <Plus size={16} /> {issuing ? "Issuing..." : "Issue Certificate"}
        </button>
      </form>

      {/* Certificates Table */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p className="text-sm text-slate-500">No certificates issued yet.</p>
      ) : (
        <div className="glass-card overflow-hidden shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                  <th className="p-4">Certificate ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates.map((c: any) => (
                  <tr key={c.certificateId || Math.random()}>
                    <td className="p-4 font-mono font-bold text-brand-700">{c.certificateId}</td>
                    <td className="p-4 font-bold text-slate-900">{c.studentName}</td>
                    <td className="p-4 text-slate-700">{c.courseName}</td>
                    <td className="p-4 text-slate-500">{new Date(c.issueDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                        <CheckCircle size={12} /> {c.status || "Valid"}
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
