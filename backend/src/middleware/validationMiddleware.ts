import { Request, Response, NextFunction } from "express";
import { isValidEmail, isValidPhone, isNonEmpty } from "../utils/validators";
import { failure } from "../utils/response";

export function validateRegistration(req: Request, res: Response, next: NextFunction) {
  const { fullName, email, mobile, course, city } = req.body;
  if (!isNonEmpty(fullName)) return failure(res, "Full name is required");
  if (!isValidEmail(email)) return failure(res, "A valid email is required");
  if (!isValidPhone(mobile)) return failure(res, "A valid mobile number is required");
  if (!isNonEmpty(course)) return failure(res, "Course is required");
  if (!isNonEmpty(city)) return failure(res, "City is required");
  next();
}

export function validateEnquiry(req: Request, res: Response, next: NextFunction) {
  const { name, phone, email, message } = req.body;
  if (!isNonEmpty(name)) return failure(res, "Name is required");
  if (!isValidPhone(phone)) return failure(res, "A valid phone number is required");
  if (!isValidEmail(email)) return failure(res, "A valid email is required");
  if (!isNonEmpty(message)) return failure(res, "Message is required");
  next();
}
