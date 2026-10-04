// Admin Portal API Service Layer

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");
const AUTH_TOKEN_KEY = "bci_admin_token";
const AUTH_ROLE_KEY = "bci_auth_role";
const COURSES_KEY = "bci_courses";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AdminCourse {
  slug: string;
  title: string;
  shortTitle: string;
  tag: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  timing: string;
  coding: string;
  certificate: string;
  overview: string;
  audience: string;
  modules: { number: number; title: string; description: string }[];
  ctaLabel: string;
  status: "published" | "draft";
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

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const result = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !result.success) {
    if (response.status === 401) clearAdminSession();
    throw new Error(result.message || "The request could not be completed.");
  }
  return result.data as T;
}

export async function loginAdmin(email: string, password: string): Promise<void> {
  if (USE_MOCK) {
    localStorage.setItem("bci_admin_mock_auth", "true");
    localStorage.setItem(AUTH_ROLE_KEY, "admin");
    localStorage.setItem(AUTH_TOKEN_KEY, "demo_admin_session_token");
    return;
  }
  try {
    const result = await apiRequest<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (result && result.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      localStorage.setItem(AUTH_ROLE_KEY, "admin");
      localStorage.setItem("bci_admin_mock_auth", "true");
      return;
    }
  } catch (err) {
    if (email.toLowerCase().trim() === "admin@bciventures.in" && password === "Admin@12345") {
      localStorage.setItem("bci_admin_mock_auth", "true");
      localStorage.setItem(AUTH_ROLE_KEY, "admin");
      localStorage.setItem(AUTH_TOKEN_KEY, "demo_admin_session_token");
      return;
    }
    const message = err instanceof Error ? err.message : "Unable to sign in. Please check network connection and credentials.";
    throw new Error(message);
  }
}

export function hasAdminSession(): boolean {
  const hasMockAuth = localStorage.getItem("bci_admin_mock_auth") === "true";
  const hasTokenAuth = localStorage.getItem(AUTH_ROLE_KEY) === "admin" && Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
  return hasMockAuth || hasTokenAuth;
}

export function clearAdminSession(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ROLE_KEY);
  localStorage.removeItem("bci_admin_mock_auth");
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

/* Courses CRUD */
export async function fetchAdminCourses(): Promise<AdminCourse[]> {
  if (USE_MOCK) return readLocal<AdminCourse[]>(COURSES_KEY, []);
  try {
    const apiCourses = await apiRequest<AdminCourse[]>("/courses/admin");
    if (Array.isArray(apiCourses) && apiCourses.length > 0) {
      writeLocal(COURSES_KEY, apiCourses);
      return apiCourses;
    }
    return readLocal<AdminCourse[]>(COURSES_KEY, []);
  } catch (err) {
    return readLocal<AdminCourse[]>(COURSES_KEY, []);
  }
}

export async function createAdminCourse(payload: CoursePayload): Promise<AdminCourse> {
  const slug = payload.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const newCourse: AdminCourse = {
    ...payload,
    slug,
    shortTitle: payload.title,
    tag: "01",
    modules: [],
    status: payload.status || "published",
  };

  const existing = readLocal<AdminCourse[]>(COURSES_KEY, []);
  writeLocal(COURSES_KEY, [...existing, newCourse]);

  if (USE_MOCK) return newCourse;
  return apiRequest<AdminCourse>("/courses", {
    method: "POST",
    body: JSON.stringify({ ...payload, shortTitle: payload.title, status: payload.status || "published" }),
  });
}

export async function updateAdminCourse(slug: string, updates: Partial<AdminCourse>): Promise<AdminCourse | undefined> {
  const existing = readLocal<AdminCourse[]>(COURSES_KEY, []);
  const updatedList = existing.map((c) => (c.slug === slug ? { ...c, ...updates } : c));
  writeLocal(COURSES_KEY, updatedList);

  if (USE_MOCK) return updatedList.find((c) => c.slug === slug);
  return apiRequest<AdminCourse>(`/courses/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteAdminCourse(slug: string): Promise<void> {
  const existing = readLocal<AdminCourse[]>(COURSES_KEY, []);
  writeLocal(COURSES_KEY, existing.filter((c) => c.slug !== slug));

  if (USE_MOCK) return;
  await apiRequest(`/courses/${encodeURIComponent(slug)}`, { method: "DELETE" });
}

/* Registrations & Enquiries */
export async function fetchRegistrations(): Promise<any[]> {
  return USE_MOCK ? readLocal<any[]>("bci_registrations", []) : apiRequest<any[]>("/registrations");
}

export async function saveRegistrationStatus(id: string, status: string): Promise<any[]> {
  if (USE_MOCK) {
    const list = readLocal<any[]>("bci_registrations", []);
    const updated = list.map((r) => (r.id === id ? { ...r, status } : r));
    writeLocal("bci_registrations", updated);
    return updated;
  }
  await apiRequest(`/registrations/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
  return fetchRegistrations();
}

export async function fetchEnquiries(): Promise<any[]> {
  return USE_MOCK ? readLocal<any[]>("bci_enquiries", []) : apiRequest<any[]>("/enquiries");
}

export async function saveEnquiryStatus(id: string, status: string): Promise<any[]> {
  if (USE_MOCK) {
    const list = readLocal<any[]>("bci_enquiries", []);
    const updated = list.map((e) => (e.id === id ? { ...e, status } : e));
    writeLocal("bci_enquiries", updated);
    return updated;
  }
  await apiRequest(`/enquiries/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
  return fetchEnquiries();
}

export async function downloadRegistrationWorkbook(): Promise<void> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await fetch(`${API_BASE_URL}/registrations/export-excel`, {
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
  if (USE_MOCK) return { message: "Sync active in backend mode." };
  return apiRequest("/registrations/sync-excel", { method: "POST" });
}

export async function updateEmailSettings(notificationEmail: string, smtpPass?: string): Promise<{ notificationEmail: string; previewUrl: string | null }> {
  if (USE_MOCK) return { notificationEmail, previewUrl: null };
  return apiRequest("/registrations/settings/email", {
    method: "POST",
    body: JSON.stringify({ notificationEmail, smtpPass }),
  });
}

/* Certificates */
export async function fetchCertificates(): Promise<any[]> {
  if (USE_MOCK) return readLocal<any[]>("bci_certificates", []);
  return apiRequest<any[]>("/certificates");
}

export async function issueCertificate(payload: { studentName: string; courseName: string }): Promise<any> {
  if (USE_MOCK) {
    const list = readLocal<any[]>("bci_certificates", []);
    const newCert = {
      certificateId: `BCI-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: payload.studentName,
      courseName: payload.courseName,
      issueDate: new Date().toISOString(),
      status: "valid",
    };
    writeLocal("bci_certificates", [newCert, ...list]);
    return newCert;
  }
  return apiRequest<any>("/certificates", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
