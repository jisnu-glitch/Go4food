import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AddFood from '../components/admin/AddFood';
import OrdersTable from '../components/admin/OrdersTable';
import UsersTable from '../components/admin/UsersTable';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    {/* IMPORTANT: Remove hardcoded 'ml-64' from inside your sub-components 
        (like OrdersTable.jsx) and let this container handle the spacing.
    */}
    const contentClasses = "p-4 md:p-8 pt-24 lg:pt-8 lg:ml-64 min-h-screen transition-all";

    switch (activeTab) {
      case 'add-food':
        return <div className={contentClasses}><AddFood /></div>;
      case 'orders':
        return <div className={contentClasses}><OrdersTable /></div>;
      case 'users':
        return <div className={contentClasses}><UsersTable /></div>;
      default:
        return (
          <div className={contentClasses}>
            <h1 className="text-2xl md:text-3xl font-black uppercase text-gray-800">Welcome, Admin</h1>
            <p className="mt-4 text-gray-600">Select an option from the sidebar to manage your store.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#FFFDF6] min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;