import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Soup, Clock, CheckCircle, ChefHat , House } from 'lucide-react';
import API from "../services/api";
import { useNavigate } from 'react-router-dom';
const Orders = () => {
  // Updated status palette to include your specific schema enum: "Preparing"
  const statusColors = {
    'Pending': 'bg-[#FAF6E9] text-[#689f38] border border-[#dcedc1]/50',
    'Preparing': 'bg-[#DDEB9D] text-gray-800 border border-[#a4d06a]',
    'Delivered': 'bg-[#689f38] text-white border border-[#a4d06a]',
  };
  const navigate= useNavigate()
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get('/orders/myorders');
      setOrders(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#FFFFFF] min-h-screen font-sans text-gray-800">
      
      {/* Header */}
      <header className="mb-10 flex justify-between items-center bg-[#FAF6E9] p-6 rounded-3xl shadow-lg border border-[#dcedc1]/50">
        <h1 className="text-4xl font-extrabold text-black tracking-tight">My Orders</h1>
        <button 
          className="flex-shrink-0 p-2 sm:p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-full transition-colors relative shadow-sm" 
          onClick={() => navigate('/home')}
        >
          <House className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>
      </header>

      {/* Main Orders List */}
      <div className="space-y-8">
        {orders.map((order) => {
          // Logic to handle nested orderItems from your schema
          const firstItem = order.orderItems[0]?.food?.name || "Dish";
          const totalItems = order.orderItems.length;
          
          return (
            <div key={order._id} className="bg-[#FAF6E9] p-8 rounded-[2rem] border border-[#dcedc1]/40 shadow-xl shadow-black/5 hover:border-[#a4d06a] transition-all">
              
              {/* Order Header */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#dcedc1]/60">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    Order <span className="font-extrabold text-[#a4d06a]">{order._id.slice(-6).toUpperCase()}</span>
                  </h2>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Method: {order.payment_method} | {order.payment_status}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-400">
                  {new Date(order.order_date).toLocaleDateString()}
                </span>
              </div>

              {/* Items and Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* Item Display */}
                <div className="flex items-center gap-5 md:col-span-1">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-[#dcedc1] shadow-inner text-[#a4d06a] p-3">
                    <Soup size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{firstItem}</h3>
                    <p className="text-xs text-gray-500">
                      {totalItems > 1 ? `and ${totalItems - 1} other items` : 'Single Item Order'}
                    </p>
                  </div>
                </div>

                {/* Price and Status */}
                <div className="flex items-center gap-6 justify-between md:col-span-2">
                  
                  {/* Schema mapping: total_amount */}
                  <div className="text-center">
                    <span className="text-3xl font-bold text-[#689f38]">₹{order.total_amount.toFixed(2)}</span>
                    <p className="text-xs text-gray-400 font-medium">Total Amount</p>
                  </div>

                  {/* Schema mapping: status */}
                  <span className={`inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-bold shadow-sm ${statusColors[order.status]}`}>
                    {order.status === 'Pending' && <Clock size={14} />}
                    {order.status === 'Preparing' && <ChefHat size={14} />}
                    {order.status === 'Delivered' && <CheckCircle size={14} />}
                    <span className="font-extrabold uppercase ml-1">{order.status}</span>
                  </span>
                  
                  <button className="p-3 bg-white border border-[#dcedc1] rounded-full text-[#689f38] hover:bg-[#a4d06a] hover:text-white transition-all shadow-sm">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {orders.length === 0 && (
          <div className="text-center py-24 bg-[#FAF6E9] border-2 border-dashed border-[#dcedc1] rounded-[2rem] text-gray-400 font-medium italic">
            You don't have any past orders yet. Time for your first order!
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;