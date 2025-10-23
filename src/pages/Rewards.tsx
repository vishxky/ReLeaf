import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Leaf, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { rewardAPI, type Reward } from '@/lib/apiClient';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const { profile, loading: authLoading, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(true);
  const [errorRewards, setErrorRewards] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoadingRewards(true);
      setErrorRewards(null);
      try {
        const data = await rewardAPI.getRewards();
        setRewards(data.rewards);
      } catch (err: any) {
        console.error("Error fetching rewards:", err);
        setErrorRewards("Failed to load rewards.");
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load rewards.';
        toast({ title: "Error", description: errorMessage, variant: "destructive" });
      } finally {
        setLoadingRewards(false);
      }
    };
    fetchRewards();
  }, [toast]);
  
  const marketplaceRewards = rewards.filter(r => r.type === 'marketplace');
  const donationRewards = rewards.filter(r => r.type === 'donation');
  const exclusiveRewards = rewards.filter(r => r.type === 'exclusive');

  const currentPoints = profile?.points ?? 0;
  
  const handleRedeem = async (reward: Reward) => {
    try {
      const result = await rewardAPI.redeemReward(reward.id);
      toast({ 
        title: "Success!", 
        description: result.message,
      });
      // Refresh profile to get updated points
      await refreshProfile();
    } catch (err: any) {
      console.error("Error redeeming reward:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to redeem reward.';
      toast({ 
        title: "Error", 
        description: errorMessage, 
        variant: "destructive" 
      });
    }
  }
  
  const renderRewardCard = (reward: Reward) => (
    <Card key={reward.id} className="flex flex-col justify-between reward-card overflow-hidden">
      <CardHeader className="p-0">
        {reward.imageUrl ? (
          <img 
            src={reward.imageUrl} 
            alt={reward.title} 
            className="w-full h-40 object-cover" 
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        ) : (
          <div className="w-full h-40 bg-leafy-100 flex items-center justify-center">
            <Gift className="h-12 w-12 text-leafy-300" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold text-leafy-800 mb-1 leading-tight">{reward.title}</CardTitle>
        {reward.partnerName && <p className="text-xs text-leafy-500 mb-2">Partner: {reward.partnerName}</p>}
        <CardDescription className="text-sm text-leafy-600">{reward.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 bg-leafy-50/50 border-t border-leafy-100 flex justify-between items-center">
        <div className="flex items-center font-semibold text-leafy-700">
          <Leaf className="h-4 w-4 mr-1 text-leafy-500" />
          {reward.pointsCost} pts
        </div>
        <Button 
          size="sm" 
          className="eco-button-outline text-xs" 
          onClick={() => handleRedeem(reward)}
          disabled={currentPoints < reward.pointsCost}
        >
          {currentPoints >= reward.pointsCost ? 'Redeem' : 'Need More Pts'}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderLoading = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-72 rounded-lg" />)}
    </div>
  );
  
  const renderError = (message: string) => (
    <div className="text-center py-12">
      <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
      <p className="text-red-600">{message}</p>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Rewards & Achievements</h2>
            <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
              Turn your eco-friendly actions into real-world rewards!
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-leafy-500 text-white p-3 rounded-full mr-4">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-leafy-600">Your Points Balance</p>
                {authLoading ? (
                  <Skeleton className="h-8 w-24 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-leafy-800">{currentPoints}</p>
                )}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="marketplace" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto w-full md:w-fit">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="exclusive">Exclusive Items</TabsTrigger>
            </TabsList>
            
            <TabsContent value="marketplace" className="animate-grow origin-top">
              {loadingRewards ? renderLoading() : errorRewards ? renderError(errorRewards) : (
                marketplaceRewards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketplaceRewards.map(renderRewardCard)}
                  </div>
                ) : (
                  <p className="text-center text-leafy-600 py-8">No marketplace rewards available right now.</p>
                )
              )}
            </TabsContent>
            
            <TabsContent value="donations" className="animate-grow origin-top">
              {loadingRewards ? renderLoading() : errorRewards ? renderError(errorRewards) : (
                donationRewards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donationRewards.map(renderRewardCard)}
                  </div>
                ) : (
                  <p className="text-center text-leafy-600 py-8">No donation rewards available right now.</p>
                )
              )}
            </TabsContent>
            
            <TabsContent value="exclusive" className="animate-grow origin-top">
              {loadingRewards ? renderLoading() : errorRewards ? renderError(errorRewards) : (
                exclusiveRewards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exclusiveRewards.map(renderRewardCard)}
                  </div>
                ) : (
                  <p className="text-center text-leafy-600 py-8">No exclusive rewards available right now.</p>
                )
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rewards;
