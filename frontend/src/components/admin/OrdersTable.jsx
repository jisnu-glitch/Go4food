import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, CheckCircle, Clock, ChefHat } from 'lucide-react';
import API from "../../services/api";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const res = await API.get('/orders'); 
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert("Failed to update status");
      console.error(error);
    }
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
       - lg:ml-64 shifts content only on desktop to make room for Sidebar
       - p-4 on mobile, p-8 on larger screens
    */
    <div className="md:p-8 bg-[#FFFDF6] min-h-screen  flex flex-col items-center">
      
      {/* Header: Flexible layout for title and total count */}
      <header className="mb-6 md:mb-10 w-full max-w-6xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Admin Dashboard: Orders</h1>
        <div className="bg-[#A0C878] text-white px-4 py-2 rounded-xl font-bold shadow-sm text-sm">
          Total: {orders.length}
        </div>
      </header>

      {/* Table Container: Enabled horizontal scroll for narrow screens */}
      <div className="w-full max-w-6xl bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-black/5 border border-[#DDEB9D]/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]"> {/* min-w keeps columns legible on mobile */}
            <thead>
              <tr className="bg-[#FAF6E9]/50 border-b border-[#DDEB9D]/50">
                <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Order Detail</th>
                <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Customer</th>
                <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Items</th>
                <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Amount</th>
                <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDEB9D]/30">
              {orders.map((order) => (
                <tr key={order._id} className="group hover:bg-[#FAF6E9]/30 transition-all">
                  <td className="p-4 md:p-6">
                    <div className="font-bold text-gray-800 text-sm md:text-base uppercase tracking-tight">
                      #{order._id.slice(-6).toUpperCase()}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-400">
                      {new Date(order.order_date).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="p-4 md:p-6">
                    <div className="font-semibold text-gray-700 text-sm">{order.user?.name || "Deleted User"}</div>
                    <div className="text-[11px] text-gray-400 truncate max-w-[150px]">{order.user?.email}</div>
                  </td>

                  <td className="p-4 md:p-6">
                    <div className="text-xs md:text-sm text-gray-600">
                      {order.orderItems[0]?.food?.name || "Item"}
                      {order.orderItems.length > 1 && (
                        <span className="text-[#A0C878] font-bold block sm:inline"> +{order.orderItems.length - 1} more</span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 md:p-6 font-bold text-[#EF7822] text-sm md:text-base">
                    ₹{order.total_amount.toFixed(2)}
                  </td>

                  <td className="p-4 md:p-6">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-2 w-fit ${
                      order.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                      order.status === 'Preparing' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-[#A0C878]'
                    }`}>
                      {order.status === 'Pending' && <Clock size={12} />}
                      {order.status === 'Preparing' && <ChefHat size={12} />}
                      {order.status === 'Delivered' && <CheckCircle size={12} />}
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4 md:p-6 text-right">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className="bg-gray-50 border border-[#DDEB9D] text-gray-700 text-[10px] md:text-xs rounded-lg focus:ring-[#A0C878] focus:border-[#A0C878] p-2 outline-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {orders.length === 0 && (
          <div className="p-16 md:p-20 text-center text-gray-400 italic text-sm">
            No orders found in the system.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;