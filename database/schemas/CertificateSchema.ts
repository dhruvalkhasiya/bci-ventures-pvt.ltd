export interface ICertificate {
  certificateId: string;
  studentName: string;
  courseName: string;
  issueDate: Date;
  status: "valid" | "revoked";
}
