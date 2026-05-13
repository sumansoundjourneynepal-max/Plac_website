"use strict";
//new
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// // src/models/product.model.ts
// import mongoose, { type Document } from "mongoose"
// // Interface for individual bowl in a set
// export interface IBowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
//   images: string[]
// }
// export interface IProduct extends Document {
//   id: string // Custom product ID (different from MongoDB _id)
//   name: string
//   price: number
//   size: string // Required for single products, optional for sets
//   tone: string // Required for single products, optional for sets
//   type: string // Required for single products, optional for sets
//   weight: number // Required for single products, optional for sets
//   musicalNote: string // Required for single products, optional for sets
//   images: string[]
//   video?: string
//   audio?: string
//   description: string
//   details: string[]
//   careInstructions?: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   brand: string
//   category: string
//   soundInstrument: string
//   seoTitle?: string
//   seoDescription?: string
//   seoKeywords?: string
//   isSet: boolean // New field to indicate if product is a bowl set
//   setItems: IBowlSetItem[] // New field for bowl set items
// }
// // Schema for individual bowl in a set
// const bowlSetItemSchema = new mongoose.Schema({
//   code: { type: String, required: true },
//   size: { type: String, required: true },
//   weight: { type: Number, required: true },
//   musicalNote: { type: String, required: true },
//   inStock: { type: Boolean, default: true },
//   images: { type: [String], default: [] },
// })
// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     size: { 
//       type: String, 
//       required: function() {
//         // Only required if isSet is false (single product)
//         return !(this as any).isSet;
//       } 
//     },
//     tone: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     type: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     weight: { 
//       type: Number, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     musicalNote: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     images: { type: [String], required: true },
//     video: { type: String },
//     audio: { type: String },
//     description: { type: String, required: true },
//     details: { type: [String], required: true },
//     careInstructions: { type: [String] },
//     inStock: { type: Boolean, default: true },
//     rating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//     brand: { type: String, default: "OMSound Nepal" },
//     category: { type: String, required: true },
//     soundInstrument: { type: String, required: true },
//     seoTitle: { type: String },
//     seoDescription: { type: String },
//     seoKeywords: { type: String },
//     isSet: { type: Boolean, default: false }, // New field
//     setItems: { type: [bowlSetItemSchema], default: [] }, // New field
//   },
//   { timestamps: true },
// )
// // Add a method to find by custom id
// productSchema.statics.findByCustomId = function (customId: string) {
//   return this.findOne({ id: customId })
// }
// export const Product = mongoose.model<IProduct>("Product", productSchema)
//new
// // src/models/product.model.ts
// import mongoose, { type Document } from "mongoose"
// // Interface for individual bowl in a set - WITHOUT images
// export interface IBowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
//   // images field removed - bowl sets will only use main product images
// }
// export interface IProduct extends Document {
//   id: string // Custom product ID (different from MongoDB _id)
//   name: string
//   price: number
//   size: string // Required for single products, optional for sets
//   tone: string // Required for single products, optional for sets
//   type: string // Required for single products, optional for sets
//   weight: number // Required for single products, optional for sets
//   musicalNote: string // Required for single products, optional for sets
//   images: string[]
//   video?: string
//   audio?: string
//   description: string
//   details: string[]
//   careInstructions?: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   brand: string
//   category: string
//   soundInstrument: string
//   seoTitle?: string
//   seoDescription?: string
//   seoKeywords?: string
//   isSet: boolean
//   setItems: IBowlSetItem[] // Now without images
// }
// // Schema for individual bowl in a set - WITHOUT images
// const bowlSetItemSchema = new mongoose.Schema({
//   code: { type: String, required: true },
//   size: { type: String, required: true },
//   weight: { type: Number, required: true },
//   musicalNote: { type: String, required: true },
//   inStock: { type: Boolean, default: true },
//   // images field removed from schema
// });
// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     size: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     tone: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     type: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     weight: { 
//       type: Number, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     musicalNote: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     images: { type: [String], required: true },
//     video: { type: String },
//     audio: { type: String },
//     description: { type: String, required: true },
//     details: { type: [String], required: true },
//     careInstructions: { type: [String] },
//     inStock: { type: Boolean, default: true },
//     rating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//     brand: { type: String, default: "OMSound Nepal" },
//     category: { type: String, required: true },
//     soundInstrument: { type: String, required: true },
//     seoTitle: { type: String },
//     seoDescription: { type: String },
//     seoKeywords: { type: String },
//     isSet: { type: Boolean, default: false },
//     setItems: { type: [bowlSetItemSchema], default: [] }, // Now without images
//   },
//   { timestamps: true },
// )
// productSchema.statics.findByCustomId = function (customId: string) {
//   return this.findOne({ id: customId })
// }
// export const Product = mongoose.model<IProduct>("Product", productSchema)
//just new
// import mongoose, { type Document } from "mongoose"
// export interface IBowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
// }
// export interface IProduct extends Document {
//   id: string
//   name: string
//   price: number
//   size: string
//   tone: string
//   type: string
//   weight: number
//   musicalNote: string
//   images: string[]
//   video?: string
//   audio?: string
//   description: string
//   details: string[]
//   careInstructions?: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   brand: string
//   category: string
//   soundInstrument: string
//   seoTitle?: string
//   seoDescription?: string
//   seoKeywords?: string
//   isSet: boolean
//   setItems: IBowlSetItem[]
// }
// const bowlSetItemSchema = new mongoose.Schema({
//   code: { type: String, required: true },
//   size: { type: String, required: true },
//   weight: { type: Number, required: true },
//   musicalNote: { type: String, required: true },
//   inStock: { type: Boolean, default: true },
// });
// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     size: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     tone: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     type: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     weight: { 
//       type: Number, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     musicalNote: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     images: { type: [String], required: true },
//     video: { type: String },
//     audio: { type: String },
//     description: { type: String, required: true },
//     details: { type: [String], required: true },
//     careInstructions: { type: [String] },
//     inStock: { type: Boolean, default: true },
//     rating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//     brand: { type: String, default: "OMSound Nepal" },
//     category: { type: String, required: true },
//     soundInstrument: { type: String, required: true },
//     seoTitle: { type: String },
//     seoDescription: { type: String },
//     seoKeywords: { type: String },
//     isSet: { type: Boolean, default: false },
//     setItems: { type: [bowlSetItemSchema], default: [] },
//   },
//   { timestamps: true },
// )
// productSchema.statics.findByCustomId = function (customId: string) {
//   return this.findOne({ id: customId })
// }
// export const Product = mongoose.model<IProduct>("Product", productSchema)
//new
// import mongoose, { type Document } from "mongoose"
// export interface IBowlSetItem {
//   code: string
//   size: string
//   weight: number
//   musicalNote: string
//   inStock: boolean
// }
// export interface IProduct extends Document {
//   id: string
//   name: string
//   price: number
//   size: string
//   tone: string
//   type: string
//   weight: number
//   musicalNote: string
//   bowlCode: string
//   images: string[]
//   video?: string
//   audio?: string
//   description: string
//   details: string[]
//   careInstructions?: string[]
//   inStock: boolean
//   rating: number
//   reviewCount: number
//   brand: string
//   category: string
//   soundInstrument: string
//   seoTitle?: string
//   seoDescription?: string
//   seoKeywords?: string
//   isSet: boolean
//   setItems: IBowlSetItem[]
// }
// const bowlSetItemSchema = new mongoose.Schema({
//   code: { type: String, required: true },
//   size: { type: String, required: true },
//   weight: { type: Number, required: true },
//   musicalNote: { type: String, required: true },
//   inStock: { type: Boolean, default: true },
// });
// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     size: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     tone: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     type: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     weight: { 
//       type: Number, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     musicalNote: { 
//       type: String, 
//       required: function() {
//         return !(this as any).isSet;
//       } 
//     },
//     bowlCode: {
//       type: String,
//       required: function() {
//         return !(this as any).isSet;
//       }
//     },
//     images: { type: [String], required: true },
//     video: { type: String },
//     audio: { type: String },
//     description: { type: String, required: true },
//     details: { type: [String], required: true },
//     careInstructions: { type: [String] },
//     inStock: { type: Boolean, default: true },
//     rating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//     brand: { type: String, default: "OMSound Nepal" },
//     category: { type: String, required: true },
//     soundInstrument: { type: String, required: true },
//     seoTitle: { type: String },
//     seoDescription: { type: String },
//     seoKeywords: { type: String },
//     isSet: { type: Boolean, default: false },
//     setItems: { type: [bowlSetItemSchema], default: [] },
//   },
//   { timestamps: true },
// )
// productSchema.statics.findByCustomId = function (customId: string) {
//   return this.findOne({ id: customId })
// }
// export const Product = mongoose.model<IProduct>("Product", productSchema)
const mongoose_1 = __importDefault(require("mongoose"));
const bowlSetItemSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    size: { type: String, required: true },
    weight: { type: Number, required: true },
    musicalNote: { type: String, required: true },
    inStock: { type: Boolean, default: true },
});
const productSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: {
        type: String,
        required: function () {
            return !this.isSet;
        }
    },
    tone: {
        type: String,
        required: function () {
            return !this.isSet;
        }
    },
    type: {
        type: String,
        required: function () {
            return !this.isSet;
        }
    },
    weight: {
        type: Number,
        required: function () {
            return !this.isSet;
        }
    },
    musicalNote: {
        type: String,
        required: false, // ← CHANGE THIS: was true, now false
        default: "" // ← ADD THIS: default empty string
    },
    bowlCode: {
        type: String,
        required: function () {
            return !this.isSet;
        }
    },
    images: { type: [String], required: true },
    video: { type: String },
    audio: { type: String },
    description: { type: String, required: true },
    details: { type: [String], required: true },
    careInstructions: { type: [String] },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    brand: { type: String, default: "OMSound Nepal" },
    category: { type: String, required: true },
    soundInstrument: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
    isSet: { type: Boolean, default: false },
    setItems: { type: [bowlSetItemSchema], default: [] },
}, { timestamps: true });
productSchema.statics.findByCustomId = function (customId) {
    return this.findOne({ id: customId });
};
exports.Product = mongoose_1.default.model("Product", productSchema);
