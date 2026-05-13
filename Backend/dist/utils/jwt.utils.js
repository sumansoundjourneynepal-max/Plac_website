"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// utils/jwt.utils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'd310a078b9f4161af928b413967081f31dda6c48fdbfc4146c982ced368196dc';
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Handle the case where decoded is a string (shouldn't happen with proper JWT)
        if (typeof decoded === 'string') {
            throw new Error('Invalid token format');
        }
        // Type guard to ensure we have the required userId property
        if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
            throw new Error('Invalid token payload');
        }
        return decoded;
    }
    catch (error) {
        // Re-throw JWT errors to be handled by the middleware
        throw error;
    }
};
exports.verifyToken = verifyToken;
