import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./environment";

export async function connectDatabase(): Promise<void> {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is not set in the environment");
  }

  dns.setServers(env.dnsServers);
  await mongoose.connect(env.mongoUri);

  console.log("MongoDB connected");
}