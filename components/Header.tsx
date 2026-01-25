
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { Bell, Search, Settings } from 'lucide-react';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="relative w-96 max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search courses, lessons, documentation..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/notifications')}
          className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all relative group"
          title="Notifications"
        >
          <Bell size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">2</span>
        </button>
        
        <button 
          onClick={() => navigate('/settings')}
          className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-all group"
          title="Account Settings"
        >
          <Settings size={20} className="group-hover:rotate-45 transition-transform" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/settings')}>
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-900 leading-none">{user.name}</div>
            <div className="text-[11px] text-slate-500 uppercase tracking-tighter mt-1 font-bold">{user.role}</div>
          </div>
          <img src={user.avatar} className="w-9 h-9 rounded-full border border-slate-200 object-cover shadow-sm" alt="User avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
