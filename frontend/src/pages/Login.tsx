import { LogIn } from "lucide-react";

export default function Login() {
  return (
    <div className="section-container flex min-h-[70vh] items-center justify-center py-20">
      <div className="glass-card w-full max-w-sm space-y-4 p-8">
        <div className="mb-2 flex flex-col items-center">
          <LogIn className="mb-2 text-gold-500" size={32} />
          <h1 className="text-2xl font-bold">Student Login</h1>
        </div>
        <p className="text-center text-sm text-ink/60">Student sign-in is not available yet.</p>
        <button type="button" disabled className="btn-primary w-full disabled:opacity-60">Sign In</button>
      </div>
    </div>
  );
}
