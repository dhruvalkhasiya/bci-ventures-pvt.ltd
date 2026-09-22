import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/environment";
import { failure } from "../utils/response";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return failure(res, "Not authorized, no token provided", 401);
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch {
    return failure(res, "Not authorized, invalid token", 401);
  }
}
