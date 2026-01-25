import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Play, MoreVertical, WifiOff } from 'lucide-react';
import { fetchWithAuth } from '../../services/apiClient';

const MOCK_COURSES = [
  { id: '1', title: 'Advanced React Design Patterns', progress: 65, lessons: 24, lastAccessed: '2 hours ago', image: 'https://picsum.photos/seed/react/400/250' },
  { id: '2', title: 'System Design for Scalable Apps', progress: 12, lessons: 42, lastAccessed: '1 day ago', image: 'https://picsum.photos/seed/sys/400/250' },
  { id: '3', title: 'Introduction to GraphQL', progress: 100, lessons: 12, lastAccessed: 'Completed', image: 'https://picsum.photos/seed/gql/400/250' },
];

const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [isUsingLiveResource, setIsUsingLiveResource] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const result = await fetchWithAuth<any>('/courses');
        if (result.courses && result.courses.length > 0) {
          // Map backend Course model to UI expected shape
          const mapped = result.courses.map((c: any) => ({
            id: c._id,
            title: c.title,
            progress: 0, // In real app, this would be joined with Progress model
            lessons: 0, // Would count modules/lessons if populated
            lastAccessed: new Date(c.updatedAt).toLocaleDateString(),
            image: `https://picsum.photos/seed/${c._id}/400/250`
          }));
          setCourses(mapped);
          setIsUsingLiveResource(true);
        }
      } catch (err) {
        console.warn('[API] Course list unavailable, falling back to mock data.', err);
      }
    };

    loadCourses();
  }, []);

  const handleResume = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">My Courses</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Pick up where you left off or start something new.
            {!isUsingLiveResource && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 font-bold uppercase">
                <WifiOff size={10} /> Demo Data
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-xl transition-all">
            <div className="h-48 relative overflow-hidden">
              <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleResume(course.id)} className="bg-blue-600 text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                  <Play size={20} fill="white" />
                </button>
              </div>
              {course.progress === 100 && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded">Completed</div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <BookOpen size={12} /> {course.lessons} Lessons
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1">{course.title}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-900 font-bold">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock size={12} /> {course.lastAccessed}
                </div>
                <button 
                  onClick={() => handleResume(course.id)}
                  className="text-blue-600 text-xs font-bold hover:underline"
                >
                  {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
