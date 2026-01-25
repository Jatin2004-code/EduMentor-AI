
import React from 'react';
import { 
  Bot, 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  BrainCircuit, 
  Zap, 
  Globe, 
  Users, 
  Milestone,
  CheckCircle2,
  Lock,
  Search,
  Database,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const FeaturesPage: React.FC = () => {
  const mainFeatures = [
    {
      icon: Bot,
      title: "24/7 AI Learning Tutor",
      desc: "Our resident AI understands your course context perfectly. Get instant hints, detailed explanations, and concept breakdowns whenever you're stuck.",
      color: "blue"
    },
    {
      icon: Milestone,
      title: "Adaptive Learning Paths",
      desc: "No more one-size-fits-all education. Our AI maps your skill gaps and builds a dynamic curriculum that evolves as you learn.",
      color: "indigo"
    },
    {
      icon: BarChart3,
      title: "Granular Analytics",
      desc: "Visual feedback for everyone. Students track mastery, instructors track engagement, and admins monitor global platform trends.",
      color: "emerald"
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Security",
      desc: "Enterprise-grade authorization ensuring that students, mentors, and administrators only access the features they're authorized for.",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-poppins relative overflow-hidden bg-mesh">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Header */}
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">
              The Platform Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Designed for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Future of Learning</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Explore the advanced technology stack powering millions of learning hours worldwide.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainFeatures.map((f, i) => (
              <div key={i} className="glass p-10 rounded-[40px] border border-white/5 hover:border-white/20 transition-all group shadow-2xl">
                <div className={`w-16 h-16 bg-${f.color}-500/10 rounded-2xl flex items-center justify-center text-${f.color}-400 mb-8 border border-${f.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Detailed Features List */}
          <section className="py-20 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-4xl font-black text-white">Full Stack Control</h2>
                <div className="space-y-6">
                  {[
                    { title: "Course CMS", desc: "Markdown-ready content management with AI assistance.", icon: Database },
                    { title: "Smart Quizzes", desc: "Auto-graded assessments with instant student feedback.", icon: Zap },
                    { title: "Global Sync", desc: "Seamlessly switch between devices without losing progress.", icon: Globe },
                    { title: "Secure Auth", desc: "JWT & OAuth integration for enterprise-grade logins.", icon: Lock }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <item.icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[40px] blur-3xl"></div>
                <div className="glass p-8 rounded-[40px] border border-white/10 relative z-10 space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-[10px] text-slate-500 ml-4 font-mono uppercase tracking-widest">Analytics.exe</span>
                  </div>
                  <div className="h-64 bg-slate-950/50 rounded-2xl border border-white/5 flex items-end justify-between p-6 gap-2">
                    {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500/20 border-t-2 border-blue-500 rounded-t-lg transition-all duration-1000 animate-in fade-in slide-in-from-bottom-full" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>Course Popularity</span>
                      <span className="text-blue-400">+24% Increase</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="glass rounded-[48px] p-12 md:p-20 text-center space-y-10 relative overflow-hidden border border-white/10 shadow-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none"></div>
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white">Ready to join the revolution?</h2>
              <p className="text-lg text-slate-400">Join thousands of students and mentors today.</p>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-started" className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 group">
                  Get Started Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/student/login" className="px-10 py-5 glass text-white rounded-2xl font-black text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3 border border-white/10">
                  Returning User
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
              <BrainCircuit size={18} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EduMentor AI</span>
          </div>
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
            © 2024 EduMentor AI • Premium EdTech Infrastructure
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;
