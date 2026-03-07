
import { useState } from "react";
import API from "../services/api";
const BASE_URL = import.meta.env.VITE_API_URL

function FoodCard({ food }) {
  const [quantity, setQuantity] = useState(0);
  const [loading,setLoading] = useState(false)
  if (!food) return null;
  const handleAddToCart = async () => {
  
  // 1️⃣ Update UI immediately
  if(loading) return

  try{

    setLoading(true)

    await API.post("/cart/add",{
      food_id: food._id,
      quantity: 1
    })

    setQuantity(prev => prev + 1)

  }catch(err){
    console.error(err)
  }

  setLoading(false)
};

  return (
    <div className="group relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      
      
      {/* Image */}
      {food.image ? (
        <img
          src={food.image}
          alt={food.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-[#DDEB9D] flex items-center justify-center text-[#A0C878] font-bold text-xl">
          No Image
        </div>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>

      {/* Price */}
      <div className="absolute top-4 right-4 bg-[#FFFDF6]/95 px-3 py-1 rounded-xl shadow">
        <span className="font-bold text-[#EF7822]">₹{food.price}</span>
      </div>

      {/* Quantity Badge */}
      {quantity > 0 && (
        <div className="absolute top-4 left-4 bg-[#EF7822] text-white px-3 py-1 rounded-xl font-bold shadow-lg">
          {quantity}
        </div>
      )}

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
        <div className="flex justify-between items-end gap-4">

          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">
              {food.name}
            </h2>
            <p className="text-sm text-gray-300 line-clamp-2">
              {food.description}
            </p>
          </div>

          {/* Add Button */}
          <button
          disabled={loading}
            onClick={handleAddToCart}
            className="shrink-0 bg-[#A0C878] hover:bg-[#EF7822] text-white p-1 w-15 h-15 rounded-full shadow-lg transition transform hover:scale-110"
          >
            +
          </button>

        </div>
      </div>

    </div>
  );
}

export default FoodCard;