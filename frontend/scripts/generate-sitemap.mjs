import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const configuredUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

if (!configuredUrl) {
  console.warn(
    "Sitemap not generated: set VITE_SITE_URL or SITE_URL to the canonical production URL.",
  );
  process.exit(0);
}

const siteUrl = new URL(configuredUrl);
if (siteUrl.protocol !== "https:" && siteUrl.hostname !== "localhost") {
  throw new Error("The production site URL must use HTTPS.");
}

const routes = [
  "/",
  "/about",
  "/courses",
  "/courses/demo-class",
  "/courses/beginner",
  "/courses/advanced",
  "/courses/prompt-engineering",
  "/courses/image-generation",
  "/courses/video-generation",
  "/courses/website-development",
  "/courses/app-development",
  "/courses/learn-ai-for-study",
  "/courses/presentation-development",
  "/courses/beginner-advanced-combo",
  "/certification",
  "/contact",
];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const entries = routes
  .map((route) => `  <url><loc>${escapeXml(new URL(route, siteUrl).href)}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
const outputDirectory = resolve("dist");
const sitemapPath = resolve(outputDirectory, "sitemap.xml");
const robotsPath = resolve(outputDirectory, "robots.txt");

await mkdir(dirname(sitemapPath), { recursive: true });
await writeFile(sitemapPath, sitemap);

const robots = await readFile(robotsPath, "utf8");
const updatedRobots = `${robots.replace(/^Sitemap:.*\r?\n?/gim, "").trimEnd()}\nSitemap: ${new URL("/sitemap.xml", siteUrl).href}\n`;
await writeFile(robotsPath, updatedRobots);

console.log(`Generated sitemap for ${siteUrl.origin}`);