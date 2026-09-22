import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { success, failure } from "../utils/response";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) return failure(res, "Invalid email or password", 401);

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return failure(res, "Invalid email or password", 401);

    const token = generateToken(user.id, user.role);
    return success(res, { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, "Login successful");
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function logout(_req: Request, res: Response) {
  // Stateless JWT — logout is handled client-side by discarding the token.
  return success(res, null, "Logged out");
}
