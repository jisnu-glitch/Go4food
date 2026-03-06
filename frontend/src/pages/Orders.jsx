import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, CheckCircle, ChefHat, House, Package, ChevronRight, Utensils } from 'lucide-react';
import API from "../services/api";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const statusColors = {
    'Pending': 'bg-orange-50 text-orange-600 border-orange-100',
    'Preparing': 'bg-blue-50 text-blue-600 border-blue-100',
    'Delivered': 'bg-[#A0C878]/10 text-[#689f38] border-[#A0C878]/20',
  };

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get('/orders/myorders');
      setOrders(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF6]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <ChefHat size={48} className="text-[#A0C878]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#FFFDF6] min-h-screen font-sans text-gray-800 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-12 flex justify-between items-center bg-white/70 backdrop-blur-lg p-6 rounded-[2.5rem] shadow-xl border border-[#DDEB9D]/50 sticky top-4 z-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#A0C878] rounded-2xl text-white shadow-lg">
            <Package size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">My Orders</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Past Adventures</p>
          </div>
        </div>
        <button onClick={() => navigate('/home')} className="p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-2xl transition-all">
          <House className="h-6 w-6 text-gray-700" />
        </button>
      </header>

      <div className="w-full max-w-5xl space-y-10">
        {orders.map((order, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={order._id} 
            className="bg-white p-6 md:p-10 rounded-[3.5rem] border border-[#DDEB9D]/40 shadow-2xl relative overflow-hidden group"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-100 gap-4">
              <div>
                <span className="text-[10px] font-black text-[#A0C878] uppercase tracking-[0.2em]">Order Verified</span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">#{order._id.slice(-6).toUpperCase()}</h2>
                <p className="text-sm font-bold text-gray-400">{new Date(order.order_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
              </div>
              <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black border uppercase tracking-widest shadow-sm ${statusColors[order.status]}`}>
                {order.status === 'Pending' && <Clock size={16} />}
                {order.status === 'Preparing' && <ChefHat size={16} />}
                {order.status === 'Delivered' && <CheckCircle size={16} />}
                {order.status}
              </div>
            </div>

            {/* Food Images Row - THE NEW ADVANCED PART */}
            <div className="mb-10">
              <div className="flex -space-x-4 overflow-hidden mb-4">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="relative group/img">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] border-4 border-white overflow-hidden shadow-xl transition-transform hover:-translate-y-2 hover:rotate-3 hover:z-50 bg-[#FAF6E9]">
                      {item.food?.image ? (
                        <img 
                          src={item.food.image} 
                          alt={item.food.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#A0C878]">
                          <Utensils size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {order.orderItems.length > 4 && (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] border-4 border-white bg-gray-900 text-white flex items-center justify-center text-xl font-black shadow-xl">
                        +{order.orderItems.length - 4}
                    </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {order.orderItems.map((item, i) => (
                    <span key={i} className="text-[11px] font-bold bg-[#FAF6E9] px-3 py-1 rounded-full text-gray-600 border border-[#DDEB9D]">
                        {item.quantity}x {item.food?.name}
                    </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: Price & Details */}
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Grand Total</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-[#EF7822]">₹</span>
                  <span className="text-4xl font-black text-[#EF7822]">{order.total_amount.toFixed(0)}</span>
                  <span className="text-sm font-bold text-gray-400">.{order.total_amount.toFixed(2).split('.')[1]}</span>
                </div>
              </div>
              
              <button className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-[2rem] font-black hover:bg-[#689f38] transition-all shadow-xl shadow-black/10 group/btn active:scale-95">
                Details <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;