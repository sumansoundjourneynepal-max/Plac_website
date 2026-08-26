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

// const app = express();

// // Basic security - Configure helmet for production
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
// }));

// // Define allowed origins - Include both www and non-www versions
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:3000',
//   'http://localhost:5000',
//   'https://omsounds.com',
//   'https://www.omsounds.com',
//   'https://api.omsounds.com',
//   env.CLIENT_URL
// ].filter(Boolean); // Remove any undefined values

// // Remove duplicates
// const uniqueOrigins = [...new Set(allowedOrigins)];

// console.log('✅ CORS allowed origins:', uniqueOrigins);

// // CORS configuration - Allow multiple origins
// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, etc.)
//     if (!origin) return callback(null, true);
    
//     if (uniqueOrigins.indexOf(origin) !== -1) {
//       console.log('✅ CORS allowed:', origin);
//       callback(null, true);
//     } else {
//       console.log('❌ CORS blocked origin:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
//   optionsSuccessStatus: 200
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
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression'; // Add this import
import mainRouter from './routes/index.routes';
import { errorHandler, notFound } from './middleware/error.middleware';
import { env } from './config/env.config';
import blogRoutes from './routes/api/blog.routes';
import adminBlogRoutes from './routes/api/admin.blog.routes';
import testimonialRoutes from './routes/api/testimonial.routes';
import adminPressRoutes from "./routes/api/admin.press.routes";
import pressRoutes from './routes/api/press.routes';
import adminFaqRoutes from "./routes/api/admin.faq.routes";
import faqRoutes from "./routes/api/faq.routes";
import reviewRoutes from "./routes/review.routes";

const app = express();

// Basic security - Configure helmet for production
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Add compression middleware (before routes)
app.use(compression());

// Define allowed origins - Include both www and non-www versions
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://omsounds.com',
  'https://www.omsounds.com',
  'https://api.omsounds.com',
  env.CLIENT_URL
].filter(Boolean); // Remove any undefined values

// Remove duplicates
const uniqueOrigins = [...new Set(allowedOrigins)];

console.log('✅ CORS allowed origins:', uniqueOrigins);

// CORS configuration - Allow multiple origins
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (uniqueOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS allowed:', origin);
      callback(null, true);
    } else {
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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', mainRouter);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/press', pressRoutes);
app.use("/api/admin/press", adminPressRoutes);
app.use("/api/admin/faqs", adminFaqRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;