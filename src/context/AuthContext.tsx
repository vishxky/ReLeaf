import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authAPI, type User, type Profile } from '@/lib/apiClient';

interface AuthContextType {
  session: { user: User } | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to fetch current user
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const data = await authAPI.getMe();
      setUser(data.user);
      setProfile(data.profile);
    } catch (error: any) {
      console.error('Error fetching current user:', error);
      // If token is invalid, clear it
      localStorage.removeItem('token');
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const data = await authAPI.login(email, password);
      
      // Store token
      localStorage.setItem('token', data.token);
      
      // Update state
      setUser(data.user);
      setProfile(data.profile);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string) => {
    try {
      const data = await authAPI.register(email, password);
      
      // Store token
      localStorage.setItem('token', data.token);
      
      // Update state
      setUser(data.user);
      setProfile(data.profile);
    } catch (error: any) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    setLoading(true);
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      
      // Clear state
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh profile function
  const refreshProfile = async () => {
    if (user) {
      try {
        const data = await authAPI.getMe();
        setProfile(data.profile);
      } catch (error: any) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  const value = {
    session: user ? { user } : null,
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
    login,
    register
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
