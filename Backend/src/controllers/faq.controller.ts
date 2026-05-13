import { RequestHandler } from "express";
import Faq from "../models/faq.model";

export const getPublishedFaqs: RequestHandler = async (_, res) => {
  try {
    const faqs = await Faq.find({ status: "published" }).sort({ category: 1 });
    res.json(faqs);
  } catch {
    res.status(500).json({ message: "Failed to load FAQs" });
  }
};
