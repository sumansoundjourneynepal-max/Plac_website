"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../../controllers/blog.controller");
const router = (0, express_1.Router)();
router.get('/', blog_controller_1.getPublishedBlogs); // GET /api/blogs
router.get('/:slug', blog_controller_1.getBlogBySlug); // GET /api/blogs/:slug
exports.default = router;
