"use strict";
// import { RequestHandler } from "express";
// import Press, { IPress } from "../models/press.model";
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
exports.deletePress = exports.updatePress = exports.getPressById = exports.getAllPress = exports.createPress = void 0;
const press_model_1 = __importDefault(require("../models/press.model"));
// Create press item
const createPress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, slug, excerpt, content, type, featuredImage, externalLink, status, } = req.body;
        const press = yield press_model_1.default.create({
            title,
            slug,
            excerpt,
            content,
            type,
            featuredImage,
            externalLink,
            status,
            publishedAt: status === "published" ? new Date() : null,
        });
        res.status(201).json({
            id: press._id.toString(),
            title: press.title,
            slug: press.slug,
            excerpt: press.excerpt,
            content: press.content,
            type: press.type,
            featuredImage: press.featuredImage,
            externalLink: press.externalLink,
            status: press.status,
            publishedAt: ((_a = press.publishedAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || null,
            createdAt: press.createdAt.toISOString(),
            updatedAt: press.updatedAt.toISOString(),
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createPress = createPress;
// Get all press items (for admin - includes all statuses)
const getAllPress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pressItems = yield press_model_1.default.find().sort({ createdAt: -1 });
        const formattedPress = pressItems.map(press => {
            var _a;
            return ({
                _id: press._id.toString(),
                title: press.title,
                slug: press.slug,
                excerpt: press.excerpt,
                content: press.content,
                type: press.type,
                featuredImage: press.featuredImage,
                externalLink: press.externalLink,
                status: press.status,
                publishedAt: ((_a = press.publishedAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || null,
                createdAt: press.createdAt.toISOString(),
                updatedAt: press.updatedAt.toISOString(),
            });
        });
        res.status(200).json(formattedPress);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllPress = getAllPress;
// Get single press item by ID (for admin)
const getPressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const pressItem = yield press_model_1.default.findById(req.params.id);
        if (!pressItem) {
            res.status(404).json({ message: "Press item not found" });
            return;
        }
        res.status(200).json({
            _id: pressItem._id.toString(),
            title: pressItem.title,
            slug: pressItem.slug,
            excerpt: pressItem.excerpt,
            content: pressItem.content,
            type: pressItem.type,
            featuredImage: pressItem.featuredImage,
            externalLink: pressItem.externalLink,
            status: pressItem.status,
            publishedAt: ((_a = pressItem.publishedAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || null,
            createdAt: pressItem.createdAt.toISOString(),
            updatedAt: pressItem.updatedAt.toISOString(),
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPressById = getPressById;
// Update press item
const updatePress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { title, slug, excerpt, content, type, featuredImage, externalLink, status, } = req.body;
        const updateData = {
            title,
            slug,
            excerpt,
            content,
            type,
            featuredImage,
            externalLink,
            status,
            updatedAt: new Date(),
        };
        // Only update publishedAt if status is changing to published
        if (status === "published") {
            const existingPress = yield press_model_1.default.findById(id);
            if (existingPress && existingPress.status !== "published") {
                updateData.publishedAt = new Date();
            }
        }
        const pressItem = yield press_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!pressItem) {
            res.status(404).json({ message: "Press item not found" });
            return;
        }
        res.status(200).json({
            _id: pressItem._id.toString(),
            title: pressItem.title,
            slug: pressItem.slug,
            excerpt: pressItem.excerpt,
            content: pressItem.content,
            type: pressItem.type,
            featuredImage: pressItem.featuredImage,
            externalLink: pressItem.externalLink,
            status: pressItem.status,
            publishedAt: ((_a = pressItem.publishedAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || null,
            createdAt: pressItem.createdAt.toISOString(),
            updatedAt: pressItem.updatedAt.toISOString(),
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updatePress = updatePress;
// Delete press item
const deletePress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pressItem = yield press_model_1.default.findByIdAndDelete(id);
        if (!pressItem) {
            res.status(404).json({ message: "Press item not found" });
            return;
        }
        res.status(200).json({
            message: "Press item deleted successfully",
            id: pressItem._id.toString()
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deletePress = deletePress;
