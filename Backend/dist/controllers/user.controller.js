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
exports.getUserById = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const error_utils_1 = require("../utils/error.utils");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({});
        res.json(users);
    }
    catch (error) {
        // Handle AppError instances with their specific status codes
        if (error instanceof error_utils_1.AppError) {
            res.status(error.statusCode).json({
                error: error.message,
                code: error.code
            });
            return; // Don't use return res.status()...
        }
        // For other errors, use a generic 500 status
        res.status(500).json({ error: (0, error_utils_1.getErrorMessage)(error) });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return; // Don't use return res.status()...
        }
        res.json(user);
    }
    catch (error) {
        // Handle AppError instances with their specific status codes
        if (error instanceof error_utils_1.AppError) {
            res.status(error.statusCode).json({
                error: error.message,
                code: error.code
            });
            return; // Don't use return res.status()...
        }
        // For other errors, use a generic 500 status
        res.status(500).json({ error: (0, error_utils_1.getErrorMessage)(error) });
    }
});
exports.getUserById = getUserById;
