import app from "../src/app";
import { connectDatabase } from "../src/config/database";

let isConnected = false;

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    try {
      await connectDatabase();
    } catch (err) {
      console.error("[Vercel Serverless] Database initialization error:", err);
    }
    isConnected = true;
  }
  return app(req, res);
}
