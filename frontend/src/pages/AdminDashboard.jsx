import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AddFood from '../components/admin/AddFood';
import OrdersTable from '../components/admin/OrdersTable';
import UsersTable from '../components/admin/UsersTable'; // Create this similarly to Orders

const AdminDashboard = () => {
  // Use state to track which "page" or "tab" is active
  const [activeTab, setActiveTab] = useState('dashboard');

  // This function decides which component to render in the main area
  const renderContent = () => {
    switch (activeTab) {
      case 'add-food':
        return <AddFood />;
      case 'orders':
        return <OrdersTable />;
      case 'users':
        return <UsersTable />;
      default:
        return (
          <div className="p-8 ml-64">
            <h1 className="text-3xl font-black uppercase">Welcome, Admin</h1>
            <p className="mt-4 text-gray-600">Select an option from the sidebar to manage your store.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      {/* The Sidebar stays visible at all times */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* The main content area changes dynamically */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;