// src/routes/booking.routes.ts
import express from "express"
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller"
import { asyncHandler } from "../utils/asyncHandler.utils"

const router = express.Router()

// Public - submit an inquiry/booking
router.post("/", asyncHandler(createBooking))

// Admin - manage inquiries
router.get("/", asyncHandler(getBookings))
router.patch("/:id/status", asyncHandler(updateBookingStatus))
router.delete("/:id", asyncHandler(deleteBooking))

export default router
