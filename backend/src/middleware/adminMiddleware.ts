import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { failure } from "../utils/response";

export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return failure(res, "Admin access required", 403);
  }
  next();
}
