import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database";
import User from "../models/User";

async function createAdmin() {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error("Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in backend/.env first.");
  }

  await connectDatabase();
  try {
    const existing = await User.findOne({ email });
    if (existing) throw new Error(`An account already exists for ${email}.`);

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({ name, email, passwordHash, role: "admin" });
    console.log(`Admin account created for ${email}`);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin().catch((error: unknown) => {
  console.error("Unable to create admin:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});