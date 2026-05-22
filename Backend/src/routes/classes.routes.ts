import express from "express";
import {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  enrollStudent,
} from "../controllers/classes.controller";

const router = express.Router();

// Public routes
router.get("/", getClasses);
router.get("/:id", getClassById);

// Admin routes
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

// Enrollment
router.post("/:id/enroll", enrollStudent);

export default router;
