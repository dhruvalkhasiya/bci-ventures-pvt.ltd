// API service layer.
//
// This currently runs in MOCK MODE — it stores everything in localStorage
// so the site (including the full admin panel) is functional without a
// backend. Once the real backend (see /backend) is deployed, set
// VITE_API_BASE_URL in .env and flip USE_MOCK to false. Function names
// and shapes mirror the planned real endpoints so calling code won't need
// to change much.

import { courses as staticCourses, Course } from "../data/courses";

const USE_MOCK = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function mockDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function readLocal<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ------------------------------------------------------------------ */
/* Registrations                                                       */
/* ------------------------------------------------------------------ */

export interface RegistrationPayload {
  fullName: string;
  email: string;
  mobile: string;
  course: string;
  city: string;
  profession: string;
  preferredBatch: string;
  message?: string;
}

function saveLocal(key: string, entry: unknown, extra: Record<string, unknown> = {}) {
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({ ...(entry as object), id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "New", ...extra });
  localStorage.setItem(key, JSON.stringify(existing));
}

export async function submitRegistration(payload: RegistrationPayload) {
  if (USE_MOCK) {
    saveLocal("bci_registrations", payload, { status: "Pending" });
    return mockDelay({ success: true, message: "Registration submitted successfully!" });
  }
  const res = await fetch(`${API_BASE_URL}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Registration failed. Please try again.");
  return res.json();
}

export function getStoredRegistrations() {
  return readLocal<any[]>("bci_registrations", []);
}

export function updateRegistrationStatus(id: string, status: string) {
  const list = getStoredRegistrations();
  const updated = list.map((r: any) => (r.id === id ? { ...r, status } : r));
  writeLocal("bci_registrations", updated);
  return updated;
}

/* ------------------------------------------------------------------ */
/* Enquiries                                                            */
/* ------------------------------------------------------------------ */

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}

export const ENQUIRY_STATUSES = ["New", "Contacted", "Interested", "Converted", "Closed"] as const;

export async function submitEnquiry(payload: EnquiryPayload) {
  if (USE_MOCK) {
    saveLocal("bci_enquiries", payload);
    return mockDelay({ success: true, message: "Enquiry submitted successfully!" });
  }
  const res = await fetch(`${API_BASE_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Enquiry failed. Please try again.");
  return res.json();
}

export function getStoredEnquiries() {
  return readLocal<any[]>("bci_enquiries", []);
}

export function updateEnquiryStatus(id: string, status: string) {
  const list = getStoredEnquiries();
  const updated = list.map((e: any) => (e.id === id ? { ...e, status } : e));
  writeLocal("bci_enquiries", updated);
  return updated;
}

/* ------------------------------------------------------------------ */
/* Courses (full CRUD, mock-persisted, seeded from static data)        */
/* ------------------------------------------------------------------ */

export interface AdminCourse extends Course {
  status: "published" | "draft";
}

const COURSES_KEY = "bci_courses";

function seedCourses(): AdminCourse[] {
  return staticCourses.map((c) => ({ ...c, status: "published" as const }));
}

export function getAllCourses(): AdminCourse[] {
  const existing = localStorage.getItem(COURSES_KEY);
  if (!existing) {
    const seeded = seedCourses();
    writeLocal(COURSES_KEY, seeded);
    return seeded;
  }
  try {
    return JSON.parse(existing);
  } catch {
    const seeded = seedCourses();
    writeLocal(COURSES_KEY, seeded);
    return seeded;
  }
}

export function getPublishedCourses(): AdminCourse[] {
  return getAllCourses().filter((c) => c.status === "published");
}

export function getCourseBySlugAdmin(slug: string): AdminCourse | undefined {
  return getAllCourses().find((c) => c.slug === slug);
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface CoursePayload {
  title: string;
  overview: string;
  audience: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  timing: string;
  coding: string;
  certificate: string;
  ctaLabel: string;
}

export function createCourse(payload: CoursePayload): AdminCourse {
  const all = getAllCourses();
  const slug = slugify(payload.title) || crypto.randomUUID().slice(0, 8);
  const newCourse: AdminCourse = {
    ...payload,
    slug,
    shortTitle: payload.title,
    tag: String(all.length + 1).padStart(2, "0"),
    modules: [],
    status: "draft",
  };
  writeLocal(COURSES_KEY, [...all, newCourse]);
  return newCourse;
}

export function updateCourse(slug: string, updates: Partial<AdminCourse>): AdminCourse | undefined {
  const all = getAllCourses();
  let updated: AdminCourse | undefined;
  const next = all.map((c) => {
    if (c.slug === slug) {
      updated = { ...c, ...updates };
      return updated;
    }
    return c;
  });
  writeLocal(COURSES_KEY, next);
  return updated;
}

export function deleteCourse(slug: string) {
  const all = getAllCourses();
  writeLocal(COURSES_KEY, all.filter((c) => c.slug !== slug));
}

export function togglePublish(slug: string) {
  const course = getCourseBySlugAdmin(slug);
  if (!course) return;
  return updateCourse(slug, { status: course.status === "published" ? "draft" : "published" });
}

export function addModule(slug: string, title: string, description: string) {
  const course = getCourseBySlugAdmin(slug);
  if (!course) return;
  const nextNumber = (course.modules[course.modules.length - 1]?.number || 0) + 1;
  const modules = [...course.modules, { number: nextNumber, title, description }];
  return updateCourse(slug, { modules });
}

export function removeModule(slug: string, moduleNumber: number) {
  const course = getCourseBySlugAdmin(slug);
  if (!course) return;
  const modules = course.modules.filter((m) => m.number !== moduleNumber);
  return updateCourse(slug, { modules });
}

/* ------------------------------------------------------------------ */
/* Students (derived from registrations, with an editable status)      */
/* ------------------------------------------------------------------ */

export interface StudentRecord {
  email: string;
  name: string;
  phone: string;
  city: string;
  courses: string[];
  status: string;
  registrations: any[];
  createdAt: string;
}

export const STUDENT_STATUSES = ["Enrolled", "Active", "Completed", "Dropped"] as const;

const STUDENT_STATUS_KEY = "bci_student_status";

export function getStudents(filters: { search?: string; course?: string } = {}): StudentRecord[] {
  const registrations = getStoredRegistrations();
  const statusOverrides = readLocal<Record<string, string>>(STUDENT_STATUS_KEY, {});

  const byEmail = new Map<string, StudentRecord>();
  for (const r of registrations) {
    const key = (r.email || "").toLowerCase();
    if (!key) continue;
    if (!byEmail.has(key)) {
      byEmail.set(key, {
        email: r.email,
        name: r.fullName,
        phone: r.mobile,
        city: r.city,
        courses: [],
        status: statusOverrides[key] || "Enrolled",
        registrations: [],
        createdAt: r.createdAt,
      });
    }
    const student = byEmail.get(key)!;
    if (r.course && !student.courses.includes(r.course)) student.courses.push(r.course);
    student.registrations.push(r);
  }

  let list = Array.from(byEmail.values());

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
  }
  if (filters.course) {
    list = list.filter((s) => s.courses.includes(filters.course!));
  }

  return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function updateStudentStatus(email: string, status: string) {
  const key = email.toLowerCase();
  const overrides = readLocal<Record<string, string>>(STUDENT_STATUS_KEY, {});
  overrides[key] = status;
  writeLocal(STUDENT_STATUS_KEY, overrides);
}

/* ------------------------------------------------------------------ */
/* Certificates                                                         */
/* ------------------------------------------------------------------ */

export interface CertificateRecord {
  certificateId: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  status: "valid" | "revoked";
  createdAt: string;
}

const CERTIFICATES_KEY = "bci_certificates";

export function getCertificates(): CertificateRecord[] {
  return readLocal<CertificateRecord[]>(CERTIFICATES_KEY, []);
}

export function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const count = getCertificates().length + 1;
  return `BCI-${year}-${String(count).padStart(4, "0")}`;
}

export function issueCertificate(studentName: string, courseName: string, completionDate: string): CertificateRecord {
  const cert: CertificateRecord = {
    certificateId: generateCertificateNumber(),
    studentName,
    courseName,
    completionDate,
    status: "valid",
    createdAt: new Date().toISOString(),
  };
  const all = getCertificates();
  writeLocal(CERTIFICATES_KEY, [...all, cert]);
  return cert;
}

export function revokeCertificate(certificateId: string) {
  const all = getCertificates();
  const updated = all.map((c) => (c.certificateId === certificateId ? { ...c, status: "revoked" as const } : c));
  writeLocal(CERTIFICATES_KEY, updated);
  return updated;
}

export interface CertificateResult {
  valid: boolean;
  studentName?: string;
  courseName?: string;
  issueDate?: string;
}

export async function verifyCertificate(certificateId: string): Promise<CertificateResult> {
  if (USE_MOCK) {
    const id = certificateId.trim().toUpperCase();

    // Built-in demo certificate for testing the verification UI.
    if (id === "BCI-DEMO-0001") {
      return mockDelay({
        valid: true,
        studentName: "Demo Student",
        courseName: "AI Beginner Batch",
        issueDate: "2026-01-15",
      });
    }

    const cert = getCertificates().find((c) => c.certificateId.toUpperCase() === id);
    if (!cert || cert.status !== "valid") return mockDelay({ valid: false });
    return mockDelay({
      valid: true,
      studentName: cert.studentName,
      courseName: cert.courseName,
      issueDate: cert.completionDate,
    });
  }
  const res = await fetch(`${API_BASE_URL}/certificates/verify/${encodeURIComponent(certificateId)}`);
  if (!res.ok) return { valid: false };
  return res.json();
}
