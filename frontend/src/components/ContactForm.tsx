import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry, fetchPublishedCourses, AdminCourse } from "../services/api";

export default function ContactForm() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    let isMounted = true;
    fetchPublishedCourses().then((data) => {
      if (isMounted) setCourses(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitEnquiry(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 size={40} className="text-gold-500" />
        <h3 className="text-xl font-semibold">Thanks for reaching out!</h3>
        <p className="text-ink/60">We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card grid gap-4 p-8">
      <input required name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input-field" />
      <input required name="phone" placeholder="Mobile" value={form.phone} onChange={handleChange} className="input-field" />
      <input required type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input-field" />
      <select name="course" value={form.course} onChange={handleChange} className="input-field">
        <option value="">Interested Course (optional)</option>
        {courses.map((c) => (
          <option key={c.slug} value={c.slug}>{c.title}</option>
        ))}
      </select>
      <textarea required name="message" placeholder="Your message" rows={4} value={form.message} onChange={handleChange} className="input-field" />
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : null}
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
