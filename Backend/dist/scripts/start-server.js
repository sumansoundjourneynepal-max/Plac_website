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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("=== SERVER STARTUP ===");
console.log("Environment variables:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
console.log("PORT:", process.env.PORT || 5000);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN || "http://localhost:5173");
console.log("NODE_ENV:", process.env.NODE_ENV || "development");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// File upload middleware
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
    fileFilter: (req, file, cb) => {
        console.log("File filter - Field:", file.fieldname, "Type:", file.mimetype);
        if (file.fieldname === "images") {
            if (file.mimetype.startsWith("image/")) {
                cb(null, true);
            }
            else {
                cb(new Error("Only image files are allowed for images"));
            }
        }
        else if (file.fieldname === "video") {
            if (file.mimetype.startsWith("video/")) {
                cb(null, true);
            }
            else {
                cb(new Error("Only video files are allowed for video"));
            }
        }
        else {
            cb(null, true);
        }
    },
});
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not set");
        }
        console.log("Connecting to MongoDB...");
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB successfully");
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown MongoDB error";
        console.error("❌ MongoDB connection error:", errorMessage);
        process.exit(1);
    }
});
connectDB().catch((error) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to connect to database:", errorMessage);
});
// Import routes
const product_routes_1 = __importDefault(require("../routes/product.routes"));
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        mongodb: mongoose_1.default.connection.readyState === 1 ? "Connected" : "Disconnected",
    });
});
// Use routes
app.use("/api/products", product_routes_1.default);
// Error handling middleware
app.use((error, req, res, next) => {
    console.error("=== SERVER ERROR ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    console.error("Request URL:", req.url);
    console.error("Request Method:", req.method);
    console.error("Request Body:", req.body);
    console.error("Request Files:", req.files);
    console.error("===================");
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    });
});
// 404 handler
app.use("*", (req, res) => {
    console.log("404 - Route not found:", req.method, req.originalUrl);
    res.status(404).json({ message: "Route not found" });
});
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🛍️ Products API: http://localhost:${PORT}/api/products`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log("======================");
});
