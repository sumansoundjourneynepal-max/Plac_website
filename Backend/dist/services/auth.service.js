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
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const error_utils_1 = require("../utils/error.utils");
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user already exists
        const existingUser = yield user_model_1.User.findOne({ email: userData.email });
        if (existingUser) {
            throw new error_utils_1.AppError('Email already in use', 400, 'EMAIL_EXISTS');
        }
        // Create new user
        const user = new user_model_1.User(userData);
        yield user.save();
        return user;
    }
    catch (error) {
        logger_utils_1.default.error(`Error in registerUser: ${(0, error_utils_1.getErrorMessage)(error)}`);
        throw error;
    }
});
exports.registerUser = registerUser;
const loginUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email: credentials.email });
        if (!user) {
            throw new error_utils_1.AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        }
        // In a real app, you would verify the password here
        // For now, we'll just check if passwords match (not secure!)
        if (user.password !== credentials.password) {
            throw new error_utils_1.AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        }
        return user;
    }
    catch (error) {
        logger_utils_1.default.error(`Error in loginUser: ${(0, error_utils_1.getErrorMessage)(error)}`);
        throw error;
    }
});
exports.loginUser = loginUser;
