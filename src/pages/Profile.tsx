import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUp, Award, Leaf, Calendar, Check, Star, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-leafy-500"></div>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { session, user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [signOutLoading, setSignOutLoading] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login');
    }
  }, [loading, session, navigate]);

  const handleSignOut = async () => {
    setSignOutLoading(true);
    await signOut();
    setSignOutLoading(false);
  };

  if (loading || !profile || !user) {
    return (
      <div className="min-h-screen bg-leafy-50/30 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Unknown";
  const displayName = profile.name || user.email?.split('@')[0] || 'User';
  const displayUsername = user.email?.split('@')[0] || 'username';
  const displayAvatarFallback = displayName.charAt(0).toUpperCase();
  const displayPoints = profile.points ?? 0;

  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-leafy-100">
                <AvatarImage src="/placeholder.svg" alt={displayName} />
                <AvatarFallback className="bg-leafy-200 text-leafy-800 text-3xl">
                  {displayAvatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-leafy-800">{displayName}</h1>
                <p className="text-leafy-600">@{displayUsername}</p>
                {profile.age && <p className="text-sm text-leafy-600">Age: {profile.age}</p>}
                <p className="text-sm text-leafy-600">Joined: {joinDate}</p>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={handleSignOut}
                  disabled={signOutLoading}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {signOutLoading ? 'Signing Out...' : 'Sign Out'}
                </Button>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-leafy-500" />
                  <span className="font-bold text-lg text-leafy-800">{displayPoints} pts</span>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto w-full md:w-fit">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 animate-grow origin-top">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Welcome, {displayName}!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-leafy-600">
                    This is your profile overview. Check your settings, track your points, and view your achievements.
                    More details like badges, stats, and activity log will be added soon!
                  </p>
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-leafy-50 rounded-lg p-4 text-center">
                      <Leaf className="h-6 w-6 text-leafy-600 mx-auto mb-1" />
                      <div className="font-bold text-xl text-leafy-800">{displayPoints}</div>
                      <div className="text-xs text-leafy-600">Total Points</div>
                    </div>
                    <div className="bg-leafy-50 rounded-lg p-4 text-center opacity-50">
                      <Check className="h-6 w-6 text-leafy-600 mx-auto mb-1" />
                      <div className="font-bold text-xl text-leafy-800">?</div>
                      <div className="text-xs text-leafy-600">Challenges Done</div>
                    </div>
                    <div className="bg-leafy-50 rounded-lg p-4 text-center opacity-50">
                      <Award className="h-6 w-6 text-amber-500 mx-auto mb-1" />
                      <div className="font-bold text-xl text-leafy-800">?</div>
                      <div className="text-xs text-leafy-600">Badges Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="animate-grow origin-top">
              <ProfileForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
