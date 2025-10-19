
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  image?: string;
};

type Team = {
  id: string;
  name: string;
  members: number;
  goal: string;
  progress: number;
  image?: string;
};

type Discussion = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  time: string;
  replies: number;
  likes: number;
};

const CommunitySection = () => {
  const [events] = React.useState<Event[]>([
    {
      id: '1',
      title: 'Community Garden Day',
      date: 'May 15, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Central Park',
      participants: 34,
      image: 'bg-[url("https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80")]',
    },
    {
      id: '2',
      title: 'Beach Cleanup Drive',
      date: 'June 5, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Ocean Beach',
      participants: 56,
      image: 'bg-[url("https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=400&q=80")]',
    },
    {
      id: '3',
      title: 'Zero-Waste Workshop',
      date: 'June 12, 2025',
      time: '4:00 PM - 6:00 PM',
      location: 'City Library',
      participants: 18,
      image: 'bg-[url("https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80")]',
    },
  ]);
  
  const [teams] = React.useState<Team[]>([
    {
      id: '1',
      name: 'Tree Planters',
      members: 45,
      goal: 'Plant 100 trees this month',
      progress: 67,
      image: 'bg-[url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80")]',
    },
    {
      id: '2',
      name: 'Plastic-Free Warriors',
      members: 28,
      goal: '500 plastic items prevented from landfill',
      progress: 82,
      image: 'bg-[url("https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80")]',
    },
    {
      id: '3',
      name: 'Urban Gardeners',
      members: 32,
      goal: 'Create 20 urban gardens',
      progress: 40,
      image: 'bg-[url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80")]',
    },
  ]);
  
  const [discussions] = React.useState<Discussion[]>([
    {
      id: '1',
      title: 'Best practices for composting in a small apartment?',
      author: 'GreenGardener',
      avatar: 'bg-emerald-500',
      time: '2 hours ago',
      replies: 12,
      likes: 8,
    },
    {
      id: '2',
      title: 'Where to find plastic-free grocery options in the city?',
      author: 'ZeroWasteAdventurer',
      avatar: 'bg-leafy-500',
      time: '5 hours ago',
      replies: 9,
      likes: 15,
    },
    {
      id: '3',
      title: 'Share your DIY natural cleaning solutions!',
      author: 'CleanGreen',
      avatar: 'bg-sky-500',
      time: '1 day ago',
      replies: 24,
      likes: 32,
    },
    {
      id: '4',
      title: 'Tips for reducing water usage in your garden?',
      author: 'WaterWise',
      avatar: 'bg-earth-500',
      time: '2 days ago',
      replies: 18,
      likes: 21,
    },
  ]);
  
  return (
    <div className="bg-leafy-50/30 min-h-screen py-12">
      <div className="section-container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Join Our Eco-Community</h2>
          <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
            Connect with like-minded eco-warriors, join team challenges, and participate in local events to multiply your environmental impact!
          </p>
        </div>
        
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto block w-fit">
            <TabsTrigger value="teams" className="text-sm">Eco-Teams</TabsTrigger>
            <TabsTrigger value="events" className="text-sm">Upcoming Events</TabsTrigger>
            <TabsTrigger value="discussions" className="text-sm">Community Forum</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teams" className="animate-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="eco-card overflow-hidden bg-white">
                  <div className={`h-40 ${team.image || 'bg-leafy-200'} bg-cover bg-center`}></div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-leafy-800">{team.name}</h3>
                    
                    <div className="mt-2 flex items-center">
                      <Users className="h-4 w-4 text-leafy-600 mr-2" />
                      <span className="text-sm text-leafy-700">{team.members} members</span>
                    </div>
                    
                    <p className="mt-3 text-sm text-leafy-600">Goal: {team.goal}</p>
                    
                    <div className="mt-4">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${team.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-leafy-600">Progress</span>
                        <span className="text-xs font-medium text-leafy-700">{team.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <Button className="eco-button w-full">Join Team</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-leafy-200 text-leafy-700 hover:bg-leafy-50">
                View All Eco-Teams
              </Button>
              <Button className="ml-3 eco-button">Create Your Team</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="animate-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="eco-card overflow-hidden bg-white">
                  <div className={`h-40 ${event.image || 'bg-leafy-200'} bg-cover bg-center`}></div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-leafy-800">{event.title}</h3>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-leafy-600 mr-2" />
                        <span className="text-sm text-leafy-700">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-leafy-600 mr-2" />
                        <span className="text-sm text-leafy-700">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-leafy-600 mr-2" />
                        <span className="text-sm text-leafy-700">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-leafy-600 mr-2" />
                        <span className="text-sm text-leafy-700">{event.participants} attending</span>
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <Button className="eco-button w-full">Join Event</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-leafy-200 text-leafy-700 hover:bg-leafy-50">
                View All Events
              </Button>
              <Button className="ml-3 eco-button">Suggest Event</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="discussions" className="animate-grow">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-leafy-100 flex justify-between items-center">
                <h3 className="font-bold text-leafy-800">Community Discussions</h3>
                <Button size="sm" className="eco-button">New Topic</Button>
              </div>
              
              <div className="divide-y divide-leafy-100">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="p-4 hover:bg-leafy-50/50 transition-colors">
                    <div className="flex">
                      <div className={`${discussion.avatar} h-10 w-10 rounded-full flex items-center justify-center text-white mr-4`}>
                        {discussion.author.charAt(0)}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-leafy-800">{discussion.title}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-leafy-600">{discussion.author}</span>
                          <span className="mx-2 text-leafy-300">•</span>
                          <span className="text-xs text-leafy-600">{discussion.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-3 justify-end space-x-4">
                      <div className="flex items-center text-leafy-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center text-leafy-600">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="text-xs">{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-leafy-100 text-center">
                <Button variant="link" className="text-leafy-600 hover:text-leafy-700">
                  View All Discussions
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-leafy-800">Interactive Eco-Map</h3>
                <p className="mt-3 text-leafy-600">
                  Discover eco-friendly spots, recycling centers, and community gardens in your area. Connect with local businesses that support sustainable practices.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="badge-icon mt-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-leafy-800">Recycling Centers</p>
                      <p className="text-sm text-leafy-600">Find nearby places to recycle specific materials</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="badge-icon mt-1 bg-leafy-200">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-leafy-800">Eco-Friendly Businesses</p>
                      <p className="text-sm text-leafy-600">Support local shops with sustainable practices</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="badge-icon mt-1 bg-amber-100 text-amber-700">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-leafy-800">Community Gardens</p>
                      <p className="text-sm text-leafy-600">Connect with local gardening communities</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="eco-button">Explore Map</Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-leafy-100 rounded-lg h-72 w-full overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+48a948(-122.4194,37.7749)/-122.4194,37.7749,12,0/500x500@2x?access_token=pk.placeholder')]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-leafy-700 font-medium">Interactive map preview</p>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-leafy-600 mr-2" />
                    <div>
                      <p className="font-medium text-leafy-800">Nearby Events</p>
                      <p className="text-xs text-leafy-600">3 upcoming in your area</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
