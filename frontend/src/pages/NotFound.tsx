import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section-container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 font-display text-7xl font-bold text-gold-500">404</h1>
      <p className="mb-8 text-ink/70">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
