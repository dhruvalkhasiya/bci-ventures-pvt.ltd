import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { company } from "../data/company";
import { getCourseBySlug } from "../data/courses";

type RouteMetadata = {
  title: string;
  description: string;
  noIndex?: boolean;
};

const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "BCI Ventures | Practical AI Courses and Training",
    description:
      "Explore practical AI courses from BCI Ventures, including beginner AI, prompt engineering, AI agents and automation training.",
  },
  "/about": {
    title: "About BCI Ventures | AI Learning in India",
    description:
      "Meet BCI Ventures' founders and mentors and learn about the team's practical approach to AI and technology education.",
  },
  "/courses": {
    title: "AI Courses for Beginners | BCI Ventures",
    description:
      "Compare BCI AI courses in prompt engineering, generative AI, AI for study, website development and more.",
  },
  "/certification": {
    title: "BCI Course Certificates | BCI Ventures",
    description:
      "See how BCI course completion certificates work and verify a certificate issued for a completed course.",
  },
  "/certificate/verify": {
    title: "Verify a BCI Course Certificate",
    description: "Check the authenticity of a BCI course certificate using its certificate ID.",
    noIndex: true,
  },
  "/contact": {
    title: "Contact BCI Ventures | AI Courses and Enquiries",
    description:
      "Contact BCI Ventures with questions about AI courses, course schedules, registration or certificates.",
  },
  "/register": {
    title: "Register for a BCI Course",
    description: "Submit a registration enquiry for a BCI AI or technology course.",
    noIndex: true,
  },
  "/login": {
    title: "Student Login | BCI Ventures",
    description: "Sign in to BCI Ventures.",
    noIndex: true,
  },
  "/admin": {
    title: "Admin Portal | BCI Ventures",
    description: "BCI Ventures administration portal.",
    noIndex: true,
  },
  "/admin/login": {
    title: "Admin Login | BCI Ventures",
    description: "Sign in to the BCI Ventures administration portal.",
    noIndex: true,
  },
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function getSiteOrigin() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();
  return configuredUrl ? new URL(configuredUrl).origin : window.location.origin;
}

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const courseMatch = path.match(/^\/courses\/([^/]+)$/);
    const course = courseMatch ? getCourseBySlug(decodeURIComponent(courseMatch[1])) : undefined;
    const metadata = course
      ? {
          title: `${course.title} Course | BCI Ventures`,
          description: `${course.overview} View course details and registration information.`.slice(0, 160),
        }
      : routeMetadata[path];
    const isAdmin = path === "/admin" || path.startsWith("/admin/");
    const page = metadata || {
      title: "Page Not Found | BCI Ventures",
      description: "The requested BCI Ventures page could not be found.",
      noIndex: true,
    };
    const noIndex = Boolean(page.noIndex || isAdmin);
    const origin = getSiteOrigin();
    const canonicalUrl = new URL(path, `${origin}/`).href;

    const titleElement = document.head.querySelector("title") || document.head.appendChild(document.createElement("title"));
    titleElement.dataset.seoTitle = page.title;
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", noIndex ? "noindex,follow" : "index,follow");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", new URL("/logo.png", origin).href);
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const structuredDataId = "bci-organization-schema";
    let structuredData = document.getElementById(structuredDataId);
    if (path !== "/") {
      structuredData?.remove();
      return;
    }

    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = structuredDataId;
      structuredData.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "BCI Ventures",
      legalName: company.legalName,
      alternateName: [company.name, company.shortName],
      url: origin,
      logo: new URL("/logo.png", origin).href,
      description: company.description,
      email: company.contact.email,
      telephone: company.contact.phone,
    });
  }, [pathname]);

  return null;
}