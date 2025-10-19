
import { useState, useEffect } from 'react';
import { X, Leaf } from 'lucide-react';

type Tip = {
  id: number;
  text: string;
};

const tips: Tip[] = [
  { id: 1, text: "Using a reusable water bottle saves 156 plastic bottles per year!" },
  { id: 2, text: "A 5-minute shower uses 10-25 gallons less water than a bath." },
  { id: 3, text: "LED bulbs use 75% less energy than incandescent lighting." },
  { id: 4, text: "Washing clothes in cold water could save up to 500 pounds of CO2 annually." },
  { id: 5, text: "Recycling one aluminum can saves enough energy to run a TV for 3 hours." },
  { id: 6, text: "Eating one vegetarian meal per week can save the carbon equivalent of driving 1,160 miles." },
];

const EcoTips = () => {
  const [activeTip, setActiveTip] = useState<Tip | null>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show first tip after 3 seconds
    const timer = setTimeout(() => {
      setActiveTip(tips[0]);
      setVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Automatically cycle through tips
  useEffect(() => {
    if (!visible) return;
    
    const tipTimer = setInterval(() => {
      // Hide current tip
      setVisible(false);
      
      // Show next tip after a delay
      setTimeout(() => {
        setActiveTip(prevTip => {
          if (!prevTip) return tips[0];
          const currentIndex = tips.findIndex(t => t.id === prevTip.id);
          const nextIndex = (currentIndex + 1) % tips.length;
          return tips[nextIndex];
        });
        setVisible(true);
      }, 500);
    }, 8000);
    
    return () => clearInterval(tipTimer);
  }, [visible]);
  
  const closeTip = () => {
    setVisible(false);
  };
  
  if (!activeTip || !visible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 max-w-xs animate-grow origin-bottom-right z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-leafy-200">
        <div className="bg-leafy-500 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center text-white">
            <Leaf className="h-4 w-4 mr-2" />
            <span className="font-medium text-sm">Eco Tip</span>
          </div>
          <button 
            onClick={closeTip} 
            className="text-leafy-100 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-leafy-700 text-sm">
            {activeTip.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoTips;
