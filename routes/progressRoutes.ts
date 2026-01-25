
import express, { Request, Response, NextFunction } from 'express';
import { Progress } from '../models/Progress';
import { authenticate, authorize, AuthRequest } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

// Fix: Use standard Request/Response types in handlers and cast to AuthRequest where needed
router.post('/', authenticate, authorize(UserRole.STUDENT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const { courseId, lessonId, isCompleted } = req.body;
    const studentId = authReq.user?.id;

    if (!courseId || !lessonId) {
      // Fix: Cast res to any for status method
      return (res as any).status(400).json({ success: false, error: { message: 'courseId and lessonId required', code: 'BAD_REQUEST' } });
    }

    const update: any = { $set: { lastAccessedLessonId: lessonId } };
    if (isCompleted) update.$addToSet = { completedLessonIds: lessonId };

    const progress = await Progress.findOneAndUpdate(
      { studentId, courseId },
      update,
      { new: true, upsert: true }
    );

    // Fix: Cast res to any for status method
    (res as any).status(200).json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
});

router.get('/:courseId', authenticate, authorize(UserRole.STUDENT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const { courseId } = req.params;
    const studentId = authReq.user?.id;

    const progress = await Progress.findOne({ studentId, courseId });

    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: progress || { courseId, completedLessonIds: [], lastAccessedLessonId: null }
    });
  } catch (error) {
    next(error);
  }
});

export default router;