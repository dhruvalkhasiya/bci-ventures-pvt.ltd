import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { env } from "./environment";

export function getFirebaseAdminAuth() {
  if (!env.firebaseProjectId) throw new Error("FIREBASE_PROJECT_ID is not configured.");

  const appName = "bci-student-auth";
  const app =
    getApps().find((firebaseApp) => firebaseApp.name === appName) ||
    initializeApp(
      { credential: applicationDefault(), projectId: env.firebaseProjectId },
      appName,
    );

  return getAuth(app);
}