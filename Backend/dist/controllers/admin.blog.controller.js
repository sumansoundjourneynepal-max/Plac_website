"use strict";
// controllers/admin.blog.controller.ts
// import { RequestHandler } from 'express';
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
exports.createBlog = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
// Create new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, slug, excerpt, content, category, featuredImage, author, status } = req.body;
        // Create the blog document
        const blog = yield blog_model_1.default.create({
            title,
            slug,
            excerpt,
            content,
            category,
            featuredImage,
            author,
            status,
            publishedAt: status === 'published' ? new Date() : null,
        });
        // Send back a plain object with string dates for frontend
        res.status(201).json({
            id: blog._id.toString(), // convert ObjectId to string
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            featuredImage: blog.featuredImage || '',
            author: blog.author,
            status: blog.status,
            createdAt: blog.createdAt.toISOString(),
            updatedAt: blog.updatedAt.toISOString(),
            publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createBlog = createBlog;
