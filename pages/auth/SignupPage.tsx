
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { authSignup } from '../../services/authApi';
import { UserPlus, Mail, Lock, User as UserIcon, Loader2, ArrowRight } from 'lucide-react';

interface SignupPageProps {
  role: UserRole;
  onSuccess: (user: any, token: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ role, onSuccess }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accentColor = role === UserRole.STUDENT ? 'blue' : 'emerald';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authSignup(name, email, password, role);
      onSuccess(data.user, data.token);
      
      if (role === UserRole.STUDENT) navigate('/student/dashboard');
      else navigate('/instructor/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative font-poppins">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-${accentColor}-600 rounded-full blur-[128px]`}></div>
      </div>

      <div className="max-w-md w-full glass border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className={`w-16 h-16 bg-${accentColor}-500/10 rounded-2xl flex items-center justify-center text-${accentColor}-500 mx-auto mb-6 border border-${accentColor}-500/20 shadow-lg shadow-${accentColor}-500/10`}>
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            Join EduMentor
          </h1>
          <p className="text-slate-400 mt-2 text-[10px] font-black uppercase tracking-widest">Role: {role} Enrollment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Legal Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@edumentor.ai"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 bg-${accentColor}-600 hover:bg-${accentColor}-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-xl shadow-${accentColor}-900/40 flex items-center justify-center gap-2 group mt-6`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            Already registered? {' '}
            <Link to={`/${role.toLowerCase()}/login`} className={`text-${accentColor}-400 hover:underline`}>
              Log in instead
            </Link>
          </p>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <Link to="/" className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] hover:text-white transition-colors">
            ← Back to Landing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
