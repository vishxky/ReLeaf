
import { useState, useEffect } from 'react';
import { X, Award, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

type NotificationProps = {
  onClose: () => void;
};

const AppNotification = ({ onClose }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show notification after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-4 right-4 max-w-sm animate-grow origin-top-right z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-amber-200">
        <div className="bg-amber-50 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center text-amber-800">
            <Award className="h-5 w-5 mr-2 text-amber-600" />
            <span className="font-medium">Streak Achievement!</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-amber-500 hover:text-amber-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="bg-amber-100 rounded-full p-2 mr-3">
              <Check className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-leafy-800">7-day streak achieved!</p>
              <p className="text-xs text-leafy-600">Double points awarded for today's challenges</p>
            </div>
          </div>
          
          <div className="mt-3 flex justify-end">
            <Button 
              size="sm" 
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={onClose}
            >
              Awesome!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNotification;
