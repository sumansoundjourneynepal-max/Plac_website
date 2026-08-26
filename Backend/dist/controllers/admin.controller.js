"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getAllAdmins = exports.adminLogin = void 0;
const admin_model_1 = require("../models/admin.model");
const jwt_utils_1 = require("../utils/jwt.utils");
const error_utils_1 = require("../utils/error.utils");
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
exports.adminLogin = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // 1. Check if username and password exist
    if (!username || !password) {
        throw new error_utils_1.AppError('Please provide username and password', 400, 'BAD_REQUEST');
    }
    // 2. Check if admin exists and password is correct
    const admin = yield admin_model_1.Admin.findOne({ username }).select('+password');
    if (!admin || !(yield admin.correctPassword(password, admin.password))) {
        throw new error_utils_1.AppError('Incorrect username or password', 401, 'UNAUTHORIZED');
    }
    // 3. Check if admin is active
    if (admin.status !== 'active') {
        throw new error_utils_1.AppError('Your account is not active', 403, 'FORBIDDEN');
    }
    // 4. If everything ok, send token to client
    const token = (0, jwt_utils_1.generateToken)({ userId: admin._id.toString() });
    // Create response object without password
    const adminResponse = {
        _id: admin._id.toString(), // Explicitly convert to string
        username: admin.username,
        email: admin.email,
        role: admin.role,
        status: admin.status,
        createdAt: admin.createdAt
    };
    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: adminResponse
        }
    });
}));
// Get all admins (additional controller for admin management)
exports.getAllAdmins = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield admin_model_1.Admin.find().select('-password');
    res.status(200).json({
        status: 'success',
        results: admins.length,
        data: {
            admins
        }
    });
}));
// Create new admin
exports.createAdmin = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    // Check if admin already exists
    const existingAdmin = yield admin_model_1.Admin.findOne({
        $or: [{ username }, { email }]
    });
    if (existingAdmin) {
        throw new error_utils_1.AppError('Admin with this username or email already exists', 400, 'BAD_REQUEST');
    }
    // Create new admin
    const newAdmin = yield admin_model_1.Admin.create({
        username,
        email,
        password,
        role: role || 'admin',
        status: 'active'
    });
    // Remove password from response
    const adminResponse = {
        _id: newAdmin._id.toString(),
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        status: newAdmin.status,
        createdAt: newAdmin.createdAt
    };
    res.status(201).json({
        status: 'success',
        data: {
            admin: adminResponse
        }
    });
}));
// Update admin
exports.updateAdmin = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, role, status } = req.body;
    const admin = yield admin_model_1.Admin.findByIdAndUpdate(id, { username, email, role, status }, { new: true, runValidators: true }).select('-password');
    if (!admin) {
        throw new error_utils_1.AppError('Admin not found', 404, 'NOT_FOUND');
    }
    res.status(200).json({
        status: 'success',
        data: {
            admin
        }
    });
}));
// Delete admin
exports.deleteAdmin = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const admin = yield admin_model_1.Admin.findByIdAndDelete(id);
    if (!admin) {
        throw new error_utils_1.AppError('Admin not found', 404, 'NOT_FOUND');
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
}));
