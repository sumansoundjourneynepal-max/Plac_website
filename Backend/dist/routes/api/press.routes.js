"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const press_controller_1 = require("../../controllers/press.controller");
const router = (0, express_1.Router)();
router.get('/', press_controller_1.getPublishedPress); // GET /api/press
router.get('/:slug', press_controller_1.getPressBySlug); // GET /api/press/:slug
exports.default = router;
