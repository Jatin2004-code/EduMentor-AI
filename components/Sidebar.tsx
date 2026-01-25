
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Users, 
  BarChart3, 
  PlusCircle, 
  FileText, 
  ShieldCheck,
  LogOut,
  HelpCircle,
  BrainCircuit,
  Home
} from 'lucide-react';

interface SidebarProps {
  role: UserRole;
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, logout }) => {
  const getNavItems = () => {
    switch (role) {
      case UserRole.STUDENT:
        return [
          { icon: LayoutDashboard, label: 'My Dashboard', path: '/student/dashboard' },
          { icon: BookOpen, label: 'My Courses', path: '/courses' },
          { icon: GraduationCap, label: 'Learning Path', path: '/learning-path' },
          { icon: HelpCircle, label: 'AI Tutor', path: '/ai-tutor' },
        ];
      case UserRole.INSTRUCTOR:
        return [
          { icon: LayoutDashboard, label: 'Instructor Hub', path: '/instructor/dashboard' },
          { icon: PlusCircle, label: 'Create Course', path: '/course-builder' },
          { icon: Users, label: 'Students', path: '/students' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        ];
      case UserRole.ADMIN:
        return [
          { icon: ShieldCheck, label: 'Admin Console', path: '/admin/dashboard' },
          { icon: Users, label: 'User Control', path: '/users' },
          { icon: FileText, label: 'Moderation', path: '/moderation' },
          { icon: BarChart3, label: 'Revenue', path: '/revenue' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
            <BrainCircuit size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EduMentor AI</span>
        </div>
        <div className="mt-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">{role} Portal</div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {/* Added Public Home Link */}
        <NavLink
          to="/"
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors mb-4 ${
              isActive ? 'bg-slate-800 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <Home size={20} />
          <span className="text-sm">Main Landing</span>
        </NavLink>

        <div className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Platform</div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}

        <div className="pt-8 pb-4">
          <div className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Technical Specs</div>
          <NavLink
            to="/docs"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? 'bg-indigo-600/10 text-indigo-400 font-bold' : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <ShieldCheck size={20} />
            <span className="text-sm">Architecture Docs</span>
          </NavLink>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
