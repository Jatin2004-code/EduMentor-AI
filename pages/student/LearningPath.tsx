
import React from 'react';
import { Milestone, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const LearningPath: React.FC = () => {
  const steps = [
    { id: 1, title: 'Web Fundamentals', status: 'completed', topics: ['HTML/CSS', 'Basic JS', 'Responsive Design'] },
    { id: 2, title: 'React Core Concepts', status: 'current', topics: ['Hooks', 'Props/State', 'Components Architecture'] },
    { id: 3, title: 'Backend Masterclass', status: 'upcoming', topics: ['Node.js', 'PostgreSQL', 'Auth Strategies'] },
    { id: 4, title: 'AI Integration', status: 'upcoming', topics: ['Prompt Engineering', 'Gemini API', 'RAG Patterns'] },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">AI Learning Path</h1>
          <p className="text-slate-500 mt-1">Dynamically generated based on your goals and performance.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Refresh Path</button>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-200"></div>

        <div className="space-y-12 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-50 shadow-sm flex-shrink-0 ${
                step.status === 'completed' ? 'bg-emerald-500 text-white' :
                step.status === 'current' ? 'bg-blue-600 text-white animate-pulse' : 'bg-white text-slate-300 border-slate-200'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 size={24} /> : 
                 step.status === 'current' ? <Milestone size={24} /> : <Circle size={24} />}
              </div>
              
              <div className={`flex-1 bg-white border rounded-2xl p-6 transition-all ${
                step.status === 'current' ? 'border-blue-500 shadow-xl shadow-blue-900/5 ring-4 ring-blue-50' : 'border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h3>
                  {step.status === 'current' && (
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                      Resume Now <ArrowRight size={14} />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {step.topics.map((topic, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      step.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                      step.status === 'current' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
