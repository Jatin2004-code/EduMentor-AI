
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Play, 
  FileText, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  ArrowLeft,
  Settings,
  Sparkles,
  Send,
  Bot,
  Loader2,
  BookOpen,
  WifiOff
} from 'lucide-react';
import { fetchWithAuth } from '../../services/apiClient';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text';
  duration?: string;
  contentUrl?: string;
  textContent?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  modules: Module[];
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const MOCK_COURSE_DATA: CourseData = {
  id: '1',
  title: 'Advanced React Design Patterns',
  modules: [
    {
      id: 'm1',
      title: 'Module 1: Advanced Hooks',
      lessons: [
        { id: 'l1', title: 'Deep Dive into useMemo & useCallback', type: 'video', duration: '12:45', contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { id: 'l2', title: 'Custom Hooks for Form Logic', type: 'text', textContent: 'In this lesson, we explore how to abstract complex form logic into reusable custom hooks. This patterns allows for cleaner components and better testability...' },
        { id: 'l3', title: 'Performance Optimization Patterns', type: 'video', duration: '18:20', contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Higher Order Components',
      lessons: [
        { id: 'l4', title: 'Understanding HOC Architecture', type: 'video', duration: '15:10', contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'l5', title: 'Common Pitfalls and Best Practices', type: 'text', textContent: 'When using HOCs, it is important to wrap the display name and pass through all props that do not relate to the specific concern of the HOC...' },
      ]
    }
  ]
};

const CourseViewer: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const chatScrollRef = useRef<HTMLDivElement>(null);
  
  const [course, setCourse] = useState<CourseData>(MOCK_COURSE_DATA);
  const [activeLesson, setActiveLesson] = useState<Lesson>(MOCK_COURSE_DATA.modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'curriculum' | 'ai'>('curriculum');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const courseRes = await fetchWithAuth<any>(`/courses/${courseId}`);
        if (courseRes) {
          const mappedCourse: CourseData = {
            id: courseRes._id,
            title: courseRes.title,
            modules: courseRes.modules.map((m: any) => ({
              id: m._id,
              title: m.title,
              lessons: m.lessons.map((l: any) => ({
                id: l._id,
                title: l.title,
                type: l.type as 'video' | 'text',
                duration: `${l.duration}:00`,
                contentUrl: l.content.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                textContent: l.content.textContent
              }))
            }))
          };
          setCourse(mappedCourse);
          setActiveLesson(mappedCourse.modules[0].lessons[0]);
          setIsLive(true);
        }

        const progressRes = await fetchWithAuth<any>(`/progress/${courseId}`);
        if (progressRes && progressRes.completedLessonIds) {
          setCompletedLessons(new Set(progressRes.completedLessonIds));
        }
      } catch (err) {
        console.warn('[API] Failed to fetch live course/progress. Using fallbacks.', err);
      }
    };

    if (courseId && courseId !== '1') {
      loadData();
    }
  }, [courseId]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isAiLoading]);

  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons);
  const progressPercentage = Math.round((completedLessons.size / allLessons.length) * 100);

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const markComplete = async (id: string) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(id);
    setCompletedLessons(newCompleted);

    try {
      await fetchWithAuth('/progress', {
        method: 'POST',
        body: JSON.stringify({
          courseId,
          lessonId: id,
          isCompleted: true
        })
      });
    } catch (err) {
      console.warn('[API] Failed to sync progress to server.', err);
    }
  };

  const handleNext = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < allLessons.length - 1) {
      markComplete(activeLesson.id);
      setActiveLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  const handleSendMessage = async () => {
    const messageText = chatInput;
    if (!messageText.trim() || isAiLoading) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAiLoading(true);

    try {
      const result = await fetchWithAuth<any>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: messageText,
          context: {
            courseTitle: course.title,
            lessonTitle: activeLesson.title
          }
        })
      });
      
      if (result && result.reply) {
        const aiMessage: Message = { role: 'ai', text: result.reply };
        setChatMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('AI Backend Error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: "I'm having trouble connecting to EduMentor Gemini engine. Please try again in a moment." 
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col z-50 font-poppins">
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 border-b border-slate-800 shadow-2xl">
        <div className="flex items-center gap-4">
          <Link to="/courses" className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <div className="min-w-0">
            <h1 className="text-sm font-black truncate max-w-xs uppercase tracking-tight">{course.title}</h1>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest truncate flex items-center gap-2">
              {activeLesson.title}
              {!isLive && <span className="text-[8px] bg-slate-800 px-1 rounded border border-slate-700">Demo</span>}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Mastery: {progressPercentage}%</div>
            <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-700" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Sparkles size={14} /> Ask AI
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-slate-950 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/5">
              {activeLesson.type === 'video' ? (
                <video key={activeLesson.contentUrl} controls autoPlay className="w-full h-full object-contain">
                  <source src={activeLesson.contentUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full bg-slate-50 p-16 overflow-y-auto text-slate-800">
                  <div className="max-w-2xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      <FileText size={14} /> Reading Material
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 leading-tight">{activeLesson.title}</h2>
                    <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
                      <p>{activeLesson.textContent}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 px-12 py-6 flex items-center justify-between border-t border-white/5">
            <button 
              onClick={handlePrev}
              disabled={allLessons.findIndex(l => l.id === activeLesson.id) === 0}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white disabled:opacity-30 transition-colors uppercase text-[10px] font-black tracking-widest"
            >
              <ChevronLeft size={20} /> Previous
            </button>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => markComplete(activeLesson.id)}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  completedLessons.has(activeLesson.id) 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-900/20' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <CheckCircle2 size={18} />
                {completedLessons.has(activeLesson.id) ? 'Completed' : 'Mark as Done'}
              </button>
            </div>

            <button 
              onClick={handleNext}
              disabled={allLessons.findIndex(l => l.id === activeLesson.id) === allLessons.length - 1}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/40 disabled:opacity-30 transition-all group"
            >
              Next <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <aside className="w-80 border-l border-slate-200 bg-white flex flex-col hidden lg:flex relative shadow-2xl">
          <div className="flex border-b border-slate-100">
            <button onClick={() => setActiveTab('curriculum')} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'curriculum' ? 'text-blue-600 border-b-2 border-blue-600 bg-slate-50' : 'text-slate-400 hover:bg-slate-50'}`}>
              <BookOpen size={14} /> Curriculum
            </button>
            <button onClick={() => setActiveTab('ai')} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:bg-slate-50'}`}>
              <Sparkles size={14} /> AI Tutor
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col">
            {activeTab === 'curriculum' ? (
              <div className="flex-1">
                {course.modules.map((module) => (
                  <div key={module.id} className="border-b border-slate-50">
                    <div className="px-6 py-3 bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{module.title}</div>
                    <div className="divide-y divide-slate-50">
                      {module.lessons.map((lesson) => {
                        const isActive = activeLesson.id === lesson.id;
                        const isCompleted = completedLessons.has(lesson.id);
                        return (
                          <button key={lesson.id} onClick={() => handleLessonClick(lesson)} className={`w-full flex items-start gap-3 p-5 text-left transition-all hover:bg-blue-50/30 group ${isActive ? 'bg-blue-50 border-r-4 border-blue-600' : ''}`}>
                            <div className={`mt-0.5 flex-shrink-0 ${isCompleted ? 'text-emerald-500' : isActive ? 'text-blue-600' : 'text-slate-300'}`}>
                              {isCompleted ? <CheckCircle2 size={16} /> : lesson.type === 'video' ? <Play size={16} /> : <FileText size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-[11px] font-bold leading-tight ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>{lesson.title}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-full bg-indigo-50/10">
                <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-5 space-y-5">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-14 h-14 bg-white shadow-xl shadow-indigo-900/10 text-indigo-600 rounded-3xl flex items-center justify-center mb-6"><Bot size={28} /></div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">EduMentor AI Assistant</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tight">I'm monitoring your progress in <strong>{activeLesson.title}</strong>. How can I assist you today?</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[90%] p-4 rounded-3xl text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-indigo-100 text-slate-800 rounded-tl-none'}`}>
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                      </div>
                    ))
                  )}
                  {isAiLoading && (
                    <div className="flex items-start gap-3 animate-pulse">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><Loader2 size={14} className="animate-spin" /></div>
                      <div className="bg-white border border-indigo-100 p-4 rounded-3xl rounded-tl-none text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Analyzing context...</div>
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white border-t border-indigo-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                  <div className="relative">
                    <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask about this lesson..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                    <button onClick={() => handleSendMessage()} disabled={isAiLoading || !chatInput.trim()} className="absolute right-1.5 top-1.5 w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-500 disabled:opacity-30 transition-all shadow-lg shadow-indigo-900/20">
                      <Send size={16} />
                    </button>
                  </div>
                  <div className="mt-3 text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em]">Context: <strong>{activeLesson.title}</strong></div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseViewer;
