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
exports.getCurrentUser = exports.login = exports.signup = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const error_utils_1 = require("../utils/error.utils");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !password) {
            throw new error_utils_1.AppError('All fields are required', 400, 'MISSING_FIELDS');
        }
        // Check if user already exists
        const existingUser = yield users_model_1.default.findOne({ email });
        if (existingUser) {
            throw new error_utils_1.AppError('Email already in use', 400, 'EMAIL_IN_USE');
        }
        // Create new user
        const user = yield users_model_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            role: 'customer',
            status: 'active'
        });
        // Generate token
        const token = (0, jwt_utils_1.generateToken)({ userId: user._id.toString() });
        // Prepare user response (password is automatically excluded by the model)
        const userResponse = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            joinedDate: user.joinedDate
        };
        logger_utils_1.default.info(`New user registered: ${user.email}`);
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            data: {
                user: userResponse
            }
        });
    }
    catch (error) {
        logger_utils_1.default.error('Signup error:', error);
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: validationErrors,
                code: 'VALIDATION_ERROR'
            });
        }
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists',
                code: 'DUPLICATE_EMAIL'
            });
        }
        if (error instanceof error_utils_1.AppError) {
            return res.status(error.statusCode).json({
                status: 'error',
                message: error.message,
                code: error.code
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            throw new error_utils_1.AppError('Email and password are required', 400, 'MISSING_CREDENTIALS');
        }
        // Find user and include password for comparison
        const user = yield users_model_1.default.findOne({ email }).select('+password');
        if (!user) {
            throw new error_utils_1.AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
        }
        // Check if user account is active
        if (user.status !== 'active') {
            throw new error_utils_1.AppError('Account is not active', 401, 'ACCOUNT_INACTIVE');
        }
        // Compare password
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            throw new error_utils_1.AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
        }
        // Generate token
        const token = (0, jwt_utils_1.generateToken)({ userId: user._id.toString() });
        // Prepare user response
        const userResponse = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            joinedDate: user.joinedDate
        };
        logger_utils_1.default.info(`User logged in: ${user.email}`);
        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            data: {
                user: userResponse
            }
        });
    }
    catch (error) {
        logger_utils_1.default.error('Login error:', error);
        if (error instanceof error_utils_1.AppError) {
            return res.status(error.statusCode).json({
                status: 'error',
                message: error.message,
                code: error.code
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
});
exports.login = login;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw new error_utils_1.AppError('Not authenticated', 401, 'NOT_AUTHENTICATED');
        }
        const user = yield users_model_1.default.findById(req.user.userId).select('-password');
        if (!user) {
            throw new error_utils_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }
        return res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (error) {
        logger_utils_1.default.error('Get current user error:', error);
        if (error instanceof error_utils_1.AppError) {
            return res.status(error.statusCode).json({
                status: 'error',
                message: error.message,
                code: error.code
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
});
exports.getCurrentUser = getCurrentUser;
