import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Pencil, Trash2, Loader2 } from 'lucide-react';

const FoodList = ({ refreshTrigger, onEdit }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch foods from your GET "/" endpoint
  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-run whenever a new item is added/updated in the parent
  useEffect(() => {
    fetchFoods();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await API.delete(`/foods/${id}`);
        fetchFoods(); // Refresh list after deletion
      } catch (error) {
        alert("Failed to delete item. Ensure you are logged in as admin.");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#FAF6E9] rounded-[2rem] p-8 shadow-xl shadow-black/5 mt-10 mb-20">
      <div className="flex justify-between items-center mb-8 border-b border-[#DDEB9D] pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Food List</h2>
        <span className="bg-[#A0C878] text-white px-4 py-1 rounded-full text-xs font-bold shadow-sm">
          {foods.length} Dishes Available
        </span>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#A0C878]" size={40} />
          </div>
        ) : foods.length > 0 ? (
          foods.map((food) => (
            <div 
              key={food._id} 
              className="flex items-center justify-between bg-white p-5 rounded-2xl border border-transparent hover:border-[#DDEB9D] transition-all group shadow-sm"
            >
              {/* Left Side: Visual Progress Bar Style (matching wireframe) */}
              <div className="flex-1 mr-8">
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="font-bold text-gray-700 group-hover:text-[#A0C878] transition-colors">
                    {food.name}
                  </h3>
                  <span className="text-xs font-medium text-gray-400">₹{food.price}</span>
                </div>
                {/* The "Line" from your wireframe */}
                <div className="h-1.5 bg-[#DDEB9D]/40 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-[#DDEB9D] w-3/4 rounded-full"></div>
                </div>
              </div>

              {/* Action Pill (Exactly like your wireframe) */}
              <div className="flex items-center 
               bg-[#A0C878] rounded-full px-6 py-2.5 shadow-lg flex-shrink-0">
                <button 
                  onClick={() => onEdit(food)}
                  className="text-white text-xs font-bold hover:text-[#EF7822] flex items-center gap-1.5 transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
                <div className="w-[1px] h-4 bg-white/20 mx-4"></div>
                <button 
                  onClick={() => handleDelete(food._id)}
                  className="text-white text-xs font-bold hover:text-red-400 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/50 rounded-2xl border-2 border-dashed border-[#DDEB9D] text-gray-400 font-medium italic">
            Your menu is currently empty. Add your first dish above!
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;