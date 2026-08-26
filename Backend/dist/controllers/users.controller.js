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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const error_utils_1 = require("../utils/error.utils");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.default.find().select('-password');
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Get all users error: ${error}`);
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findById(req.params.id).select('-password');
        if (!user) {
            throw new error_utils_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Get user by ID error: ${error}`);
        throw error;
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, role, status } = req.body;
        const user = yield users_model_1.default.findByIdAndUpdate(id, { firstName, lastName, email, phone, role, status }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            throw new error_utils_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Update user error: ${error}`);
        throw error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            throw new error_utils_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Delete user error: ${error}`);
        throw error;
    }
});
exports.deleteUser = deleteUser;
