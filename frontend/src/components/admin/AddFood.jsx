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
                await API.put(`/foods/${editingId}`, formData);
                alert("Food updated successfully");
            } else {
                await API.post("/foods", formData);
                alert("Food added successfully");
            }

            resetForm();
            setRefreshTrigger(prev => !prev);
        } catch (error) {
            console.error(error);
            alert(editingId ? "Error updating food" : "Error adding food");
        }
    };

    return (
        /* RESPONSIVE FIX: 
           - Removed fixed 'ml-64'
           - Added 'lg:ml-64' (only shifts for sidebar on large screens)
           - Added responsive padding 'p-4 md:p-8'
        */
        <div className="md:p-8 bg-[#FFFDF6] min-h-screen  flex flex-col items-center">
            
            {/* Header: Responsive width */}
            <header className="mb-8 md:mb-10 w-full max-w-4xl flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                    {editingId ? 'Update Dish' : 'Add New Dish'}
                </h1>
                {editingId && (
                    <button 
                        onClick={resetForm}
                        className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-bold text-xs md:text-sm hover:bg-red-200 transition-colors"
                    >
                        <X size={16} /> <span className="hidden xs:inline">Cancel Edit</span>
                    </button>
                )}
            </header>

            {/* Form Container: Added 'p-6 md:p-10' for tighter mobile spacing */}
            <div className="w-full max-w-4xl bg-[#FFFDF6] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-black/10 border border-[#DDEB9D]/30">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" onSubmit={handleSubmit}>
                    
                    {/* Left Column: Input Fields */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-[#A0C878]">Dish Name</label>
                            <input type="text" placeholder="e.g. Classic Beef Burger" className="w-full p-3 md:p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" value={name} required onChange={(e)=>setName(e.target.value)} />
                        </div>
                        
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-[#A0C878]">Price (₹)</label>
                            <input type="number" required value={price} onWheel={(e) => e.target.blur()} onChange={(e)=>setPrice(e.target.value)} placeholder="299" className="w-full p-3 md:p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-[#A0C878]">Category</label>
                            <input type="text" required value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Main Course" className="w-full p-3 md:p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-[#A0C878]">Description</label>
                            <textarea required value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Describe the dish..." rows="3" className="w-full p-3 md:p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner resize-none" />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-[#A0C878]">Availability</label>
                            <select value={selectedValue} onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#A0C878] appearance-none cursor-pointer">
                                <option value="In stock">In stock</option>
                                <option value="Out of stock">Out of stock</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column: Image and Submit */}
                    <div className="space-y-6 md:space-y-8 flex flex-col h-full">
                        <div className="group flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-[#A0C878]">Food Image</label>
                            <label className="h-48 md:h-64 lg:h-full min-h-[180px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-[#A0C878]/5 hover:border-[#A0C878] transition-all overflow-hidden p-4 text-center relative">
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <div className="p-3 md:p-4 bg-white rounded-2xl shadow-sm mb-3">
                                    <ImagePlus className="text-[#A0C878]" size={24} />
                                </div>
                                {selectedFile ? (
                                    <div className="space-y-1">
                                        <p className="text-[#A0C878] font-bold text-sm truncate max-w-[200px]">{selectedFile.name}</p>
                                        <span className="text-xs text-gray-400">Click to change</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-400 font-semibold text-xs md:text-sm">Tap to {editingId ? 'change' : 'upload'} dish image</span>
                                )}
                            </label>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                className={`w-full ${editingId ? 'bg-[#EF7822] text-white' : 'bg-[#A0C878] text-white'} hover:opacity-90 font-bold py-4 md:py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] text-base md:text-lg flex items-center justify-center gap-2 group`}
                            >
                                <span>{editingId ? 'Update Dish' : 'Save to Menu'}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* List section: Responsive width container */}
            <div className="w-full max-w-4xl mt-12">
                <FoodList refreshTrigger={refreshTrigger} onEdit={handleEditInitiated} />
            </div>
        </div>
    );
};

export default AddFood;