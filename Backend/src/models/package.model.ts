// src/models/package.model.ts
import mongoose, { type Document } from "mongoose"

export type PackageCategory =
  | "regular"
  | "private"
  | "special"
  | "sound-therapy-course"
  | "himalayan-sound-journey"

export type PackageMode = "physical" | "virtual" | "both"

export type PackageBookingType = "self-service" | "inquiry"

export interface IAvailabilityWindow {
  label: string // e.g. "Morning" or "Evening"
  days?: string // e.g. "Mon - Sat"
  startTime: string // "06:00"
  endTime: string // "08:00"
}

export interface IPackage extends Document {
  id: string // custom slug/id, mirrors Product pattern
  name: string
  category: PackageCategory
  mode: PackageMode
  description: string
  details: string[]
  images: string[]
  price?: number // optional - "inquire within" packages may omit this
  priceNote?: string // e.g. "Inquire within", "Starting from $X"
  duration?: string // e.g. "1 hour", "14 days"
  bookingType: PackageBookingType
  availability: IAvailabilityWindow[]
  location?: {
    address?: string
    city?: string
    mapUrl?: string
  }
  isActive: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

const availabilityWindowSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    days: { type: String },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false },
)

const packageSchema = new mongoose.Schema<IPackage>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["regular", "private", "special", "sound-therapy-course", "himalayan-sound-journey"],
      required: true,
    },
    mode: { type: String, enum: ["physical", "virtual", "both"], required: true },
    description: { type: String, required: true },
    details: { type: [String], default: [] },
    images: { type: [String], default: [] },
    price: { type: Number },
    priceNote: { type: String },
    duration: { type: String },
    bookingType: { type: String, enum: ["self-service", "inquiry"], default: "inquiry" },
    availability: { type: [availabilityWindowSchema], default: [] },
    location: {
      address: { type: String },
      city: { type: String },
      mapUrl: { type: String },
    },
    isActive: { type: Boolean, default: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
  },
  { timestamps: true },
)

packageSchema.statics.findByCustomId = function (customId: string) {
  return this.findOne({ id: customId })
}

export const Package = mongoose.model<IPackage>("Package", packageSchema)
