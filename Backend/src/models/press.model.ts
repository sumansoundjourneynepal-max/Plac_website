import mongoose, { Document, Schema } from "mongoose";

export interface IPress extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: "press" | "media";
  featuredImage?: string;
  externalLink?: string;
  status: "draft" | "published" | "archived";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const pressSchema = new Schema<IPress>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    type: { type: String, enum: ["press", "media"], default: "press" },
    featuredImage: String,
    externalLink: String,
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    publishedAt: Date,
  },
  { timestamps: true }
);

export const Press = mongoose.model<IPress>("Press", pressSchema);
export default Press;
