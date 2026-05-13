"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seo_controller_1 = require("../controllers/seo.controller");
const express_validator_1 = require("express-validator");
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
const router = (0, express_1.Router)();
// Admin routes
router.get('/admin/seo', (0, asyncHandler_utils_1.asyncHandler)(seo_controller_1.getSEOPages));
router.post('/admin/seo', [
    (0, express_validator_1.check)('pageName', 'Page name is required').notEmpty(),
    (0, express_validator_1.check)('path', 'Path is required').notEmpty(),
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is required').notEmpty()
], (0, asyncHandler_utils_1.asyncHandler)(seo_controller_1.createSEOPage));
router.put('/admin/seo/:id', [
    (0, express_validator_1.check)('pageName', 'Page name is required').notEmpty(),
    (0, express_validator_1.check)('path', 'Path is required').notEmpty(),
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is required').notEmpty()
], (0, asyncHandler_utils_1.asyncHandler)(seo_controller_1.updateSEOPage));
router.delete('/admin/seo/:id', (0, asyncHandler_utils_1.asyncHandler)(seo_controller_1.deleteSEOPage));
// Public route to get SEO data by path
router.get('/seo/:path', (0, asyncHandler_utils_1.asyncHandler)(seo_controller_1.getSEOPageByPath));
exports.default = router;
