import React, { useState } from 'react';
import { LayoutDashboard, Utensils, ClipboardList, Users, Menu, X } from 'lucide-react';
import LogoutButton from '../LogoutButton';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'add-food', label: 'Add Food', icon: <Utensils size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsOpen(false); // Close sidebar after clicking on mobile
  };

  return (
    <>
      {/* Mobile Header Bar - Only visible on small screens */}
      <div className="lg:hidden w-full bg-[#FAF6E9] p-4 flex justify-between items-center border-b border-[#DDEB9D] fixed top-0 left-0 z-[60]">
        <img src="/goforfood.png" alt="Logo" className="h-8 w-auto" />
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Backdrop for mobile - Closes sidebar when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        w-64 h-screen bg-[#FAF6E9] border-r border-[#DDEB9D] flex flex-col p-6 fixed left-0 top-0 z-[58] transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        <div className="mb-10 px-2 hidden lg:block">
          <img src="/goforfood.png" alt="Go4Food Logo" className="h-12 w-auto object-contain" />
        </div>

        <nav className="flex-1 space-y-2 mt-16 lg:mt-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
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

        <LogoutButton />
      </div>
    </>
  );
};

export default Sidebar;