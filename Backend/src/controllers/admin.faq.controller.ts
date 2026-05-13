import { RequestHandler } from "express";
import Faq from "../models/faq.model";

// Create FAQ
export const createFaq: RequestHandler = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ message: "Failed to create FAQ" });
  }
};

// Get all FAQs (admin)
export const getAllFaqs: RequestHandler = async (_, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
};

// Update FAQ
export const updateFaq: RequestHandler = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faq);
  } catch {
    res.status(500).json({ message: "Failed to update FAQ" });
  }
};

// Delete FAQ
export const deleteFaq: RequestHandler = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete FAQ" });
  }
};
