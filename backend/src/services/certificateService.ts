import Certificate from "../models/Certificate";

// Generates a unique, human-readable certificate ID like BCI-2026-000123.
// Actual PDF certificate generation (e.g. with pdf-lib or a template engine)
// is not yet implemented — this handles the DB record and ID scheme only.

export async function generateCertificateId(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await Certificate.countDocuments();
  const serial = String(count + 1).padStart(6, "0");
  return `BCI-${year}-${serial}`;
}

export async function issueCertificate(studentName: string, courseName: string) {
  const certificateId = await generateCertificateId();
  return Certificate.create({
    certificateId,
    studentName,
    courseName,
    issueDate: new Date(),
    status: "valid",
  });
}
