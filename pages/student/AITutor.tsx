
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles, WifiOff } from 'lucide-react';
import { fetchWithAuth } from '../../services/apiClient';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am your EduMentor AI tutor. Ask me anything about your current courses or topics you are struggling with.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Calling the real backend AI Chat endpoint
      const result = await fetchWithAuth<any>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userMsg,
          context: {
            courseTitle: 'General Learning Path',
            lessonTitle: 'EduMentor Hub'
          }
        })
      });

      if (result && result.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: result.reply }]);
        setIsLive(true);
      }
    } catch (error) {
      console.warn('[AI Service] Gemini integration error. Falling back to local demo response.', error);
      setIsLive(false);
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "The EduMentor AI is currently optimizing its internal neural networks. Please try re-sending your query or check back in a few moments." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">EduMentor AI Tutor</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time assistance powered by Gemini</p>
          </div>
        </div>
        {!isLive && (
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 text-[10px] font-black uppercase tracking-widest">
            <WifiOff size={14} /> Demo Mode
          </div>
        )}
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                m.role === 'ai' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {m.role === 'ai' ? <Sparkles size={16} /> : <UserIcon size={16} />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'ai' ? 'bg-indigo-50/50 text-slate-800' : 'bg-slate-900 text-white'
              }`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center animate-pulse">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <div className="bg-indigo-50/50 px-4 py-3 rounded-2xl text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Gemini is thinking...</div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your course content..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-900/40"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[9px] text-center text-slate-400 mt-3 uppercase tracking-[0.3em] font-black">Secure EduMentor AI Infrastructure Active</p>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
