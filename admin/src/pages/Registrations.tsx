import { useEffect, useState } from "react";
import { Download, RefreshCw, MessageCircle } from "lucide-react";
import {
  fetchRegistrations,
  saveRegistrationStatus,
  downloadRegistrationWorkbook,
  syncRegistrationWorkbook,
} from "../services/api";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function Registrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [syncing, setSyncing] = useState(false);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      setRegistrations(await fetchRegistrations());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setRegistrations(await saveRegistrationStatus(id, status));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update status.");
    }
  };

  const handleDownload = async () => {
    try {
      await downloadRegistrationWorkbook();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to download workbook.");
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncRegistrationWorkbook();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-700">Registrations</h1>
          <p className="text-sm text-slate-500">Manage student course applications and batch updates.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSync} disabled={syncing} className="btn-secondary">
            <RefreshCw size={16} className={syncing ? "animate-spin" : ""} /> Sync Excel
          </button>
          <button onClick={handleDownload} className="btn-primary">
            <Download size={16} /> Download Excel
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading registrations...</p>
      ) : registrations.length === 0 ? (
        <p className="text-sm text-slate-500">No registrations found.</p>
      ) : (
        <div className="glass-card overflow-hidden shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                  <th className="p-4">Name</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Batch</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((r: any) => (
                  <tr key={r.id || r._id || Math.random()}>
                    <td className="p-4 font-bold text-slate-900">{r.fullName || r.name}</td>
                    <td className="p-4 font-medium text-slate-700">{r.mobile || r.phone}</td>
                    <td className="p-4 text-slate-500">{r.email}</td>
                    <td className="p-4 font-semibold text-brand-700">{r.course}</td>
                    <td className="p-4 text-slate-600">{r.preferredBatch || "Default Batch"}</td>
                    <td className="p-4 font-semibold text-slate-700">{r.startDate || (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-")}</td>
                    <td className="p-4">
                      <select
                        value={r.status || "Pending"}
                        onChange={(e) => void handleStatusChange(r.id || r._id, e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <a
                        href={getWhatsAppUrl({ type: "registration", studentName: r.fullName || r.name, courseName: r.course })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        <MessageCircle size={15} /> WhatsApp
                      </a>
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
