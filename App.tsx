
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { verifyToken } from './lib/authUtils';

// Pages
import AuthLanding from './pages/AuthLanding';
import GetStarted from './pages/GetStarted';
import FeaturesPage from './pages/FeaturesPage';
import StudentDashboard from './pages/student/Dashboard';
import InstructorDashboard from './pages/instructor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ArchitectureDocs from './pages/ArchitectureDocs';
import MyCourses from './pages/student/MyCourses';
import LearningPath from './pages/student/LearningPath';
import AITutor from './pages/student/AITutor';
import CourseViewer from './pages/student/CourseViewer';
import CourseBuilder from './pages/instructor/CourseBuilder';
import UserManagement from './pages/admin/UserManagement';
import InstructorStudents from './pages/instructor/Students';
import InstructorAnalytics from './pages/instructor/Analytics';
import NotificationsPage from './pages/student/Notifications';
import SettingsPage from './pages/student/Settings';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

/**
 * AuthGuard Component
 * Protects role-specific routes. 
 * Redirects unauthenticated users to the Home Page (/).
 * Redirects authenticated users with the wrong role to their correct dashboard.
 */
const AuthGuard: React.FC<{ user: User | null; allowedRole: UserRole; children: React.ReactNode }> = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Strict Role Matching
  if (user.role !== allowedRole) {
    const dashboardPath = user.role === UserRole.STUDENT ? '/student/dashboard' : 
                         user.role === UserRole.INSTRUCTOR ? '/instructor/dashboard' : 
                         '/admin/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize auth state with storage on mount and refresh
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('edumentor_token');
      const savedUserStr = localStorage.getItem('edumentor_user');
      
      if (token && savedUserStr) {
        const decoded = verifyToken(token);
        if (decoded && decoded.role) {
          // Re-sync user object from decoded token to ensure role is up-to-date
          setUser(decoded as User);
        } else {
          // Clean up expired or malformed sessions
          localStorage.removeItem('edumentor_token');
          localStorage.removeItem('edumentor_user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleAuthSuccess = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('edumentor_token', token);
    localStorage.setItem('edumentor_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edumentor_token');
    localStorage.removeItem('edumentor_user');
    window.location.hash = '/';
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">Initializing EduMentor Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-[#020617]">
        {/* Role-Specific Navigation Sidebar */}
        {user && <Sidebar role={user.role} logout={handleLogout} />}
        
        <div className={`flex-1 flex flex-col min-w-0 ${user ? 'bg-slate-50' : 'bg-[#020617]'}`}>
          {/* Global Header for Authenticated States */}
          {user && <Header user={user} />}
          
          <main className={`flex-1 overflow-y-auto ${user ? 'p-4 md:p-8' : 'p-0'}`}>
            <Routes>
              {/* --- PUBLIC MARKETING & ONBOARDING ROUTES --- */}
              <Route path="/" element={<AuthLanding />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/docs" element={<ArchitectureDocs />} />

              {/* Public Auth Portals: Students */}
              <Route path="/student/login" element={user ? <Navigate to="/student/dashboard" replace /> : <LoginPage role={UserRole.STUDENT} onSuccess={handleAuthSuccess} />} />
              <Route path="/student/signup" element={user ? <Navigate to="/student/dashboard" replace /> : <SignupPage role={UserRole.STUDENT} onSuccess={handleAuthSuccess} />} />
              
              {/* Public Auth Portals: Instructors */}
              <Route path="/instructor/login" element={user ? <Navigate to="/instructor/dashboard" replace /> : <LoginPage role={UserRole.INSTRUCTOR} onSuccess={handleAuthSuccess} />} />
              <Route path="/instructor/signup" element={user ? <Navigate to="/instructor/dashboard" replace /> : <SignupPage role={UserRole.INSTRUCTOR} onSuccess={handleAuthSuccess} />} />
              
              {/* Public Auth Portals: Admin */}
              <Route path="/admin/login" element={user ? <Navigate to="/admin/dashboard" replace /> : <LoginPage role={UserRole.ADMIN} onSuccess={handleAuthSuccess} />} />

              {/* --- PROTECTED STUDENT ECOSYSTEM --- */}
              <Route path="/student/dashboard" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><StudentDashboard user={user!} /></AuthGuard>} />
              <Route path="/courses" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><MyCourses /></AuthGuard>} />
              <Route path="/courses/:courseId" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><CourseViewer /></AuthGuard>} />
              <Route path="/learning-path" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><LearningPath /></AuthGuard>} />
              <Route path="/ai-tutor" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><AITutor /></AuthGuard>} />
              <Route path="/notifications" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><NotificationsPage /></AuthGuard>} />
              <Route path="/settings" element={<AuthGuard user={user} allowedRole={UserRole.STUDENT}><SettingsPage user={user!} /></AuthGuard>} />

              {/* --- PROTECTED INSTRUCTOR HUB --- */}
              <Route path="/instructor/dashboard" element={<AuthGuard user={user} allowedRole={UserRole.INSTRUCTOR}><InstructorDashboard user={user!} /></AuthGuard>} />
              <Route path="/course-builder" element={<AuthGuard user={user} allowedRole={UserRole.INSTRUCTOR}><CourseBuilder /></AuthGuard>} />
              <Route path="/students" element={<AuthGuard user={user} allowedRole={UserRole.INSTRUCTOR}><InstructorStudents /></AuthGuard>} />
              <Route path="/analytics" element={<AuthGuard user={user} allowedRole={UserRole.INSTRUCTOR}><InstructorAnalytics /></AuthGuard>} />

              {/* --- PROTECTED ADMIN CONSOLE --- */}
              <Route path="/admin/dashboard" element={<AuthGuard user={user} allowedRole={UserRole.ADMIN}><AdminDashboard user={user!} /></AuthGuard>} />
              <Route path="/users" element={<AuthGuard user={user} allowedRole={UserRole.ADMIN}><UserManagement /></AuthGuard>} />

              {/* --- CATCH-ALL REDIRECT --- */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
