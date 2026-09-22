import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  certificateId: string;
  studentName: string;
  courseName: string;
  issueDate: Date;
  status: "valid" | "revoked";
  createdAt: Date;
}

const certificateSchema = new Schema<ICertificate>({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  status: { type: String, enum: ["valid", "revoked"], default: "valid" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICertificate>("Certificate", certificateSchema);
