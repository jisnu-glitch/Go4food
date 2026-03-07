import React, { useState, useEffect } from "react";
import { House, ShoppingBag, Plus, Minus, ArrowRight, Trash2, Loader2, Utensils ,CheckCircle} from "lucide-react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import OrderDialog from "../components/OrderDialog";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog,setShowDialog]=useState(false)
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (food_id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.food_id._id !== food_id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.food_id._id === food_id ? { ...item, quantity: newQuantity } : item
        )
      );
    }

    try {
      await API.put("/cart/update", { food_id, quantity: newQuantity });
    } catch (err) {
      console.error(err);
      fetchCart(); // Revert on error
    }
  };

  const removeItem = async (food_id) => {
    try {
      setCartItems(prev => prev.filter(item => item.food_id._id !== food_id));
      await API.delete(`/cart/remove/${food_id}`);
    } catch (err) {
      console.error(err);
      fetchCart();
    }
  };

  // const placeOrder = async () => {
  //   try {
  //     await API.post('/orders');
  //     setCartItems([]);
  //     alert('Order placed successfully!');
  //     navigate('/orders');
  //   } catch (e) {
  //     console.error(e);
  //     alert('Failed to place order');
  //   }
  // };
  const handleOrderSuccess = () => {
    setShowDialog(false);
    setCartItems([]);
    // You can use your showToast here if integrated
    setSuccess(true);
    setTimeout(() => {
    setSuccess(false);
    navigate('/orders'); 
  }, 3000);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 0.0
  const tax = 0.0
  const total = subtotal + deliveryFee + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF6]">
        <Loader2 className="animate-spin text-[#A0C878]" size={48} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#FFFDF6] min-h-screen font-sans text-gray-800 flex flex-col items-center">
      
      {/* --- Advanced Header --- */}
      <header className="w-full max-w-6xl mb-10 flex justify-between items-center bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl shadow-black/5 border border-[#DDEB9D]/50 sticky top-4 z-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#A0C878] rounded-2xl text-white shadow-lg shadow-[#A0C878]/30">
            <ShoppingBag size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">My Cart</h1>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => navigate('/orders')} className="p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-2xl transition-all shadow-sm group">
            <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => navigate('/home')} className="p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-2xl transition-all shadow-sm group">
            <House className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </header>

      {/* --- Main Grid Area --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Left Side: Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.food_id._id} className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-[#DDEB9D]/30 shadow-lg hover:border-[#A0C878] transition-all group overflow-hidden relative">
              
              {/* Image & Text Container */}
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-[#FAF6E9] rounded-3xl flex-shrink-0 border-2 border-[#DDEB9D] overflow-hidden shadow-inner">
                  {item.food_id.image ? (
                    <img 
                      src={item.food_id.image} 
                      alt={item.food_id.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A0C878]">
                      <Utensils size={32} />
                    </div>
                  )}
                </div>
                
                <div className="min-w-0">
                  <h3 className="text-2xl font-black text-gray-900 truncate">{item.food_id.name}</h3>
                  <p className="text-sm text-gray-500 font-medium line-clamp-1 italic">"{item.food_id.description}"</p>
                  <span className="text-xl font-extrabold text-[#EF7822] block mt-1">₹{item.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Controls Column */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end flex-shrink-0">
                
                {/* Modern Counter */}
                <div className="flex items-center bg-[#FAF6E9] border-2 border-[#DDEB9D] rounded-2xl p-1 shadow-sm">
                  <button 
                    onClick={() => updateQuantity(item.food_id._id, item.quantity - 1)} 
                    className="p-2 bg-white rounded-xl text-[#A0C878] hover:bg-[#DDEB9D] transition-colors shadow-sm"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="text-xl font-black mx-4 w-6 text-center text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.food_id._id, item.quantity + 1)} 
                    className="p-2 bg-[#A0C878] rounded-xl text-white hover:bg-[#8eb666] transition-colors shadow-sm"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                {/* Sub-total for item */}
                <div className="hidden md:block w-24 text-right">
                  <span className="text-xl font-black text-gray-800">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>

                <button 
                  onClick={() => removeItem(item.food_id._id)} 
                  className="p-4 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          ))}
          
          {cartItems.length === 0 && (
            <div className="text-center py-24 bg-white border-2 border-dashed border-[#DDEB9D] rounded-[3rem] flex flex-col items-center">
              <div className="p-6 bg-[#FAF6E9] rounded-full mb-4">
                <ShoppingBag size={64} className="text-[#A0C878] opacity-50" />
              </div>
              <h3 className="text-2xl font-black text-gray-800">Your basket is empty</h3>
              <p className="text-gray-500 font-medium mt-2">Add some delicious adventures to your cart!</p>
              <button onClick={() => navigate('/home')} className="mt-6 px-8 py-3 bg-[#A0C878] text-white rounded-full font-bold shadow-lg shadow-[#A0C878]/30">Explore Menu</button>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[3rem] border border-[#DDEB9D]/50 shadow-2xl sticky top-32">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
               Summary
            </h2>
            
            <div className="space-y-5 mb-8 text-lg font-bold text-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Delivery</span>
                <span className="text-[#A0C878]">₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Tax (18% GST)</span>
                <span className="text-gray-400 text-sm">₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-dashed border-[#DDEB9D] pt-5 flex justify-between items-end">
                <span className="text-gray-900">Total Price</span>
                <span className="text-4xl font-black text-[#EF7822]">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              disabled={cartItems.length === 0}
              className={`w-full py-6 rounded-3xl text-xl flex items-center justify-center gap-3 transition-all active:scale-95 font-black shadow-xl ${
                cartItems.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-[#A0C878] hover:bg-[#8eb666] text-white shadow-[#A0C878]/30'
              }`} 
              onClick={() => setShowDialog(true)}
            >
              Place Order <ArrowRight size={24} />
            </button>
            
            <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
              Secure Checkout Powered by Go4Food
            </p>
          </div>
        </div>
      </div>

      {/* Modern Success Toast Integration */}
    {success && (
      <div className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none p-6">
        <style>{`
          @keyframes toastPop {
            0% { transform: scale(0.9) translateY(20px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-toast { animation: toastPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>

        <div className="animate-toast pointer-events-auto bg-[#A0C878]/95 backdrop-blur-xl border-2 border-white/50 text-white px-10 py-7 rounded-[3rem] shadow-[0_20px_50px_rgba(160,200,120,0.4)] flex flex-col items-center gap-4 relative overflow-hidden">
          {/* Icon Circle */}
          <div className="bg-white rounded-full p-4 shadow-inner">
            <CheckCircle size={40} className="text-[#A0C878]" strokeWidth={3} />
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-black tracking-tighter uppercase">Order Placed!</h3>
            <p className="text-sm font-bold opacity-90">Delivery at speed has begun </p>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1.5 bg-white/40 animate-[shrink_3s_linear_forwards]" />
        </div>
      </div>
    )}
      {/* --- The Order Dialog Modal --- */}
      {showDialog && (
        <OrderDialog 
          cartItems={cartItems} 
          totalAmount={total.toFixed(2)} 
          onClose={() => setShowDialog(false)} 
          onSuccess={handleOrderSuccess} 
        />
      )}
    </div>
  );
};

export default Cart;