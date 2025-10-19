
import React from 'react';
import { ArrowUp, Award, Star, Calendar, User, Leaf } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
};

type Leaderboard = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  change: number;
};

const ProgressSection = () => {
  const [badges] = React.useState<Badge[]>([
    {
      id: '1',
      name: 'Reusable Rookie',
      description: 'Used a reusable cup 5 times',
      icon: <span className="text-2xl">🥤</span>,
      unlocked: true,
    },
    {
      id: '2',
      name: 'Water Saver',
      description: 'Took 5 short showers',
      icon: <span className="text-2xl">💧</span>,
      unlocked: true,
    },
    {
      id: '3',
      name: 'Digital Declutterer',
      description: 'Cleaned up your digital footprint',
      icon: <span className="text-2xl">💻</span>,
      unlocked: false,
    },
    {
      id: '4',
      name: 'Green Thumb',
      description: 'Planted your first garden',
      icon: <span className="text-2xl">🌱</span>,
      unlocked: false,
    },
    {
      id: '5',
      name: 'Pedal Power',
      description: 'Biked instead of driving for 3 days',
      icon: <span className="text-2xl">🚲</span>,
      unlocked: true,
    },
    {
      id: '6',
      name: 'Zero Waste Champion',
      description: 'Completed a zero-waste week',
      icon: <span className="text-2xl">♻️</span>,
      unlocked: false,
    },
  ]);
  
  const [leaderboard] = React.useState<Leaderboard[]>([
    { id: '1', name: 'EcoWarrior92', avatar: 'bg-emerald-500', points: 1250, level: 5, change: 0 },
    { id: '2', name: 'GreenThumb', avatar: 'bg-leafy-500', points: 980, level: 4, change: 2 },
    { id: '3', name: 'You', avatar: 'bg-earth-500', points: 875, level: 3, change: 1 },
    { id: '4', name: 'SustainableLife', avatar: 'bg-amber-500', points: 820, level: 3, change: -1 },
    { id: '5', name: 'PlantLover', avatar: 'bg-sky-500', points: 750, level: 3, change: 0 },
  ]);
  
  const [filter, setFilter] = React.useState<'friends' | 'global'>('global');
  
  const stats = [
    { name: 'Total Points', value: '875', icon: <Star className="h-5 w-5 text-amber-500" /> },
    { name: 'Current Level', value: '3', icon: <User className="h-5 w-5 text-leafy-500" /> },
    { name: 'Badges Earned', value: '3', icon: <Award className="h-5 w-5 text-sky-500" /> },
    { name: 'Challenges Done', value: '12', icon: <Leaf className="h-5 w-5 text-emerald-500" /> },
  ];
  
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="section-container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Your Eco Progress</h2>
          <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
            Track your achievements, badges, and see how you compare to other eco-warriors in your community!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress & Stats Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress Card */}
            <div className="eco-card p-6">
              <h3 className="text-xl font-bold text-leafy-800 mb-4">Your Level Progress</h3>
              
              <div className="flex items-center mb-2">
                <div className="bg-leafy-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-grow mx-4">
                  <div className="progress-bar h-3">
                    <div className="progress-fill w-[65%]"></div>
                  </div>
                </div>
                <div className="bg-leafy-100 text-leafy-800 rounded-full h-10 w-10 flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-leafy-600">Level 3: Eco Enthusiast</span>
                <span className="text-leafy-700 font-medium">875 / 1000 points</span>
              </div>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-leafy-50 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-leafy-800">{stat.value}</p>
                    <p className="text-xs text-leafy-600">{stat.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Badges Card */}
            <div className="eco-card p-6">
              <h3 className="text-xl font-bold text-leafy-800 mb-4">Your Eco-Badges</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`text-center p-3 rounded-lg ${
                      badge.unlocked 
                        ? 'bg-white shadow hover:shadow-md' 
                        : 'bg-gray-50 opacity-50'
                    } transition-all`}
                    title={badge.unlocked ? badge.description : `Locked: ${badge.description}`}
                  >
                    <div className="h-14 w-14 mx-auto flex items-center justify-center bg-leafy-100 rounded-full mb-2">
                      {badge.icon}
                    </div>
                    <p className="text-xs font-medium text-leafy-800 truncate">{badge.name}</p>
                    {!badge.unlocked && (
                      <p className="text-xs text-leafy-500 mt-1">Locked</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Leaderboard Column */}
          <div className="lg:col-span-1">
            <div className="eco-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-leafy-800">Leaderboard</h3>
                
                <div className="flex bg-leafy-50 rounded-lg p-1">
                  <button 
                    className={`px-3 py-1 text-xs rounded-md ${
                      filter === 'friends' 
                        ? 'bg-white shadow text-leafy-800' 
                        : 'text-leafy-600'
                    }`}
                    onClick={() => setFilter('friends')}
                  >
                    Friends
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-md ${
                      filter === 'global' 
                        ? 'bg-white shadow text-leafy-800' 
                        : 'text-leafy-600'
                    }`}
                    onClick={() => setFilter('global')}
                  >
                    Global
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center p-3 rounded-lg ${
                      user.name === 'You' ? 'bg-leafy-50 border border-leafy-200' : 'bg-white hover:bg-leafy-50/50'
                    } transition-all`}
                  >
                    <div className="text-leafy-800 font-medium w-6 text-center">{index + 1}</div>
                    <div className={`${user.avatar} h-8 w-8 rounded-full flex items-center justify-center text-white mx-3`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-leafy-800">
                        {user.name} 
                        {user.name === 'You' && <span className="text-xs text-leafy-600 ml-1">⭐ That's you!</span>}
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs text-leafy-600 mr-1">Level {user.level}</span>
                        <Progress value={65} className="h-1 w-12" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-leafy-800">{user.points}</p>
                      <div className="flex items-center justify-end">
                        {user.change > 0 && (
                          <div className="flex items-center text-emerald-500 text-xs">
                            <ArrowUp className="h-3 w-3" />
                            <span>{user.change}</span>
                          </div>
                        )}
                        {user.change < 0 && (
                          <div className="flex items-center text-red-500 text-xs">
                            <ArrowUp className="h-3 w-3 transform rotate-180" />
                            <span>{Math.abs(user.change)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
