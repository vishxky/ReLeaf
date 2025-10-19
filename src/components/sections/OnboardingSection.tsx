
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

type EcoInterest = {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
};

const OnboardingSection = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [ecoInterests, setEcoInterests] = useState<EcoInterest[]>([
    {
      id: 'gardening',
      name: 'Gardening',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      selected: false,
    },
    {
      id: 'diy',
      name: 'DIY',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 22V18M8 22V18M3 9H21M3 13H21M4 3H20C20.5523 3 21 3.44772 21 4V22H3V4C3 3.44772 3.44772 3 4 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      selected: false,
    },
    {
      id: 'waste-reduction',
      name: 'Waste Reduction',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 16.9037 19.3 15.321 19.3H8.67903C7.09627 19.3 5.80648 18.0975 5.70132 16.5193L5 6M10 10V16M14 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      selected: false,
    },
    {
      id: 'biking',
      name: 'Biking',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17" cy="17" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="17" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13L12.3 8.5L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="4" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      selected: false,
    },
    {
      id: 'energy',
      name: 'Energy Conservation',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 10H17.5L11 22V14H7L13 2V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      selected: false,
    },
    {
      id: 'water',
      name: 'Water Conservation',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C16.4183 22 20 18.4183 20 14C20 10.5 17 7.5 12 2C7 7.5 4 10.5 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      selected: false,
    },
  ]);
  
  const toggleInterest = (id: string) => {
    setEcoInterests(
      ecoInterests.map(interest => 
        interest.id === id ? { ...interest, selected: !interest.selected } : interest
      )
    );
  };
  
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const avatarColors = [
    'bg-leafy-500',
    'bg-earth-500',
    'bg-sky-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-teal-500',
  ];
  
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-grow">
            <h2 className="text-2xl font-bold text-leafy-800">Create Your Profile</h2>
            <p className="mt-2 text-leafy-600">
              Let's get to know you better so we can personalize your eco-journey.
            </p>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-leafy-700" htmlFor="name">
                What should we call you?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-lg border-leafy-200 shadow-sm focus:border-leafy-500 focus:ring focus:ring-leafy-200 focus:ring-opacity-50"
                placeholder="Your name"
              />
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium text-leafy-700">Choose your eco-avatar</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {avatarColors.map((color, index) => (
                  <button
                    key={index}
                    className={`${color} rounded-full w-12 h-12 flex items-center justify-center transition-all ${selectedAvatar === index ? 'ring-4 ring-leafy-200' : ''}`}
                    onClick={() => setSelectedAvatar(index)}
                  >
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-grow">
            <h2 className="text-2xl font-bold text-leafy-800">Select Your Eco-Interests</h2>
            <p className="mt-2 text-leafy-600">
              Choose the eco-friendly activities you're most interested in. We'll personalize your challenges based on your selections.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {ecoInterests.map((interest) => (
                <button
                  key={interest.id}
                  className={`p-4 rounded-lg border ${
                    interest.selected
                      ? 'border-leafy-500 bg-leafy-50 text-leafy-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  } transition-all flex items-center justify-between`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className="flex items-center">
                    <div className={`${interest.selected ? 'text-leafy-600' : 'text-gray-400'} mr-3`}>
                      {interest.icon}
                    </div>
                    <span className="font-medium">{interest.name}</span>
                  </div>
                  
                  {interest.selected && (
                    <div className="h-5 w-5 bg-leafy-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-grow text-center">
            <div className={`${avatarColors[selectedAvatar]} mx-auto rounded-full h-24 w-24 flex items-center justify-center animate-pulse-green`}>
              <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="mt-6 text-3xl font-bold text-leafy-800">Profile Created!</h2>
            <p className="mt-3 text-leafy-600 max-w-md mx-auto">
              Welcome {name || 'Eco-Warrior'}! Your profile has been set up, and we've customized your challenges based on your interests.
            </p>
            
            <div className="mt-6">
              <p className="font-medium text-leafy-700">Your Selected Interests:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {ecoInterests
                  .filter(i => i.selected)
                  .map(interest => (
                    <span key={interest.id} className="px-3 py-1 bg-leafy-100 text-leafy-700 rounded-full text-sm">
                      {interest.name}
                    </span>
                  ))}
                {ecoInterests.filter(i => i.selected).length === 0 && (
                  <span className="text-leafy-600 text-sm">No interests selected. We'll show you a variety of challenges!</span>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-leafy-600">Ready to start your eco-journey?</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-leafy-50 to-white py-10">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      i <= step ? 'bg-leafy-500 text-white' : 'bg-leafy-100 text-leafy-400'
                    }`}
                  >
                    {i < step ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{i}</span>
                    )}
                  </div>
                  {i < 3 && (
                    <div
                      className={`h-1 w-12 ${
                        i < step ? 'bg-leafy-500' : 'bg-leafy-100'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="min-h-[320px]">{renderStepContent()}</div>
          
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-leafy-200 text-leafy-700 hover:bg-leafy-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button onClick={nextStep} className="eco-button">
              {step === 3 ? 'View Your Dashboard' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSection;
