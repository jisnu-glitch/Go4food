import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Edit3, Trash2, Loader2, UtensilsCrossed } from 'lucide-react';
const BASE_URL = import.meta.env.VITE_API_URL
const FoodList = ({ refreshTrigger, onEdit }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFoods = async () => {
        try {
            const res = await API.get('/foods');
            setFoods(res.data);
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await API.delete(`/foods/${id}`);
                fetchFoods();
            } catch (error) {
                alert("Error deleting food");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-[#A0C878]" size={32} />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tight">Menu List</h2>
                <div className="bg-[#DDEB9D]/50 px-3 py-1 rounded-full text-xs font-bold text-[#A0C878]">
                    {foods.length} Items
                </div>
            </div>

            {/* RESPONSIVE GRID: 1 column on mobile, 2 on tablets, 3 on desktops */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <div 
                        key={food._id} 
                        className="bg-white rounded-[2rem] border border-[#DDEB9D]/30 shadow-xl shadow-black/5 overflow-hidden flex flex-col group hover:border-[#A0C878] transition-all"
                    >
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                            {food.image ? (
                                <img 
                                    src={food.image} 
                                    alt={food.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <UtensilsCrossed size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-xs font-black text-[#EF7822]">
                                ₹{food.price}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{food.name}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A0C878] bg-[#A0C878]/10 px-2 py-0.5 rounded">
                                    {food.category}
                                </span>
                            </div>
                            
                            <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 italic">
                                "{food.description}"
                            </p>

                            {/* ACTION BUTTONS: Full width on small screens for better accessibility */}
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => onEdit(food)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#FAF6E9] text-gray-700 font-bold py-3 rounded-2xl hover:bg-[#DDEB9D] hover:text-gray-900 transition-all text-sm"
                                >
                                    <Edit3 size={16} /> Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(food._id)}
                                    className="px-4 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                    title="Delete Dish"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {foods.length === 0 && (
                <div className="text-center py-20 bg-[#FAF6E9] rounded-[2rem] border-2 border-dashed border-[#DDEB9D]">
                    <p className="text-gray-400 font-medium">Your menu is empty. Add your first dish above!</p>
                </div>
            )}
        </div>
    );
};

export default FoodList;