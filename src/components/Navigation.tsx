import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, LogOut, LogIn, UserPlus, Flame, Award, Star, Trophy, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session, user, profile, loading, signOut } = useAuth();
  const [signOutLoading, setSignOutLoading] = useState(false);
  
  const handleSignOut = async () => {
    setSignOutLoading(true);
    await signOut();
    setSignOutLoading(false);
    setIsOpen(false);
    navigate('/');
  };
  
  const baseNavItems = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    { name: "Rewards", path: "/rewards" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];
  
  const navItems = session
    ? [{ name: "Profile", path: "/profile" }, ...baseNavItems]
    : baseNavItems;
  
  const AuthButtons = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-2 ml-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      );
    }
    if (session) {
      return (
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center space-x-2 ml-4">
            {profile && (
              <div className="flex items-center space-x-2 bg-leafy-100 text-leafy-700 px-2 py-1 rounded-full text-sm font-medium hidden sm:flex">
                {profile.points !== undefined && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-1 cursor-default">
                        <Leaf className="h-4 w-4 text-leafy-500" />
                        <span>{profile.points}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Points: {profile.points}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {profile.login_streak !== undefined && profile.login_streak > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                       <div className="flex items-center space-x-1 border-l border-leafy-200 pl-2 cursor-default">
                         <Flame className="h-4 w-4 text-orange-500" />
                         <span>{profile.login_streak}</span>
                       </div>
                    </TooltipTrigger>
                     <TooltipContent>
                      <p>Current Streak: {profile.login_streak} days</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {profile.login_streak !== undefined && profile.login_streak >= 3 && (
                   <div className="flex items-center space-x-1 border-l border-leafy-200 pl-2">
                     {(() => {
                        const streak = profile.login_streak || 0;
                        let BadgeIcon: React.ElementType | null = null;
                        let badgeTitle = "";

                        if (streak >= 30) { BadgeIcon = Medal; badgeTitle = "30+ Day Streak!"; }
                        else if (streak >= 14) { BadgeIcon = Trophy; badgeTitle = "14+ Day Streak!"; }
                        else if (streak >= 7) { BadgeIcon = Star; badgeTitle = "7+ Day Streak!"; }
                        else if (streak >= 3) { BadgeIcon = Award; badgeTitle = "3+ Day Streak!"; }

                        if (BadgeIcon) {
                          return (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <BadgeIcon className="h-4 w-4 text-yellow-500 cursor-default" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{badgeTitle}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        }
                        return null;
                     })()}
                   </div>
                )}
              </div>
            )}
            <span className="text-sm text-leafy-700 hidden lg:inline">
              {user?.email} 
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              disabled={signOutLoading}
              className="text-leafy-800 hover:bg-leafy-100"
            >
              <LogOut className="h-4 w-4 mr-1" />
              {signOutLoading ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </TooltipProvider>
      );
    }
    return (
      <div className="flex items-center space-x-2 ml-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { navigate('/login'); setIsOpen(false); }}
          className="text-leafy-800 hover:bg-leafy-100"
        >
           <LogIn className="h-4 w-4 mr-1" />
           Sign In
        </Button>
        <Button
          size="sm"
          onClick={() => { navigate('/register'); setIsOpen(false); }}
          className="eco-button"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Sign Up
        </Button>
      </div>
    );
  };
  
  return (
    <nav className="bg-white/90 backdrop-blur-sm py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-leafy-500 text-white p-2 rounded-full">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-heading font-bold text-leafy-800">ReLeaf</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={location.pathname === item.path ? "active-nav-item" : "nav-item"}
              >
                {item.name}
              </Link>
            ))}
            <AuthButtons />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-leafy-800 hover:text-leafy-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-3 animate-grow origin-top">
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={location.pathname === item.path ? "active-nav-item" : "nav-item"}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-leafy-100">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
