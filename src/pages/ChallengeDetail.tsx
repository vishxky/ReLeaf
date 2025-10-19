import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Upload, Info, Target, Award, ListChecks, Loader2 } from 'lucide-react';
import { DynamicIcon } from '@/components/sections/ChallengeDashboard'; // Reuse the dynamic icon helper
import Confetti from 'react-confetti'; // Import Confetti
import { useWindowSize } from 'react-use'; // Import useWindowSize hook

// Reuse types, maybe move to a types file later
interface Challenge {
  id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  proof_requirement: string | null;
  category: string | null;
  points_reward: number;
  icon_name: string | null;
  created_at: string;
}

interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'verified';
  started_at: string | null;
  completed_at: string | null;
  proof_data: any | null;
  created_at: string;
  updated_at: string | null;
}

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
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const { width, height } = useWindowSize(); // Get window size for confetti

  useEffect(() => {
    const fetchDetails = async () => {
      if (!challengeId || !user) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch challenge details
        const { data: challengeData, error: challengeError } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', challengeId)
          .single();

        if (challengeError) throw challengeError;
        setChallenge(challengeData);

        // Fetch user's progress for this challenge
        const { data: userChallengeData, error: userChallengeError } = await supabase
          .from('user_challenges')
          .select('*')
          .eq('challenge_id', challengeId)
          .eq('user_id', user.id)
          .maybeSingle(); // Use maybeSingle as they might not have started it

        if (userChallengeError) throw userChallengeError;
        setUserChallenge(userChallengeData);

      } catch (err: any) {
        console.error("Error fetching challenge details:", err);
        setError("Failed to load challenge details. Please try again.");
        toast({ title: "Error", description: err.message || "Failed to load details.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [challengeId, user, toast]);
  
  const handleCompleteChallenge = async () => {
    // Ensure we have all necessary data and the status is correct
    if (!user || !challenge || !userChallenge || userChallenge.status !== 'in_progress') {
        toast({ title: "Cannot Complete", description: "Challenge not started or already completed.", variant: "destructive" });
        return;
    }
    
    setCompleteLoading(true);
    setError(null); // Clear previous errors
    
    try {
        // 1. Update user_challenges status
        const { error: updateStatusError } = await supabase
          .from('user_challenges')
          .update({
              status: 'completed', 
              completed_at: new Date()
          })
          .eq('id', userChallenge.id) // Update the specific user_challenge record
          .eq('user_id', user.id); // Extra RLS check redundancy
          
        if (updateStatusError) throw updateStatusError;
        
        // 2. Increment user points using the RPC function
        const { error: incrementPointsError } = await supabase.rpc('increment_user_points', {
           user_id_input: user.id,
           points_to_add: challenge.points_reward
        });
        
        if (incrementPointsError) {
           // Attempt to rollback status update? Difficult without transactions client-side.
           // Log error and notify user. Points might be out of sync.
           console.error("Error incrementing points after status update:", incrementPointsError);
           toast({ title: "Points Award Error", description: "Challenge marked complete, but failed to award points. Please contact support.", variant: "destructive", duration: 10000 });
           // Still update UI locally to show completed
           setUserChallenge(prev => prev ? { ...prev, status: 'completed', completed_at: new Date().toISOString() } : null);
           throw incrementPointsError; // Throw to prevent success toast
        }
        
        // Success!
        toast({ 
           title: "Challenge Completed!", 
           description: `You earned ${challenge.points_reward} points!`,
        });
        
        // Update local state to reflect completion
        setUserChallenge(prev => prev ? { ...prev, status: 'completed', completed_at: new Date().toISOString() } : null);
        
        // Refresh the profile data in the context to update points everywhere
        await refreshProfile(); 

        // Trigger confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
        
    } catch (err: any) {
       console.error("Error completing challenge:", err);
       setError("Failed to complete challenge. Please try again."); // Show general error below button
       toast({ title: "Error Completing Challenge", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
       setCompleteLoading(false);
    }
  };

  // --- Render Logic --- 
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
     if (!challenge) return renderError(); // Should have challenge if no error
     
     // Determine status for rendering based on the latest state
     const currentStatus = userChallenge?.status ?? 'not_started'; 
     
     return (
       <div className="section-container py-12 relative"> {/* Add relative positioning for confetti */}
          {/* Confetti Overlay */}
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
                      <DynamicIcon name={challenge.icon_name} className="h-6 w-6" />
                   </div>
                   <div>
                      <CardTitle className="text-2xl font-bold text-leafy-800">{challenge.title}</CardTitle>
                      <CardDescription className="text-leafy-600 capitalize">{challenge.category} Challenge</CardDescription>
                   </div>
                </div>
                <div className="flex items-center text-amber-600 font-medium">
                  <Award className="h-5 w-5 mr-1.5" /> 
                  <span>{challenge.points_reward} Points Reward</span>
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

                {/* Instructions */}
                {challenge.instructions && (
                  <div>
                     <h4 className="font-semibold text-leafy-700 mb-1 flex items-center"><ListChecks className="h-4 w-4 mr-2 text-leafy-500"/>Instructions</h4>
                     <p className="text-leafy-600 ml-6 whitespace-pre-line">{challenge.instructions}</p> 
                  </div>
                )}

                {/* Proof Requirement */}
                {challenge.proof_requirement && (
                  <div>
                     <h4 className="font-semibold text-leafy-700 mb-1 flex items-center"><Upload className="h-4 w-4 mr-2 text-leafy-500"/>Proof Required</h4>
                     <p className="text-leafy-600 ml-6">{challenge.proof_requirement}</p>
                  </div>
                )}

                {/* Action Area */}
                {currentStatus === 'in_progress' && (
                   <div className="pt-6 border-t border-leafy-100 space-y-4">
                      <h4 className="font-semibold text-leafy-700">Complete Your Challenge</h4>
                      <Button 
                         className="w-full sm:w-auto eco-button" // Removed margins, let parent div handle spacing 
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
                      {/* TODO: Show completion date from userChallenge.completed_at */} 
                      <p className="text-sm text-leafy-600">Waiting for verification (if applicable).</p>
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