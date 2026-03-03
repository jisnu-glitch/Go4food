import React from 'react';
import { ArrowRight } from 'lucide-react'; // Optional icon for the button
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router for navigation

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFFDF6] font-sans text-gray-800 selection:bg-[#EF7822] selection:text-white">
      
      {/* --- High-End Modern Animations --- */}
      <style>{`
        /* Smooth, staggered entrance for the text & logo */
        @keyframes modernEntrance {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modern-entrance {
          animation: modernEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }

        /* Gentle continuous wobble/float for the logo circle */
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-gentle-float {
          animation: gentleFloat 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 overflow-hidden">
        
        {/* Left Side: Storytelling & CTA */}
        <div className="flex-1 text-center lg:text-left z-10 animate-modern-entrance">
          <div className="inline-block bg-[#DDEB9D]/60 text-gray-800 font-bold px-4 py-1.5 rounded-full text-sm mb-6 tracking-wide shadow-inner">
            ⚡ Delivery in under 30 minutes
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6 tracking-tight">
            Don't Just Eat. <br />
            Make every bite an <span className="text-[#A0C878]">adventure.</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed delay-100 opacity-0 animate-modern-entrance" style={{ animationFillMode: 'forwards' }}>
            Discover the best food and drinks in your city. Freshly prepared, carefully packaged, and delivered at banana-speed.
          </p>
          
          {/* Main CTA (Orange, directing to login) */}
          <button 
            onClick={() => navigate('/login')}
            className="group delay-200 opacity-0 animate-modern-entrance bg-[#EF7822] text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_8px_30px_rgba(239,120,34,0.3)] hover:shadow-[0_12px_25px_rgba(239,120,34,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto lg:mx-0"
            style={{ animationFillMode: 'forwards' }}
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Right Side: The Modified Banana Circle Logo */}
        <div className="flex-1 flex justify-center items-center relative animate-modern-entrance delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
          
          {/* Subtle blurred shadow background element for depth */}
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full bg-[#EF7822] filter blur-[100px] opacity-20 transform -translate-x-10 translate-y-10 scale-90"></div>
          
          {/* The MAIN ELEMENT: Solid Orange Circle on the Right Side */}
          <div className="relative z-10 rounded-full aspect-square w-full max-w-[280px] sm:max-w-[380px] md:max-w-[420px] bg-[#ff6a00] flex items-center justify-center shadow-2xl border-[12px] border-white/80 backdrop-blur-sm animate-gentle-float">
            
            {/* The standalone running banana character inside the circle */}
            <img 
              src="/main3.png" // MUST exist in your /public folder
              alt="Go4Food Fast Delivery" 
              className="w-[100%] h-[100%] object-contain transform translate-y-[-5px]"
            />
          </div>
        </div>

      </section>

    </div>
  );
};

export default MainPage;