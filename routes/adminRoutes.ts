
import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Schema } from 'mongoose';
import { Course } from '../models/Course';
import { UserSchema } from '../models/User';
import { authenticate, authorize, AuthRequest } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();
const User = mongoose.models.User || mongoose.model('User', new Schema(UserSchema));

// Fix: Use standard Request/Response types in handlers and cast to AuthRequest where needed
router.get('/users', authenticate, authorize(UserRole.ADMIN), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({}).select('_id role createdAt').lean();
    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: { count: users.length, users }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/courses', authenticate, authorize(UserRole.ADMIN), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find({}).select('_id title instructorId updatedAt').lean();
    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: { count: courses.length, courses }
    });
  } catch (error) {
    next(error);
  }
});

export default router;