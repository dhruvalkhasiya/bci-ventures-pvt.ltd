import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: string;
  city?: string;
  enrolledCourses: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStudent>("Student", studentSchema);
