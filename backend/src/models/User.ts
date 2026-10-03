import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "student";

export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  firebaseUid?: string;
  passwordHash?: string;
  role: UserRole;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true, lowercase: true },
  phone: { type: String, unique: true, sparse: true },
  firebaseUid: { type: String, unique: true, sparse: true },
  passwordHash: { type: String },
  role: { type: String, enum: ["admin", "student"], default: "student" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", userSchema);
