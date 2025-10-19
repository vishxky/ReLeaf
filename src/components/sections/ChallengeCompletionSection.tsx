
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Upload, MapPin, Clock, Check, Leaf, ArrowRight } from 'lucide-react';

const ChallengeCompletionSection = ({ onContinue }: { onContinue: () => void }) => {
  const [step, setStep] = useState<'upload' | 'success'>('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 2000);
  };
  
  const challenge = {
    id: '1',
    title: 'Reusable Cup Hero',
    description: 'Use a reusable coffee cup or water bottle today.',
    points: 10,
    badge: 'Reusable Rookie',
    impact: 'Saved 1 disposable cup from landfill',
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-leafy-50 to-white py-10">
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {step === 'upload' ? (
            <div>
              <div className="bg-leafy-500 p-6 text-center text-white">
                <h2 className="text-2xl font-bold">Complete Your Challenge</h2>
                <p className="mt-2 opacity-90">Upload proof to earn points and unlock badges!</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="badge-icon h-12 w-12">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-leafy-800">{challenge.title}</h3>
                    <p className="text-sm text-leafy-600">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="border-t border-b border-leafy-100 py-4 my-4">
                  <h4 className="font-medium text-leafy-700 mb-3">Upload Proof</h4>
                  <div className="border-2 border-dashed border-leafy-200 rounded-lg p-8 text-center">
                    <div className="bg-leafy-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-leafy-600" />
                    </div>
                    <p className="text-sm text-leafy-700 mb-2">Drag & drop your photo here</p>
                    <p className="text-xs text-leafy-500 mb-4">Upload a photo of you using your reusable cup/bottle today</p>
                    <div className="flex justify-center gap-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Camera className="h-3 w-3 mr-1" /> Take Photo
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Upload className="h-3 w-3 mr-1" /> Upload File
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-leafy-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-leafy-600 mr-2" />
                      <p className="text-sm font-medium text-leafy-700">Location</p>
                    </div>
                    <p className="text-sm text-leafy-600">Current Location</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-leafy-600 mr-2" />
                      <p className="text-sm font-medium text-leafy-700">Timestamp</p>
                    </div>
                    <p className="text-sm text-leafy-600">{new Date().toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-leafy-600">
                    You'll earn <span className="font-bold text-leafy-800">{challenge.points} points</span> and unlock the <span className="font-bold text-leafy-800">{challenge.badge}</span> badge!
                  </p>
                  <Button 
                    className="eco-button" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Proof'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center relative overflow-hidden">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full animate-confetti"
                  style={{
                    backgroundColor: ['#48a948', '#FFC107', '#FF5722', '#2196F3'][i % 4],
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${1 + Math.random() * 3}s`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                ></div>
              ))}
              
              <div className="bg-leafy-500 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-12 w-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-leafy-800 mb-4">Challenge Complete!</h2>
              <p className="text-leafy-600 text-lg mb-6">
                Congratulations! You've earned 10 points and unlocked the "Reusable Rookie" badge!
              </p>
              
              <div className="max-w-sm mx-auto">
                <div className="bg-leafy-50 rounded-lg p-5 mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-white rounded-full p-3">
                      <Leaf className="h-6 w-6 text-leafy-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-leafy-800 mb-1">Environmental Impact</h3>
                  <p className="text-leafy-600">{challenge.impact}</p>
                  
                  <div className="mt-4">
                    <div className="progress-bar">
                      <div className="progress-fill animate-progress" style={{animationDuration: '1.5s'}}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-leafy-600">Level Progress</span>
                      <span className="text-xs font-medium text-leafy-700">+10%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="eco-button px-8" onClick={onContinue}>
                    See More Challenges <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <p className="mt-4 text-sm text-leafy-500">
                  You're making the world a greener place, one challenge at a time!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCompletionSection;
