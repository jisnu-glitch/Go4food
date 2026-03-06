import React, { useState } from 'react';
import API from '../../services/api'
import FoodList from "../FoodList"
import { ImagePlus, ArrowRight, X , CheckCircle} from 'lucide-react';

const AddFood = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState('In stock');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading,setLoading]= useState(false)
    const [editingId, setEditingId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [success,setSuccess]=useState(false)
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
        setLoading(true)
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
                await API.put(`/foods/${editingId}`, formData,);
                setLoading(false)
                setSuccess(true)
                setTimeout(()=>{
                  setSuccess(false)
                },2000)
            } else {
                await API.post("/foods", formData);
                setLoading(false)
                setSuccess(true)
                setTimeout(()=>{
                  setSuccess(false)
                },2000)
            }

            resetForm();
            setRefreshTrigger(prev => !prev);
        } catch (error) {
            console.error(error);
            alert(editingId ? "Error updating food" : "Error adding food");
        }
    };

    return (
        
        <div className="md:p-8 bg-[#FFFDF6] min-h-screen  flex flex-col items-center">
            

            {/* --- Success Toast --- */}
            {success && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-6">
              <style>{`
                @keyframes toastPop {
                  0% { transform: scale(0.9) translateY(20px); opacity: 0; }
                  100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-toast { animation: toastPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
              `}</style>

              <div className="animate-toast pointer-events-auto bg-[#A0C878]/90 backdrop-blur-xl border-2 border-white/50 text-white px-8 py-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(160,200,120,0.4)] flex flex-col items-center gap-3">
                {/* Icon Circle */}
                <div className="bg-white rounded-full p-3 shadow-inner">
                  <CheckCircle size={32} className="text-[#A0C878]" strokeWidth={3} />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-black tracking-tight uppercase">Success!</h3>
                  <p className="text-sm font-bold opacity-90">Your dish is live on the menu</p>
                </div>
                
                {/* Decorative progress bar at the bottom */}
                <div className="absolute bottom-0 left-0 h-1.5 bg-white/30 rounded-full animate-[shrink_3s_linear_forwards]" style={{ width: '100%' }}>
                  <style>{`
                    @keyframes shrink {
                      from { width: 100%; }
                      to { width: 0%; }
                    }
                  `}</style>
                </div>
              </div>
            </div>
)}
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
                            <button disabled={loading}
                                type="submit"
                                className={`w-full ${editingId ? 'bg-[#EF7822] text-white' : 'bg-[#A0C878] text-white'} hover:opacity-90 font-bold py-4 md:py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] text-base md:text-lg flex items-center justify-center gap-2 group`}
                            >
                                <span>{loading ? "Uploading..." :editingId ? 'Update Dish' : 'Save to Menu' }</span>
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