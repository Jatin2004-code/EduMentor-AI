
import { UserRole, User } from '../types';
import { hashPassword, comparePasswords, signToken } from '../lib/authUtils';

/**
 * Mock Database Helpers
 * For production, these would be replaced by actual DB calls to MongoDB/PostgreSQL.
 */
const getStoredUsers = () => {
  const stored = localStorage.getItem('edumentor_db_users');
  const users = stored ? JSON.parse(stored) : [];
  
  // SEED: Ensure a default Admin exists for the demo if not present
  const adminEmail = 'admin@edumentor.ai';
  if (!users.find((u: any) => u.email === adminEmail)) {
    // Password 'admin123'
    users.push({
      id: 'admin-001',
      name: 'EduMentor Admin',
      email: adminEmail,
      password: btoa('admin123' + "salt"), // Matching hashPassword logic in authUtils
      role: UserRole.ADMIN,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200'
    });
    localStorage.setItem('edumentor_db_users', JSON.stringify(users));
  }
  return users;
};

const saveUsers = (users: any[]) => localStorage.setItem('edumentor_db_users', JSON.stringify(users));

/**
 * Signup Service
 * Admins are blocked from public signup for security.
 */
export const authSignup = async (name: string, email: string, password: string, role: UserRole) => {
  const users = getStoredUsers();
  
  if (users.find((u: any) => u.email === email)) {
    throw new Error('This email is already registered in our system.');
  }

  // Security Policy: Only Student and Instructor roles can be self-created
  if (role === UserRole.ADMIN) {
    throw new Error('Unauthorized role request. Administrator accounts must be provisioned by the system.');
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    password: hashedPassword,
    role: role, // Ensure role is explicitly set
    avatar: `https://picsum.photos/seed/${email}/200/200`
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without password + signed JWT
  const { password: _, ...userWithoutPassword } = newUser;
  const token = signToken(userWithoutPassword);

  return { user: userWithoutPassword as User, token };
};

/**
 * Login Service
 * Validates credentials and checks for role matching.
 */
export const authLogin = async (email: string, password: string, expectedRole: UserRole) => {
  const users = getStoredUsers();
  const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) throw new Error('No account found with these credentials.');
  
  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) throw new Error('Incorrect password provided.');

  // Strict Role Enforcement: A user must log into their specific portal
  if (user.role !== expectedRole) {
    throw new Error(`Access Denied: Your account is registered as a ${user.role}, not an ${expectedRole}.`);
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = signToken(userWithoutPassword);

  return { user: userWithoutPassword as User, token };
};
