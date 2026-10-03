import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck, KeyRound } from "lucide-react";
import { loginAdmin, USE_MOCK } from "../services/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "admin@bciventures.in", password: "Admin@12345" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginAdmin(form.email, form.password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const autoFillCredentials = () => {
    setForm({ email: "admin@bciventures.in", password: "Admin@12345" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-700/5 via-white to-gold-500/10 px-6 py-12">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-sm space-y-4 p-8 shadow-2xl">
        <div className="mb-2 flex flex-col items-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-gold-400 shadow-md">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-700">BCI Admin Portal</h1>
          <p className="mt-1 text-center text-xs text-ink/60">
            {USE_MOCK ? "Demo Mode Active" : "Sign in to manage courses, registrations & certificates"}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink/70">Admin Email</label>
            <input
              required
              type="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink/70">Password</label>
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        {error && <p role="alert" className="text-sm font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg text-center">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Signing In..." : "Sign In to Admin Panel"}
        </button>

        <button
          type="button"
          onClick={autoFillCredentials}
          className="flex w-full items-center justify-center gap-1.5 text-xs text-brand-700 hover:text-gold-600 font-semibold pt-2"
        >
          <KeyRound size={14} /> Fill Demo Credentials (admin@bciventures.in)
        </button>
      </form>
    </div>
  );
}
