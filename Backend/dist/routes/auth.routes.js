"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
const authUser_controller_1 = require("../controllers/authUser.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.post('/signup', (0, asyncHandler_utils_1.asyncHandler)(authUser_controller_1.signup));
router.post('/login', (0, asyncHandler_utils_1.asyncHandler)(authUser_controller_1.login));
// Protected routes
router.get('/me', auth_middleware_1.authenticate, (0, asyncHandler_utils_1.asyncHandler)(authUser_controller_1.getCurrentUser));
exports.default = router;
