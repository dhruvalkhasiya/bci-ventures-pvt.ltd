import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const targets = [
  "api/health.js",
  "api/admin/stats.js",
  "api/registrations.js",
  "api/enquiries.js",
  "api/courses.js",
  "api/students.js",
  "api/certificates.js",
  "api/[...path].js",
];

console.log("[Bundle API] Pre-bundling serverless API handlers for Vercel...");

const apiDir = path.resolve("api");
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

const adminDir = path.resolve("api/admin");
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

const entryFile = path.resolve("scripts/api_entry.ts");

const cmd = `npx esbuild "${entryFile}" --bundle --platform=node --target=node18 --format=cjs --outfile="api/index.js" --external:express --external:mongoose --external:cors --external:exceljs --external:bcrypt --external:bcryptjs --external:jsonwebtoken --external:nodemailer --external:firebase-admin`;

execSync(cmd, { stdio: "inherit" });
console.log("[Bundle API] Successfully compiled primary serverless bundle api/index.js");

for (const target of targets) {
  const targetPath = path.resolve(target);
  fs.copyFileSync(path.resolve("api/index.js"), targetPath);
  console.log(`[Bundle API] Copied bundle to ${target}`);
}

console.log("[Bundle API] Successfully created all Vercel serverless functions!");
