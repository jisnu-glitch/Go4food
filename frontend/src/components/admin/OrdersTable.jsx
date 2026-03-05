import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, CheckCircle, Clock, ChefHat } from 'lucide-react';
import API from "../../services/api";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all orders (Admin Endpoint)
  const fetchAllOrders = async () => {
    try {
      const res = await API.get('/orders'); // router.get("/", protect, isAdmin, getAllOrders)
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

  // 2. Update Order Status (Admin Endpoint)
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // router.put("/:id", protect, isAdmin, updateOrderStatus)
      await API.put(`/orders/${orderId}`, { status: newStatus });
      
      // Optimistic UI update or re-fetch
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
    <div className="p-8 bg-[#FFFDF6] min-h-screen ml-64 flex flex-col items-center">
      <header className="mb-10 w-full max-w-6xl flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Admin Dashboard: Orders</h1>
        <div className="bg-[#A0C878] text-white px-4 py-2 rounded-xl font-bold shadow-sm">
          Total: {orders.length}
        </div>
      </header>

      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl shadow-black/5 overflow-hidden border border-[#DDEB9D]/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF6E9]/50 border-b border-[#DDEB9D]/50">
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Order ID</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Customer</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Items</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Amount</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDEB9D]/30">
            {orders.map((order) => (
              <tr key={order._id} className="group hover:bg-[#FAF6E9]/30 transition-all">
                {/* Order ID & Date */}
                <td className="p-6">
                  <div className="font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(order.order_date).toLocaleDateString()}
                  </div>
                </td>

                {/* Populated User Details */}
                <td className="p-6">
                  <div className="font-semibold text-gray-700">{order.user?.name || "Deleted User"}</div>
                  <div className="text-xs text-gray-400">{order.user?.email}</div>
                </td>

                {/* Populated Food Details */}
                <td className="p-6">
                  <div className="text-sm text-gray-600">
                    {order.orderItems[0]?.food?.name || "Item"}
                    {order.orderItems.length > 1 && ` +${order.orderItems.length - 1} more`}
                  </div>
                </td>

                {/* Total Amount */}
                <td className="p-6 font-bold text-[#EF7822]">
                  ₹{order.total_amount.toFixed(2)}
                </td>

                {/* Current Status Badge */}
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-2 w-fit ${
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

                {/* Action: Status Switcher */}
                <td className="p-6 text-right">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="bg-gray-50 border border-[#DDEB9D] text-gray-700 text-xs rounded-lg focus:ring-[#A0C878] focus:border-[#A0C878] p-2 outline-none"
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
        
        {orders.length === 0 && (
          <div className="p-20 text-center text-gray-400 italic">
            No orders found in the system.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;