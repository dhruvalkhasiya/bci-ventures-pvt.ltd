import app from "../backend/src/app";
import { connectDatabase } from "../backend/src/config/database";

let connectionPromise: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  try {
    if (!connectionPromise) {
      connectionPromise = connectDatabase().catch((err) => {
        console.error("[Vercel DB Connection Error]:", err);
      });
    }
    await connectionPromise;
  } catch (dbErr) {
    console.warn("[Vercel Handler DB Warn]:", dbErr);
  }

  return new Promise<void>((resolve) => {
    app(req, res, (err: any) => {
      if (err) {
        console.error("[Vercel Express Error]:", err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
        }
      }
      resolve();
    });
  });
}
