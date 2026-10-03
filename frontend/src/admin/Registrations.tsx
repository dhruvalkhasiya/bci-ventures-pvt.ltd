import { useEffect, useState } from "react";
import { Download, RefreshCw, Mail, Settings, X, CheckCircle, Key } from "lucide-react";
import {
  fetchRegistrations,
  saveRegistrationStatus,
  downloadRegistrationWorkbook,
  syncRegistrationWorkbook,
  updateEmailSettings,
} from "../services/api";

const REGISTRATION_STATUSES = ["Pending", "Confirmed", "Cancelled"];

export default function Registrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("registrationbci@gmail.com");
  const [smtpPass, setSmtpPass] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState("");
  const [testPreviewUrl, setTestPreviewUrl] = useState<string | null>(null);

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
      setError(err instanceof Error ? err.message : "Unable to update registration.");
    }
  };

  const handleDownloadExcel = async () => {
    try {
      await downloadRegistrationWorkbook();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to download Excel workbook.");
    }
  };

  const handleSyncExcel = async () => {
    setSyncing(true);
    setMessage("");
    setError("");
    try {
      const result = await syncRegistrationWorkbook();
      setMessage(result.message || "Excel sheet synced successfully!");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sync Excel sheet.");
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveEmailSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEmail(true);
    setEmailStatusMsg("");
    setTestPreviewUrl(null);
    try {
      const res = await updateEmailSettings(notificationEmail, smtpPass);
      setEmailStatusMsg("✅ Email configuration saved & live test email dispatched!");
      if (res.previewUrl) setTestPreviewUrl(res.previewUrl);
    } catch (err) {
      setEmailStatusMsg(err instanceof Error ? `❌ Error: ${err.message}` : "Failed to update email settings.");
    } finally {
      setSavingEmail(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Registrations</h1>
          <p className="text-sm text-ink/60">
            Connected to <code className="rounded bg-brand-700/10 px-1 text-brand-700">dhruaval.xlsx</code> workbook & email notifications
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setShowEmailModal(true)} className="btn-secondary flex items-center gap-2 text-sm">
            <Settings size={16} /> Gmail Setup
          </button>
          <button onClick={handleSyncExcel} disabled={syncing} className="btn-secondary flex items-center gap-2 text-sm">
            <RefreshCw size={16} className={syncing ? "animate-spin" : ""} /> {syncing ? "Syncing..." : "Sync Excel Sheet"}
          </button>
          <button onClick={handleDownloadExcel} className="btn-primary flex items-center gap-2 text-sm">
            <Download size={16} /> Download dhruaval.xlsx
          </button>
        </div>
      </div>

      {message && <p role="status" className="mb-4 text-sm font-semibold text-green-600">{message}</p>}
      {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="glass-card overflow-x-auto p-6">
        {loading ? (
          <p className="text-sm text-ink/50">Loading registrations...</p>
        ) : registrations.length === 0 ? (
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
                <th className="pb-2">Notification</th>
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
                  <td className="py-2">
                    {r.emailPreviewUrl ? (
                      <a
                        href={r.emailPreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline"
                      >
                        <Mail size={14} /> View Web Preview
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                        <CheckCircle size={14} /> Delivered to Phone
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-ink/50">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Gmail Setup Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-gold/20 text-navy">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute right-4 top-4 text-navy/40 hover:text-navy"
            >
              <X size={20} />
            </button>
            <h2 className="flex items-center gap-2 text-xl font-bold text-navy">
              <Mail className="text-gold" /> Registration Email Delivery Setup
            </h2>
            <p className="mt-1 text-xs text-navy/70">
              Configure your Gmail account so registration alerts arrive directly on your phone app!
            </p>

            <form onSubmit={handleSaveEmailSettings} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy/80 mb-1">
                  Recipient & Sender Gmail Address
                </label>
                <input
                  type="email"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#E3EAF0] px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy/80 mb-1 flex items-center gap-1">
                  <Key size={14} /> Gmail App Password (16 Characters)
                </label>
                <input
                  type="password"
                  value={smtpPass}
                  onChange={(e) => setSmtpPass(e.target.value)}
                  placeholder="e.g. abcd efgh ijkl mnop"
                  className="w-full rounded-lg border border-[#E3EAF0] px-3 py-2 text-sm font-mono focus:border-gold focus:outline-none"
                />
                <div className="mt-2 rounded bg-amber-50 p-2.5 text-[11px] text-amber-900 border border-amber-200">
                  <p className="font-bold">How to get a Google App Password:</p>
                  <ol className="list-decimal pl-4 mt-1 space-y-1">
                    <li>Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer" className="underline font-semibold">myaccount.google.com/apppasswords</a></li>
                    <li>Ensure 2-Step Verification is enabled on your Google Account.</li>
                    <li>Create an App Password (name it "BCI Website").</li>
                    <li>Paste the 16-character password here and click Save.</li>
                  </ol>
                </div>
              </div>

              {emailStatusMsg && (
                <div className="rounded bg-navy/5 p-3 text-xs font-medium text-navy border border-navy/10">
                  {emailStatusMsg}
                  {testPreviewUrl && (
                    <div className="mt-1">
                      <a
                        href={testPreviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gold font-bold underline"
                      >
                        🔗 Open Live Ethereal Preview Link
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-navy/70 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={savingEmail}
                  className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-gold hover:bg-navy/90 disabled:opacity-50"
                >
                  {savingEmail ? "Testing & Saving..." : "Save & Dispatch Test Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

