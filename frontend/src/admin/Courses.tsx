import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from "lucide-react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  togglePublish,
  addModule,
  removeModule,
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
};

export default function AdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>(getAllCourses());
  const [mode, setMode] = useState<"list" | "new" | "edit">("list");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<CoursePayload>(emptyForm);
  const [moduleDraft, setModuleDraft] = useState({ title: "", description: "" });

  const refresh = () => setCourses(getAllCourses());

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
    });
    setEditingSlug(course.slug);
    setMode("edit");
  };

  const cancel = () => {
    setMode("list");
    setEditingSlug(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "price" ? (value === "" ? null : Number(value)) : value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "new") {
      createCourse(form);
    } else if (mode === "edit" && editingSlug) {
      updateCourse(editingSlug, form);
    }
    refresh();
    cancel();
  };

  const handleDelete = (slug: string) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    deleteCourse(slug);
    refresh();
  };

  const handleTogglePublish = (slug: string) => {
    togglePublish(slug);
    refresh();
  };

  const handleAddModule = (slug: string) => {
    if (!moduleDraft.title.trim()) return;
    addModule(slug, moduleDraft.title, moduleDraft.description);
    setModuleDraft({ title: "", description: "" });
    refresh();
  };

  const handleRemoveModule = (slug: string, moduleNumber: number) => {
    removeModule(slug, moduleNumber);
    refresh();
  };

  const editingCourse = editingSlug ? courses.find((c) => c.slug === editingSlug) : undefined;

  if (mode !== "list") {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{mode === "new" ? "Add Course" : `Edit ${editingCourse?.title}`}</h1>
          <button onClick={cancel} className="flex items-center gap-1 text-sm text-ink/60 hover:text-ink">
            <X size={16} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSave} className="glass-card grid gap-4 p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-ink/70">Title</label>
            <input required name="title" value={form.title} onChange={handleChange} className="input-field" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-ink/70">Overview</label>
            <textarea required name="overview" value={form.overview} onChange={handleChange} rows={2} className="input-field" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-ink/70">Who Is This For?</label>
            <textarea required name="audience" value={form.audience} onChange={handleChange} rows={2} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">Price (₹, blank = contact for pricing)</label>
            <input type="number" name="price" value={form.price ?? ""} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">Price Label</label>
            <input required name="priceLabel" value={form.priceLabel} onChange={handleChange} className="input-field" placeholder="e.g. ₹1,499" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">Duration</label>
            <input required name="duration" value={form.duration} onChange={handleChange} className="input-field" placeholder="e.g. 10–12 Days" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">Timing</label>
            <input required name="timing" value={form.timing} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">Coding Requirement</label>
            <input required name="coding" value={form.coding} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">Certificate Label</label>
            <input required name="certificate" value={form.certificate} onChange={handleChange} className="input-field" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-ink/70">CTA Button Label</label>
            <input required name="ctaLabel" value={form.ctaLabel} onChange={handleChange} className="input-field" />
          </div>

          <button type="submit" className="btn-primary md:col-span-2">
            <Save size={18} /> {mode === "new" ? "Create Course" : "Save Changes"}
          </button>
        </form>

        {mode === "edit" && editingCourse && (
          <div className="glass-card mt-6 p-6">
            <h2 className="mb-4 font-semibold">Modules</h2>
            <div className="mb-4 space-y-2">
              {editingCourse.modules.map((m) => (
                <div key={m.number} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm">
                  <span>
                    <span className="mr-2 text-brand-700">{String(m.number).padStart(2, "0")}</span>
                    {m.title}
                  </span>
                  <button onClick={() => handleRemoveModule(editingCourse.slug, m.number)} className="text-ink/40 hover:text-red-400">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {editingCourse.modules.length === 0 && <p className="text-sm text-ink/40">No modules yet.</p>}
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
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-ink/50">Add, edit, price, publish, and manage modules for every course.</p>
        </div>
        <button onClick={startCreate} className="btn-primary">
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div key={c.slug} className="glass-card p-6">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="font-semibold">{c.title}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${c.status === "published" ? "bg-green-500/15 text-green-400" : "bg-white/10 text-ink/50"
                  }`}
              >
                {c.status}
              </span>
            </div>
            <p className="mb-2 text-xs text-ink/50">{c.duration} · {c.timing}</p>
            <p className="mb-4 font-display font-bold text-brand-700">{c.priceLabel}</p>
            <p className="mb-4 text-xs text-ink/40">{c.modules.length} module{c.modules.length !== 1 ? "s" : ""}</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => startEdit(c)} className="btn-secondary !px-3 !py-1.5 text-xs">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => handleTogglePublish(c.slug)} className="btn-secondary !px-3 !py-1.5 text-xs">
                {c.status === "published" ? <EyeOff size={13} /> : <Eye size={13} />}
                {c.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => handleDelete(c.slug)} className="btn-secondary !px-3 !py-1.5 text-xs text-red-400 hover:!bg-red-500/10">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
