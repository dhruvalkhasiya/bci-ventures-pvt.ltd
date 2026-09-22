import { useState } from "react";
import { ShieldCheck, ShieldX, Loader2, Search } from "lucide-react";
import { verifyCertificate, CertificateResult } from "../services/api";

export default function CertificateVerify() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<CertificateResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await verifyCertificate(id);
    setResult(res);
    setStatus("done");
  };

  return (
    <div className="section-container flex flex-col items-center py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Verify a Certificate</h1>
        <p className="mx-auto max-w-lg text-ink/70">
          Enter a certificate ID below to confirm its authenticity. Try{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-brand-700">BCI-DEMO-0001</code> to see a sample result.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card flex w-full max-w-md gap-3 p-4">
        <input
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Certificate ID (e.g. BCI-DEMO-0001)"
          className="input-field"
        />
        <button type="submit" disabled={status === "loading"} className="btn-primary shrink-0 !px-4">
          {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
        </button>
      </form>

      {status === "done" && result && (
        <div className="glass-card mt-8 w-full max-w-md p-8 text-center">
          {result.valid ? (
            <>
              <ShieldCheck className="mx-auto mb-3 text-green-400" size={44} />
              <h3 className="mb-1 text-xl font-semibold text-green-400">Certificate Verified</h3>
              <div className="mt-4 space-y-2 text-left text-sm text-ink/70">
                <p><span className="text-ink/50">Student:</span> {result.studentName}</p>
                <p><span className="text-ink/50">Course:</span> {result.courseName}</p>
                <p><span className="text-ink/50">Issued:</span> {result.issueDate}</p>
                <p><span className="text-ink/50">Issued By:</span> Billionaire Concept Ingenuity (BCI)</p>
              </div>
            </>
          ) : (
            <>
              <ShieldX className="mx-auto mb-3 text-red-400" size={44} />
              <h3 className="text-xl font-semibold text-red-400">Certificate Not Found</h3>
              <p className="mt-2 text-sm text-ink/60">Please double-check the certificate ID and try again.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
