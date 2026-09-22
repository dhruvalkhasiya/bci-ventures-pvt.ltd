import mongoose, { Schema, Document } from "mongoose";

export type EnquiryStatus = "New" | "Contacted" | "Interested" | "Registered" | "Closed";

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  course?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
}

const enquirySchema = new Schema<IEnquiry>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["New", "Contacted", "Interested", "Registered", "Closed"],
    default: "New",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEnquiry>("Enquiry", enquirySchema);
