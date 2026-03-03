import React from 'react';
import { MoreVertical, ExternalLink } from 'lucide-react';

const OrdersTable = () => {
  const orders = [
    { id: '#ORD-772', user: 'Jishnu Vijayan', total: '₹450', status: 'Pending', time: '12:30 PM' },
    { id: '#ORD-771', user: 'Rahul K.', total: '₹890', status: 'Delivered', time: '11:15 AM' },
  ];

  return (
    <div className="p-8 bg-[#FFFDF6] min-h-screen ml-64 flex flex-col items-center">
      <header className="mb-10 w-full max-w-5xl flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Orders</h1>
        <div className="flex gap-3">
          <button className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all">
            Filter
          </button>
        </div>
      </header>

      <div className="w-full max-w-5xl bg-[#FFFDF6] rounded-[2rem] shadow-2xl shadow-black/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Order Detail</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Customer</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Amount</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-[#FAF6E9]/50 transition-all">
                <td className="p-6">
                  <div className="font-bold text-gray-800">{order.id}</div>
                  <div className="text-xs text-gray-400">{order.time}</div>
                </td>
                <td className="p-6 font-semibold text-gray-700">{order.user}</td>
                <td className="p-6 font-bold text-[#EF7822]">{order.total}</td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                    order.status === 'Pending' 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-green-100 text-[#A0C878]'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
                    <ExternalLink size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;