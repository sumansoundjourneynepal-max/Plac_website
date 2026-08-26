"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_blog_controller_1 = require("../../controllers/admin.blog.controller");
const router = (0, express_1.Router)();
router.post('/', admin_blog_controller_1.createBlog);
exports.default = router;
