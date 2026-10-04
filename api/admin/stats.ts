import app from "../../backend/src/app";
import { connectDatabase } from "../../backend/src/config/database";

let connectionPromise: Promise<void> | null = null;

app.use(async (_req, _res, next) => {
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
  next();
});

export default app;
