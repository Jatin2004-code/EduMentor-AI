
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X, ArrowRight } from 'lucide-react';

const PublicNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Role Portals', path: '/get-started' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <BrainCircuit size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight text-glow-blue">EduMentor AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              to={link.path} 
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/student/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link 
            to="/get-started" 
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2 group"
          >
            Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#020617] border-b border-white/5 p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-bold text-slate-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <Link to="/student/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 text-slate-300 font-bold border border-white/5 rounded-xl">
              Login
            </Link>
            <Link to="/get-started" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl">
              Get Started Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
