
import express, { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Progress } from '../models/Progress';
import { authenticate, authorize, AuthRequest } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

// Fix: Use standard Request/Response types in handlers and cast to AuthRequest where needed
router.get('/courses/:courseId/progress', authenticate, authorize(UserRole.INSTRUCTOR), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const { courseId } = req.params;
    const instructorId = authReq.user?.id;

    const course = await Course.findById(courseId);
    if (!course) {
      // Fix: Cast res to any for status method
      return (res as any).status(404).json({ success: false, error: { message: 'Course not found', code: 'NOT_FOUND' } });
    }

    if (course.instructorId.toString() !== instructorId) {
      // Fix: Cast res to any for status method
      return (res as any).status(403).json({ success: false, error: { message: 'Unauthorized course access', code: 'FORBIDDEN' } });
    }

    const studentProgress = await Progress.find({ courseId }).lean();

    const summary = studentProgress.map(p => ({
      studentId: (p as any).studentId,
      completionCount: (p as any).completedLessonIds?.length || 0,
      lastAccessedLessonId: (p as any).lastAccessedLessonId,
      updatedAt: (p as any).updatedAt
    }));

    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: { courseId, studentCount: summary.length, progressData: summary }
    });
  } catch (error) {
    next(error);
  }
});

export default router;