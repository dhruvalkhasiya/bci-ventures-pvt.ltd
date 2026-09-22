import jwt from "jsonwebtoken";
import { env } from "../config/environment";

export function generateToken(userId: string, role: string): string {
  return jwt.sign({ id: userId, role }, env.jwtSecret, { expiresIn: "7d" });
}
