import { useState } from "react";
import { LogIn } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Student login is not yet connected to a backend. This is a UI placeholder for Stage 2.");
  };

  return (
    <div className="section-container flex min-h-[70vh] items-center justify-center py-20">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-sm space-y-4 p-8">
        <div className="mb-2 flex flex-col items-center">
          <LogIn className="mb-2 text-gold-500" size={32} />
          <h1 className="text-2xl font-bold">Student Login</h1>
        </div>
        <input
          required
          type="email"
          placeholder="Email"
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
