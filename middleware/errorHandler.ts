
import { Request, Response, NextFunction } from 'express';

/**
 * Global Error Handler Middleware
 * 
 * Intercepts all errors passed to next() or thrown in routes.
 * Ensures every error response follows the standard NexusAI shape.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Global Error Handler] ${err.name}: ${err.message}`);

  // Default error properties
  let statusCode = err.status || 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = err.message || 'An unexpected error occurred on the server.';

  // Handle MongoDB invalid ID errors
  if (err.name === 'CastError') {
    statusCode = 400;
    errorCode = 'INVALID_ID_FORMAT';
    message = `The provided ID format is invalid: ${err.value}`;
  }

  // Handle MongoDB validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = Object.values(err.errors).map((val: any) => val.message).join(', ');
  }

  // Handle Authentication/Authorization specific errors
  if (err.name === 'UnauthorizedError' || statusCode === 401) {
    statusCode = 401;
    errorCode = 'UNAUTHORIZED';
  }

  if (statusCode === 403) {
    errorCode = 'FORBIDDEN';
  }

  if (statusCode === 404) {
    errorCode = 'NOT_FOUND';
  }

  // Fix: Cast res to any to bypass potential status property resolution issues
  (res as any).status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode
    }
  });
};