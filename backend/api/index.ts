import app from "../src/app";
import { connectDatabase } from "../src/config/database";

let connectionPromise: Promise<void> | null = null;

// Middleware to ensure DB connection is initialized once per serverless cold start
app.use(async (_req, _res, next) => {
  if (!connectionPromise) {
    connectionPromise = connectDatabase().catch((err) => {
      console.error("[Vercel DB Connection Error]:", err);
    });
  }
  try {
    await connectionPromise;
  } catch {
    // Continue request processing even if DB connection has an error
  }
  next();
});

export default app;
