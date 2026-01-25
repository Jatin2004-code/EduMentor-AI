
import React from 'react';
import { UserRole } from '../../types';
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Mail } from 'lucide-react';

const UserManagement: React.FC = () => {
  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: UserRole.STUDENT, status: 'Active', joined: 'Oct 12, 2023' },
    { id: '2', name: 'Robert Smith', email: 'robert@nexus.ai', role: UserRole.INSTRUCTOR, status: 'Active', joined: 'Sep 05, 2023' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: UserRole.STUDENT, status: 'Suspended', joined: 'Jan 22, 2024' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@nexus.ai', role: UserRole.ADMIN, status: 'Active', joined: 'Aug 14, 2023' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">User Control</h1>
          <p className="text-slate-500 mt-1">Manage platform access, roles, and member status.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
          Invite New User
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search by name or email..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
          </div>
          <div className="text-xs text-slate-400 font-medium">Showing {users.length} users</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                        <img src={`https://picsum.photos/seed/${user.id}/100/100`} className="w-full h-full object-cover" alt={user.name} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tight ${
                      user.role === UserRole.ADMIN ? 'bg-amber-100 text-amber-700' : 
                      user.role === UserRole.INSTRUCTOR ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      user.status === 'Active' ? 'text-emerald-600' : 'text-rose-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{user.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Mail size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><UserCheck size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><UserX size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
