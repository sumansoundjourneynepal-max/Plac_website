// server.ts
import { env } from './config/env.config';
import app from './app';
import { connectDB } from './config/db.config';

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed — server will start without database');
    console.warn('   Only non-DB endpoints will work (e.g. health check)');
  }
  
  // Start server regardless of DB status
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    console.log(`📋 Health check: http://localhost:${env.PORT}/health`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();