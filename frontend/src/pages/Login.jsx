import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

// Importing your newly created custom components
import SplitText from "../components/react-bits/SplitText"; 
import FadeContent from "../components/react-bits/FadeContent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError]= useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      res.data.role === "admin" ? navigate("/admin") : navigate("/home");
    } catch (e) {
      setError("Invalid email or password")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Blobs (Optional: Keep the blob CSS in your index.css to make them drift) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#DDEB9D] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#FAF6E9] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      {/* Main Login Card wrapped in FadeContent */}
      <div className="w-full max-w-md relative z-10">
        <FadeContent blur={true} duration={1000} easing="cubic-bezier(0.16, 1, 0.3, 1)" initialOpacity={0}>
          <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FAF6E9]">
            
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.jpg" 
                alt="Go4Food Logo" 
                className="h-20 w-auto object-contain "
              />
            </div>

            {/* Using your custom SplitText component */}
            <div className="text-center mb-8">
              <SplitText
                text="Welcome Back!"
                className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 flex justify-center"
                delay={40}
                threshold={0.1}
              />
              <p className="text-gray-500 text-sm font-medium mt-2">Log in to order your favorite meals.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="group">
                <label className="block mb-1.5 text-sm font-bold text-gray-700 transition-colors group-focus-within:text-[#A0C878]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    placeholder="jishnu@example.com"
                    className="w-full px-4 py-3.5 bg-[#FAF6E9] text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:bg-white transition-all border border-transparent placeholder-gray-400"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block mb-1.5 text-sm font-bold text-gray-700 transition-colors group-focus-within:text-[#A0C878]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-[#FAF6E9] text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:bg-white transition-all border border-transparent placeholder-gray-400"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              <button 
                disabled={loading}
                className="mt-4 w-full bg-[#EF7822] text-white py-3.5 rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(239,120,34,0.39)] hover:bg-[#f38231] hover:shadow-[0_6px_20px_rgba(239,120,34,0.23)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Log In"
                )}
              </button>

              <div className="text-center mt-2">
                <p className="text-sm text-gray-600 font-medium">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-[#EF7822] font-bold hover:underline underline-offset-4 transition-all">
                    Sign Up
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </FadeContent>
      </div>
    </div>
  );
};

export default Login;