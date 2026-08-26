// import mongoose, { Document, Schema } from 'mongoose';

// export interface ITestimonial extends Document {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   profession: string;
//   location?: string;
//   image?: string;
//   quote: string;
//   rating: number;
//   isActive: boolean;
//   sortOrder: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const testimonialSchema = new Schema<ITestimonial>(
//   {
//     name: { type: String, required: true },
//     profession: { type: String, required: true },
//     location: { type: String },
//     image: { type: String },
//     quote: { type: String, required: true },
//     rating: { type: Number, min: 1, max: 5, default: 5 },
//     isActive: { type: Boolean, default: true },
//     sortOrder: { type: Number, default: 0 }
//   },
//   { timestamps: true }
// );

// export const Testimonial = mongoose.model<ITestimonial>(
//   'Testimonial',
//   testimonialSchema
// );

// export default Testimonial;


import mongoose, { Document, Schema } from "mongoose"

export interface ITestimonial extends Document {
  name: string
  profession: string
  location?: string
  image?: string
  quote: string
  rating: number
  isActive: boolean
  sortOrder: number
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    profession: { type: String, required: true },
    location: String,
    image: String,
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema
)

