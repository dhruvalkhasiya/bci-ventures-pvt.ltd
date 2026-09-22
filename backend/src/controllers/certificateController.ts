import { Request, Response } from "express";
import Certificate from "../models/Certificate";
import { success, failure } from "../utils/response";

export async function createCertificate(req: Request, res: Response) {
  try {
    const certificate = await Certificate.create(req.body);
    return success(res, certificate, "Certificate created", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function verifyCertificate(req: Request, res: Response) {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (!certificate || certificate.status !== "valid") {
      return success(res, { valid: false });
    }
    return success(res, {
      valid: true,
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      issueDate: certificate.issueDate,
    });
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}
