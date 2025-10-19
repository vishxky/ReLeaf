
import { CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: (
        <svg className="h-8 w-8 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 16.9037 19.3 15.321 19.3H8.67903C7.09627 19.3 5.80648 18.0975 5.70132 16.5193L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Challenge Selection",
      description: "Choose eco-challenges based on your interests, skill level, and impact goals."
    },
    {
      icon: (
        <svg className="h-8 w-8 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7H10M20 7V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V8C4 6.89543 4.89543 6 6 6H20C20 6 20 6.52294 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14C14 13.4477 14.4477 13 15 13C15.5523 13 16 13.4477 16 14Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Earn Points & Rewards",
      description: "Complete tasks to unlock rewards like discounts, donations, and badges."
    },
    {
      icon: (
        <svg className="h-8 w-8 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 18.5L10.3872 13.1053C11.0449 12.5713 12.0064 12.6607 12.5533 13.3036L16 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5 9.5L15.0822 7.91783C15.6363 7.36372 16.5281 7.32864 17.1324 7.83283L20.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Track Your Impact",
      description: "Monitor your progress with a dynamic dashboard showing your environmental contributions."
    },
    {
      icon: (
        <svg className="h-8 w-8 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Join the Community",
      description: "Connect with like-minded eco-warriors and participate in team challenges for greater impact."
    }
  ];
  
  const benefits = [
    "Make sustainability fun and engaging",
    "Track your positive environmental impact",
    "Learn practical eco-friendly habits",
    "Connect with a community of like-minded people",
    "Earn real rewards for sustainable actions"
  ];
  
  return (
    <div className="bg-white py-16">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">How ReLeaf Works</h2>
          <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
            ReLeaf turns everyday sustainable actions into a fun, interactive game with real-world impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="eco-card p-6 flex flex-col items-center text-center">
              <div className="bg-leafy-100 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-xl text-leafy-800 mb-2">{step.title}</h3>
              <p className="text-leafy-600">{step.description}</p>
              
              <div className="mt-4 bg-leafy-50 w-10 h-10 rounded-full flex items-center justify-center text-leafy-800 font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-leafy-800 mb-6">Why You'll Love ReLeaf</h3>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-leafy-500 mr-3" />
                  <span className="text-leafy-700">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-amber-800 italic text-sm">
                "ReLeaf has completely transformed how I think about sustainability. What used to feel like a chore now feels like a game I actually want to play!" 
                <span className="font-medium block mt-2">— Sarah K., ReLeaf User</span>
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-leafy-200 rounded-full animate-float opacity-50"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-earth-200 rounded-full animate-float opacity-70" style={{animationDelay: '1s'}}></div>
            
            <div className="bg-gradient-to-br from-leafy-500/10 to-leafy-500/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-leafy-400/20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-leafy-800 mb-4">The ReLeaf Effect</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="bg-white rounded-full p-1 mr-2">
                        <svg className="h-4 w-4 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 10H2M22 10C22 14.4183 18.4183 18 14 18H10C5.58172 18 2 14.4183 2 10M22 10C22 5.58172 18.4183 2 14 2H10C5.58172 2 2 5.58172 2 10M14 22V18M10 22V18M14 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span className="font-medium text-leafy-800">126,500</span>
                    </div>
                    <p className="text-sm text-leafy-600 pl-7">Single-use items saved</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="bg-white rounded-full p-1 mr-2">
                        <svg className="h-4 w-4 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span className="font-medium text-leafy-800">384,720</span>
                    </div>
                    <p className="text-sm text-leafy-600 pl-7">Hours of sustainability action</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="bg-white rounded-full p-1 mr-2">
                        <svg className="h-4 w-4 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 3L2 11L11 13L13 22L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="font-medium text-leafy-800">15,890</span>
                    </div>
                    <p className="text-sm text-leafy-600 pl-7">Trees planted by our community</p>
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-leafy-700 italic">
                  Numbers based on collective user activity as of April 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
