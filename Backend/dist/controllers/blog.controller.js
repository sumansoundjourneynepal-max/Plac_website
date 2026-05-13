"use strict";
// import { Request, Response } from 'express';
// import Blog from '../models/blog.model';
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
exports.getBlogBySlug = exports.getPublishedBlogs = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
// Get all published blogs
const getPublishedBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_model_1.default.find({ status: 'published' }).sort({ publishedAt: -1 });
        res.status(200).json(blogs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getPublishedBlogs = getPublishedBlogs;
// Get single blog by slug
const getBlogBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.default.findOne({ slug: req.params.slug, status: 'published' });
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return; // optional but okay
        }
        res.status(200).json(blog);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getBlogBySlug = getBlogBySlug;
