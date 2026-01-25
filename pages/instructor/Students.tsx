
import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, MoreVertical, CheckCircle2, WifiOff, Clock } from 'lucide-react';
import { fetchWithAuth } from '../../services/apiClient';

const MOCK_STUDENT_PROGRESS = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@example.com', completion: 85, lastLesson: 'Advanced Hooks Deep Dive', lastActive: '2h ago' },
  { id: 's2', name: 'Marcus Miller', email: 'marcus@tech.io', completion: 42, lastLesson: 'Intro to React Architecture', lastActive: '5h ago' },
  { id: 's3', name: 'Elena Rodriguez', email: 'elena@edu.org', completion: 12, lastLesson: 'Environment Setup', lastActive: '1d ago' },
  { id: 's4', name: 'David Kim', email: 'dkim@dev.com', completion: 98, lastLesson: 'Performance Profiling', lastActive: '10m ago' },
  { id: 's5', name: 'Sarah Parker', email: 'sparker@gmail.com', completion: 65, lastLesson: 'Component Lifecycle', lastActive: '3h ago' },
];

const InstructorStudents: React.FC = () => {
  const [students, setStudents] = useState(MOCK_STUDENT_PROGRESS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        // We attempt to fetch for a default course or all instructor course progress
        // In this implementation, we try to fetch progress for a standard demo course ID
        const result = await fetchWithAuth<any>('/instructor/courses/1/progress');
        if (result && result.progressData) {
          const mapped = result.progressData.map((p: any) => ({
            id: p.studentId,
            name: `Student ${p.studentId.substring(0, 4)}`, // Name would usually be joined from User model
            email: 'student@nexusai.com',
            completion: Math.round((p.completionCount / 20) * 100), // Assuming 20 lessons total for calc
            lastLesson: p.lastAccessedLessonId || 'N/A',
            lastActive: new Date(p.updatedAt).toLocaleTimeString()
          }));
          setStudents(mapped);
          setIsLive(true);
        }
      } catch (err) {
        console.warn('[API] Students progress data unavailable. Using mock fallback.', err);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Roster</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Monitor individual learner performance across your courses.
            {!isLive && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 font-bold uppercase tracking-widest">
                <WifiOff size={10} /> Demo Data
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <Users size={18} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Enrolled</div>
              <div className="text-sm font-black text-slate-900">{students.length} Learners</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search students..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Completion</th>
                <th className="px-6 py-4">Last Lesson</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                        <img src={`https://picsum.photos/seed/${student.id}/100/100`} className="w-full h-full object-cover" alt={student.name} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.completion > 80 ? 'bg-emerald-500' : student.completion > 30 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                          style={{ width: `${student.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">{student.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600 truncate max-w-[200px]">
                    {student.lastLesson}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                    <Clock size={12} /> {student.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${
                      student.completion > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {student.completion > 70 ? 'Thriving' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorStudents;
