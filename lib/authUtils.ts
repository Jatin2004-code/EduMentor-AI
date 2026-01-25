
import { UserRole } from '../types';

/**
 * Simulates secure password hashing (In production, use bcryptjs)
 */
export const hashPassword = async (password: string): Promise<string> => {
  // Simple simulation for demo; in real node env use bcrypt.hash
  return btoa(password + "salt"); 
};

export const comparePasswords = async (plain: string, hashed: string): Promise<boolean> => {
  return btoa(plain + "salt") === hashed;
};

/**
 * JWT Helpers
 */
export const signToken = (payload: any): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  // Simplified JWT for browser environment demo
  return btoa(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
};

export const verifyToken = (token: string): any => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};
