import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const targets = [
  "api/index.js",
  "api/health.js",
  "api/registrations.js",
  "api/enquiries.js",
  "api/courses.js",
  "api/students.js",
  "api/certificates.js",
  "api/admin/stats.js",
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

const cmd = `npx esbuild scripts/api_entry.ts --bundle --platform=node --target=node18 --format=cjs --outfile=api/index.js --external:express --external:mongoose --external:cors --external:exceljs --external:bcrypt --external:bcryptjs --external:jsonwebtoken --external:nodemailer --external:firebase-admin`;

execSync(cmd, { stdio: "inherit" });

for (const target of targets) {
  if (target !== "api/index.js") {
    fs.copyFileSync("api/index.js", target);
  }
}

// Copy to [...path].js as well for catch-all routing
fs.copyFileSync("api/index.js", "api/[...path].js");

console.log("[Bundle API] Successfully bundled all serverless endpoints!");
