import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

// Importing your custom animation components
import SplitText from "../components/react-bits/SplitText"; 
import FadeContent from "../components/react-bits/FadeContent";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role
      });
      
      localStorage.setItem("user", JSON.stringify(res.data));
      res.data.role === 'admin' ? navigate('/admin') : navigate('/');
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Subtle Ambient Background Blobs (Matches Login) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#DDEB9D] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#FAF6E9] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      {/* Main Registration Card */}
      <div className="w-full max-w-md relative z-10 my-8">
        <FadeContent blur={true} duration={1000} easing="cubic-bezier(0.16, 1, 0.3, 1)" initialOpacity={0}>
          <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FAF6E9]">
            
            {/* Logo Area */}
            <div className="flex justify-center mb-6">
              <img 
                src="../assets/logo.jpg" 
                alt="Go4Food Logo" 
                className="h-16 sm:h-20 w-auto object-contain "
              />
            </div>

            {/* Animated Header */}
            <div className="text-center mb-8">
              <SplitText
                text="Create Account"
                className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 flex justify-center"
                delay={40}
                threshold={0.1}
              />
              <p className="text-gray-500 text-sm font-medium mt-2">Join us to start ordering delicious food.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              
              {/* Name Input */}
              <div className="group">
                <label className="block mb-1.5 text-sm font-bold text-gray-700 transition-colors group-focus-within:text-[#A0C878]">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    placeholder="Jishnu Vijayan"
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#FAF6E9] text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:bg-white transition-all border border-transparent placeholder-gray-400"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Input */}
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
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#FAF6E9] text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:bg-white transition-all border border-transparent placeholder-gray-400"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
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
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#FAF6E9] text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:bg-white transition-all border border-transparent placeholder-gray-400"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Role Select */}
              <div className="group">
                <label className="block mb-1.5 text-sm font-bold text-gray-700 transition-colors group-focus-within:text-[#A0C878]">
                  Account Type
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#FAF6E9] text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:bg-white transition-all border border-transparent cursor-pointer appearance-none"
                  >
                    <option value="user">Hungry User (Order Food)</option>
                    <option value="admin">Restaurant Admin (Sell Food)</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 group-focus-within:text-[#A0C878]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Sign Up Button */}
              <button 
                disabled={loading}
                className="mt-4 w-full bg-[#EF7822] text-white py-3.5 rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(239,120,34,0.39)] hover:bg-[#d96a1a] hover:shadow-[0_6px_20px_rgba(239,120,34,0.23)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Login Redirect */}
              <div className="text-center mt-2">
                <p className="text-sm text-gray-600 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#EF7822] font-bold hover:underline underline-offset-4 transition-all">
                    Log In
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

export default Register;