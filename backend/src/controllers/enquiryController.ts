import { Request, Response } from "express";
import Enquiry from "../models/Enquiry";
import { success, failure } from "../utils/response";

function serializeEnquiry(enquiry: any) {
  const record = enquiry.toObject ? enquiry.toObject() : enquiry;
  return { ...record, id: String(record._id) };
}

export async function createEnquiry(req: Request, res: Response) {
  try {
    const name = (req.body.name || req.body.fullName || "Visitor").trim();
    const phone = (req.body.phone || req.body.mobile || req.body.contact || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const course = (req.body.course || req.body.courseId || "General Inquiry").trim();
    const message = (req.body.message || "General Inquiry from Website").trim();

    if (!name || (!phone && !email)) {
      return failure(res, "Name and contact information (phone or email) are required.", 400);
    }

    const enquiry = await Enquiry.create({
      name,
      phone: phone || "Not Provided",
      email: email || "notprovided@bciventures.in",
      course,
      message,
      status: "New",
    });

    return success(res, serializeEnquiry(enquiry), "Enquiry submitted successfully!", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function getEnquiries(req: Request, res: Response) {
  try {
    const { status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return success(res, enquiries.map(serializeEnquiry));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateEnquiry(req: Request, res: Response) {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!enquiry) return failure(res, "Enquiry not found", 404);
    return success(res, serializeEnquiry(enquiry), "Enquiry updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}
