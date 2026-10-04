import app from "../backend/src/app";
import { connectDatabase } from "../backend/src/config/database";

let connectionPromise: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  try {
    if (!connectionPromise) {
      connectionPromise = connectDatabase().catch((err) => {
        console.error("[Vercel DB Error]:", err);
      });
    }
    await connectionPromise;
  } catch (err) {
    console.warn("[Vercel DB Warn]:", err);
  }

  return new Promise<void>((resolve) => {
    let resolved = false;
    const done = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    res.on("finish", done);
    res.on("close", done);

    app(req, res, (err: any) => {
      if (err) {
        console.error("[Vercel Express Error]:", err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
        }
      }
      done();
    });
  });
}
