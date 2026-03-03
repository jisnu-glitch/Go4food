import React, { useState } from 'react';
import API from '../../services/api'
import { ImagePlus, ArrowRight } from 'lucide-react';
const AddFood = () => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState(null)
    const {category,setCategory}=useState('')
    const [description,setDescription]=useState('')
    const [selectedValue, setSelectedValue] = useState('option1');
    const [selectedFile, setSelectedFile] = useState(null);


    const handleChange = (event) => {
    setSelectedValue(event.target.value);
    };

  
    const handleFileChange = (event) => {
        // Access the selected files via event.target.files
        const files = event.target.files;
        if (files && files.length > 0) {
        // Store the first selected file in the component state
        setSelectedFile(files[0]);
        console.log('File selected:', files[0].name);
        } else {
        setSelectedFile(null);
        }
    };

    const addFoodItem = async (e) => {
        e.preventDefault();
        console.log(name)
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

        console.log(formData);
        
        const res = await API.post("/foods", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
        });

        alert("Food added successfully");
        console.log(res.data);

        } catch (error) {
        console.error(error);
        alert("Error adding food");
        }
    };

  return (
    <div className="p-8 bg-[#FFFDF6] min-h-screen ml-64 flex flex-col items-center">
      <header className="mb-10 w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Add New Dish</h1>
        <p className="text-white/80 text-sm font-medium">Menu Management / Add Item</p>
      </header>

      {/* Modern Card Design */}
      <div className="w-full max-w-4xl bg-[#FFFDF6] rounded-[2rem] p-10 shadow-2xl shadow-black/10">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-12" onSubmit={addFoodItem}>
          
          {/* Left Column: Details */}
          <div className="space-y-8">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Dish Name</label>
              <input type="text" placeholder="e.g. Classic Beef Burger" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" value={name} required
              onChange={(e)=>setName(e.target.value)} />
            </div>
            
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Price (₹)</label>
              <input type="number" required value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="299" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Category</label>
              <input type="text" required value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="299" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Description</label>
              <input type="text" required value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="299" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#A0C878] focus:border-transparent outline-none transition-all shadow-inner" />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">Availability</label>
                <select value={selectedValue} onChange={handleChange}>
                <option value="In stock">In stock</option>
                <option value="In stock">Out of stock</option>
            </select>
            </div>

          </div>

          {/* Right Column: Image & Action */}
            

            <div className="space-y-8 flex flex-col justify-between h-full">
  {/* 1. Food Image Section */}
  <div className="group">
    <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-[#A0C878]">
      Food Image
    </label>
    
    <label className="h-56 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-[#A0C878]/5 hover:border-[#A0C878] transition-all group-active:scale-95 overflow-hidden p-4 text-center relative">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        className="hidden" 
        onChange={handleFileChange} 
        accept="image/*"
      />

      {/* Icon Container */}
      <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
        <ImagePlus className="text-[#A0C878]" size={28} />
      </div>

      {/* Dynamic Text Logic */}
      {selectedFile ? (
        <div className="animate-in fade-in zoom-in duration-300">
          <p className="text-[#A0C878] font-bold text-sm truncate max-w-[200px]">
            {selectedFile.name}
          </p>
          <span className="text-gray-400 text-xs mt-1 block">Click to change photo</span>
        </div>
      ) : (
        <>
          <span className="text-gray-400 font-semibold text-sm">
            Drag or click to upload
          </span>
          <span className="text-gray-300 text-xs mt-1">
            JPG, PNG or WebP (Max 5MB)
          </span>
        </>
      )}
    </label>
  </div>

  {/* 2. Action Button Section */}
  <div className="mt-auto">
    <button 
      type="submit"
      className="w-full bg-[#A0C878] hover:bg-[#8eb666] text-white font-bold py-5 rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-2 group"
    >
      <span>Save to Menu</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
    
    <p className="text-center text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-4">
      Instant Publish Enabled
    </p>
  </div>
</div>
            

            
          
        </form>
      </div>
    </div>
  );
};

export default AddFood;