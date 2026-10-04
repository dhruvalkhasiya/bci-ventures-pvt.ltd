import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

const endpoints = [
  "api/health.js",
  "api/admin/stats.js",
  "api/registrations.js",
  "api/enquiries.js",
  "api/courses.js",
  "api/students.js",
  "api/certificates.js",
  "api/[...path].js",
  "api/index.js",
];

const destDirs = ["api", "frontend/api", "admin/api", "backend/api"];

console.log("[Bundle API] Pre-bundling serverless API handlers for Vercel...");

for (const dir of destDirs) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  const fullAdminDir = path.join(fullDir, "admin");
  if (!fs.existsSync(fullAdminDir)) {
    fs.mkdirSync(fullAdminDir, { recursive: true });
  }
}

const entryFile = path.resolve("scripts/api_entry.ts");
const primaryBundle = path.resolve("api/index.js");

const cmd = `npx esbuild "${entryFile}" --bundle --platform=node --target=node18 --format=cjs --outfile="${primaryBundle}" --external:express --external:mongoose --external:cors --external:exceljs --external:bcrypt --external:bcryptjs --external:jsonwebtoken --external:nodemailer --external:firebase-admin`;

execSync(cmd, { stdio: "inherit" });
console.log("[Bundle API] Successfully compiled primary serverless bundle api/index.js");

for (const destDir of destDirs) {
  for (const ep of endpoints) {
    const relSubPath = ep.replace(/^api\//, "");
    const targetPath = path.resolve(destDir, relSubPath);
    const targetParent = path.dirname(targetPath);
    if (!fs.existsSync(targetParent)) {
      fs.mkdirSync(targetParent, { recursive: true });
    }
    fs.copyFileSync(primaryBundle, targetPath);
  }
}

console.log("[Bundle API] Unifying dist output for monorepo static assets...");
if (fs.existsSync("frontend/dist")) {
  copyRecursiveSync("frontend/dist", "dist");
}
if (fs.existsSync("admin/dist")) {
  copyRecursiveSync("admin/dist", "dist/admin");
}

console.log("[Bundle API] Successfully deployed pre-bundled functions and static outputs across root dist!");
