import { Request, Response } from "express";
import Course from "../models/Course";
import { success, failure } from "../utils/response";

export async function getCourses(_req: Request, res: Response) {
  try {
    const courses = await Course.find({ status: "published" }).sort({ createdAt: 1 });
    return success(res, courses);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const course = await Course.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] });
    if (!course) return failure(res, "Course not found", 404);
    return success(res, course);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const course = await Course.create(req.body);
    return success(res, course, "Course created", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return failure(res, "Course not found", 404);
    return success(res, course, "Course updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return failure(res, "Course not found", 404);
    return success(res, null, "Course deleted");
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}
