
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Users, Shield, ArrowLeft, BrainCircuit, ArrowRight } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const GetStarted: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student Portal",
      description: "Join as a learner to explore personalized paths and master new skills with our 24/7 AI tutor.",
      icon: GraduationCap,
      path: "/student/login",
      color: "blue",
      cta: "Start Learning"
    },
    {
      title: "Instructor Hub",
      description: "Share your knowledge. Build AI-enhanced curriculums and monitor student progress in real-time.",
      icon: Users,
      path: "/instructor/login",
      color: "emerald",
      cta: "Start Teaching"
    },
    {
      title: "Admin Panel",
      description: "Manage platform policies, verify content, and oversee global performance and security.",
      icon: Shield,
      path: "/admin/login",
      color: "amber",
      cta: "Open Console"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-poppins relative overflow-hidden bg-mesh">
      <PublicNavbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 pt-32 pb-20">
        <div className="max-w-6xl w-full space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-[0.2em]">
              Select Your Portal
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Welcome to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">EduMentor Ecosystem</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Please select the role that matches your objectives to continue. 
              Each portal is secured with role-based access control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <div 
                key={i}
                className="group relative cursor-pointer"
                onClick={() => navigate(role.path)}
              >
                <div className={`absolute -inset-1 bg-gradient-to-b from-${role.color}-500 to-indigo-600 rounded-[40px] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`}></div>
                <div className="glass relative p-10 rounded-[40px] border border-white/5 group-hover:border-white/20 transition-all duration-500 h-full flex flex-col group-hover:-translate-y-3 shadow-2xl">
                  <div className={`w-16 h-16 bg-${role.color}-500/10 rounded-2xl flex items-center justify-center text-${role.color}-400 mb-8 border border-${role.color}-500/20 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-${role.color}-500/5`}>
                    <role.icon size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-glow-blue transition-all">{role.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-1">
                    {role.description}
                  </p>
                  <div className={`mt-auto flex items-center text-${role.color}-400 font-black text-xs uppercase tracking-[0.2em] gap-3`}>
                    {role.cta} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-10 px-6 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
          Secured by NexusAI Auth Guard System v5.2
        </p>
      </footer>
    </div>
  );
};

export default GetStarted;
