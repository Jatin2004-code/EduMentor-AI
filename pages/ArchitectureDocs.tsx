
import React from 'react';
import { Cpu, Server, Shield, Database, Users, Code, Cloud, Zap } from 'lucide-react';

const ArchitectureDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-700 pb-20">
      <header className="text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">EduMentor AI System Architecture</h1>
        <p className="text-slate-500 text-lg">A production-grade design for a multi-tenant, role-based EdTech platform.</p>
      </header>

      {/* 1. High-Level Architecture */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Server size={24} /></div>
          <h2 className="text-2xl font-bold text-slate-900">1. High-Level System Design</h2>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-8 overflow-x-auto shadow-sm">
          <div className="min-w-[800px] flex flex-col gap-8 items-center">
            <div className="grid grid-cols-3 gap-12 w-full">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Client Tier</div>
                <div className="flex justify-center gap-4">
                  <div className="p-2 bg-white rounded shadow-sm text-[10px] font-bold">Student App</div>
                  <div className="p-2 bg-white rounded shadow-sm text-[10px] font-bold">Instructor App</div>
                  <div className="p-2 bg-white rounded shadow-sm text-[10px] font-bold">Admin Portal</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="h-0.5 flex-1 bg-slate-200 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-200 rotate-45 border-t border-r border-slate-400"></div>
                  <div className="absolute top-0 -translate-y-full w-full text-center text-[10px] text-slate-400 font-mono pb-2">HTTPS / WSS / gRPC</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-xl p-6 w-1/2 text-center shadow-xl shadow-blue-600/20">
              <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">API Gateway & Load Balancer</div>
              <div className="font-mono text-sm">Auth Middleware | Rate Limiting | Routing</div>
            </div>

            <div className="grid grid-cols-4 gap-4 w-full">
              {[
                { name: 'Auth Service', tech: 'Identity/RBAC' },
                { name: 'LMS Engine', tech: 'Course/Lesson' },
                { name: 'AI Service', tech: 'Gemini Engine' },
                { name: 'Analytics', tech: 'Event Pipeline' }
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-xs font-black text-blue-600 mb-1 uppercase tracking-tighter">{s.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{s.tech}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-12 w-3/4">
               <div className="bg-slate-900 text-white rounded-xl p-6 text-center">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Relational Core</div>
                  <div className="font-bold flex items-center justify-center gap-2"><Database size={14}/> PostgreSQL</div>
                  <div className="text-[10px] text-slate-400 mt-2">Users, Courses, Orders, RBAC</div>
               </div>
               <div className="bg-slate-900 text-white rounded-xl p-6 text-center">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Unstructured/Logs</div>
                  <div className="font-bold flex items-center justify-center gap-2"><Database size={14}/> MongoDB</div>
                  <div className="text-[10px] text-slate-400 mt-2">Learning Events, AI Logs, Chat</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Role-Based Page Architecture */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-600" size={20} />
            <h3 className="font-bold text-slate-900">Student Architecture</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-sm shadow-sm">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Consumption & Progress</p>
            <ul className="space-y-2 font-medium text-slate-700">
               <li className="flex items-center gap-2">• <span className="text-blue-600">Adaptive Dashboard</span></li>
               <li className="flex items-center gap-2">• <span className="text-blue-600">AI Learning Path</span></li>
               <li className="flex items-center gap-2">• <span className="text-blue-600">VOD Lesson Player</span></li>
               <li className="flex items-center gap-2">• <span className="text-blue-600">Real-time Assessment</span></li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-emerald-600" size={20} />
            <h3 className="font-bold text-slate-900">Instructor Architecture</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-sm shadow-sm">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Content & Moderation</p>
            <ul className="space-y-2 font-medium text-slate-700">
               <li className="flex items-center gap-2">• <span className="text-emerald-600">Course CMS</span></li>
               <li className="flex items-center gap-2">• <span className="text-emerald-600">Student Analytics</span></li>
               <li className="flex items-center gap-2">• <span className="text-emerald-600">AI Grading Assistant</span></li>
               <li className="flex items-center gap-2">• <span className="text-emerald-600">Q&A Management</span></li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-amber-600" size={20} />
            <h3 className="font-bold text-slate-900">Admin Architecture</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-sm shadow-sm">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Policy & Economics</p>
            <ul className="space-y-2 font-medium text-slate-700">
               <li className="flex items-center gap-2">• <span className="text-amber-600">Global RBAC Console</span></li>
               <li className="flex items-center gap-2">• <span className="text-amber-600">Revenue/Tax Reporting</span></li>
               <li className="flex items-center gap-2">• <span className="text-amber-600">System Monitoring</span></li>
               <li className="flex items-center gap-2">• <span className="text-amber-600">Platform Settings</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. AI Integration Strategy */}
      <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Cpu size={200} />
        </div>
        
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6 border border-white/5">
            <Cpu size={14} /> Intelligence Layer
          </div>
          <h2 className="text-3xl font-black mb-6 tracking-tight">EduMentor AI Core</h2>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed">AI is integrated into the application lifecycle via a microservices pattern, ensuring high availability and separation of concerns.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
                <Code size={16} /> Skill Assessments
              </h4>
              <p className="text-sm text-slate-400">Dynamically generates quizzes based on current student performance gaps identified in the LMS.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
                <Cloud size={16} /> Content Generation
              </h4>
              <p className="text-sm text-slate-400">Assists instructors in generating course outlines, summaries, and closed-captioning for videos.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
                <Shield size={16} /> Plagiarism Detection
              </h4>
              <p className="text-sm text-slate-400">Analyzes student submissions against public datasets and internal cohort repositories.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
                <Zap size={16} /> 24/7 AI Tutor
              </h4>
              <p className="text-sm text-slate-400">Instant Q&A based on the specific lesson context using retrieval-augmented generation (RAG).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Security Flow */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Shield size={24} /></div>
          <h2 className="text-2xl font-bold text-slate-900">4. Security & Role Enforcement</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-tighter">Strict RBAC Strategy</h4>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-lg">
                  <div className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-1">JWT + OAuth 2.0</div>
                  <p className="text-xs text-slate-500 mt-1">Authentication state is stored in httpOnly cookies. Access tokens contain the `role` claim to prevent client-side role manipulation.</p>
                </div>
                <div className="p-4 bg-slate-50 border-l-4 border-emerald-600 rounded-r-lg">
                  <div className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-1">API Middleware Verification</div>
                  <p className="text-xs text-slate-500 mt-1">Every backend route is wrapped in an authorization middleware: `authorize(['INSTRUCTOR', 'ADMIN'])`.</p>
                </div>
                <div className="p-4 bg-slate-50 border-l-4 border-amber-600 rounded-r-lg">
                  <div className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-1">React Guard Components</div>
                  <p className="text-xs text-slate-500 mt-1">UI components are conditionally rendered based on role. Unauthorized URL access triggers an immediate session kill and redirect.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[11px] text-slate-400 border border-white/5">
              <div className="text-slate-500 mb-4">// Role Enforcement Logic</div>
              <div className="text-blue-400">const</div> <span className="text-slate-200">CheckAccess</span> = (user, requiredRole) =&gt; &#123; <br/>
              &nbsp;&nbsp;<div className="text-blue-400 inline">if</div> (user.role !== requiredRole) &#123; <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-400">console.error</span>(<span className="text-emerald-400">`Access Denied`</span>); <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-blue-400 inline">return</div> <span className="text-slate-500">&lt;Navigate to="/" /&gt;</span>; <br/>
              &nbsp;&nbsp;&#125; <br/>
              &nbsp;&nbsp;<div className="text-blue-400 inline">return</div> <span className="text-slate-200">children</span>; <br/>
              &#125;; <br/><br/>
              <div className="text-slate-500 mb-4">// API Route Level</div>
              <span className="text-slate-500">app.post</span>(<span className="text-emerald-400">"/api/v1/courses"</span>, <span className="text-blue-400">requireAuth</span>, <span className="text-blue-400">requireRole</span>(<span className="text-emerald-400">'INSTRUCTOR'</span>), (req, res) =&gt; &#123; <br/>
              &nbsp;&nbsp;<span className="text-slate-500">// logic</span> <br/>
              &#125;);
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitectureDocs;
