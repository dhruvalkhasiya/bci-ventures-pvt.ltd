import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitRegistration, getPublishedCourses } from "../services/api";

export default function RegistrationForm() {
  const courses = getPublishedCourses();
  const [params] = useSearchParams();
  const preselected = params.get("course") || "";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    course: preselected,
    city: "",
    profession: "",
    preferredBatch: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitRegistration(form);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card flex flex-col items-center gap-4 p-10 text-center">
        <CheckCircle2 size={48} className="text-gold-500" />
        <h3 className="text-2xl font-semibold">Registration submitted successfully!</h3>
        <p className="text-ink/60">Our team will reach out to confirm your batch and payment details.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/919979206007" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Contact on WhatsApp
          </a>
          <a href="/courses" className="btn-secondary">Return to Courses</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card grid gap-5 p-8 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm text-ink/70">Full Name</label>
        <input required name="fullName" value={form.fullName} onChange={handleChange} className="input-field" placeholder="Your full name" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink/70">Email</label>
        <input required type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink/70">Mobile Number</label>
        <input required name="mobile" value={form.mobile} onChange={handleChange} className="input-field" placeholder="+91 99792 06007" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink/70">Course</label>
        <select required name="course" value={form.course} onChange={handleChange} className="input-field">
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink/70">City</label>
        <input required name="city" value={form.city} onChange={handleChange} className="input-field" placeholder="Your city" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink/70">Education / Profession</label>
        <input name="profession" value={form.profession} onChange={handleChange} className="input-field" placeholder="e.g. Student, Engineer" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink/70">Preferred Batch</label>
        <input name="preferredBatch" value={form.preferredBatch} onChange={handleChange} className="input-field" placeholder="e.g. Morning / Evening" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-sm text-ink/70">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="input-field" placeholder="Anything else you'd like us to know?" />
      </div>

      {error && <p className="md:col-span-2 text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary md:col-span-2 disabled:opacity-60">
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : null}
        {status === "loading" ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}
