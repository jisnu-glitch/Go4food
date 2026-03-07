import { useState } from "react";
import API from "../services/api";
import { X, MapPin, CreditCard, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function OrderDialog({ cartItems, totalAmount, onClose, onSuccess }) {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address.trim()) return alert("Please provide a delivery address");
    
    try {
      setLoading(true);
      await API.post("/orders", {
        address,
        payment_method: paymentMethod
      });
      onSuccess()
    } catch (err) {
      console.error("Order failed", err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-[#DDEB9D]/50 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 border-b border-[#DDEB9D]/30 flex justify-between items-center bg-[#FAF6E9]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#A0C878] rounded-xl text-white">
              <ShoppingBag size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Checkout</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          {/* Order Summary Preview */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 block">Review Items</label>
            <div className="space-y-3 bg-[#FAF6E9] p-4 rounded-2xl border border-[#DDEB9D]/30">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-700">{item.food_id?.name} <span className="text-gray-400 font-medium">x{item.quantity}</span></span>
                  <span className="font-black text-[#689f38]">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
              <div className="border-t border-[#DDEB9D] pt-3 flex justify-between items-center">
                <span className="font-black text-gray-900">Total Payable</span>
                <span className="text-xl font-black text-[#EF7822]">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Address Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <MapPin size={14} /> Delivery Address
            </label>
            <textarea
              className="w-full border-2 border-[#FAF6E9] bg-[#FAF6E9]/30 rounded-2xl p-4 focus:ring-2 focus:ring-[#A0C878] focus:bg-white outline-none transition-all resize-none text-gray-700 font-medium"
              rows="3"
              placeholder="Enter your full address (House No, Street, Landmark)..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <CreditCard size={14} /> Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["COD", "Online"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${
                    paymentMethod === method 
                    ? 'border-[#A0C878] bg-[#A0C878]/5 text-[#A0C878]' 
                    : 'border-[#FAF6E9] text-gray-400'
                  }`}
                >
                  {method === "COD" ? "Cash on Delivery" : "Online Payment"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-8 bg-[#FAF6E9]/50 border-t border-[#DDEB9D]/30 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="flex-[2] py-4 rounded-2xl bg-[#A0C878] text-white font-black shadow-lg shadow-[#A0C878]/30 hover:bg-[#8eb666] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm & Place Order"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderDialog;