
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Clock, WifiOff, FileText, Layout } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { fetchWithAuth } from '../../services/apiClient';

const MOCK_ANALYTICS_STATS = {
  totalStudents: 1250,
  avgCompletion: 64,
  activeNow: 42,
  contentCoverage: 92,
  distribution: [
    { range: '0-20%', count: 120, color: '#f59e0b' },
    { range: '21-40%', count: 240, color: '#3b82f6' },
    { range: '41-60%', count: 310, color: '#6366f1' },
    { range: '61-80%', count: 420, color: '#8b5cf6' },
    { range: '81-100%', count: 160, color: '#10b981' },
  ],
  weeklyActivity: [
    { day: 'Mon', active: 320 },
    { day: 'Tue', active: 450 },
    { day: 'Wed', active: 410 },
    { day: 'Thu', active: 580 },
    { day: 'Fri', active: 390 },
    { day: 'Sat', active: 210 },
    { day: 'Sun', active: 180 },
  ]
};

const InstructorAnalytics: React.FC = () => {
  const [stats, setStats] = useState(MOCK_ANALYTICS_STATS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // Here we derive summary stats from the progress endpoint
        const result = await fetchWithAuth<any>('/instructor/courses/1/progress');
        if (result && result.studentCount !== undefined) {
          const rawData = result.progressData || [];
          const totalComp = rawData.reduce((acc: number, curr: any) => acc + (curr.completionCount || 0), 0);
          
          setStats(prev => ({
            ...prev,
            totalStudents: result.studentCount,
            avgCompletion: rawData.length > 0 ? Math.round((totalComp / (rawData.length * 20)) * 100) : 0,
          }));
          setIsLive(true);
        }
      } catch (err) {
        console.warn('[API] Aggregated analytics unavailable. Using mock stats.', err);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Course Intelligence</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Aggregated metrics to help you optimize your curriculum.
            {!isLive && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 font-bold uppercase tracking-widest">
                <WifiOff size={10} /> Demo Data
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Enrolled', val: stats.totalStudents, icon: Users, color: 'blue' },
          { label: 'Avg. Progress', val: `${stats.avgCompletion}%`, icon: TrendingUp, color: 'emerald' },
          { label: 'Learning Today', val: stats.activeNow, icon: Clock, color: 'amber' },
          { label: 'Content Health', val: `${stats.contentCoverage}%`, icon: FileText, color: 'indigo' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 bg-${kpi.color}-50 text-${kpi.color}-600 rounded-xl flex items-center justify-center mb-4`}>
              <kpi.icon size={22} />
            </div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{kpi.label}</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{kpi.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Layout size={20} className="text-blue-600" /> Weekly Engagement
            </h3>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Active Learners per Day</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.weeklyActivity}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" /> Progress Distribution
          </h3>
          <div className="h-[250px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.distribution} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {stats.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Growth Insight</div>
              <p className="text-xs text-slate-500 leading-relaxed">Most students are in the <strong>61-80%</strong> bracket. Consider releasing advanced Module 5 assessments soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAnalytics;
