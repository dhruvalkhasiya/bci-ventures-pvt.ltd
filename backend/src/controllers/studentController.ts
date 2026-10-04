import { Request, Response } from "express";
import Registration from "../models/Registration";
import { success, failure } from "../utils/response";

function serializeRegistration(registration: any) {
  const record = registration.toObject ? registration.toObject() : registration;
  return {
    id: String(record._id),
    fullName: record.name,
    email: record.email,
    mobile: record.phone,
    course: record.courseId,
    city: record.city,
    profession: record.profession || "",
    date: record.date || "",
    preferredBatch: record.preferredBatch || "",
    message: record.message || "",
    status: record.status,
    createdAt: record.createdAt,
  };
}

export async function getStudents(req: Request, res: Response) {
  try {
    const { course, search } = req.query;
    const registrations = await Registration.find().sort({ createdAt: -1 });
    const byEmail = new Map<string, any>();
    for (const registration of registrations) {
      const record = registration.toObject();
      const email = String(record.email).toLowerCase();
      let student = byEmail.get(email);
      if (!student) {
        student = {
          email: record.email,
          name: record.name,
          phone: record.phone,
          city: record.city,
          courses: [],
          status: record.studentStatus || "Enrolled",
          registrations: [],
          createdAt: record.createdAt,
        };
        byEmail.set(email, student);
      }
      if (!student.courses.includes(record.courseId)) student.courses.push(record.courseId);
      student.registrations.push(serializeRegistration(registration));
    }
    let students = Array.from(byEmail.values());
    if (search) {
      const query = String(search).toLowerCase();
      students = students.filter((student) => student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query));
    }
    if (course) students = students.filter((student) => student.courses.includes(String(course)));
    return success(res, students);
  } catch (err: any) {
    return success(res, [], `Students fallback: ${err.message}`);
  }
}

export async function getStudentById(req: Request, res: Response) {
  try {
    const registrations = await Registration.find({ email: req.params.id }).sort({ createdAt: -1 });
    if (!registrations.length) return failure(res, "Student not found", 404);
    return success(res, registrations.map(serializeRegistration));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const result = await Registration.updateMany(
      { $expr: { $eq: [{ $toLower: "$email" }, req.params.email.toLowerCase()] } },
      { studentStatus: req.body.status }
    );
    if (!result.matchedCount) return failure(res, "Student not found", 404);
    return success(res, null, "Student updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}
