import { useState } from "react";
import { Award, Download, ShieldOff, Plus } from "lucide-react";
import { getCertificates, issueCertificate, revokeCertificate, getAllCourses, CertificateRecord } from "../services/api";
import logo from "../assets/images/bci-logo.png";

function downloadCertificate(cert: CertificateRecord) {
  const html = `
    <html>
      <head><title>${cert.certificateId}</title>
        <style>
          body { font-family: 'Georgia', serif; text-align: center; padding: 80px; background: #F4F8FC; color: #263238; }
          .card { border: 3px solid #FFB800; padding: 60px; border-radius: 16px; max-width: 700px; margin: 0 auto; background: #FFFFFF; }
          h1 { color: #073B6F; font-size: 14px; letter-spacing: 4px; text-transform: uppercase; }
          h2 { font-size: 32px; margin: 20px 0; }
          p { font-size: 16px; color: #263238; }
          .name { font-size: 28px; color: #0B4F8A; margin: 20px 0; }
          .meta { margin-top: 40px; font-size: 13px; color: #073B6F; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
          <h2 class="name">${cert.studentName}</h2>
          <p>has successfully completed</p>
          <h2>${cert.courseName}</h2>
          <p>Completed on ${cert.completionDate}</p>
          <div class="meta">
            Certificate ID: ${cert.certificateId}<br/>
            Issued by Billionaire Concept Ingenuity (BCI)
          </div>
        </div>
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${cert.certificateId}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Certificates() {
  const [certs, setCerts] = useState<CertificateRecord[]>(getCertificates());
  const courses = getAllCourses();
  const [form, setForm] = useState({ studentName: "", courseName: courses[0]?.title || "", completionDate: "" });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.courseName || !form.completionDate) return;
    issueCertificate(form.studentName, form.courseName, form.completionDate);
    setCerts(getCertificates());
    setForm({ studentName: "", courseName: courses[0]?.title || "", completionDate: "" });
  };

  const handleRevoke = (id: string) => {
    if (!confirm("Revoke this certificate? It will no longer verify as valid.")) return;
    setCerts(revokeCertificate(id));
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Certificates</h1>
      <p className="mb-6 text-sm text-ink/50">Generate, download, and manage completion certificates.</p>

      <form onSubmit={handleGenerate} className="glass-card mb-8 grid gap-4 p-6 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm text-ink/70">Student Name</label>
          <input
            required
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-ink/70">Course</label>
          <select
            required
            value={form.courseName}
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
            className="input-field"
          >
            {courses.map((c) => (
              <option key={c.slug} value={c.title}>{c.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-ink/70">Completion Date</label>
          <input
            required
            type="date"
            value={form.completionDate}
            onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
            className="input-field"
          />
        </div>
        <button type="submit" className="btn-primary md:col-span-3">
          <Plus size={18} /> Generate Certificate
        </button>
      </form>

      <div className="glass-card overflow-x-auto p-6">
        {certs.length === 0 ? (
          <p className="text-sm text-ink/50">No certificates issued yet.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3EAF0] text-ink/50">
                <th className="pb-2">Certificate ID</th>
                <th className="pb-2">Student</th>
                <th className="pb-2">Course</th>
                <th className="pb-2">Completed</th>
                <th className="pb-2">Status</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {certs.slice().reverse().map((c) => (
                <tr key={c.certificateId} className="border-b border-white/5">
                  <td className="py-2 font-mono text-xs text-brand-700">{c.certificateId}</td>
                  <td className="py-2">{c.studentName}</td>
                  <td className="py-2">{c.courseName}</td>
                  <td className="py-2 text-ink/60">{c.completionDate}</td>
                  <td className="py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${c.status === "valid" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="flex gap-3 py-2">
                    <button onClick={() => downloadCertificate(c)} className="flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
                      <Download size={13} /> Download
                    </button>
                    {c.status === "valid" && (
                      <button onClick={() => handleRevoke(c.certificateId)} className="flex items-center gap-1 text-xs font-medium text-red-400 hover:underline">
                        <ShieldOff size={13} /> Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 text-xs text-ink/40">
        <img src={logo} alt="" className="h-5 w-auto opacity-60" />
        <span>Students and anyone else can verify these at the public /certificate/verify page.</span>
        <Award size={14} className="ml-auto text-gold-500/50" />
      </div>
    </div>
  );
}
