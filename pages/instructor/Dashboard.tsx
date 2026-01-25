
import React from 'react';
import { User } from '../../types';
import { Users, BookOpen, MessageSquare, TrendingUp, ChevronRight, MoreHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', students: 400 },
  { name: 'Tue', students: 300 },
  { name: 'Wed', students: 600 },
  { name: 'Thu', students: 800 },
  { name: 'Fri', students: 500 },
  { name: 'Sat', students: 900 },
  { name: 'Sun', students: 1100 },
];

const InstructorDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Instructor Hub</h1>
          <p className="text-slate-500 mt-1">Monitor course performance and student engagement.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center gap-2">
          <BookOpen size={18} /> Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', val: '12,450', change: '+12%', icon: Users, color: 'blue' },
          { label: 'Active Courses', val: '24', change: '+2', icon: BookOpen, color: 'emerald' },
          { label: 'Completion Rate', val: '68%', change: '+5%', icon: TrendingUp, color: 'amber' },
          { label: 'Student Questions', val: '42', change: '8 new', icon: MessageSquare, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className={`w-10 h-10 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={22} />
            </div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-tight">{stat.label}</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stat.val}</div>
            <div className="text-[10px] font-bold mt-2 text-emerald-600">{stat.change} <span className="text-slate-400 font-medium">this month</span></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 text-lg">Student Enrollment Trend</h3>
            <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-6">Course Performance</h3>
          <div className="space-y-6">
            {[
              { name: 'UI/UX Masterclass', enr: 4500, rating: 4.8 },
              { name: 'Advanced TypeScript', enr: 3200, rating: 4.9 },
              { name: 'Figma for Engineers', enr: 2100, rating: 4.7 },
            ].map((course, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${course.name}/100/100`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 text-sm truncate">{course.name}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{course.enr} Enrolled</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><TrendingUp size={10} className="text-emerald-500" /> {course.rating}</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2.5 text-xs font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            Manage All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
