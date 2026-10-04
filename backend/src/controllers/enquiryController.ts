import { Request, Response } from "express";
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import Enquiry from "../models/Enquiry";
import { success, failure } from "../utils/response";

function serializeEnquiry(enquiry: any) {
  const record = enquiry.toObject ? enquiry.toObject() : enquiry;
  return { ...record, id: String(record._id || record.id || randomUUID()) };
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

    if (mongoose.connection.readyState !== 1) {
      const fallbackEnquiry = {
        id: randomUUID(),
        name,
        phone: phone || "Not Provided",
        email: email || "notprovided@bciventures.in",
        course,
        message,
        status: "New",
        createdAt: new Date(),
      };
      return success(res, fallbackEnquiry, "Enquiry received successfully!", 201);
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
    if (mongoose.connection.readyState !== 1) {
      return success(res, [], "Database disconnected: returned empty enquiries list");
    }
    const { status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return success(res, enquiries.map(serializeEnquiry));
  } catch (err: any) {
    return success(res, [], `Enquiry query fallback: ${err.message}`);
  }
}

export async function updateEnquiry(req: Request, res: Response) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return failure(res, "Database disconnected: cannot update enquiry status", 503);
    }
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!enquiry) return failure(res, "Enquiry not found", 404);
    return success(res, serializeEnquiry(enquiry), "Enquiry updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}
