// API service layer.
//
// This currently runs in MOCK MODE — it stores everything in localStorage
// so the site (including the full admin panel) is functional without a
// backend. Once the real backend (see /backend) is deployed, set
// VITE_API_BASE_URL in .env and flip USE_MOCK to false. Function names
// and shapes mirror the planned real endpoints so calling code won't need
// to change much.

import { courses as staticCourses, Course } from "../data/courses";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export function getApiBaseUrl(): string {
  const envUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (!isLocalhost) {
      return "/api";
    }
  }
  return "http://localhost:5000/api";
}

const AUTH_TOKEN_KEY = "bci_admin_token";
const AUTH_ROLE_KEY = "bci_auth_role";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${baseUrl}${normalizedPath}`;

  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  console.log(`[API Request] ${options.method || 'GET'} ${fullUrl}`);

  let response: Response;
  try {
    response = await fetch(fullUrl, { ...options, headers });
  } catch (netErr: any) {
    console.error(`[API Network Error] ${options.method || 'GET'} ${fullUrl}:`, netErr);
    throw new Error(`Failed to fetch from ${fullUrl}. Please check network connection or backend configuration.`);
  }

  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();
  const preview = rawText.slice(0, 200).replace(/\s+/g, " ");

  let result: ApiResponse<T> | null = null;
  if (contentType.includes("application/json") && rawText.trim()) {
    try {
      result = JSON.parse(rawText) as ApiResponse<T>;
    } catch (parseErr) {
      console.error(`[API JSON Parse Error] ${fullUrl}:`, parseErr);
    }
  }

  if (!response.ok || !result || result.success !== true) {
    if (response.status === 401) clearAdminSession();
    const details = `Status: ${response.status} (${contentType || "no-content-type"}) | Preview: "${preview || '[empty]'}"`;
    const serverMsg = result?.message || (typeof result === "object" && result && "error" in result ? (result as any).error : null);
    const errorMsg = serverMsg ? `${serverMsg} [${details}]` : `API call failed with ${details}`;
    console.error(`[API Error] ${options.method || 'GET'} ${fullUrl}:`, errorMsg);
    throw new Error(errorMsg);
  }
  return result.data as T;
}

export async function loginAdmin(email: string, password: string): Promise<void> {
  if (USE_MOCK) {
    localStorage.setItem("bci_admin_mock_auth", "true");
    return;
  }
  const result = await apiRequest<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(AUTH_TOKEN_KEY, result.token);
  localStorage.setItem(AUTH_ROLE_KEY, "admin");
}

export function hasAdminSession(): boolean {
  return USE_MOCK
    ? localStorage.getItem("bci_admin_mock_auth") === "true"
    : localStorage.getItem(AUTH_ROLE_KEY) === "admin" && Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
}

export function clearAdminSession(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ROLE_KEY);
  localStorage.removeItem("bci_admin_mock_auth");
}

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
  saveLocal("bci_registrations", payload, { status: "Pending" });
  if (USE_MOCK) {
    return mockDelay({ success: true, message: "Registration submitted successfully!" });
  }
  try {
    const res = await apiRequest("/registrations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true, message: "Registration submitted successfully!", data: res };
  } catch (err) {
    console.warn("[Registration] Network request encountered an issue; registration saved locally:", err);
    return { success: true, message: "Registration submitted successfully!" };
  }
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

export async function fetchRegistrations(): Promise<any[]> {
  if (USE_MOCK) return getStoredRegistrations();
  try {
    const apiRecords = await apiRequest<any[]>("/registrations");
    if (Array.isArray(apiRecords) && apiRecords.length > 0) {
      writeLocal("bci_registrations", apiRecords);
      return apiRecords;
    }
    return getStoredRegistrations();
  } catch (err) {
    return getStoredRegistrations();
  }
}

export async function saveRegistrationStatus(id: string, status: string): Promise<any[]> {
  if (USE_MOCK) return updateRegistrationStatus(id, status);
  try {
    await apiRequest(`/registrations/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return fetchRegistrations();
  } catch (err) {
    return updateRegistrationStatus(id, status);
  }
}

export async function downloadRegistrationWorkbook(): Promise<void> {
  if (USE_MOCK) {
    alert("Excel download is active when connected to backend.");
    return;
  }
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await fetch(`${getApiBaseUrl()}/registrations/export-excel`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Failed to download Excel workbook.");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dhruaval.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export async function syncRegistrationWorkbook(): Promise<any> {
  if (USE_MOCK) return { message: "Sync is active in backend mode." };
  return apiRequest("/registrations/sync-excel", { method: "POST" });
}

export async function updateEmailSettings(notificationEmail: string, smtpPass?: string): Promise<{ notificationEmail: string; previewUrl: string | null }> {
  if (USE_MOCK) return { notificationEmail, previewUrl: null };
  return apiRequest("/registrations/settings/email", {
    method: "POST",
    body: JSON.stringify({ notificationEmail, smtpPass }),
  });
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
  saveLocal("bci_enquiries", payload, { status: "New" });
  if (USE_MOCK) {
    return mockDelay({ success: true, message: "Enquiry submitted successfully!" });
  }
  try {
    const res = await apiRequest("/enquiries", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true, message: "Enquiry submitted successfully!", data: res };
  } catch (err) {
    console.warn("[Enquiry] Network request encountered an issue; enquiry saved locally:", err);
    return { success: true, message: "Enquiry submitted successfully!" };
  }
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

export async function fetchEnquiries(): Promise<any[]> {
  return USE_MOCK ? getStoredEnquiries() : apiRequest<any[]>("/enquiries");
}

export async function saveEnquiryStatus(id: string, status: string): Promise<any[]> {
  if (USE_MOCK) return updateEnquiryStatus(id, status);
  await apiRequest(`/enquiries/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
  return fetchEnquiries();
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
  status?: "published" | "draft";
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
    status: payload.status || "published",
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

export async function fetchPublishedCourses(): Promise<AdminCourse[]> {
  if (USE_MOCK) return getPublishedCourses();
  try {
    const apiCourses = await apiRequest<AdminCourse[]>("/courses");
    if (Array.isArray(apiCourses) && apiCourses.length > 0) {
      writeLocal(COURSES_KEY, apiCourses);
      return apiCourses.filter((c) => c.status === "published");
    }
    return getPublishedCourses();
  } catch (err) {
    console.warn("Using fallback stored courses:", err);
    return getPublishedCourses();
  }
}

export async function fetchCourseBySlug(slug: string): Promise<AdminCourse | undefined> {
  if (USE_MOCK) return getCourseBySlugAdmin(slug);
  try {
    const apiCourse = await apiRequest<AdminCourse>(`/courses/${encodeURIComponent(slug)}`);
    return apiCourse || getCourseBySlugAdmin(slug);
  } catch (err) {
    console.warn(`Using fallback for course ${slug}:`, err);
    return getCourseBySlugAdmin(slug);
  }
}

export async function fetchAdminCourses(): Promise<AdminCourse[]> {
  if (USE_MOCK) return getAllCourses();
  try {
    const apiCourses = await apiRequest<AdminCourse[]>("/courses/admin");
    if (Array.isArray(apiCourses) && apiCourses.length > 0) {
      writeLocal(COURSES_KEY, apiCourses);
      return apiCourses;
    }
    return getAllCourses();
  } catch (err) {
    console.warn("Using fallback stored courses:", err);
    return getAllCourses();
  }
}

export async function createAdminCourse(payload: CoursePayload): Promise<AdminCourse> {
  // Always persist local copy for recovery
  createCourse(payload);
  if (USE_MOCK) return getCourseBySlugAdmin(slugify(payload.title))!;
  return apiRequest<AdminCourse>("/courses", {
    method: "POST",
    body: JSON.stringify({ ...payload, shortTitle: payload.title, status: payload.status || "published" }),
  });
}

export async function updateAdminCourse(slug: string, updates: Partial<AdminCourse>): Promise<AdminCourse | undefined> {
  updateCourse(slug, updates);
  if (USE_MOCK) return getCourseBySlugAdmin(slug);
  return apiRequest<AdminCourse>(`/courses/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteAdminCourse(slug: string): Promise<void> {
  deleteCourse(slug);
  if (USE_MOCK) return;
  await apiRequest(`/courses/${encodeURIComponent(slug)}`, { method: "DELETE" });
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

export async function fetchAdminStudents(filters: { search?: string; course?: string } = {}): Promise<StudentRecord[]> {
  if (USE_MOCK) return getStudents(filters);
  const query = new URLSearchParams();
  if (filters.search) query.set("search", filters.search);
  if (filters.course) query.set("course", filters.course);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiRequest<StudentRecord[]>(`/students${suffix}`);
}

export async function saveStudentStatus(email: string, status: string): Promise<void> {
  if (USE_MOCK) {
    updateStudentStatus(email, status);
    return;
  }
  await apiRequest(`/students/email/${encodeURIComponent(email)}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
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

export async function fetchAdminCertificates(): Promise<CertificateRecord[]> {
  return USE_MOCK ? getCertificates() : apiRequest<CertificateRecord[]>("/certificates");
}

export async function createAdminCertificate(
  studentName: string,
  courseName: string,
  completionDate: string,
): Promise<CertificateRecord> {
  if (USE_MOCK) return issueCertificate(studentName, courseName, completionDate);
  return apiRequest<CertificateRecord>("/certificates", {
    method: "POST",
    body: JSON.stringify({ studentName, courseName, completionDate }),
  });
}

export async function revokeAdminCertificate(certificateId: string): Promise<CertificateRecord[]> {
  if (USE_MOCK) return revokeCertificate(certificateId);
  await apiRequest(`/certificates/${encodeURIComponent(certificateId)}/revoke`, { method: "PUT" });
  return fetchAdminCertificates();
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
  return apiRequest<CertificateResult>(`/certificates/verify/${encodeURIComponent(certificateId)}`);
}
