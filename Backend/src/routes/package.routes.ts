// src/routes/package.routes.ts
import express from "express"
import {
  getPackages,
  getAllPackagesAdmin,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/package.controller"
import { uploadFiles } from "../utils/multer"
import { asyncHandler } from "../utils/asyncHandler.utils"

const router = express.Router()

// Public routes
router.get("/", asyncHandler(getPackages))
router.get("/admin/all", asyncHandler(getAllPackagesAdmin))
router.get("/:id", asyncHandler(getPackageById))

// Admin routes
router.post("/", uploadFiles, asyncHandler(createPackage))
router.put("/:id", uploadFiles, asyncHandler(updatePackage))
router.delete("/:id", asyncHandler(deletePackage))

export default router
