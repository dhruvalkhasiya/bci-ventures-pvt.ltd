import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

// NOTE: This is a mock login for demo purposes only — it accepts any
// credentials and sets a local flag. Replace with a real JWT-based
// auth call to POST /api/auth/login once the backend is connected
// (see authController.ts in the backend folder).
export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("bci_admin_mock_auth", "true");
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-sm space-y-4 p-8">
        <div className="mb-2 flex flex-col items-center">
          <ShieldCheck className="mb-2 text-gold-500" size={32} />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-center text-xs text-ink/40">Demo mode — any credentials will work</p>
        </div>
        <input
          required
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-field"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input-field"
        />
        <button type="submit" className="btn-primary w-full">Sign In</button>
      </form>
    </div>
  );
}
