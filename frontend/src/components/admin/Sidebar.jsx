import React from 'react';
import { LayoutDashboard, Utensils, ClipboardList, Users, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'add-food', label: 'Add Food', icon: <Utensils size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-[#FAF6E9] border-r border-[#DDEB9D] flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="mb-10 px-2">
        <img src="/goforfood.png" alt="Go4Food Logo" className="h-12 w-auto object-contain" />
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-[#A0C878] text-[#FFFDF6] shadow-md scale-105' 
              : 'text-gray-600 hover:bg-[#DDEB9D] hover:text-gray-900'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all mt-auto">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;