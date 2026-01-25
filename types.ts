
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  description: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'archived';
  enrolledCount: number;
  rating: number;
  price: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'pdf' | 'text';
  contentUrl: string;
  order: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: 'quiz' | 'coding' | 'essay';
  questions: any[];
}
