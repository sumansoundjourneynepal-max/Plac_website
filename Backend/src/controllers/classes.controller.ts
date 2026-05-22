import type { Request, Response } from "express";
import { Class } from "../models/class.model";

// Get all classes (admin)
export const getClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes", error });
  }
};

// Get single class
export const getClassById = async (req: Request, res: Response) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch class", error });
  }
};

// Create class
export const createClass = async (req: Request, res: Response) => {
  try {
    const cls = new Class(req.body);
    await cls.save();
    res.status(201).json(cls);
  } catch (error) {
    res.status(400).json({ message: "Failed to create class", error });
  }
};

// Update class
export const updateClass = async (req: Request, res: Response) => {
  try {
    const cls = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    res.status(400).json({ message: "Failed to update class", error });
  }
};

// Delete class
export const deleteClass = async (req: Request, res: Response) => {
  try {
    const cls = await Class.findByIdAndDelete(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete class", error });
  }
};

// Enroll student in class
export const enrollStudent = async (req: Request, res: Response) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    if (cls.enrolledStudents >= cls.maxStudents) {
      return res.status(400).json({ message: "Class is full" });
    }
    cls.enrolledStudents += 1;
    await cls.save();
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: "Failed to enroll student", error });
  }
};
