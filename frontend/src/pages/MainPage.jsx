import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SplitText from '../components/react-bits/SplitText'; 
import FadeContent from '../components/react-bits/FadeContent'; 

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFFDF6] font-sans text-gray-800 min-h-screen flex flex-col items-center justify-center overflow-hidden py-12">
      
      {/* --- Enhanced High-Speed & Color Animations --- */}
      <style>{`
        @keyframes perspectiveEnter {
          0% { opacity: 0; transform: perspective(1000px) rotateX(-10deg) translateY(30px); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
        }
        
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        /* Smooth color cycle between Orange (#EF7822) and Light Green (#A0C878) */
        @keyframes titleColorCycle {
          0%, 100% { color: #EF7822; }
          50% { color: #DDEB9D; }
        }

        .animate-perspective { animation: perspectiveEnter 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-main-float { animation: gentleFloat 6s ease-in-out infinite; }
        
        .animated-title span {
          animation: titleColorCycle 4s ease-in-out infinite;
        }

        .skew-perspective {
          transform: skewX(-12deg);
        }
      `}</style>

      {/* 1. Brand Hero Section: Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl px-6 gap-6 lg:gap-12">
  
        {/* ROW 1: The Mascot Circle (Always on top in mobile) */}
        <div className="relative animate-main-float order-1">
          {/* Large Circle - Adjusted sizes for better mobile fit */}
          <div className="relative z-10 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[440px] lg:h-[440px] rounded-full bg-gradient-to-br from-[#ff8a00] to-[#EF7822] flex items-center justify-center shadow-2xl border-[8px] sm:border-[12px] border-white overflow-hidden">
            <img 
              src="/main3.png" 
              alt="Mascot" 
              className="w-[90%] h-[90%] object-contain"
            />
          </div>
        </div>

        {/* ROW 2: The Title (Drops below circle on mobile) */}
        <div className="skew-perspective text-center lg:text-left order-2">
          <SplitText
            text="Go4Food"

            className="animated-title text-6xl sm:text-8xl lg:text-[11rem] font-black tracking-tighter italic leading-none"
            delay={80}
            animationStepDuration={0.3}
          />
        </div>
      </div>

      {/* 2. Content & CTA Section */}
      <div className="w-full max-w-2xl px-6 text-center z-20">
        <FadeContent blur={true} duration={1000} easing="ease-out">
          <div className="space-y-8">
            
            
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium">
              Don't just eat. Make every bite an <span className="text-[#A0C878] font-bold">adventure</span>. 
              Discover flavors delivered in under 30 minutes.
            </p>

            <button 
              onClick={() => navigate('/login')}
              className="group relative bg-[#EF7822] text-white px-14 py-5 rounded-full font-black text-2xl shadow-[0_20px_40px_rgba(239,120,34,0.35)] hover:shadow-[0_25px_50px_rgba(239,120,34,0.45)] hover:-translate-y-2 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              Get Started
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              
              {/* Animated highlight beam */}
              <div className="absolute inset-0 w-full h-full bg-white/10 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </button>
          </div>
        </FadeContent>
      </div>

      {/* 3. Decorative Background Perspective Text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.03] z-0">
        <div className="absolute -left-10 top-1/4 text-[15rem] font-black italic -rotate-12">FAST</div>
        <div className="absolute -right-10 bottom-1/4 text-[15rem] font-black italic -rotate-12">FRESH</div>
      </div>

    </div>
  );
};

export default MainPage;