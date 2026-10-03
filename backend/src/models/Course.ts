import mongoose, { Schema, Document } from "mongoose";

export interface IModule {
  number: number;
  title: string;
  description: string;
}

export interface ICourse extends Document {
  title: string;
  shortTitle: string;
  slug: string;
  description: string;
  overview: string;
  audience: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  timing: string;
  coding: string;
  modules: IModule[];
  certificate: string;
  ctaLabel: string;
  tag: string;
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
  shortTitle: { type: String, default: "" },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  overview: { type: String, default: "" },
  audience: { type: String, default: "" },
  price: { type: Number, default: null },
  priceLabel: { type: String, default: "" },
  duration: { type: String, required: true },
  timing: { type: String, required: true },
  coding: { type: String, default: "No Coding Required" },
  modules: { type: [moduleSchema], default: [] },
  certificate: { type: String, required: true },
  ctaLabel: { type: String, default: "View Course" },
  tag: { type: String, default: "" },
  image: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "published" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICourse>("Course", courseSchema);
