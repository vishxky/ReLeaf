import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Define the shape of the profile data (add more fields as needed)
interface Profile {
  id: string;
  name?: string;
  age?: number;
  points?: number; // Add points
  login_streak?: number; // Add login streak
  // Add other profile fields here
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>; // Add a function to manually refresh profile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Helper function to fetch profile ---
  const fetchProfile = async (userId: string) => {
    // Reset profile state before fetching
    // setProfile(null); // Optional: Decide if you want brief loading state on every profile fetch
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`id, name, age, points, login_streak`)
        .eq('id', userId)
        .single();

      if (error && status !== 406) {
        // 406 means no row found, treat as error for existing users
        throw error;
      }

      // If data is explicitly null (e.g., row exists but cols are null) or data is found
      // Set profile state. Allows handling cases where profile exists but has no data yet.
      setProfile(data as Profile | null);

    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
      setProfile(null); // Explicitly set profile to null on fetch error
    }
  };
  // --- End helper function ---

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const initializeAuth = async () => {
      try {
        // Initial check for session on load
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (isMounted) {
          setSession(initialSession);
          const currentUser = initialSession?.user ?? null;
          setUser(currentUser);
          if (currentUser) {
            await fetchProfile(currentUser.id); // Fetch profile if session exists
          }
          setLoading(false);
        }
      } catch (error: any) {
        console.error("Error during initial auth load:", error.message);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        // Note: Supabase client handles token refresh internally.
        // This listener mainly reacts to SIGNED_IN, SIGNED_OUT, PASSWORD_RECOVERY etc.
        if (!isMounted) return;

        const currentSessionUser = newSession?.user ?? null;
        setSession(newSession);
        setUser(currentSessionUser);

        if (currentSessionUser) {
          // User is signed in or session refreshed
          await fetchProfile(currentSessionUser.id); 
        } else {
          // User signed out or session expired without refresh
          setProfile(null); // Clear profile on sign out
        }
        // Manage loading state based on session presence? 
        // Or rely on profile loading? For now, keep it simple.
        // setLoading(false); // Might cause flicker if profile fetch takes time
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true); // Indicate loading state during sign out
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        // Still clear state even if Supabase signout fails?
      }
      // Explicitly clear local state immediately for faster UI update
      // The onAuthStateChange listener will also fire, but this is more immediate.
      setSession(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      // Ensure state is cleared even if unexpected error occurs
      setSession(null);
      setUser(null);
      setProfile(null);
    } finally {
       // No need for mount check here, just ensure loading is false
       setLoading(false); 
    }
  };

  // Function to allow manual profile refresh
  const refreshProfile = async () => {
    if (user) {
      // Optionally set loading state here if desired
      await fetchProfile(user.id);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 