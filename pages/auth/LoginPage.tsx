
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { authLogin } from '../../services/authApi';
import { Shield, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  role: UserRole;
  onSuccess: (user: any, token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ role, onSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleColors = {
    [UserRole.STUDENT]: 'blue',
    [UserRole.INSTRUCTOR]: 'emerald',
    [UserRole.ADMIN]: 'amber'
  };

  const accentColor = roleColors[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authLogin(email, password, role);
      onSuccess(data.user, data.token);
      
      // Redirect based on strict role requirements
      if (role === UserRole.STUDENT) navigate('/student/dashboard');
      else if (role === UserRole.INSTRUCTOR) navigate('/instructor/dashboard');
      else if (role === UserRole.ADMIN) navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative font-poppins">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${accentColor}-600 rounded-full blur-[128px]`}></div>
      </div>

      <div className="max-w-md w-full glass border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className={`w-16 h-16 bg-${accentColor}-500/10 rounded-2xl flex items-center justify-center text-${accentColor}-500 mx-auto mb-6 border border-${accentColor}-500/20 shadow-lg shadow-${accentColor}-500/10`}>
            <Shield size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {role.charAt(0) + role.slice(1).toLowerCase()} Access
          </h1>
          <p className="text-slate-400 mt-2 text-sm uppercase font-black tracking-widest text-[10px]">Secure login to EduMentor AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-black uppercase">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Identity (Email)</label>
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
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Credentials (Password)</label>
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
            className={`w-full py-5 bg-${accentColor}-600 hover:bg-${accentColor}-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-xl shadow-${accentColor}-900/40 flex items-center justify-center gap-2 group mt-8`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Enter Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {role !== UserRole.ADMIN && (
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              New to EduMentor? {' '}
              <Link to={`/${role.toLowerCase()}/signup`} className={`text-${accentColor}-400 hover:underline`}>
                Create Account
              </Link>
            </p>
          </div>
        )}
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <Link to="/" className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] hover:text-white transition-colors">
            ← Main Landing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
