
import { UserRole } from '../types';

/**
 * Production User Schema for MongoDB
 */
export const UserSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.STUDENT 
  },
  avatar: String,
  createdAt: { type: Date, default: Date.now }
};
