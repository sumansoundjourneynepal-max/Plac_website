"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    // Static methods for common error responses
    static badRequest(message, code) {
        return new ErrorResponse(message, 400, code);
    }
    static unauthorized(message, code) {
        return new ErrorResponse(message, 401, code);
    }
    static forbidden(message, code) {
        return new ErrorResponse(message, 403, code);
    }
    static notFound(message, code) {
        return new ErrorResponse(message, 404, code);
    }
    static conflict(message, code) {
        return new ErrorResponse(message, 409, code);
    }
    static internalError(message, code) {
        return new ErrorResponse(message, 500, code);
    }
}
exports.ErrorResponse = ErrorResponse;
// Utility function to send error responses
const sendErrorResponse = (res, error, includeStack = process.env.NODE_ENV === 'development') => {
    const statusCode = error instanceof ErrorResponse ? error.statusCode : 500;
    const response = {
        success: false,
        error: error.message,
        code: error instanceof ErrorResponse ? error.code : 'INTERNAL_ERROR'
    };
    if (includeStack && error.stack) {
        response.stack = error.stack;
    }
    res.status(statusCode).json(response);
};
exports.sendErrorResponse = sendErrorResponse;
