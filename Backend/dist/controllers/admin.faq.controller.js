"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.getAllFaqs = exports.createFaq = void 0;
const faq_model_1 = __importDefault(require("../models/faq.model"));
// Create FAQ
const createFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield faq_model_1.default.create(req.body);
        res.status(201).json(faq);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create FAQ" });
    }
});
exports.createFaq = createFaq;
// Get all FAQs (admin)
const getAllFaqs = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield faq_model_1.default.find().sort({ createdAt: -1 });
        res.json(faqs);
    }
    catch (_a) {
        res.status(500).json({ message: "Failed to fetch FAQs" });
    }
});
exports.getAllFaqs = getAllFaqs;
// Update FAQ
const updateFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield faq_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(faq);
    }
    catch (_a) {
        res.status(500).json({ message: "Failed to update FAQ" });
    }
});
exports.updateFaq = updateFaq;
// Delete FAQ
const deleteFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield faq_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    }
    catch (_a) {
        res.status(500).json({ message: "Failed to delete FAQ" });
    }
});
exports.deleteFaq = deleteFaq;
