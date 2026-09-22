import { useState } from "react";
import { getStoredRegistrations, updateRegistrationStatus } from "../services/api";

const REGISTRATION_STATUSES = ["Pending", "Confirmed", "Cancelled"];

export default function Registrations() {
  const [registrations, setRegistrations] = useState(getStoredRegistrations());

  const handleStatusChange = (id: string, status: string) => {
    setRegistrations(updateRegistrationStatus(id, status));
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Registrations</h1>
      <div className="glass-card overflow-x-auto p-6">
        {registrations.length === 0 ? (
          <p className="text-sm text-ink/50">No registrations yet. Submit one from the public Register page to see it here.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3EAF0] text-ink/50">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Mobile</th>
                <th className="pb-2">Course</th>
                <th className="pb-2">City</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.slice().reverse().map((r: any) => (
                <tr key={r.id} className="border-b border-white/5">
                  <td className="py-2">{r.fullName}</td>
                  <td className="py-2">{r.email}</td>
                  <td className="py-2">{r.mobile}</td>
                  <td className="py-2">{r.course}</td>
                  <td className="py-2">{r.city}</td>
                  <td className="py-2">
                    <select
                      value={r.status || "Pending"}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className="rounded border border-[#E3EAF0] bg-white/5 px-2 py-1 text-xs"
                    >
                      {REGISTRATION_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
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
