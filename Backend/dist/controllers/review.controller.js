"use strict";
// import type { Request, Response } from "express"
// import Review, { type IReview } from "../models/review.model" // Import the Mongoose Review model
// import { asyncHandler } from "../utils/asyncHandler.utils"
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
exports.adminReplyToReview = exports.getAllReviewsAdmin = exports.getReviewsByProductId = exports.createReview = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
/**
 * CREATE OR UPDATE REVIEW
 * POST /api/reviews
 */
exports.createReview = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, productName, productImage, rating, comment, userId, reviewerName, } = req.body;
    if (!productId)
        return res.status(400).json({ message: "Product ID missing" });
    if (!productName)
        return res.status(400).json({ message: "Product name missing" });
    if (!rating)
        return res.status(400).json({ message: "Rating missing" });
    if (!comment)
        return res.status(400).json({ message: "Comment missing" });
    if (!userId)
        return res.status(400).json({ message: "User ID missing" });
    if (!reviewerName)
        return res.status(400).json({ message: "Reviewer name missing" });
    const existing = yield review_model_1.default.findOne({ productId, userId });
    if (existing) {
        existing.rating = rating;
        existing.comment = comment;
        yield existing.save();
        return res.status(200).json(existing);
    }
    const review = yield review_model_1.default.create({
        productId,
        productName,
        productImage: productImage || "/placeholder.svg",
        rating,
        comment,
        userId,
        reviewerName,
        verified: true,
    });
    return res.status(201).json(review);
}));
/**
 * GET REVIEWS BY PRODUCT
 * GET /api/reviews/product/:productId
 */
exports.getReviewsByProductId = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const reviews = yield review_model_1.default.find({ productId })
        .sort({ createdAt: -1 });
    return res.status(200).json(reviews);
}));
/**
 * GET ALL REVIEWS (ADMIN)
 * GET /api/reviews/admin/all
 */
exports.getAllReviewsAdmin = (0, asyncHandler_utils_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.default.find()
        .sort({ createdAt: -1 });
    return res.status(200).json(reviews);
}));
/**
 * ADMIN REPLY TO REVIEW
 * PUT /api/reviews/admin/reply/:id
 */
exports.adminReplyToReview = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "Reply message required" });
    }
    const review = yield review_model_1.default.findById(id);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    review.adminReply = {
        message,
        repliedBy: "Admin",
        repliedAt: new Date(),
    };
    yield review.save();
    return res.status(200).json(review);
}));
