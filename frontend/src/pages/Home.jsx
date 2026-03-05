import { useEffect, useState } from "react";
import { Search, ShoppingCart, ShoppingBag, LogOut} from "lucide-react";
import API from "../services/api";
import FoodCard from "../components/FoodCard";
import { useNavigate} from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get("/foods");
        setFoods(res.data);
      } catch (err) {
        setError("Failed to load food items");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF6] font-sans text-gray-800">
      
      {/* 1. Header / Navigation - Now wraps search to a new line on mobile */}
      <header className="sticky top-0 z-20 bg-[white]/95 backdrop-blur-md shadow-sm border-b border-[#FAF6E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-y-4 gap-x-4">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 cursor-pointer">
            <img 
              src="../assets/logo.jpg" 
              alt="Go4Food Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all"
            />
          </div>

          {/* Cart Button (Stays top-right on mobile next to logo) */}
        <div className="flex items-center gap-2 order-2 sm:order-3">
  
        <button 
          className="flex-shrink-0 p-2 sm:p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-full transition-colors relative shadow-sm" 
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>

        <button 
          className="flex-shrink-0 p-2 sm:p-3 bg-[#FAF6E9] hover:bg-[#DDEB9D] rounded-full transition-colors relative shadow-sm" 
          onClick={() => navigate('/orders')} // You might want to change this to '/orders' later!
        >
          <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" /> 
        </button>

        <LogoutButton></LogoutButton>
        </div>

          {/* Search Bar - Takes full width on mobile (order-last), expands in middle on larger screens */}
          <div className="w-full sm:w-auto sm:flex-1 max-w-2xl relative group order-3 sm:order-2">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-[#A0C878] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search food, restaurants..."
              className="w-full bg-[#FAF6E9] text-gray-700 rounded-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-6 text-sm sm:text-base border-2 border-transparent focus:outline-none focus:border-[#A0C878] transition-all shadow-inner"
            />
          </div>

        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* 2. Hero / Banner Section - Fluid height and typography */}
        <section className="mb-8 sm:mb-12 relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-md group cursor-pointer">
          <div className="bg-gradient-to-r from-[#DDEB9D] to-[#A0C878] py-12 sm:py-16 md:h-64 flex flex-col items-center justify-center text-center px-4 sm:px-8 transition-transform duration-500 hover:scale-[1.01]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFFDF6] drop-shadow-md mb-3 sm:mb-4">
              Your hunger, delivered.
            </h1>
            <p className="text-base sm:text-lg text-[#FFFDF6] font-medium opacity-95 max-w-md sm:max-w-lg">
              Quick & reliable food delivery from your favorite local restaurants.
            </p>
          </div>
        </section>

        {/* 3. Category Section - Horizontal scroll for mobile */}
        <section className="mb-8 sm:mb-10">
          {/* Note: Standard CSS included here to hide scrollbar for cross-browser support */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button className="px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-[#A0C878] text-[#FFFDF6] font-bold rounded-full shadow-md hover:bg-opacity-90 transition-all whitespace-nowrap">
              All Categories
            </button>
            <button className="px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FAF6E9] text-gray-700 font-semibold rounded-full shadow-sm hover:bg-[#DDEB9D] transition-all border border-transparent hover:border-[#A0C878] whitespace-nowrap">
              Healthy
            </button>
            <button className="px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FAF6E9] text-gray-700 font-semibold rounded-full shadow-sm hover:bg-[#DDEB9D] transition-all border border-transparent hover:border-[#A0C878] whitespace-nowrap">
              Fast Food
            </button>
            <button className="px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FAF6E9] text-gray-700 font-semibold rounded-full shadow-sm hover:bg-[#DDEB9D] transition-all border border-transparent hover:border-[#A0C878] whitespace-nowrap">
              Desserts
            </button>
          </div>
        </section>

        {/* 4. Dynamic Data Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-8">
            Popular Near You
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <p className="text-lg sm:text-xl text-[#A0C878] font-semibold animate-pulse">Loading fresh meals...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-xl text-center text-sm sm:text-base">
              {error}
            </div>
          ) : (
            /* Updated Grid: 1 col on mobile, 2 on tablet, auto-fit on desktop. Min width dropped to 280px to prevent overflow on small phones */
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default Home;