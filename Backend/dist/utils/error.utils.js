"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.AppError = void 0;
// utils/error.utils.ts
class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};
exports.getErrorMessage = getErrorMessage;
