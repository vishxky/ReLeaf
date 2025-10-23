import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Check, Loader2, AlertCircle, Play, Eye } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import * as LucideIcons from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from 'react-router-dom';
import { challengeAPI, type Challenge } from '@/lib/apiClient';

export const DynamicIcon = ({ name, ...props }: { name: string | null } & LucideIcons.LucideProps) => {
  const IconComponent = name ? (LucideIcons as any)[name] : Leaf;
  if (!IconComponent) { 
    return <Leaf {...props} />;
  }
  return <IconComponent {...props} />;
};

const ChallengeDashboard = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startLoading, setStartLoading] = useState<Record<string, boolean>>({});

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const data = await challengeAPI.getChallenges();
        setChallenges(data.challenges);
      } catch (err: any) {
        console.error("Error fetching challenges:", err);
        setError("Failed to load challenges. Please try again.");
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load challenges.';
        toast({ title: "Error", description: errorMessage, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChallenges();
    }
  }, [user, toast]);

  const handleStartChallenge = async (challengeId: string) => {
    if (!user) return;

    setStartLoading(prev => ({ ...prev, [challengeId]: true }));

    try {
      const result = await challengeAPI.startChallenge(challengeId);
      
      toast({ title: "Challenge Started!", description: "Good luck!" });

      // Update local state
      setChallenges(prevChallenges =>
        prevChallenges.map(c =>
          c.id === challengeId
            ? {
                ...c,
                userChallenge: result.userChallenge
              }
            : c
        )
      );
      
    } catch (err: any) {
      console.error("Error starting challenge:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Please try again.';
      toast({ title: "Error Starting Challenge", description: errorMessage, variant: "destructive" });
    } finally {
      setStartLoading(prev => ({ ...prev, [challengeId]: false }));
    }
  };

  const renderChallengeCard = (challenge: Challenge) => {
    const userChallengeData = challenge.userChallenge;
    const status = userChallengeData?.status || 'not_started';
    const isLoading = startLoading[challenge.id] || false;

    return (
      <div key={challenge.id} className="challenge-card flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <div className="badge-icon bg-leafy-100 text-leafy-600">
            <DynamicIcon name={challenge.iconName} className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-leafy-600">+{challenge.pointsReward} pts</span>
        </div>
        
        <div className="flex-grow mb-3">
          <h3 className="font-bold text-lg text-leafy-800 mb-1">{challenge.title}</h3>
          {challenge.description && (
            <p className="text-leafy-600 text-sm line-clamp-2">{challenge.description}</p>
          )}
        </div>
      
        <div className="flex justify-between items-center mt-auto">
          <div className="bg-leafy-50 px-3 py-1 rounded-full text-xs text-leafy-700 font-medium capitalize">
            {challenge.category} Challenge
          </div>
      
          {status === 'not_started' && (
            <Button 
              variant="outline"
              size="sm"
              className="text-leafy-700 border-leafy-300 hover:bg-leafy-50 text-xs"
              onClick={() => handleStartChallenge(challenge.id)}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Play className="h-4 w-4 mr-1" />}
              Start
            </Button>
          )}
          {status === 'in_progress' && (
            <Button 
              variant="link" 
              size="sm"
              className="text-leafy-600 hover:text-leafy-700 p-0 h-auto text-xs font-medium"
              onClick={() => navigate(`/challenges/${challenge.id}`)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Progress
            </Button>
          )}
          {(status === 'completed' || status === 'verified') && (
            <div className="flex items-center text-xs text-green-600 font-medium">
              <Check className="h-4 w-4 mr-1 text-green-500" />
              Completed
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="section-container py-12">
        <div className="text-center mb-10"><Skeleton className="h-8 w-72 mx-auto"/></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 rounded-lg" />)}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="section-container py-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <p className="text-red-600">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    )
  }

  const dailyChallenges = challenges.filter(c => c.category === 'daily');
  const weeklyChallenges = challenges.filter(c => c.category === 'weekly');
  const monthlyChallenges = challenges.filter(c => c.category === 'monthly');
  
  return (
    <div className="bg-leafy-50/50 min-h-screen py-12">
      <div className="section-container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Your Eco-Challenge Dashboard</h2>
          <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
            Choose from personalized challenges. Complete them to earn points, badges, and make a real impact!
          </p>
        </div>
        
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto block w-fit">
            <TabsTrigger value="daily" className="text-sm">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-sm">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-sm">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="animate-grow">
            {dailyChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dailyChallenges.map(renderChallengeCard)}
              </div>
            ) : (
              <p className="text-center text-leafy-600 py-8">No daily challenges available right now.</p>
            )}
          </TabsContent>
          
          <TabsContent value="weekly" className="animate-grow">
            {weeklyChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklyChallenges.map(renderChallengeCard)}
              </div>
            ) : (
              <p className="text-center text-leafy-600 py-8">No weekly challenges available right now.</p>
            )}
          </TabsContent>
          
          <TabsContent value="monthly" className="animate-grow">
            {monthlyChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthlyChallenges.map(renderChallengeCard)}
              </div>
            ) : (
              <p className="text-center text-leafy-600 py-8">No monthly challenges available right now.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChallengeDashboard;
