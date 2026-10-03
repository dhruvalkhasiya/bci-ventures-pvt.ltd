import { Request, Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { success, failure } from "../utils/response";
import { getFirebaseAdminAuth } from "../config/firebaseAdmin";

export async function login(req: Request, res: Response) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return failure(res, "Admin sign-in is temporarily unavailable because the database is not connected.", 503);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || user.role !== "admin" || !user.passwordHash) return failure(res, "Invalid email or password", 401);

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return failure(res, "Invalid email or password", 401);

    const token = generateToken(user.id, user.role);
    return success(res, { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, "Login successful");
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function createStudentSession(req: Request, res: Response) {
  const idToken = req.body?.idToken;
  if (typeof idToken !== "string" || !idToken) return failure(res, "Firebase ID token is required");

  let firebaseAuth;
  try {
    firebaseAuth = getFirebaseAdminAuth();
  } catch {
    return failure(res, "Student sign-in is not configured on the server", 503);
  }

  let identity;
  try {
    identity = await firebaseAuth.verifyIdToken(idToken);
  } catch {
    return failure(res, "Invalid or expired student sign-in", 401);
  }

  const provider = identity.firebase.sign_in_provider;
  if (provider !== "google.com" && provider !== "phone") {
    return failure(res, "Use Google or phone verification to sign in", 401);
  }

  const email = identity.email?.toLowerCase();
  const phone = identity.phone_number;
  if (provider === "google.com" && (!email || !identity.email_verified)) {
    return failure(res, "A verified Google email is required", 401);
  }
  if (provider === "phone" && !phone) return failure(res, "A verified phone number is required", 401);

  try {
    let user = await User.findOne({ firebaseUid: identity.uid });
    if (!user && email) user = await User.findOne({ email });
    if (!user && phone) user = await User.findOne({ phone });
    if (user && user.role !== "student") return failure(res, "This account cannot use student sign-in", 401);
    if (user?.firebaseUid && user.firebaseUid !== identity.uid) {
      return failure(res, "This account is linked to another sign-in identity", 409);
    }

    const name = identity.name?.trim() || phone || email || "BCI Student";
    if (!user) {
      user = await User.create({ name, email, phone, firebaseUid: identity.uid, role: "student" });
    } else {
      user.name = identity.name?.trim() || user.name || name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.firebaseUid = identity.uid;
      await user.save();
    }

    const token = generateToken(user.id, "student");
    return success(
      res,
      { token, user: { id: user.id, name: user.name, email: user.email || "", phone: user.phone || "", role: user.role } },
      "Student sign-in successful",
    );
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function logout(_req: Request, res: Response) {
  // Stateless JWT — logout is handled client-side by discarding the token.
  return success(res, null, "Logged out");
}
