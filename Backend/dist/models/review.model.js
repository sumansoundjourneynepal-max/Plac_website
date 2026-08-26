"use strict";
// import mongoose, { type Document, Schema } from "mongoose"
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IReview extends Document {
//   _id: mongoose.Types.ObjectId
//   productId: string
//   userId: mongoose.Types.ObjectId
//   orderId: mongoose.Types.ObjectId
//   reviewerName: string 
//   productName: string 
//   productImage: string 
//   rating: number
//   comment: string
//   verified: boolean
//   createdAt: Date
//   updatedAt: Date
// }
// const reviewSchema = new Schema<IReview>(
//   {
//     productId: {
//       type: String, // Assuming product IDs are strings for now
//       required: [true, "Product ID is required"],
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "User ID is required"],
//     },
//     orderId: {
//       type: Schema.Types.ObjectId,
//       ref: "Order",
//       required: [true, "Order ID is required"],
//     },
//     reviewerName: {
//       type: String,
//       required: [true, "Reviewer name is required"],
//     },
//     productName: {
//       type: String,
//       required: [true, "Product name is required"],
//     },
//     productImage: {
//       type: String,
//       required: [true, "Product image is required"],
//     },
//     rating: {
//       type: Number,
//       required: [true, "Rating is required"],
//       min: [1, "Rating must be at least 1"],
//       max: [5, "Rating cannot be more than 5"],
//     },
//     comment: {
//       type: String,
//       required: [true, "Comment is required"],
//       maxlength: [500, "Comment cannot exceed 500 characters"],
//     },
//     verified: {
//       type: Boolean,
//       default: false, // Can be set to true if the user is verified purchaser
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields
//   },
// )
// // Add indexes for efficient querying
// reviewSchema.index({ productId: 1 })
// reviewSchema.index({ userId: 1 })
// reviewSchema.index({ orderId: 1 })
// reviewSchema.index({ productId: 1, userId: 1, orderId: 1 }, { unique: true }) // Ensure one review per product per order per user
// const Review = mongoose.model<IReview>("Review", reviewSchema)
// export default Review
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    productId: { type: String, required: true },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviewerName: { type: String, required: true },
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true, maxlength: 500 },
    verified: { type: Boolean, default: true },
    adminReply: {
        message: String,
        repliedBy: String,
        repliedAt: Date,
    },
}, { timestamps: true });
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });
exports.default = mongoose_1.default.model("Review", reviewSchema);
