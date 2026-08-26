import mongoose, { Document, Schema } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: string;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFaq>("Faq", faqSchema);
