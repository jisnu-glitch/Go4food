import React, { useEffect, useState } from "react";
import { X, Plus, Minus, ArrowRight, Trash2 ,House , ShoppingBag} from "lucide-react";
import API from "../services/api";
import { useNavigate} from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (food_id, newQuantity) => {

  // If quantity becomes 0 → remove item from UI
  if (newQuantity <= 0) {
    setCartItems(prev =>
      prev.filter(item => item.food_id._id !== food_id)
    )
  } 
  else {
    // Update UI immediately (optimistic update)
    setCartItems(prev =>
      prev.map(item =>
        item.food_id._id === food_id
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  try {
    await API.put("/cart/update", {
      food_id,
      quantity: newQuantity
    })
  } catch (err) {
    console.error(err)
  }
}

  const removeItem = async (food_id) => {
    try {
      await API.delete(`/cart/remove/${food_id}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async()=>{
    try{
      const res = await API.post('/orders')
      setCartItems([])
      alert('order placed successfully')
    }catch(e){
      console.error(e);
      alert('failed to palce order')
      
    }
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

    return (
    <div className="p-6 md:p-10 bg-[#FFFFFF] min-h-screen font-sans text-gray-800">
      {/* Header (Inspired by My Cart concept) */}
      <header className="mb-10 flex justify-between items-center bg-[#FAF6E9] p-6 rounded-3xl shadow-lg border border-[#dcedc1]/50">
        <h1 className="text-4xl font-extrabold text-black tracking-tight">My Cart</h1>
        <div className="flex gap-2">
          <button
                    className="flex-shrink-0 p-2 sm:p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-full transition-colors relative shadow-sm"
                    onClick={() => navigate('/orders')}
                  >
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                   
                  </button>
                  <button
                    className="flex-shrink-0 p-2 sm:p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-full transition-colors relative shadow-sm"
                    onClick={() => navigate('/home')}
                  >
                    <House className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                  </button>
        </div>
      </header>

      {/* Main Cart Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Cart Item List (Inspired by image_4.png conceptual rows) */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.food_id._id} className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FAF6E9] p-6 rounded-[2rem] border border-[#dcedc1]/30 shadow-md hover:border-[#a4d06a] transition-all">
              
              {/* Item Details (Conceptual left side) */}
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border border-[#dcedc1] shadow-inner text-4xl p-2">
                  {}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{item.food_id.name}</h3>
                  <p className="text-sm text-gray-500">{item.food_id.description}</p>
                </div>
              </div>

              {/* Conceptual Right Side (Qty, Price, Action) */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                {/* Quantity Control (Inspired by conceptually grouped numbers) */}
                <div className="flex items-center bg-white border border-[#dcedc1] rounded-full px-3 py-1.5 shadow-sm text-sm">
                  <button onClick={() => updateQuantity(item.food_id._id, item.quantity -1)} className="p-2 bg-gray-100 rounded-full text-[#a4d06a] hover:bg-[#dcedc1] transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="text-lg font-bold mx-3 w-5 text-center text-gray-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.food_id._id, item.quantity+ 1)} className="p-2 bg-gray-100 rounded-full text-[#a4d06a] hover:bg-[#dcedc1] transition-colors">
                    <Plus size={14} />
                  </button>
                </div>

                {/* Conceptual price element */}
                <span className="text-2xl font-bold text-[#689f38]">₹{item.price.toFixed(2)}</span>

                {/* Edit | Delete concept: We'll add a clear delete action for each item */}
                <button onClick={() => removeItem(item.food_id._id)} className="p-3 bg-white border border-[#dcedc1] rounded-full text-[#689f38] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          {cartItems.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-medium italic">
              Your cart is currently empty. Start adding some delicious items!
            </div>
          )}
        </div>

        {/* Total Price and Place Order section (conceptual bottom section) */}
        <div className="bg-[#FAF6E9] p-8 md:p-10 rounded-[2rem] border border-[#dcedc1]/50 shadow-xl flex flex-col justify-between self-start h-auto md:h-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="space-y-4 border-t border-[#dcedc1] pt-6 mb-8 text-lg font-medium text-gray-700">
              <div className="flex justify-between items-center">
                <span>Subtotal ({cartItems.length} Items)</span>
                <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Fee</span>
                <span className="font-bold text-[#a4d06a]">₹{totalPrice > 0 ? '5.00' : '0.00'}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold text-[#a4d06a]/80">
                <span>Estimated Tax (18% GST)</span>
                <span className="font-bold text-[#a4d06a]/70">₹{totalPrice > 0 ? (totalPrice * 0.18).toFixed(2) : '0.00'}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-[#dcedc1]">
            <div className="flex justify-between items-center text-4xl font-extrabold text-[#689f38] mb-8">
              <span>Total Price</span>
              <span>₹{(totalPrice + (totalPrice > 0 ? 5 : 0) + (totalPrice * 0.18)).toFixed(2)}</span>
            </div>
            {/* conceptual button: deep green, pill, with icon */}
            <button className="w-full bg-[#689f38] hover:bg-[#a4d06a] text-white font-extrabold py-6 rounded-full text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-[#689f38]/30 " onClick={placeOrder}>
              Place Order <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;