import { Request, Response } from "express";
import Course from "../models/Course";
import { success, failure } from "../utils/response";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function serializeCourse(course: any) {
  const record = course.toObject ? course.toObject() : course;
  return {
    ...record,
    id: String(record._id),
    shortTitle: record.shortTitle || record.title,
    overview: record.overview || record.description || "",
    description: record.description || record.overview || "",
    audience: record.audience || "",
    priceLabel: record.priceLabel || "",
    coding: record.coding || "No Coding Required",
    ctaLabel: record.ctaLabel || "View Course",
    tag: record.tag || "",
  };
}

export async function getCourses(_req: Request, res: Response) {
  try {
    const courses = await Course.find({ status: "published" }).sort({ createdAt: 1 });
    return success(res, courses.map(serializeCourse));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function getAdminCourses(_req: Request, res: Response) {
  try {
    const courses = await Course.find().sort({ createdAt: 1 });
    return success(res, courses.map(serializeCourse));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    let course = await Course.findOne({ slug: req.params.id, status: "published" });
    if (!course && /^[a-f\d]{24}$/i.test(req.params.id)) {
      course = await Course.findOne({ _id: req.params.id, status: "published" });
    }
    if (!course) return failure(res, "Course not found", 404);
    return success(res, serializeCourse(course));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const payload = { ...req.body };
    payload.slug = payload.slug || slugify(payload.title);
    payload.shortTitle = payload.shortTitle || payload.title;
    payload.description = payload.description || payload.overview;
    payload.tag = payload.tag || "";
    payload.status = payload.status || "published";
    const course = await Course.create(payload);
    return success(res, serializeCourse(course), "Course created", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const course = await Course.findOneAndUpdate({ slug: req.params.id }, req.body, { new: true, runValidators: true })
      || ( /^[a-f\d]{24}$/i.test(req.params.id)
        ? await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        : null );
    if (!course) return failure(res, "Course not found", 404);
    return success(res, serializeCourse(course), "Course updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const course = await Course.findOneAndDelete({ slug: req.params.id })
      || ( /^[a-f\d]{24}$/i.test(req.params.id) ? await Course.findByIdAndDelete(req.params.id) : null );
    if (!course) return failure(res, "Course not found", 404);
    return success(res, null, "Course deleted");
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}
