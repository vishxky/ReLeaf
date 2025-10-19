import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  const handleStartClick = () => {
    if (session) {
      navigate('/challenges');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="leaf-pattern absolute inset-0 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full">
        <div className="relative h-full">
          <div className="absolute bottom-0 right-0 w-full h-[90%] bg-gradient-to-tr from-leafy-500/10 to-transparent rounded-tl-[60px]"></div>
        </div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-leafy-800 leading-tight">
              Welcome to <span className="text-leafy-600">ReLeaf!</span>
            </h1>
            <p className="mt-6 text-xl text-leafy-700">
              Ready to make the world a greener place? Let's start your eco-friendly journey!
            </p>
            <p className="mt-4 text-leafy-600 text-lg">
              Gamify your eco-friendly actions and earn rewards!
            </p>
            
            <div 
              className="mt-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button 
                onClick={handleStartClick}
                disabled={loading}
                className="eco-button text-lg px-8 py-6 group"
              >
                {session ? 'Go to Challenges' : 'Start Now'} 
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'transform translate-x-1' : ''}`} />
              </Button>
              <p className="mt-3 text-sm text-leafy-500">
                Join 10,000+ eco-warriors making a difference!
              </p>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-leafy-200 rounded-full animate-float"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-earth-200 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white">
                <div className="bg-leafy-500 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-white rounded-full p-1">
                      <svg className="h-5 w-5 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-white font-medium">Daily Challenge</span>
                  </div>
                  <span className="text-leafy-100 text-sm">+25 points</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-leafy-800">Reusable Cup Hero</h3>
                  <p className="mt-2 text-leafy-600 text-sm">
                    Use a reusable coffee cup or water bottle today. Snap a photo with a timestamp.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="bg-leafy-50 px-3 py-1 rounded-full text-xs text-leafy-700 font-medium">
                      Daily Challenge
                    </div>
                    <button className="text-leafy-600 hover:text-leafy-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="progress-bar">
                      <div className="progress-fill w-[60%]"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-leafy-600">Challenge Progress</span>
                      <span className="text-xs font-medium text-leafy-700">60%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-20 -right-12 transform rotate-12 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{animationDelay: '2s'}}>
                <div className="flex items-center gap-3">
                  <div className="badge-icon">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-leafy-800">Badge Unlocked!</p>
                    <p className="text-xs text-leafy-600">Reusable Rookie</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-20 -left-12 transform -rotate-6 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{animationDelay: '1.5s'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-leafy-700">158</div>
                  <p className="text-xs text-leafy-600">trees planted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
