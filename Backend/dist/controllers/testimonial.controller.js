"use strict";
// import { RequestHandler } from 'express';
// import Testimonial from '../models/testimonial.model';
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
exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getAllTestimonials = exports.getActiveTestimonials = void 0;
const testimonial_model_1 = __importDefault(require("../models/testimonial.model"));
/* =========================
   PUBLIC
========================= */
const getActiveTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonial_model_1.default.find({ isActive: true })
            .sort({ sortOrder: 1, createdAt: -1 });
        res.status(200).json(testimonials);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.getActiveTestimonials = getActiveTestimonials;
/* =========================
   ADMIN
========================= */
const getAllTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield testimonial_model_1.default.find()
            .sort({ sortOrder: 1, createdAt: -1 });
        res.status(200).json(testimonials);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.getAllTestimonials = getAllTestimonials;
/* =========================
   CREATE
========================= */
const createTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonial = yield testimonial_model_1.default.create(req.body);
        res.status(201).json(testimonial);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create testimonial" });
        return;
    }
});
exports.createTestimonial = createTestimonial;
/* =========================
   UPDATE
========================= */
const updateTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonial = yield testimonial_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimonial) {
            res.status(404).json({ message: "Testimonial not found" });
            return;
        }
        res.status(200).json(testimonial);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update testimonial" });
        return;
    }
});
exports.updateTestimonial = updateTestimonial;
/* =========================
   DELETE
========================= */
const deleteTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonial = yield testimonial_model_1.default.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            res.status(404).json({ message: "Testimonial not found" });
            return;
        }
        res.status(200).json({ success: true });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete testimonial" });
        return;
    }
});
exports.deleteTestimonial = deleteTestimonial;
