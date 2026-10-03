import { useEffect, useState } from "react";
import { fetchEnquiries, saveEnquiryStatus, ENQUIRY_STATUSES } from "../services/api";

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

  useEffect(() => { void refresh(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setEnquiries(await saveEnquiryStatus(id, status));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update enquiry.");
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Enquiries</h1>
      {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
      <div className="glass-card overflow-x-auto p-6">
        {loading ? (
          <p className="text-sm text-ink/50">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-sm text-ink/50">No enquiries yet. Submit one from the public Contact page to see it here.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3EAF0] text-ink/50">
                <th className="pb-2">Name</th>
                <th className="pb-2">Phone</th>
                <th className="pb-2">Course</th>
                <th className="pb-2">Message</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.slice().reverse().map((e: any) => (
                <tr key={e.id} className="border-b border-white/5">
                  <td className="py-2">{e.name}</td>
                  <td className="py-2">{e.phone}</td>
                  <td className="py-2">{e.course || "—"}</td>
                  <td className="max-w-xs truncate py-2">{e.message}</td>
                  <td className="py-2">
                    <select
                      value={e.status}
                      onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                      className="rounded border border-[#E3EAF0] bg-white/5 px-2 py-1 text-xs"
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
