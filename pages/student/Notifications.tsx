
import React, { useState } from 'react';
import { Bell, BookOpen, Sparkles, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'course' | 'ai' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'course',
    title: 'New Lesson Released!',
    message: 'Module 5: Advanced Optimization is now available in "Advanced React Design Patterns".',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'ai',
    title: 'AI Tutor Analysis Complete',
    message: 'Your recent quiz performance in GraphQL has been analyzed. Check your updated learning path.',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'system',
    title: 'Subscription Renewed',
    message: 'Your NexusAI Pro subscription has been successfully renewed for the next month.',
    time: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'course',
    title: 'Course Completed',
    message: 'Congratulations! You have successfully completed "Introduction to GraphQL". Your certificate is ready.',
    time: '3 days ago',
    read: true
  }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="text-blue-600" size={18} />;
      case 'ai': return <Sparkles className="text-indigo-600" size={18} />;
      case 'system': return <AlertCircle className="text-amber-600" size={18} />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with your courses and AI insights.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={markAllRead}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 flex items-center gap-2 transition-all shadow-sm"
          >
            <CheckCircle2 size={16} /> Mark all read
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {notifications.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell size={32} />
            </div>
            <h3 className="font-bold text-slate-900">All caught up!</h3>
            <p className="text-slate-500 text-sm mt-1">No new notifications to show.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-6 flex items-start gap-4 transition-colors hover:bg-slate-50 group ${!n.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === 'course' ? 'bg-blue-50' : 
                  n.type === 'ai' ? 'bg-indigo-50' : 'bg-amber-50'
                }`}>
                  {getIcon(n.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-bold ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</h4>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{n.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{n.message}</p>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteNotification(n.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
