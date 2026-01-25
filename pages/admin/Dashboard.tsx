
import React from 'react';
import { User } from '../../types';
import { ShieldCheck, Activity, DollarSign, Database, AlertCircle, CheckCircle2, UserCheck, Server } from 'lucide-react';

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Control Center</h1>
          <p className="text-slate-500 mt-1">Enterprise management console for EduMentor AI infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg text-xs font-bold uppercase tracking-wider">
            <UserCheck size={16} className="text-emerald-400" />
            Admin Verified: {user.name}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-xs font-black uppercase tracking-widest">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Mainframe Live
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
            <Database size={28} />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Storage Tier</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">4.2 TB</div>
            <div className="text-[10px] text-slate-500 mt-1 font-medium">AWS S3 • 82% utilized</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
            <DollarSign size={28} />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Gross Revenue</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">$248,500</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">+14.2% Growth</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100">
            <Activity size={28} />
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Active Load</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">18,920</div>
            <div className="text-[10px] text-slate-500 mt-1 font-medium">Concurrent Threads</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
               <ShieldCheck size={20} className="text-blue-600" /> Pending Governance
            </h3>
            <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest border border-blue-100 px-3 py-1 rounded-full bg-white transition-colors">
              Full Task Queue
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { type: 'Course Approval', title: 'Intro to Quantum Computing', author: 'Dr. Sarah Smith', date: '2h ago', risk: 'Low' },
              { type: 'Refund Request', title: 'Order #9283-A12', author: 'John Doe', date: '4h ago', risk: 'Med' },
              { type: 'Instructor Verification', title: 'New Onboarding: TechAcademy', author: 'KYC System', date: '1d ago', risk: 'Auto' },
            ].map((task, i) => (
              <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 group-hover:bg-white transition-colors">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-blue-600 uppercase tracking-tighter mb-0.5">{task.type}</div>
                    <div className="text-sm font-bold text-slate-900">{task.title}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-2">
                       By {task.author} • {task.date} • <span className="text-blue-400 font-bold">{task.risk} Risk</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"><CheckCircle2 size={18} /></button>
                   <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><AlertCircle size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[32px] p-8 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Server size={140} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border border-white/5">
              Infrastructure Status
            </div>
            <h3 className="text-2xl font-black mb-8 tracking-tight">Service Health Analytics</h3>
            <div className="space-y-6">
              {[
                { name: 'Core API Gateway', uptime: '99.99%', load: 24, status: 'stable' },
                { name: 'Gemini AI Inference', uptime: '100%', load: 12, status: 'stable' },
                { name: 'Global CDN (VOD)', uptime: '99.95%', load: 45, status: 'busy' },
                { name: 'Auth & Identity Hub', uptime: '99.99%', load: 8, status: 'stable' },
              ].map((service, i) => (
                <div key={i} className="space-y-2 group cursor-default">
                  <div className="flex justify-between text-xs items-center">
                    <span className="font-bold text-slate-300 flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${service.status === 'stable' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                       {service.name}
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px]">{service.uptime} Uptime</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${service.load > 80 ? 'bg-rose-500' : service.load > 40 ? 'bg-amber-500' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} 
                      style={{width: `${service.load}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all">
              Launch Kubernetes Monitor
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
