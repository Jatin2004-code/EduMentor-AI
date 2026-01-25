
import express from 'express';
import { connectDB } from './lib/db';
import courseRoutes from './routes/courseRoutes';
import progressRoutes from './routes/progressRoutes';
import instructorRoutes from './routes/instructorRoutes';
import adminRoutes from './routes/adminRoutes';
import aiRoutes from './routes/aiRoutes';
import { errorHandler } from './middleware/errorHandler';

/**
 * server.ts
 * Backend Entry Point
 * 
 * Bootstraps the Express application and ensures the data layer
 * is ready before starting the HTTP listener.
 */

const app = express();
const PORT = process.env.PORT || 4000;

// Standard Middlewares
// Fix: Cast middleware to any to bypass overload resolution issues
app.use(express.json() as any);
app.use(express.urlencoded({ extended: true }) as any);

// Basic Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    data: {
      status: 'active', 
      message: 'EduMentor AI Backend is running',
      timestamp: new Date().toISOString()
    }
  });
});

// Route Mounting
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Global Error Handler (Must be registered last)
app.use(errorHandler);

/**
 * Application Boot Sequence
 */
const startServer = async () => {
  try {
    console.log('[Server] Initializing EduMentor AI Services...');
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`[Server] Listening on port ${PORT}`);
      console.log(`[Server] Mode: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('[Server] Boot failed critical check:', error);
    (process as any).exit(1);
  }
};

startServer();