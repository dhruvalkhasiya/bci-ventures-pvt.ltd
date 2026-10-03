import mongoose, { Schema, Document } from "mongoose";

export type RegistrationStatus = "Pending" | "Confirmed" | "Cancelled";

export interface IRegistration extends Document {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  city: string;
  profession?: string;
  date?: string;
  preferredBatch?: string;
  message?: string;
  status: RegistrationStatus;
  studentStatus: "Enrolled" | "Active" | "Completed" | "Dropped";
  emailPreviewUrl?: string;
  createdAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  courseId: { type: String, required: true },
  city: { type: String, required: true },
  profession: { type: String },
  date: { type: String },
  preferredBatch: { type: String },
  message: { type: String },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  studentStatus: { type: String, enum: ["Enrolled", "Active", "Completed", "Dropped"], default: "Enrolled" },
  emailPreviewUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRegistration>("Registration", registrationSchema);
