import { useState } from "react";
import { getStoredEnquiries, updateEnquiryStatus, ENQUIRY_STATUSES } from "../services/api";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState(getStoredEnquiries());

  const handleStatusChange = (id: string, status: string) => {
    const updated = updateEnquiryStatus(id, status);
    setEnquiries(updated);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Enquiries</h1>
      <div className="glass-card overflow-x-auto p-6">
        {enquiries.length === 0 ? (
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
