import { Request, Response } from "express";
import Student from "../models/Student";
import { success, failure } from "../utils/response";

export async function getStudents(req: Request, res: Response) {
  try {
    const { course, search } = req.query;
    const filter: Record<string, unknown> = {};
    if (course) filter.enrolledCourses = course;
    if (search) filter.name = { $regex: String(search), $options: "i" };
    const students = await Student.find(filter).sort({ createdAt: -1 });
    return success(res, students);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function getStudentById(req: Request, res: Response) {
  try {
    const student = await Student.findById(req.params.id).populate("enrolledCourses");
    if (!student) return failure(res, "Student not found", 404);
    return success(res, student);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return failure(res, "Student not found", 404);
    return success(res, student, "Student updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}
