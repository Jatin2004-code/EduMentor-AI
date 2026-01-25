import mongoose from 'mongoose';

/**
 * lib/db.ts
 * Database Connection Management
 * 
 * Manages the connection lifecycle for MongoDB.
 * Ensures a single connection is maintained across the app lifecycle.
 */

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  // Reuse existing connection if available
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  // Use environment variable with local fallback for development
  const uri = MONGODB_URI || 'mongodb://localhost:27017/nexus_ai';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[DB] Successfully connected to MongoDB at ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('[DB] Connection failure:', error);
    // Re-throw to be caught by server bootstrap
    throw error;
  }
};

// Monitor connection for runtime issues
mongoose.connection.on('error', (err) => {
  console.error('[DB] Runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('[DB] MongoDB disconnected');
});
