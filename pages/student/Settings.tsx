
import React, { useState } from 'react';
import { User } from '../../types';
// Fixed: Added AlertCircle to lucide-react imports
import { User as UserIcon, Lock, Bell, Sparkles, Shield, Save, Camera, Globe, AlertCircle } from 'lucide-react';

const SettingsPage: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 mt-1">Manage your identity, security, and learning preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'profile', label: 'My Profile', icon: UserIcon },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'notifications', label: 'Preferences', icon: Bell },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/10' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}

          <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={60} /></div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">NexusAI Pro</h4>
            <p className="text-[10px] text-slate-300 leading-relaxed mb-4">Your subscription is active until Oct 12, 2024.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase rounded-lg transition-colors border border-white/10">Manage Subscription</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                  <div className="relative group">
                    <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover" alt="Avatar" />
                    <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Camera size={24} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Personal Identity</h3>
                    <p className="text-sm text-slate-500">Update your public profile and avatar.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio / Introduction</label>
                    <textarea 
                      rows={3}
                      placeholder="Tell us a bit about your learning goals..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-500 flex items-center gap-2 transition-all shadow-md">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="pb-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Security Credentials</h3>
                  <p className="text-sm text-slate-500">Manage your password and active sessions.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                        <Shield size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Two-Factor Authentication</div>
                        <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 bg-white border border-slate-200 text-xs font-bold rounded-lg hover:bg-slate-50">Enable</button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button className="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 shadow-md">
                    Update Security
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="pb-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Platform Preferences</h3>
                  <p className="text-sm text-slate-500">Control how NexusAI communicates with you.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Course Updates', desc: 'New lessons, assignments, and curriculum changes.', icon: Globe },
                    { label: 'AI Tutor Alerts', desc: 'Personalized hints and performance analysis notifications.', icon: Sparkles },
                    { label: 'Platform Announcements', desc: 'Maintenance notices and system-wide news.', icon: AlertCircle },
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                          <pref.icon size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{pref.label}</div>
                          <p className="text-xs text-slate-500">{pref.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
