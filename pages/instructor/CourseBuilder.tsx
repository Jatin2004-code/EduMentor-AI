
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Save, 
  Layout, 
  Video, 
  FileText, 
  Sparkles, 
  Loader2, 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Settings,
  Clock,
  CheckCircle2,
  Play,
  BookOpen
} from 'lucide-react';
import { getPersonalizedLearningPath } from '../../services/geminiService';

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
  title: string;
  description: string;
  modules: Module[];
}

const CourseBuilder: React.FC = () => {
  // --- States ---
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [course, setCourse] = useState<CourseData>({
    title: '',
    description: '',
    modules: []
  });

  // Preview state (simulating Student CourseViewer state)
  const [activePreviewLesson, setActivePreviewLesson] = useState<Lesson | null>(null);

  // --- Handlers ---
  const addModule = () => {
    const newModule: Module = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Section',
      lessons: []
    };
    setCourse(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Lesson',
      type: 'video',
      duration: '5:00',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    };
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m)
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === moduleId ? {
        ...m,
        lessons: m.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l)
      } : m)
    }));
  };

  const updateModuleTitle = (moduleId: string, title: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === moduleId ? { ...m, title } : m)
    }));
  };

  const removeModule = (moduleId: string) => {
    setCourse(prev => ({ ...prev, modules: prev.modules.filter(m => m.id !== moduleId) }));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === moduleId ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } : m)
    }));
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const newModules = [...course.modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newModules.length) return;
    [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
    setCourse(prev => ({ ...prev, modules: newModules }));
  };

  const moveLesson = (moduleId: string, lessonIndex: number, direction: 'up' | 'down') => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id !== moduleId) return m;
        const newLessons = [...m.lessons];
        const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
        if (targetIndex < 0 || targetIndex >= newLessons.length) return m;
        [newLessons[lessonIndex], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[lessonIndex]];
        return { ...m, lessons: newLessons };
      })
    }));
  };

  const handleGenerateOutline = async () => {
    if (!course.title) return alert('Please enter a course title first');
    setIsGenerating(true);
    try {
      const path = await getPersonalizedLearningPath(`Course about ${course.title}`, ['modern industry standards', 'practical implementation']);
      const formattedModules = path.weeks.map((w: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: w.topic,
        lessons: w.objectives.map((obj: string) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: obj,
          type: 'video',
          duration: '10:00',
          contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }))
      }));
      setCourse(prev => ({ ...prev, modules: formattedModules }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Rendering Functions ---

  if (isPreviewMode) {
    const allPreviewLessons = course.modules.flatMap(m => m.lessons);
    const currentLesson = activePreviewLesson || allPreviewLessons[0];

    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col z-50">
        <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPreviewMode(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold">
              <EyeOff size={18} /> Exit Preview
            </button>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <div>
              <h1 className="text-sm font-bold truncate max-w-xs">{course.title || 'Untitled Course'}</h1>
              <p className="text-[10px] text-slate-400 font-medium">{currentLesson?.title || 'No Lesson Selected'}</p>
            </div>
          </div>
          <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            Instructor View: Live Preview
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-slate-950 flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                {currentLesson?.type === 'video' ? (
                  <video key={currentLesson.contentUrl} controls autoPlay className="w-full h-full object-contain">
                    <source src={currentLesson.contentUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full bg-slate-50 p-12 overflow-y-auto text-slate-800">
                    <div className="max-w-2xl mx-auto space-y-6">
                      <h2 className="text-3xl font-black text-slate-900">{currentLesson?.title}</h2>
                      <p className="text-lg leading-relaxed">{currentLesson?.textContent || 'No content provided for this text lesson.'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="w-80 border-l border-slate-200 bg-white flex flex-col hidden lg:flex">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Preview Curriculum</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {course.modules.map((module) => (
                <div key={module.id} className="border-b border-slate-50">
                  <div className="px-6 py-3 bg-slate-100/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.title}</div>
                  <div className="divide-y divide-slate-50">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActivePreviewLesson(lesson)}
                        className={`w-full flex items-start gap-4 p-4 text-left transition-all hover:bg-emerald-50/30 ${currentLesson?.id === lesson.id ? 'bg-emerald-50 border-r-4 border-emerald-600' : ''}`}
                      >
                        <div className={`mt-0.5 ${currentLesson?.id === lesson.id ? 'text-emerald-600' : 'text-slate-300'}`}>
                          {lesson.type === 'video' ? <Play size={18} /> : <FileText size={18} />}
                        </div>
                        <div className="text-xs font-bold leading-tight text-slate-700">{lesson.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-20">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Course Authoring</h1>
          <p className="text-slate-500 mt-1">Design your curriculum with precision and style.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsPreviewMode(true)}
            disabled={course.modules.length === 0}
            className="px-4 py-2.5 text-slate-600 font-bold text-sm border border-slate-200 rounded-xl hover:bg-white flex items-center gap-2 transition-all disabled:opacity-30"
          >
            <Eye size={18} /> Preview Course
          </button>
          <button className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 flex items-center gap-2 transition-all">
            <Save size={18} /> Save & Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata & Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings size={18} className="text-slate-400" /> Course Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Title</label>
                <input 
                  type="text" 
                  placeholder="Mastering UX Design"
                  value={course.title}
                  onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={4}
                  placeholder="What will students learn?"
                  value={course.description}
                  onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>
              <button 
                onClick={handleGenerateOutline}
                disabled={isGenerating}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-900/10 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                AI Curriculum Suggestion
              </button>
            </div>
          </div>

          <div className="bg-emerald-950 text-white rounded-2xl p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10"><BookOpen size={100} /></div>
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Pro Author Tip</h4>
              <p className="text-xs text-emerald-200 leading-relaxed">Try alternating between video and text lessons to keep student engagement high. Use AI to bridge gaps in your lesson descriptions.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Curriculum Builder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Course Curriculum</h2>
            <button 
              onClick={addModule}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 flex items-center gap-2 transition-all"
            >
              <PlusCircle size={16} className="text-emerald-500" /> Add Section
            </button>
          </div>

          {course.modules.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center bg-white/50">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                <Layout size={32} />
              </div>
              <h4 className="text-slate-900 font-bold">Your curriculum is empty</h4>
              <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">Start by adding your first section or use AI to generate a professional course skeleton.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {course.modules.map((module, mIdx) => (
                <div key={module.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group/mod">
                  {/* Module Header */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => moveModule(mIdx, 'up')} className="text-slate-300 hover:text-slate-600 disabled:opacity-0" disabled={mIdx === 0}><ChevronUp size={14} /></button>
                        <button onClick={() => moveModule(mIdx, 'down')} className="text-slate-300 hover:text-slate-600 disabled:opacity-0" disabled={mIdx === course.modules.length - 1}><ChevronDown size={14} /></button>
                      </div>
                      <input 
                        type="text" 
                        value={module.title}
                        onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                        className="bg-transparent font-black text-slate-900 focus:outline-none focus:ring-0 w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => addLesson(module.id)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Add Lesson"
                      >
                        <PlusCircle size={20} />
                      </button>
                      <button 
                        onClick={() => removeModule(module.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="p-2 space-y-2">
                    {module.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 group/item hover:border-emerald-200 hover:bg-white transition-all">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col gap-1 mt-1">
                            <button onClick={() => moveLesson(module.id, lIdx, 'up')} className="text-slate-300 hover:text-emerald-600" disabled={lIdx === 0}><ChevronUp size={12} /></button>
                            <button onClick={() => moveLesson(module.id, lIdx, 'down')} className="text-slate-300 hover:text-emerald-600" disabled={lIdx === module.lessons.length - 1}><ChevronDown size={12} /></button>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <input 
                                type="text"
                                value={lesson.title}
                                placeholder="Lesson Title"
                                onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                                className="bg-transparent font-bold text-slate-800 focus:outline-none w-full border-b border-transparent focus:border-emerald-200"
                              />
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => updateLesson(module.id, lesson.id, { type: 'video' })}
                                  className={`p-1.5 rounded-lg transition-all ${lesson.type === 'video' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-100'}`}
                                >
                                  <Video size={16} />
                                </button>
                                <button 
                                  onClick={() => updateLesson(module.id, lesson.id, { type: 'text' })}
                                  className={`p-1.5 rounded-lg transition-all ${lesson.type === 'text' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-100'}`}
                                >
                                  <FileText size={16} />
                                </button>
                                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                                <button onClick={() => removeLesson(module.id, lesson.id)} className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg transition-all">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            {/* Type Specific Fields */}
                            {lesson.type === 'video' ? (
                              <div className="flex gap-4">
                                <div className="flex-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Video Source URL</label>
                                  <div className="relative">
                                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input 
                                      type="text"
                                      value={lesson.contentUrl}
                                      onChange={(e) => updateLesson(module.id, lesson.id, { contentUrl: e.target.value })}
                                      className="w-full bg-slate-100/50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                    />
                                  </div>
                                </div>
                                <div className="w-24">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Duration</label>
                                  <input 
                                    type="text"
                                    value={lesson.duration}
                                    placeholder="00:00"
                                    onChange={(e) => updateLesson(module.id, lesson.id, { duration: e.target.value })}
                                    className="w-full bg-slate-100/50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Lesson Content</label>
                                <textarea 
                                  value={lesson.textContent}
                                  placeholder="Enter lesson text or markdown here..."
                                  onChange={(e) => updateLesson(module.id, lesson.id, { textContent: e.target.value })}
                                  className="w-full bg-slate-100/50 border border-slate-200 rounded-lg p-3 text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none min-h-[100px] resize-y"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {module.lessons.length === 0 && (
                      <div className="p-8 text-center border border-dashed border-slate-100 rounded-xl">
                        <button 
                          onClick={() => addLesson(module.id)}
                          className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          + Click to add your first lesson
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;
