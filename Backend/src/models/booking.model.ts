// src/models/booking.model.ts
import mongoose, { type Document, Schema } from "mongoose"

export type BookingStatus = "pending" | "contacted" | "confirmed" | "cancelled"
export type BookingMode = "physical" | "virtual"

export interface IBooking extends Document {
  packageId: string // references Package.id (custom id)
  packageName: string // snapshot, in case package is edited/removed later
  name: string
  email: string
  phone: string
  mode: BookingMode
  address?: string // required when mode === "physical"
  preferredWindow?: string // free text, e.g. "Evening 7-8pm"
  message?: string
  status: BookingStatus
  createdAt: Date
  updatedAt: Date
}

const bookingSchema = new Schema<IBooking>(
  {
    packageId: { type: String, required: true },
    packageName: { type: String, required: true },
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    phone: { type: String, required: [true, "Phone is required"] },
    mode: { type: String, enum: ["physical", "virtual"], required: true },
    address: {
      type: String,
      required: function () {
        return (this as any).mode === "physical"
      },
    },
    preferredWindow: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "contacted", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
)

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema)
