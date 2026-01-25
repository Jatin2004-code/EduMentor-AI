
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { Play, Clock, Award, Star, TrendingUp, Cpu } from 'lucide-react';

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  const handleResumeCourse = () => {
    navigate('/courses/1'); // Mock navigating to first course
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1">You've completed 75% of your weekly goal. Keep it up!</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Current Streak</div>
              <div className="text-lg font-black text-slate-900">12 Days</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
              <button onClick={() => navigate('/courses')} className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div 
              onClick={handleResumeCourse}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 bg-slate-100 relative overflow-hidden">
                  <img src="https://picsum.photos/seed/fullstack/600/400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Course Thumbnail" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <Play size={24} fill="white" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded">In Progress</span>
                    <span className="text-slate-400 text-xs">• Advanced React Design Patterns</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Module 4: Performance Optimization & State Management</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">Learn how to profile your React applications and implement robust state management using modern tools.</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">Course Progress</span>
                      <span className="text-slate-900 font-bold">65%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[65%] rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
             <h2 className="text-xl font-bold text-slate-900 mb-4">Recommended for You</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 hover:border-blue-200 transition-colors cursor-pointer">
                    <img src={`https://picsum.photos/seed/course-${i}/200/200`} className="w-20 h-20 rounded-lg object-cover" alt="Course" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">System Design: Scaling to 1M Users</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><Star size={10} className="text-amber-500 fill-amber-500" /> 4.9</span>
                        <span>• 12.5 hours</span>
                      </div>
                      <button className="mt-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Preview Course</button>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Cpu size={24} />
              </div>
              <h3 className="font-bold">AI Learning Assistant</h3>
            </div>
            <p className="text-blue-100 text-sm mb-6">"Hello! You've been focusing on Backend lately. Should we start the Microservices module?"</p>
            <div className="space-y-2">
              <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors">Yes, Start Now</button>
              <button className="w-full py-2 bg-white/10 text-white font-bold rounded-lg text-sm hover:bg-white/20 transition-colors">Maybe Later</button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
              Upcoming Assessments
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">2 pending</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-indigo-600">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Final Quiz: GraphQL</div>
                  <div className="text-[10px] text-slate-500">Due in 2 days</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-green-600">
                  <Award size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Project: Docker Compose</div>
                  <div className="text-[10px] text-slate-500">Submit by Sunday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
