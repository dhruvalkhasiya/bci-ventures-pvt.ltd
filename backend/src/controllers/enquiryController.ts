import { Request, Response } from "express";
import Enquiry from "../models/Enquiry";
import { success, failure } from "../utils/response";

export async function createEnquiry(req: Request, res: Response) {
  try {
    const enquiry = await Enquiry.create(req.body);
    return success(res, enquiry, "Enquiry submitted successfully!", 201);
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
    return success(res, enquiries);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateEnquiry(req: Request, res: Response) {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return failure(res, "Enquiry not found", 404);
    return success(res, enquiry, "Enquiry updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}
