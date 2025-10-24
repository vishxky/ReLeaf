import api from './api';

// Types
export interface User {
  id: string;
  email: string;
  createdAt: string;
  loginStreak?: number;
  lastLogin?: string;
}

export interface Profile {
  id: string;
  name?: string;
  age?: number;
  points: number;
  loginStreak: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string | null;
  category: 'daily' | 'weekly' | 'monthly';
  pointsReward: number;
  iconName: string | null;
  createdAt: string;
  userChallenge?: UserChallenge | null;
}

export interface UserChallenge {
  id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'verified';
  startedAt: string | null;
  completedAt: string | null;
  proofData?: any;
}

export interface Reward {
  id: string;
  title: string;
  description: string | null;
  type: 'marketplace' | 'donation' | 'exclusive' | 'badge';
  pointsCost: number;
  imageUrl: string | null;
  partnerName: string | null;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  profile: Profile;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  username: string;
  email: string;
  points: number;
  loginStreak: number;
  joinedDate: string;
}

export interface CommunityPost {
  id: string;
  content: string;
  likes: number;
  comments: number;
  isDemo: boolean;
  isPinned: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
  };
}

// Authentication API
export const authAPI = {
  register: async (email: string, password: string, name?: string, age?: number): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, password, name, age });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getMe: async (): Promise<{ success: boolean; user: User; profile: Profile | null }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/request-reset', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  }
};

// Profile API
export const profileAPI = {
  getProfile: async (userId: string): Promise<{ success: boolean; profile: Profile }> => {
    const response = await api.get(`/profiles/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: string, data: { name?: string; age?: number }): Promise<{ success: boolean; profile: Profile }> => {
    const response = await api.put(`/profiles/${userId}`, data);
    return response.data;
  }
};

// Challenge API
export const challengeAPI = {
  getChallenges: async (): Promise<{ success: boolean; challenges: Challenge[] }> => {
    const response = await api.get('/challenges');
    return response.data;
  },

  getChallenge: async (id: string): Promise<{ success: boolean; challenge: Challenge }> => {
    const response = await api.get(`/challenges/${id}`);
    return response.data;
  },

  startChallenge: async (id: string): Promise<{ success: boolean; message: string; userChallenge: UserChallenge }> => {
    const response = await api.post(`/challenges/${id}/start`);
    return response.data;
  },

  completeChallenge: async (id: string, proofData?: any): Promise<{ 
    success: boolean; 
    message: string; 
    userChallenge: UserChallenge;
    pointsEarned: number;
    newTotalPoints: number;
  }> => {
    const response = await api.put(`/challenges/${id}/complete`, { proofData });
    return response.data;
  }
};

// Reward API
export const rewardAPI = {
  getRewards: async (): Promise<{ success: boolean; rewards: Reward[] }> => {
    const response = await api.get('/rewards');
    return response.data;
  },

  redeemReward: async (id: string): Promise<{
    success: boolean;
    message: string;
    pointsSpent: number;
    remainingPoints: number;
  }> => {
    const response = await api.post(`/rewards/${id}/redeem`);
    return response.data;
  }
};

// Leaderboard API
export const leaderboardAPI = {
  getGlobalLeaderboard: async (limit = 50): Promise<{
    success: boolean;
    leaderboard: LeaderboardEntry[];
    totalUsers: number;
  }> => {
    const response = await api.get(`/leaderboard/global?limit=${limit}`);
    return response.data;
  },

  getUserRank: async (userId: string): Promise<{
    success: boolean;
    rank: number;
    points: number;
  }> => {
    const response = await api.get(`/leaderboard/rank/${userId}`);
    return response.data;
  }
};

// Community API
export const communityAPI = {
  getPosts: async (limit = 20, skip = 0): Promise<{
    success: boolean;
    posts: CommunityPost[];
    total: number;
  }> => {
    const response = await api.get(`/community/posts?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  createPost: async (content: string): Promise<{
    success: boolean;
    message: string;
    post: CommunityPost;
  }> => {
    const response = await api.post('/community/posts', { content });
    return response.data;
  },

  toggleLike: async (postId: string): Promise<{
    success: boolean;
    liked: boolean;
    likesCount: number;
  }> => {
    const response = await api.post(`/community/posts/${postId}/like`);
    return response.data;
  },

  deletePost: async (postId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete(`/community/posts/${postId}`);
    return response.data;
  }
};

