import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, User, Loader2 } from 'lucide-react';
import API from "../../services/api";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users'); 
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF6]">
        <Loader2 className="animate-spin text-[#A0C878]" size={48} />
      </div>
    );
  }

  return (
    /* RESPONSIVE FIX: 
       - lg:ml-64 only shifts content when sidebar is visible on desktop
       - p-4 on mobile, p-8 on larger screens
    */
    <div className=" md:p-8 bg-[#FFFDF6] min-h-screen  flex flex-col items-center">
      
      {/* Header: Adjusted spacing for mobile header bar */}
      <header className="mb-6 md:mb-10 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">Community</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all {users.length} registered accounts</p>
        </div>
      </header>

      {/* Table Container: Horizontal scrolling enabled for small screens */}
      <div className="w-full max-w-5xl bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl shadow-black/5 border border-[#DDEB9D]/30 overflow-hidden">
        <div className="overflow-x-auto rounded-[1.2rem] md:rounded-[2rem]">
          <table className="w-full text-left min-w-[600px]"> {/* min-w prevents columns from squishing too much */}
            <thead className="bg-[#FAF6E9] text-gray-400">
              <tr>
                <th className="px-4 md:px-8 py-4 md:py-5 text-xs font-bold uppercase tracking-widest">Identity</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-xs font-bold uppercase tracking-widest text-center">Contact</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-xs font-bold uppercase tracking-widest text-center">Privilege</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-xs font-bold uppercase tracking-widest text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/80 transition-all cursor-default group">
                  <td className="px-4 md:px-8 py-4 md:py-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#DDEB9D]/30 rounded-xl md:rounded-2xl flex items-center justify-center text-[#A0C878] group-hover:bg-[#A0C878] group-hover:text-white transition-colors">
                        <User size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 text-sm md:text-base truncate max-w-[120px] md:max-w-none">{user.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono uppercase">ID: {user._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                    <a 
                      href={`mailto:${user.email}`}
                      className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EF7822] transition-colors font-medium"
                    >
                      <Mail size={16} />
                      <span className="text-xs md:text-sm hidden sm:inline">{user.email}</span>
                      <span className="text-xs md:text-sm sm:hidden">Email</span>
                    </a>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                    <div className={`inline-flex items-center gap-2 px-2 md:px-3 py-1 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-bold tracking-tight uppercase ${
                      user.role === 'admin' 
                        ? 'bg-red-50 text-red-500' 
                        : user.role === 'seller' 
                        ? 'bg-orange-50 text-[#EF7822]' 
                        : 'bg-blue-50 text-blue-500'
                    }`}>
                      <ShieldCheck size={12} className="hidden xs:block" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-right font-medium text-gray-400 text-xs md:text-sm whitespace-nowrap">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="py-20 text-center text-gray-400 italic">
              No registered users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;