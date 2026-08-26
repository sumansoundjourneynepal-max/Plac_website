"use strict";
// // app.ts
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import mainRouter from './routes/index.routes';
// import { errorHandler, notFound } from './middleware/error.middleware';
// import { env } from './config/env.config';
// import blogRoutes from './routes/api/blog.routes';
// import adminBlogRoutes from './routes/api/admin.blog.routes';
// import testimonialRoutes from './routes/api/testimonial.routes';
// import adminPressRoutes from "./routes/api/admin.press.routes";
// import pressRoutes from './routes/api/press.routes';
// import adminFaqRoutes from "./routes/api/admin.faq.routes";
// import faqRoutes from "./routes/api/faq.routes";
// import reviewRoutes from "./routes/review.routes";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// // Basic security
// app.use(helmet());
// // CORS
// app.use(cors({
//   origin: env.CLIENT_URL || 'http://localhost:5173', // Removed trailing slash
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// // Body parsing
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({ 
//     status: 'success', 
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });
// // Routes
// app.use('/api', mainRouter);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/admin/blogs', adminBlogRoutes);
// app.use('/api/testimonials', testimonialRoutes);
// app.use('/api/press', pressRoutes);
// app.use("/api/admin/press", adminPressRoutes);
// app.use("/api/admin/faqs", adminFaqRoutes);
// app.use("/api/faqs", faqRoutes);
// app.use("/api/reviews", reviewRoutes);
// // Error handling middleware (must be last)
// app.use(notFound);
// app.use(errorHandler);
// export default app;
// app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const env_config_1 = require("./config/env.config");
const blog_routes_1 = __importDefault(require("./routes/api/blog.routes"));
const admin_blog_routes_1 = __importDefault(require("./routes/api/admin.blog.routes"));
const testimonial_routes_1 = __importDefault(require("./routes/api/testimonial.routes"));
const admin_press_routes_1 = __importDefault(require("./routes/api/admin.press.routes"));
const press_routes_1 = __importDefault(require("./routes/api/press.routes"));
const admin_faq_routes_1 = __importDefault(require("./routes/api/admin.faq.routes"));
const faq_routes_1 = __importDefault(require("./routes/api/faq.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const app = (0, express_1.default)();
// Basic security - Configure helmet for production
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));
// Define allowed origins - Include both www and non-www versions
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    'https://omsounds.com',
    'https://www.omsounds.com',
    'https://api.omsounds.com',
    env_config_1.env.CLIENT_URL
].filter(Boolean); // Remove any undefined values
// Remove duplicates
const uniqueOrigins = [...new Set(allowedOrigins)];
console.log('✅ CORS allowed origins:', uniqueOrigins);
// CORS configuration - Allow multiple origins
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin)
            return callback(null, true);
        if (uniqueOrigins.indexOf(origin) !== -1) {
            console.log('✅ CORS allowed:', origin);
            callback(null, true);
        }
        else {
            console.log('❌ CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    optionsSuccessStatus: 200
}));
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
// Routes
app.use('/api', index_routes_1.default);
app.use('/api/blogs', blog_routes_1.default);
app.use('/api/admin/blogs', admin_blog_routes_1.default);
app.use('/api/testimonials', testimonial_routes_1.default);
app.use('/api/press', press_routes_1.default);
app.use("/api/admin/press", admin_press_routes_1.default);
app.use("/api/admin/faqs", admin_faq_routes_1.default);
app.use("/api/faqs", faq_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
// Error handling middleware (must be last)
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
exports.default = app;
