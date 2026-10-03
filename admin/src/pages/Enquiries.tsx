import { useEffect, useState } from "react";
import { fetchEnquiries, saveEnquiryStatus } from "../services/api";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      setEnquiries(await fetchEnquiries());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setEnquiries(await saveEnquiryStatus(id, status));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update enquiry status.");
    }
  };

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-700">Enquiries</h1>
        <p className="text-sm text-slate-500">Track contact form submissions and batch information inquiries.</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <p className="text-sm text-slate-500">No enquiries found.</p>
      ) : (
        <div className="glass-card overflow-hidden shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Course Interested</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((e: any) => (
                  <tr key={e.id || e._id || Math.random()}>
                    <td className="p-4 font-bold text-slate-900">{e.name}</td>
                    <td className="p-4 font-medium text-slate-700">{e.phone}</td>
                    <td className="p-4 text-slate-500">{e.email}</td>
                    <td className="p-4 font-semibold text-brand-700">{e.course || "General Inquiry"}</td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">{e.message || "-"}</td>
                    <td className="p-4">
                      <select
                        value={e.status || "New"}
                        onChange={(val) => void handleStatusChange(e.id || e._id, val.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
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
