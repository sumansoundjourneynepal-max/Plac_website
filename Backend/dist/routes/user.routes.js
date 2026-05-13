"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.routes.ts
const express_1 = __importDefault(require("express"));
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Protect all routes after this middleware
router.use(auth_middleware_1.authenticate);
router.get('/', (0, asyncHandler_utils_1.asyncHandler)(users_controller_1.getAllUsers));
router.get('/:id', (0, asyncHandler_utils_1.asyncHandler)(users_controller_1.getUserById));
router.patch('/:id', (0, asyncHandler_utils_1.asyncHandler)(users_controller_1.updateUser));
router.delete('/:id', (0, asyncHandler_utils_1.asyncHandler)(users_controller_1.deleteUser));
exports.default = router;
