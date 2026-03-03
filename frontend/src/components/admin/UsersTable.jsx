import React from 'react';
import { Mail, ShieldCheck, User } from 'lucide-react';

const UsersTable = () => {
  const users = [
    { id: 'U-001', name: 'Jishnu Vijayan', email: 'jishnu@example.com', role: 'Admin', joined: 'Jan 2026' },
    { id: 'U-002', name: 'Sneha Rao', email: 'sneha@example.com', role: 'User', joined: 'Feb 2026' },
  ];

  return (
    <div className="p-8 bg-[#FFFDF6] min-h-screen ml-64 flex flex-col items-center">
      <header className="mb-10 w-full max-w-5xl flex justify-between items-center text-white">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-white/70 text-sm mt-1">Manage all registered accounts</p>
        </div>
        <button className="bg-white text-[#EF7822] px-6 py-2.5 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform">
          Invite User
        </button>
      </header>

      <div className="w-full max-w-5xl bg-[#FFFDF6] rounded-[2.5rem] p-4 shadow-2xl shadow-black/10">
        <div className="overflow-hidden rounded-[2rem]">
          <table className="w-full text-left">
            <thead className="bg-[#FAF6E9] text-gray-400">
              <tr>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Identity</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-center">Contact</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Privilege</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-right">Registration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/80 transition-all cursor-default">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-[#DDEB9D]/30 rounded-2xl flex items-center justify-center text-[#A0C878]">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400 font-medium">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EF7822] transition-colors font-medium">
                      <Mail size={16} />
                      <span className="text-sm">Email</span>
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[11px] font-bold tracking-tight ${
                      user.role === 'Admin' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                    }`}>
                      <ShieldCheck size={12} />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-medium text-gray-400 text-sm">
                    {user.joined}
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

export default UsersTable;