import { Request, Response } from "express";
import Certificate from "../models/Certificate";
import { success, failure } from "../utils/response";

function serializeCertificate(certificate: any) {
  const record = certificate.toObject ? certificate.toObject() : certificate;
  return {
    id: String(record._id),
    certificateId: record.certificateId,
    studentName: record.studentName,
    courseName: record.courseName,
    completionDate: new Date(record.issueDate).toISOString().slice(0, 10),
    status: record.status,
    createdAt: record.createdAt,
  };
}

export async function getCertificates(_req: Request, res: Response) {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    return success(res, certificates.map(serializeCertificate));
  } catch (err: any) {
    return success(res, [], `Certificates fallback: ${err.message}`);
  }
}

export async function createCertificate(req: Request, res: Response) {
  try {
    const year = new Date().getFullYear();
    const count = await Certificate.countDocuments({ certificateId: { $regex: `^BCI-${year}-` } });
    const certificate = await Certificate.create({
      ...req.body,
      certificateId: req.body.certificateId || `BCI-${year}-${String(count + 1).padStart(4, "0")}`,
      issueDate: req.body.completionDate || req.body.issueDate,
    });
    return success(res, serializeCertificate(certificate), "Certificate created", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function revokeCertificate(req: Request, res: Response) {
  try {
    const certificate = await Certificate.findOneAndUpdate(
      { certificateId: req.params.certificateId },
      { status: "revoked" },
      { new: true }
    );
    if (!certificate) return failure(res, "Certificate not found", 404);
    return success(res, serializeCertificate(certificate), "Certificate revoked");
  } catch (err: any) {
    return failure(res, err.message, 500);
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
