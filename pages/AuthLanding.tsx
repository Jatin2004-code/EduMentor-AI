
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  LayoutGrid, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  ChevronDown,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  CheckCircle2,
  Bot
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const AuthLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-poppins bg-mesh">
      <PublicNavbar />
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>

        <div className="max-w-5xl w-full z-10 space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000 mt-20">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative w-20 h-20 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-2xl">
                <BrainCircuit size={44} className="animate-float" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-tight">
              EduMentor <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 text-glow-blue">AI</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Personalized Learning. <span className="text-blue-400">Powered by AI.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The next generation of education is here. Adaptive learning paths, real-time AI tutoring, and enterprise-grade tools for instructors and administrators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              to="/get-started" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-900/40 flex items-center gap-3 group"
            >
              Get Started Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/features" 
              className="px-8 py-4 glass text-white rounded-2xl font-bold text-lg hover:bg-white/5 transition-all flex items-center gap-3 border border-white/10"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 cursor-pointer" onClick={() => document.getElementById('features')?.scrollIntoView()}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs">Innovation First</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Advanced Learning Technology</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Our platform integrates the latest AI models to provide an unparalleled educational experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Personalized Paths", desc: "AI analyzes your performance to create a custom learning road map.", color: "blue" },
              { icon: Bot, title: "24/7 AI Tutor", desc: "Get instant explanations and context-aware help on any lesson.", color: "indigo" },
              { icon: BarChart3, title: "Deep Analytics", desc: "Visualize progress with high-fidelity performance metrics.", color: "emerald" },
              { icon: ShieldCheck, title: "Role-Based Access", desc: "Dedicated portals for students, instructors, and global admins.", color: "amber" }
            ].map((f, i) => (
              <div key={i} className="glass p-8 rounded-[32px] hover:border-blue-500/50 transition-all group hover:-translate-y-2 border border-white/5 shadow-2xl">
                <div className={`w-14 h-14 rounded-2xl bg-${f.color}-500/10 flex items-center justify-center text-${f.color}-400 mb-6 group-hover:scale-110 transition-transform border border-${f.color}-500/20`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Role-Based Value Section */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Value Column: Student */}
            <div className="space-y-8 glass p-10 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20"><GraduationCap size={24}/></div>
                <h3 className="text-2xl font-black text-white">For Students</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Self-paced adaptive learning modules",
                  "Instant AI concept explanations",
                  "Automatic progress syncing",
                  "Skill-based learning paths"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400">
                    <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Column: Instructor */}
            <div className="space-y-8 glass p-10 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20"><Users size={24}/></div>
                <h3 className="text-2xl font-black text-white">For Instructors</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "AI-assisted course curriculum builder",
                  "Real-time student progress tracking",
                  "Automated grading workflows",
                  "Integrated Q&A management hub"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Column: Admin */}
            <div className="space-y-8 glass p-10 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 border border-amber-500/20"><LayoutGrid size={24}/></div>
                <h3 className="text-2xl font-black text-white">For Admins</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Enterprise user management console",
                  "Platform-wide financial reporting",
                  "Global security & audit logs",
                  "Scalable infrastructure settings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400">
                    <CheckCircle2 size={18} className="text-amber-500 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white">The AI Learning Cycle</h2>
            <p className="text-slate-400 mt-4">Seamless, intelligent, and designed for mastery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-800 -translate-y-1/2 z-0"></div>

            {[
              { step: "01", title: "Join", icon: Users },
              { step: "02", title: "Assess", icon: Zap },
              { step: "03", title: "Adapt", icon: BrainCircuit },
              { step: "04", title: "Study", icon: BookOpen },
              { step: "05", title: "Master", icon: Star }
            ].map((s, i) => (
              <div key={i} className="relative z-10 text-center space-y-4 group">
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl group-hover:shadow-blue-600/20">
                  <s.icon size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.step}</div>
                  <h4 className="text-white font-bold">{s.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
              <BrainCircuit size={18} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EduMentor AI</span>
          </div>
          
          <div className="flex gap-12">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Product</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/get-started" className="hover:text-blue-400 transition-colors">Portals</Link></li>
                <li><Link to="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Company</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="text-right">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.3em] mb-2">Enterprise EdTech v5.2.0</p>
            <p className="text-slate-600 text-[10px]">© 2024 EduMentor AI Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLanding;
