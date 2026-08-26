// src/controllers/booking.controller.ts
import type { Request, Response } from "express"
import { Booking } from "../models/booking.model"
import { Package } from "../models/package.model"

// POST /api/bookings - public
export const createBooking = async (req: Request, res: Response) => {
  const { packageId, name, email, phone, mode, address, preferredWindow, message } = req.body

  if (!packageId || !name || !email || !phone || !mode) {
    return res.status(400).json({
      success: false,
      message: "packageId, name, email, phone and mode are required",
    })
  }

  if (mode === "physical" && !address) {
    return res.status(400).json({
      success: false,
      message: "Address is required for physical sessions",
    })
  }

  const pkg = (await Package.findById(packageId).catch(() => null)) || (await Package.findOne({ id: packageId }))
  if (!pkg) {
    return res.status(404).json({ success: false, message: "Package not found" })
  }

  const booking = await Booking.create({
    packageId: pkg.id || String(pkg._id),
    packageName: pkg.name,
    name,
    email,
    phone,
    mode,
    address,
    preferredWindow,
    message,
  })

  res.status(201).json({ success: true, data: booking })
}

// GET /api/bookings - admin, optional ?status=
export const getBookings = async (req: Request, res: Response) => {
  const { status } = req.query
  const filter: Record<string, any> = {}
  if (status) filter.status = status

  const bookings = await Booking.find(filter).sort({ createdAt: -1 })
  res.json({ success: true, data: bookings })
}

// PATCH /api/bookings/:id/status - admin
export const updateBookingStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  const allowed = ["pending", "contacted", "confirmed", "cancelled"]
  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" })
  }

  const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })
  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" })
  }

  res.json({ success: true, data: booking })
}

// DELETE /api/bookings/:id - admin
export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params
  const booking = await Booking.findByIdAndDelete(id)
  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" })
  }
  res.json({ success: true, message: "Booking deleted" })
}
