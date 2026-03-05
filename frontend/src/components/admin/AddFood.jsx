import React, { useState } from 'react';
import API from '../../services/api'
import FoodList from "../FoodList"
import { ImagePlus, ArrowRight, X } from 'lucide-react';

const AddFood = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState('In stock');
    const [selectedFile, setSelectedFile] = useState(null);

    // --- Update State ---
    const [editingId, setEditingId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    // Function to populate form for editing
    const handleEditInitiated = (food) => {
      
      
        setEditingId(food._id);
        setName(food.name);
        
        setPrice(food.price);
        setCategory(food.category);
        setDescription(food.description);
        setSelectedValue(food.availability || 'In stock');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    
    const resetForm = () => {
        setEditingId(null);
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
        setSelectedFile(null);
        setSelectedValue('In stock');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("availability", selectedValue);

            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            if (editingId) {
                // UPDATE logic
                await API.put(`/foods/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Food updated successfully");
            } else {
                // ADD logic
                await API.post("/foods", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Food added successfully");
            }

            resetForm();
            setRefreshTrigger(prev => !prev); // Tell FoodList to refresh
        } catch (error) {
            console.error(error);
            alert(editingId ? "Error updating food" : "Error adding food");
        }
    };

    return (
        <div className="p-8 bg-[#FFFDF6] min-h-screen ml-64 flex flex-col items-center">
            <header className="mb-10 w-full max-w-4xl flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    {editingId ? 'Update Dish' : 'Add New Dish'}
                </h1>
                {editingId && (
                    <button 
                        onClick={resetForm}
                        className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-200 transition-colors"
                    >
                        <X size={16} /> Cancel Edit
                    </button>
                )}
            </header>

            <div className="w-full max-w-4xl bg-[#FFFDF6] rounded-[2rem] p-10 shadow-2xl shadow-black/10">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-12" onSubmit={handleSubmit}>
                    
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Dish Name</label>
                            <input type="text" placeholder="e.g. Classic Beef Burger" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" value={name} required onChange={(e)=>setName(e.target.value)} />
                        </div>
                        
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Price (₹)</label>
                            <input type="number" required value={price} onWheel={(e) => e.target.blur()} onChange={(e)=>setPrice(e.target.value)} placeholder="299" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Category</label>
                            <input type="text" required value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Main Course" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Description</label>
                            <input type="text" required value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Describe the dish..." className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Availability</label>
                            <select value={selectedValue} onChange={handleChange} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#A0C878]">
                                <option value="In stock">In stock</option>
                                <option value="Out of stock">Out of stock</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8 flex flex-col justify-between h-full">
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Food Image</label>
                            <label className="h-56 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-[#A0C878]/5 hover:border-[#A0C878] transition-all overflow-hidden p-4 text-center relative">
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-3">
                                    <ImagePlus className="text-[#A0C878]" size={28} />
                                </div>
                                {selectedFile ? (
                                    <p className="text-[#A0C878] font-bold text-sm truncate max-w-[200px]">{selectedFile.name}</p>
                                ) : (
                                    <span className="text-gray-400 font-semibold text-sm">Click to {editingId ? 'change' : 'upload'} image</span>
                                )}
                            </label>
                        </div>

                        <div className="mt-auto">
                            <button 
                                type="submit"
                                className={`w-full ${editingId ? 'bg-[#DDEB9D] text-gray-800' : 'bg-[#A0C878] text-white'} hover:opacity-90 font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-2 group`}
                            >
                                <span>{editingId ? 'Update Dish' : 'Save to Menu'}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Pass state and handlers to FoodList */}
            <FoodList refreshTrigger={refreshTrigger} onEdit={handleEditInitiated} />
        </div>
    );
};

export default AddFood;