"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticate = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const error_utils_1 = require("../utils/error.utils");
const authenticate = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new error_utils_1.AppError('Authentication required', 401, 'NO_TOKEN');
        }
        // verifyToken now returns UserPayload, which matches req.user type
        const decoded = (0, jwt_utils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        // Handle JWT-specific errors
        if (error instanceof Error) {
            if (error.name === 'JsonWebTokenError') {
                res.status(401).json({
                    error: 'Invalid token',
                    code: 'INVALID_TOKEN'
                });
                return;
            }
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    error: 'Token expired',
                    code: 'TOKEN_EXPIRED'
                });
                return;
            }
        }
        // Handle AppError instances
        if (error instanceof error_utils_1.AppError) {
            res.status(error.statusCode).json({
                error: error.message,
                code: error.code
            });
            return;
        }
        // Default authentication error
        res.status(401).json({
            error: 'Please authenticate',
            code: 'AUTH_FAILED'
        });
    }
};
exports.authenticate = authenticate;
// Add this new middleware for admin check
const isAdmin = (req, res, next) => {
    try {
        // Check if user exists and has admin role
        if (!req.user || req.user.role !== 'admin') {
            throw new error_utils_1.AppError('Admin access required', 403, 'ADMIN_REQUIRED');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isAdmin = isAdmin;
