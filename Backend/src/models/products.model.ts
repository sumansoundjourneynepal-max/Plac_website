import mongoose, { type Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "4 weeks"
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  schedule: string; // e.g., "Mon & Wed 6PM"
  maxStudents: number;
  enrolledStudents: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new mongoose.Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    instructor: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    maxStudents: {
      type: Number,
      required: true,
      default: 20,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Class = mongoose.model<IClass>("Class", classSchema);
