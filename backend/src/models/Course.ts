import mongoose, { Schema, Document } from "mongoose";

export interface IModule {
  number: number;
  title: string;
  description: string;
}

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  price: number | null;
  duration: string;
  timing: string;
  modules: IModule[];
  certificate: string;
  image?: string;
  status: "draft" | "published";
  createdAt: Date;
}

const moduleSchema = new Schema<IModule>(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, default: null },
  duration: { type: String, required: true },
  timing: { type: String, required: true },
  modules: { type: [moduleSchema], default: [] },
  certificate: { type: String, required: true },
  image: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "published" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICourse>("Course", courseSchema);
