import { useEffect, useState } from "react";
import { Search, ShoppingCart, ShoppingBag, LogOut} from "lucide-react";
import API from "../services/api";
import FoodCard from "../components/FoodCard";
import { useNavigate} from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
function Home() {
  const [foods, setFoods] = useState([]);
  const [searchTerm,setSearchTerm]=useState("")
  const [category,setCategory]=useState("all")
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

  const filteredFoods = foods.filter((food) => {
  const term = searchTerm.toLowerCase().trim();
  
  const searchMatch = !term || food.name.toLowerCase().includes(term)

  const categoryMatch = category === "all" || food.category.toLowerCase().trim() === category
  // If search is empty, show everything
  return categoryMatch && searchMatch
});

  return (
    <div className="min-h-screen bg-[#FFFDF6] font-sans text-gray-800">
      
      {/* 1. Header / Navigation - Now wraps search to a new line on mobile */}
      <header className="sticky top-0 z-20 bg-[white] backdrop-blur-md shadow-sm border-b border-[#FAF6E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-y-4 gap-x-4">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 cursor-pointer">
            <img 
              src="/logo.jpg" 
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
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF6E9] text-gray-700 rounded-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-6 text-sm sm:text-base border-2 border-transparent focus:outline-none focus:border-[#A0C878] transition-all shadow-inner"
            />
          </div>

        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* 2. Hero / Banner Section - Fluid height and typography */}
        <section className="mb-8 sm:mb-12 relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-md group cursor-pointer">
          <div className="bg-gradient-to-r from-[#f88f49] to-[#A0C878] py-12 sm:py-16 md:h-64 flex flex-col items-center justify-center text-center px-4 sm:px-8 transition-transform duration-500 hover:scale-[1.01]">
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
            <button className= {`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-full shadow-md  border-transparent whitespace-nowrap ${category === 'all' ? "bg-[#A0C878] text-[#FFFDF6]" : "bg-[#FAF6E9]  text-gray-700 hover:bg-[#DDEB9D] transition duration-200 cursor-pointer"}`}
            onClick={()=>setCategory("all")}>
              All Categories
            </button>
            <button 
            className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base  font-semibold rounded-full shadow-sm border-transparent whitespace-nowrap ${category === 'sweet' ? "bg-[#A0C878] text-[#FFFDF6]" : "bg-[#FAF6E9]  text-gray-700 hover:bg-[#DDEB9D] transition duration-200 cursor-pointer "}`}
            onClick={()=>setCategory('sweet')}>
              Sweet
            </button>
            <button className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base  font-semibold rounded-full shadow-sm border-transparent whitespace-nowrap ${category === 'snack' ? "bg-[#A0C878] text-[#FFFDF6]" : "bg-[#FAF6E9]  text-gray-700 hover:bg-[#DDEB9D] transition duration-200 cursor-pointer"}`}
            onClick={()=>setCategory('snack')}>
              Snack
            </button>
            <button className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base  font-semibold rounded-full shadow-sm border-transparent whitespace-nowrap ${category === 'dessert' ? "bg-[#A0C878] text-[#FFFDF6]" : "bg-[#FAF6E9]  text-gray-700 hover:bg-[#DDEB9D] transition duration-200 cursor-pointer"}`}
            onClick={()=>setCategory('dessert')}>
              Desserts
            </button>
          </div>
          </section>

          <section className="px-4 md:px-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                {searchTerm ? `Search results for "${searchTerm}"` : 'Popular Near You'}
              </h2>
              
              {/* Dynamic Item Counter */}
              {!loading && !error && (
                <div className="bg-[#DDEB9D]/50 px-4 py-1.5 rounded-full text-xs font-bold text-[#A0C878] border border-[#A0C878]/20">
                  {filteredFoods.length} {filteredFoods.length === 1 ? 'Dish' : 'Dishes'} Available
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center py-12 sm:py-20 gap-4">
                <div className="w-12 h-12 border-4 border-[#DDEB9D] border-t-[#A0C878] rounded-full animate-spin"></div>
                <p className="text-lg sm:text-xl text-[#A0C878] font-semibold animate-pulse">
                  Loading fresh meals...
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-500 p-6 rounded-3xl text-center">
                <p className="font-bold">Oops! Something went wrong.</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            ) : filteredFoods.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <div className="p-5 bg-white rounded-full shadow-sm mb-4">
                  <span className="text-4xl">🔎</span>
                </div>
                <p className="text-center text-gray-400 text-lg font-medium">
                  We couldn't find any matches for "{`${category}: ${searchTerm}`}"
                </p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="mt-4 text-[#A0C878] font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              /* The Dynamic Grid */
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                {filteredFoods.map((food) => (
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