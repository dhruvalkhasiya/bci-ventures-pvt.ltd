import { Request, Response } from "express";
import Registration from "../models/Registration";
import { success, failure } from "../utils/response";

export async function createRegistration(req: Request, res: Response) {
  try {
    const { fullName, email, mobile, course, city, profession, preferredBatch, message } = req.body;
    const registration = await Registration.create({
      name: fullName,
      email,
      phone: mobile,
      courseId: course,
      city,
      profession,
      preferredBatch,
      message,
    });
    return success(res, registration, "Registration submitted successfully!", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function getRegistrations(req: Request, res: Response) {
  try {
    const { status, courseId } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;
    const registrations = await Registration.find(filter).sort({ createdAt: -1 });
    return success(res, registrations);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function getRegistrationById(req: Request, res: Response) {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return failure(res, "Registration not found", 404);
    return success(res, registration);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateRegistration(req: Request, res: Response) {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registration) return failure(res, "Registration not found", 404);
    return success(res, registration, "Registration updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}
