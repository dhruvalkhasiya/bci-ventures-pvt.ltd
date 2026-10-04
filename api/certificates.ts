import app from "../backend/src/app";
import { connectDatabase } from "../backend/src/config/database";

let connectionPromise: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  if (!connectionPromise) {
    connectionPromise = connectDatabase().catch((err) => {
      console.error("[Vercel DB Connection Error]:", err);
    });
  }
  try {
    await connectionPromise;
  } catch {
    // Continue
  }
  return app(req, res);
}
