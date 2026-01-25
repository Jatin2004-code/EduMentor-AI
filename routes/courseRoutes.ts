
import express, { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { authenticate, authorize, AuthRequest } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

// Fix: Use standard Request/Response types in handlers and cast to AuthRequest where needed
router.get('/', authenticate, authorize(UserRole.STUDENT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find({}).select('title description instructorId updatedAt').lean();
    // Fix: Cast res to any for status method
    (res as any).status(200).json({
      success: true,
      data: { count: courses.length, courses }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:courseId', authenticate, authorize(UserRole.STUDENT), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      // Fix: Cast res to any for status method
      return (res as any).status(404).json({ success: false, error: { message: 'Course not found', code: 'NOT_FOUND' } });
    }

    // Fix: Cast res to any for status method
    (res as any).status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize(UserRole.INSTRUCTOR), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const { title, description, modules } = req.body;
    const instructorId = authReq.user?.id;

    const newCourse = new Course({
      title,
      description,
      instructorId,
      modules: modules || [],
      status: 'draft'
    });

    const savedCourse = await newCourse.save();
    // Fix: Cast res to any for status method
    (res as any).status(201).json({ success: true, data: savedCourse });
  } catch (error) {
    next(error);
  }
});

router.put('/:courseId', authenticate, authorize(UserRole.INSTRUCTOR), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    const { courseId } = req.params;
    const { title, description, modules } = req.body;
    const userId = authReq.user?.id;

    const course = await Course.findById(courseId);

    if (!course) {
      // Fix: Cast res to any for status method
      return (res as any).status(404).json({ success: false, error: { message: 'Course not found', code: 'NOT_FOUND' } });
    }

    if (course.instructorId.toString() !== userId) {
      // Fix: Cast res to any for status method
      return (res as any).status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
    }

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (modules !== undefined) course.modules = modules;

    const updatedCourse = await course.save();
    // Fix: Cast res to any for status method
    (res as any).status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    next(error);
  }
});

export default router;