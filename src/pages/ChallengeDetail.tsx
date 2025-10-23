import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Upload, Info, Target, Award, ListChecks, Loader2 } from 'lucide-react';
import { DynamicIcon } from '@/components/sections/ChallengeDashboard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { challengeAPI, type Challenge, type UserChallenge } from '@/lib/apiClient';

const ChallengeDetail = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userChallenge, setUserChallenge] = useState<UserChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!challengeId || !user) return;

      setLoading(true);
      setError(null);

      try {
        const data = await challengeAPI.getChallenge(challengeId);
        setChallenge(data.challenge);
        setUserChallenge(data.challenge.userChallenge || null);
      } catch (err: any) {
        console.error("Error fetching challenge details:", err);
        setError("Failed to load challenge details. Please try again.");
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load details.';
        toast({ title: "Error", description: errorMessage, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [challengeId, user, toast]);
  
  const handleCompleteChallenge = async () => {
    if (!user || !challenge || !userChallenge || userChallenge.status !== 'in_progress') {
      toast({ title: "Cannot Complete", description: "Challenge not started or already completed.", variant: "destructive" });
      return;
    }
    
    setCompleteLoading(true);
    setError(null);
    
    try {
      const result = await challengeAPI.completeChallenge(challenge.id);
      
      toast({ 
        title: "Challenge Completed!", 
        description: result.message,
      });
      
      // Update local state
      setUserChallenge(prev => prev ? { 
        ...prev, 
        status: 'completed', 
        completedAt: new Date().toISOString() 
      } : null);
      
      // Refresh profile to update points
      await refreshProfile();

      // Trigger confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      
    } catch (err: any) {
      console.error("Error completing challenge:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Please try again.';
      setError("Failed to complete challenge. Please try again.");
      toast({ title: "Error Completing Challenge", description: errorMessage, variant: "destructive" });
    } finally {
      setCompleteLoading(false);
    }
  };

  const renderLoading = () => (
    <div className="section-container py-12 space-y-6">
      <Skeleton className="h-10 w-1/4" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-10 w-1/3" />
    </div>
  );

  const renderError = () => (
    <div className="section-container py-12 text-center">
      <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
      <p className="text-red-600">{error}</p>
      <Button onClick={() => navigate('/challenges')} className="mt-4">Back to Challenges</Button>
    </div>
  );

  const renderContent = () => {
    if (!challenge) return renderError();
    
    const currentStatus = userChallenge?.status ?? 'not_started';
    
    return (
      <div className="section-container py-12 relative">
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.1}
          />
        )}

        <Link to="/challenges" className="inline-flex items-center text-sm text-leafy-600 hover:text-leafy-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Challenges
        </Link>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-leafy-50 border-b border-leafy-100 p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="badge-icon bg-leafy-100 text-leafy-600 p-3 rounded-lg">
                <DynamicIcon name={challenge.iconName} className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-leafy-800">{challenge.title}</CardTitle>
                <CardDescription className="text-leafy-600 capitalize">{challenge.category} Challenge</CardDescription>
              </div>
            </div>
            <div className="flex items-center text-amber-600 font-medium">
              <Award className="h-5 w-5 mr-1.5" /> 
              <span>{challenge.pointsReward} Points Reward</span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Status Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
              ${currentStatus === 'completed' || currentStatus === 'verified' ? 'bg-green-100 text-green-700' : 
                currentStatus === 'in_progress' ? 'bg-blue-100 text-blue-700' : 
                'bg-gray-100 text-gray-700'}
            `}>
              {currentStatus === 'completed' || currentStatus === 'verified' ? <CheckCircle2 className="h-4 w-4 mr-1.5"/> : 
               currentStatus === 'in_progress' ? <ListChecks className="h-4 w-4 mr-1.5" /> : 
               <Target className="h-4 w-4 mr-1.5" />} 
              Status: <span className='ml-1 font-semibold capitalize'>{currentStatus.replace('_', ' ')}</span>
            </div>

            {/* Description */}
            {challenge.description && (
              <div>
                <h4 className="font-semibold text-leafy-700 mb-1 flex items-center"><Info className="h-4 w-4 mr-2 text-leafy-500"/>Description</h4>
                <p className="text-leafy-600 ml-6">{challenge.description}</p>
              </div>
            )}

            {/* Action Area */}
            {currentStatus === 'in_progress' && (
              <div className="pt-6 border-t border-leafy-100 space-y-4">
                <h4 className="font-semibold text-leafy-700">Complete Your Challenge</h4>
                <Button 
                  className="w-full sm:w-auto eco-button"
                  onClick={handleCompleteChallenge}
                  disabled={completeLoading}
                >
                  {completeLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Check className="h-4 w-4 mr-2"/>}
                  Mark as Completed
                </Button>
                <p className="text-xs text-leafy-500">Click the button above to mark this challenge as completed and earn points!</p>
              </div>
            )}

            {currentStatus === 'completed' && (
              <div className="pt-6 border-t border-leafy-100 text-center">
                <CheckCircle2 className="h-10 w-10 mx-auto text-green-500 mb-2" />
                <p className="font-semibold text-green-700">Challenge Completed!</p>
                <p className="text-sm text-leafy-600">You've earned {challenge.pointsReward} points!</p>
              </div>
            )}
            
            {currentStatus === 'verified' && (
              <div className="pt-6 border-t border-leafy-100 text-center">
                <CheckCircle2 className="h-10 w-10 mx-auto text-green-500 mb-2" />
                <p className="font-semibold text-green-700">Challenge Verified!</p>
                <p className="text-sm text-leafy-600">Points have been awarded.</p>
              </div>
            )}
            
            {currentStatus === 'not_started' && (
              <div className="pt-6 border-t border-leafy-100 text-center">
                <p className="text-leafy-600">You haven't started this challenge yet.</p>
                <Button onClick={() => navigate('/challenges')} className="mt-2" variant="outline">Go to Dashboard</Button>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-leafy-50 to-white flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {loading ? renderLoading() : error ? renderError() : renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
