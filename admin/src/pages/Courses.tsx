import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from "lucide-react";
import {
  fetchAdminCourses,
  createAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  AdminCourse,
  CoursePayload,
} from "../services/api";

const emptyForm: CoursePayload = {
  title: "",
  overview: "",
  audience: "",
  price: null,
  priceLabel: "",
  duration: "",
  timing: "1 Hour Per Day",
  coding: "No Coding Required",
  certificate: "Certificate of Completion",
  ctaLabel: "View Course",
  status: "published",
};

export default function AdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"list" | "new" | "edit">("list");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<CoursePayload>(emptyForm);
  const [moduleDraft, setModuleDraft] = useState({ title: "", description: "" });

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      setCourses(await fetchAdminCourses());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const startCreate = () => {
    setForm(emptyForm);
    setMode("new");
    setEditingSlug(null);
  };

  const startEdit = (course: AdminCourse) => {
    setForm({
      title: course.title,
      overview: course.overview,
      audience: course.audience,
      price: course.price,
      priceLabel: course.priceLabel,
      duration: course.duration,
      timing: course.timing,
      coding: course.coding,
      certificate: course.certificate,
      ctaLabel: course.ctaLabel,
      status: course.status || "published",
    });
    setEditingSlug(course.slug);
    setMode("edit");
  };

  const cancel = () => {
    setMode("list");
    setEditingSlug(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "price" ? (value === "" ? null : Number(value)) : value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "new") {
        await createAdminCourse(form);
      } else if (mode === "edit" && editingSlug) {
        await updateAdminCourse(editingSlug, form);
      }
      await refresh();
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save the course.");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    try {
      await deleteAdminCourse(slug);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete the course.");
    }
  };

  const handleTogglePublish = async (course: AdminCourse) => {
    try {
      await updateAdminCourse(course.slug, { status: course.status === "published" ? "draft" : "published" });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update course visibility.");
    }
  };

  const handleAddModule = async (slug: string) => {
    if (!moduleDraft.title.trim()) return;
    const course = courses.find((item) => item.slug === slug);
    if (!course) return;
    try {
      await updateAdminCourse(slug, {
        modules: [...course.modules, { number: (course.modules[course.modules.length - 1]?.number || 0) + 1, ...moduleDraft }],
      });
      setModuleDraft({ title: "", description: "" });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add the module.");
    }
  };

  const handleRemoveModule = async (slug: string, moduleNumber: number) => {
    const course = courses.find((item) => item.slug === slug);
    if (!course) return;
    try {
      await updateAdminCourse(slug, { modules: course.modules.filter((module) => module.number !== moduleNumber) });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to remove the module.");
    }
  };

  const editingCourse = editingSlug ? courses.find((c) => c.slug === editingSlug) : undefined;

  if (mode !== "list") {
    return (
      <div>
        {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-700">{mode === "new" ? "Add Course" : `Edit ${editingCourse?.title}`}</h1>
          <button onClick={cancel} className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800">
            <X size={16} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSave} className="glass-card grid gap-4 p-6 md:grid-cols-2 shadow-sm border border-slate-200">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Course Title</label>
            <input required name="title" value={form.title} onChange={handleChange} className="input-field" placeholder="e.g. AI Agent Masterclass" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Overview</label>
            <textarea required name="overview" value={form.overview} onChange={handleChange} rows={2} className="input-field" placeholder="Short course summary" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Who Is This For?</label>
            <textarea required name="audience" value={form.audience} onChange={handleChange} rows={2} className="input-field" placeholder="Target audience description" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Price (Numeric)</label>
            <input type="number" name="price" value={form.price ?? ""} onChange={handleChange} className="input-field" placeholder="2499" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Price Label</label>
            <input required name="priceLabel" value={form.priceLabel} onChange={handleChange} className="input-field" placeholder="e.g. ₹2,499" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Duration</label>
            <input required name="duration" value={form.duration} onChange={handleChange} className="input-field" placeholder="e.g. 10–12 Days" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Timing</label>
            <input required name="timing" value={form.timing} onChange={handleChange} className="input-field" placeholder="1 Hour Per Day" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Coding Requirement</label>
            <input required name="coding" value={form.coding} onChange={handleChange} className="input-field" placeholder="No Coding Required" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Certificate Label</label>
            <input required name="certificate" value={form.certificate} onChange={handleChange} className="input-field" placeholder="Certificate of Completion" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">CTA Button Label</label>
            <input required name="ctaLabel" value={form.ctaLabel} onChange={handleChange} className="input-field" placeholder="Enroll Now" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Status / Visibility</label>
            <select name="status" value={form.status || "published"} onChange={handleChange} className="input-field">
              <option value="published">Published (Visible on Website)</option>
              <option value="draft">Draft (Hidden from Website)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary md:col-span-2">
            <Save size={18} /> {mode === "new" ? "Create Course" : "Save Changes"}
          </button>
        </form>

        {mode === "edit" && editingCourse && (
          <div className="glass-card mt-6 p-6 shadow-sm border border-slate-200">
            <h2 className="mb-4 font-bold text-slate-900">Module Topics List</h2>
            <div className="mb-4 space-y-2">
              {editingCourse.modules.map((m) => (
                <div key={m.number} className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm">
                  <span>
                    <span className="mr-2 font-bold text-brand-700">{String(m.number).padStart(2, "0")}</span>
                    <span className="font-semibold text-slate-900">{m.title}</span>
                  </span>
                  <button onClick={() => handleRemoveModule(editingCourse.slug, m.number)} className="text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {editingCourse.modules.length === 0 && <p className="text-sm text-slate-500">No modules added yet.</p>}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                placeholder="Module title"
                value={moduleDraft.title}
                onChange={(e) => setModuleDraft({ ...moduleDraft, title: e.target.value })}
                className="input-field"
              />
              <input
                placeholder="Module description"
                value={moduleDraft.description}
                onChange={(e) => setModuleDraft({ ...moduleDraft, description: e.target.value })}
                className="input-field"
              />
              <button type="button" onClick={() => handleAddModule(editingCourse.slug)} className="btn-secondary shrink-0">
                <Plus size={16} /> Add Module
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-700">Courses</h1>
          <p className="text-sm text-slate-500">Add, edit, price, publish, and manage modules for every course.</p>
        </div>
        <button onClick={startCreate} className="btn-primary">
          <Plus size={18} /> Add Course
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-sm text-slate-500">No courses found.</p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {!loading && courses.map((c) => (
          <div key={c.slug} className="glass-card p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-bold text-slate-900 text-lg">{c.title}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    c.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="mb-2 text-xs font-medium text-slate-500">{c.duration} · {c.timing}</p>
              <p className="mb-3 font-extrabold text-brand-700 text-xl">{c.priceLabel}</p>
              <p className="mb-4 text-xs font-semibold text-slate-400">{c.modules.length} module{c.modules.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => startEdit(c)} className="btn-secondary !px-3 !py-1.5 text-xs">
                <Pencil size={14} /> Edit
              </button>
              <button onClick={() => void handleTogglePublish(c)} className="btn-secondary !px-3 !py-1.5 text-xs">
                {c.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                {c.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => handleDelete(c.slug)} className="btn-secondary !px-3 !py-1.5 text-xs text-rose-600 hover:!bg-rose-50">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
