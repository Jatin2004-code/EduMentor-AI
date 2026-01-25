
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/authUtils';
import { UserRole } from '../types';

/**
 * middleware/authMiddleware.ts
 * Security Layer: Authentication & Authorization
 * 
 * This file provides the core protection logic for the NexusAI API.
 * It enforces that users are logged in and have the correct permissions.
 */

/**
 * Extended Request interface to hold authenticated user data.
 */
// Fix: Correctly extend the express Request type
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
  };
}

/**
 * Authentication Middleware
 * Validates the JWT from the Authorization header and populates req.user.
 */
// Fix: Use base Request in signature and cast inside to satisfy express.RequestHandler
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthRequest;
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Fix: Cast res to any to bypass potential status property resolution issues
    return (res as any).status(401).json({ 
      error: 'unauthorized', 
      message: 'Authentication token is missing or malformed.' 
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    // Fix: Cast res to any to bypass potential status property resolution issues
    return (res as any).status(401).json({ 
      error: 'unauthorized', 
      message: 'Your session has expired. Please login again.' 
    });
  }

  // Attach the decoded payload to the request for use in controllers
  authReq.user = decoded;
  next();
};

/**
 * Role-Based Authorization Middleware
 * Restricts access to specific user roles.
 * Usage: router.get('/path', authenticate, authorize(UserRole.ADMIN), controller)
 * 
 * @param allowedRoles - Roles permitted to access the route
 */
// Fix: Use base Request in signature for the returned handler
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    // Ensure authentication middleware ran first
    if (!authReq.user) {
      // Fix: Cast res to any to bypass potential status property resolution issues
      return (res as any).status(401).json({ 
        error: 'unauthorized', 
        message: 'You must be logged in to perform this action.' 
      });
    }

    // Check if user role is permitted
    if (!allowedRoles.includes(authReq.user.role)) {
      // Fix: Cast res to any to bypass potential status property resolution issues
      return (res as any).status(403).json({ 
        error: 'forbidden', 
        message: `Access denied. This resource requires ${allowedRoles.join(' or ')} permissions.` 
      });
    }

    next();
  };
};