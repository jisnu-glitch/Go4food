
// function FoodCard({ food }) {
//   if (!food) return null;
//   console.log(food.image);
  
//   return (
//     <div className="group relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">

//       {/* 1. Full-Background Image */}
//       {food.image ? (
//         <img
//           src={food.image}
//           alt={food.name}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//       ) : (
//         <div className="absolute inset-0 bg-[#DDEB9D] flex items-center justify-center text-[#A0C878] font-bold text-xl">
//           No Image
//         </div>
//       )}

//       {/* 2. Gradient Overlay (Darkens the bottom for text readability) */}
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

//       {/* 3. Floating Price Badge (Top Right) */}
//       <div className="absolute top-4 right-4 bg-[#FFFDF6]/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-sm border border-[#FAF6E9]/20">
//         <span className="font-extrabold text-[#EF7822]">₹{food.price}</span>
//       </div>

//       {/* 4. Content Wrapper (Pinned to the bottom) */}
//       <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end">
//         <div className="flex justify-between items-end gap-4">
          
//           {/* Text Info */}
//           <div className="flex-1">
//             <h2 className="text-xl sm:text-2xl font-bold text-[#FFFDF6] line-clamp-1 mb-1 group-hover:text-[#DDEB9D] transition-colors duration-300">
//               {food.name}
//             </h2>
//             <p className="text-sm text-gray-300 line-clamp-2 leading-snug">
//               {food.description}
//             </p>
//           </div>

//           {/* Add Button (Circular style to contrast the text block) */}
//           <button 
//             className="flex-shrink-0 bg-[#A0C878] hover:bg-[#EF7822] text-[#FFFDF6] p-3.5 sm:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
//             aria-label={`Add ${food.name} to cart`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5 sm:w-6 sm:h-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2.5"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//           </button>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default FoodCard;



import { useState } from "react";
import API from "../services/api";

function FoodCard({ food }) {
  const [quantity, setQuantity] = useState(0);

  if (!food) return null;

  const handleAddToCart = async () => {

  // 1️⃣ Update UI immediately
  setQuantity(prev => prev + 1);

  try {
    // 2️⃣ Call backend
    await API.post("/cart/add", {
      food_id: food._id,
      quantity: 1
    });

  } catch (err) {
    console.error("Error adding to cart", err);

    // 3️⃣ Rollback if API fails
    setQuantity(prev => prev - 1);
  }
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
            onClick={handleAddToCart}
            className="flex-shrink-0 bg-[#A0C878] hover:bg-[#EF7822] text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
          >
            +
          </button>

        </div>
      </div>

    </div>
  );
}

export default FoodCard;