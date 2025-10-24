import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Users, Calendar, MapPin, Clock, Leaf, Heart, MessageSquare, Repeat, User, Flag, Plus, Trash2 } from 'lucide-react';
import { communityAPI, type CommunityPost } from '@/lib/apiClient';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Community = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [isJoinTeamDialogOpen, setIsJoinTeamDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await communityAPI.getPosts(50);
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load community posts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to create posts',
        variant: 'destructive'
      });
      return;
    }

    if (!newPost.trim()) {
      toast({
        title: 'Empty post',
        description: 'Please write something before posting',
        variant: 'destructive'
      });
      return;
    }

    if (newPost.length > 1000) {
      toast({
        title: 'Post too long',
        description: 'Post cannot exceed 1000 characters',
        variant: 'destructive'
      });
      return;
    }

    setPosting(true);
    try {
      const result = await communityAPI.createPost(newPost);
      setPosts([result.post, ...posts]);
      setNewPost('');
      toast({
        title: 'Success!',
        description: 'Your post has been shared with the community'
      });
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create post',
        variant: 'destructive'
      });
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to like posts',
        variant: 'destructive'
      });
      return;
    }

    try {
      const result = await communityAPI.toggleLike(postId);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, likes: result.likesCount }
          : post
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await communityAPI.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: 'Post deleted',
        description: 'Your post has been removed'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete post',
        variant: 'destructive'
      });
    }
  };
  
  // Dummy team data
  const teams = [
    {
      id: 1,
      name: "Planet Protectors",
      members: 15,
      description: "Working together to complete larger environmental projects and support each other's eco-journey.",
      avatar: "https://picsum.photos/id/13/40/40",
      userIsMember: true,
      challenge: "Plant 100 Trees Challenge",
      progress: 65
    },
    {
      id: 2,
      name: "Zero Waste Warriors",
      members: 28,
      description: "Focused on reducing waste through creative solutions and community action.",
      avatar: "https://picsum.photos/id/14/40/40",
      challenge: "Beach Clean-Up Marathon",
      progress: 80
    },
    {
      id: 3,
      name: "Climate Champions",
      members: 42,
      description: "Taking action to reduce carbon footprints and advocate for climate-friendly policies.",
      avatar: "https://picsum.photos/id/15/40/40",
      challenge: "Carbon Footprint Reduction",
      progress: 45
    },
    {
      id: 4,
      name: "Urban Gardeners",
      members: 19,
      description: "Growing food and beautiful spaces in urban environments.",
      avatar: "https://picsum.photos/id/19/40/40",
      challenge: "Community Garden Project",
      progress: 30
    },
  ];
  
  // Dummy events data
  const events = [
    {
      id: 1,
      title: "City Park Clean-Up",
      description: "Join us for a community clean-up of Central Park! Gloves and bags will be provided.",
      date: "Apr 15, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Central Park, Main Entrance",
      attendees: 28,
      image: "https://images.unsplash.com/photo-1599666433235-31689096d7ff?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=320&fit=crop",
      isAttending: false
    },
    {
      id: 2,
      title: "Sustainable Living Workshop",
      description: "Learn practical tips for reducing waste and living more sustainably.",
      date: "Apr 20, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Community Center, 123 Green St",
      attendees: 15,
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=320&fit=crop",
      isAttending: true
    },
    {
      id: 3,
      title: "Tree Planting Day",
      description: "Help us plant 50 native trees in the community garden.",
      date: "Apr 27, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Community Garden, 456 Maple Ave",
      attendees: 32,
      image: "https://images.unsplash.com/photo-1518843023316-c54a1765959c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=320&fit=crop",
      isAttending: false
    },
  ];
  
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">ReLeaf Community</h2>
            <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
              Connect with fellow eco-warriors, join teams, find local events, and share your sustainability journey!
            </p>
          </div>
          
          <Tabs defaultValue="feed" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto w-full md:w-fit">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="teams">Teams & Clubs</TabsTrigger>
              <TabsTrigger value="events">Local Events</TabsTrigger>
              <TabsTrigger value="map">Eco Map</TabsTrigger>
            </TabsList>
            
            {/* Community Feed Tab */}
            <TabsContent value="feed" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {/* Post creation card */}
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-leafy-200 text-leafy-800">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Share your eco-friendly journey..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            className="min-h-[80px] resize-none border-leafy-200 focus:border-leafy-400"
                            maxLength={1000}
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-leafy-500">{newPost.length}/1000</span>
                            <Button
                              className="eco-button"
                              size="sm"
                              onClick={handleCreatePost}
                              disabled={posting || !newPost.trim()}
                            >
                              {posting ? 'Posting...' : 'Post'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Feed items */}
                  {loading ? (
                    <Card className="mb-6">
                      <CardContent className="py-8">
                        <div className="text-center text-leafy-600">Loading posts...</div>
                      </CardContent>
                    </Card>
                  ) : posts.length === 0 ? (
                    <Card className="mb-6">
                      <CardContent className="py-8">
                        <div className="text-center text-leafy-600">No posts yet. Be the first to share!</div>
                      </CardContent>
                    </Card>
                  ) : (
                    posts.map(post => (
                      <Card key={post.id} className="mb-6">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-leafy-200 text-leafy-800">
                                  {post.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-leafy-800 flex items-center">
                                  {post.author.name}
                                  {post.isDemo && (
                                    <Badge variant="outline" className="ml-2 text-xs">Demo</Badge>
                                  )}
                                </div>
                                <div className="text-xs text-leafy-600 flex items-center">
                                  <span>@{post.author.username}</span>
                                  <span className="mx-1">•</span>
                                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            {user && post.author.id === user.id && !post.isDemo && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-leafy-700 whitespace-pre-line">{post.content}</p>
                        </CardContent>
                        <CardFooter className="pt-1">
                          <div className="flex justify-between w-full">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 text-leafy-600 hover:text-red-500"
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-leafy-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">Load More Posts</Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Popular tags card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Popular Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-white">#zerowaste</Badge>
                        <Badge variant="outline" className="bg-white">#sustainableliving</Badge>
                        <Badge variant="outline" className="bg-white">#ecochallenge</Badge>
                        <Badge variant="outline" className="bg-white">#gardening</Badge>
                        <Badge variant="outline" className="bg-white">#plasticfree</Badge>
                        <Badge variant="outline" className="bg-white">#reducereuserecycle</Badge>
                        <Badge variant="outline" className="bg-white">#climateaction</Badge>
                        <Badge variant="outline" className="bg-white">#carbonfootprint</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Upcoming events card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {events.slice(0, 2).map(event => (
                        <div key={event.id} className="flex gap-3">
                          <div className="bg-leafy-100 rounded-md w-12 h-12 flex flex-col items-center justify-center shrink-0">
                            <span className="text-xs text-leafy-700">APR</span>
                            <span className="font-bold text-leafy-800">{event.date.split(',')[0].split(' ')[1]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-leafy-800">{event.title}</p>
                            <p className="text-xs text-leafy-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {event.location.split(',')[0]}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button variant="link" className="w-full text-leafy-700 py-0 h-auto" onClick={() => setActiveTab("events")}>
                        View all events
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Active teams card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Teams</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {teams.filter(team => team.userIsMember).map(team => (
                        <div key={team.id} className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={team.avatar} alt={team.name} />
                            <AvatarFallback className="bg-leafy-200 text-leafy-800">
                              {team.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-leafy-800">{team.name}</p>
                            <div className="w-full mt-1">
                              <div className="text-xs flex justify-between mb-1">
                                <span className="text-leafy-600">{team.challenge}</span>
                                <span className="text-leafy-700">{team.progress}%</span>
                              </div>
                              <div className="w-full bg-leafy-100 rounded-full h-1.5">
                                <div 
                                  className="bg-leafy-500 h-1.5 rounded-full" 
                                  style={{ width: `${team.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="link" className="w-full text-leafy-700 py-0 h-auto" onClick={() => setActiveTab("teams")}>
                        View all teams
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Teams & Clubs Tab */}
            <TabsContent value="teams" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <div className="grid grid-cols-1 gap-4">
                    {teams.map(team => (
                      <Card key={team.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
                              <AvatarImage src={team.avatar} alt={team.name} />
                              <AvatarFallback className="bg-leafy-200 text-leafy-800 text-xl">
                                {team.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="font-bold text-xl text-leafy-800">{team.name}</h3>
                                <div className="mt-2 sm:mt-0">
                                  {team.userIsMember ? (
                                    <Badge className="bg-leafy-500">Member</Badge>
                                  ) : (
                                    <Button 
                                      size="sm" 
                                      className="eco-button"
                                      onClick={() => setIsJoinTeamDialogOpen(true)}
                                    >
                                      Join Team
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <p className="mt-2 text-leafy-600">{team.description}</p>
                              <div className="flex items-center mt-2 text-sm text-leafy-600">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{team.members} members</span>
                              </div>
                              <div className="mt-4">
                                <p className="text-sm font-medium text-leafy-700">Current Team Challenge:</p>
                                <div className="flex justify-between mb-1 mt-1 text-xs">
                                  <span>{team.challenge}</span>
                                  <span>{team.progress}%</span>
                                </div>
                                <div className="w-full bg-leafy-100 rounded-full h-2">
                                  <div 
                                    className="bg-leafy-500 h-2 rounded-full" 
                                    style={{ width: `${team.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-4 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Create a New Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-leafy-600 mb-4">
                        Start your own eco-team, invite friends, and tackle environmental challenges together!
                      </p>
                      <Button className="eco-button w-full">Create Team</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Team Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">1</div>
                        <div>
                          <p className="font-medium text-leafy-800">Community Support</p>
                          <p className="text-sm text-leafy-600">Stay motivated with team members</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">2</div>
                        <div>
                          <p className="font-medium text-leafy-800">Team Challenges</p>
                          <p className="text-sm text-leafy-600">Access exclusive team-only challenges</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">3</div>
                        <div>
                          <p className="font-medium text-leafy-800">Bonus Points</p>
                          <p className="text-sm text-leafy-600">Earn bonus points for team achievements</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">4</div>
                        <div>
                          <p className="font-medium text-leafy-800">Greater Impact</p>
                          <p className="text-sm text-leafy-600">Make a bigger difference together</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Teams</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-50 w-7 h-7 rounded-full flex items-center justify-center text-amber-600 text-sm font-medium">1</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt="Green Guardians" />
                            <AvatarFallback>GG</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-leafy-800">Green Guardians</p>
                          </div>
                          <div className="flex items-center gap-1 text-leafy-600">
                            <Leaf className="h-3.5 w-3.5" />
                            <span className="text-sm">8,450</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 w-7 h-7 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">2</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt="Eco Warriors" />
                            <AvatarFallback>EW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-leafy-800">Eco Warriors</p>
                          </div>
                          <div className="flex items-center gap-1 text-leafy-600">
                            <Leaf className="h-3.5 w-3.5" />
                            <span className="text-sm">7,920</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-700 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt="Planet Protectors" />
                            <AvatarFallback>PP</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-leafy-800">Planet Protectors</p>
                          </div>
                          <div className="flex items-center gap-1 text-leafy-600">
                            <Leaf className="h-3.5 w-3.5" />
                            <span className="text-sm">7,650</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Dialog open={isJoinTeamDialogOpen} onOpenChange={setIsJoinTeamDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join Zero Waste Warriors</DialogTitle>
                    <DialogDescription>
                      Join this team to collaborate on eco-challenges and earn team rewards
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" alt="Zero Waste Warriors" />
                        <AvatarFallback>ZWW</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">Zero Waste Warriors</h3>
                        <p className="text-leafy-600 text-sm">28 members</p>
                      </div>
                    </div>
                    
                    <div className="bg-leafy-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Current Team Challenge</h4>
                      <p className="text-leafy-600 text-sm mb-3">Beach Clean-Up Marathon: Collect 200 lbs of trash from local beaches this month.</p>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Progress</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div className="bg-leafy-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-2">Why do you want to join this team?</label>
                      <textarea 
                        className="w-full rounded-md border border-leafy-200 p-3 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-leafy-500"
                        placeholder="Tell the team a bit about yourself and your eco-goals..."
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsJoinTeamDialogOpen(false)}>Cancel</Button>
                      <Button className="eco-button" onClick={() => setIsJoinTeamDialogOpen(false)}>Join Team</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {events.map(event => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="h-40 bg-leafy-100 relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-white rounded-md px-3 py-1 shadow-sm">
                            <p className="text-xs font-medium text-leafy-800">{event.date}</p>
                          </div>
                          {event.isAttending && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-leafy-500">Attending</Badge>
                            </div>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-leafy-600" />
                              <span className="text-xs">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3.5 w-3.5 text-leafy-600" />
                              <span className="text-xs">{event.location}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm text-leafy-600 mb-3">{event.description}</p>
                          <div className="flex items-center gap-1 text-xs text-leafy-600">
                            <Users className="h-3.5 w-3.5" />
                            <span>{event.attendees} people attending</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className={event.isAttending ? "w-full bg-white text-leafy-700 border border-leafy-200 hover:bg-leafy-50" : "w-full eco-button"}
                            onClick={() => setIsEventDialogOpen(true)}
                          >
                            {event.isAttending ? 'View Details' : 'RSVP'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-4 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>Filters</span>
                        <Button variant="link" className="text-xs h-auto p-0">Reset</Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">Location</label>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="bg-leafy-500 text-white border-leafy-500">Nearby</Button>
                          <Button variant="outline" size="sm">Online</Button>
                          <Button variant="outline" size="sm">All</Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Event Type</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-leafy-500 text-white cursor-pointer">Clean-up</Badge>
                          <Badge variant="outline" className="bg-white cursor-pointer">Workshop</Badge>
                          <Badge variant="outline" className="bg-white cursor-pointer">Planting</Badge>
                          <Badge variant="outline" className="bg-white cursor-pointer">Swap Meet</Badge>
                          <Badge variant="outline" className="bg-white cursor-pointer">Education</Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Date</label>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="bg-leafy-500 text-white border-leafy-500">This Week</Button>
                          <Button variant="outline" size="sm">This Month</Button>
                          <Button variant="outline" size="sm">Any Time</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Create an Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-leafy-600 mb-4">
                        Organize your own eco-friendly event and invite the community!
                      </p>
                      <Button className="eco-button w-full">Create Event</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your RSVP'd Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 rounded-md w-12 h-12 flex flex-col items-center justify-center shrink-0">
                          <span className="text-xs text-leafy-700">APR</span>
                          <span className="font-bold text-leafy-800">20</span>
                        </div>
                        <div>
                          <p className="font-medium text-leafy-800">Sustainable Living Workshop</p>
                          <p className="text-xs text-leafy-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 2:00 PM - 4:00 PM
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>City Park Clean-Up</DialogTitle>
                    <DialogDescription>
                      Join us for a community clean-up event
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="rounded-md overflow-hidden h-40">
                      <img 
                        src="/placeholder.svg" 
                        alt="Event" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-leafy-50 p-3 rounded-md">
                        <div className="flex items-center gap-1 text-leafy-700">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Date & Time</span>
                        </div>
                        <p className="mt-1 text-sm">Apr 15, 2025</p>
                        <p className="text-sm">9:00 AM - 12:00 PM</p>
                      </div>
                      <div className="bg-leafy-50 p-3 rounded-md">
                        <div className="flex items-center gap-1 text-leafy-700">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">Location</span>
                        </div>
                        <p className="mt-1 text-sm">Central Park</p>
                        <p className="text-sm">Main Entrance</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Description</h4>
                      <p className="text-sm text-leafy-600">
                        Join us for a community clean-up of Central Park! We'll be meeting at the main entrance. Gloves and bags will be provided. Help us make our city greener and cleaner!
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Organizer</h4>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="Event Organizer" />
                          <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Planet Protectors Team</p>
                          <p className="text-xs text-leafy-600">Contact: team@planetprotectors.org</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-md">
                      <User className="h-4 w-4 text-blue-600" />
                      <p className="text-sm text-blue-600">28 people are attending</p>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>Close</Button>
                      <Button className="eco-button">RSVP Now</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            {/* Eco Map Tab */}
            <TabsContent value="map" className="animate-grow origin-top">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Eco-Friendly Map</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Flag className="h-4 w-4" />
                        <span>Add Location</span>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Map Placeholder */}
                  <div className="relative w-full h-[500px] bg-leafy-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-leafy-700 font-medium">Interactive Map</p>
                      <p className="text-sm text-leafy-600 max-w-md mx-auto mt-2">
                        Explore eco-friendly businesses, recycling centers, community gardens, and events near you!
                      </p>
                      <Button className="eco-button mt-4">
                        Use Current Location
                      </Button>
                    </div>
                    
                    {/* Simulated Map Markers */}
                    <div className="absolute top-1/4 left-1/3">
                      <div className="relative">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                          <MapPin className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-1/3 right-1/4">
                      <div className="relative">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                          <MapPin className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 right-1/3">
                      <div className="relative">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                          <MapPin className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Legend */}
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-leafy-600">Eco-Friendly Stores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-leafy-600">Recycling Centers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-leafy-600">Community Gardens</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-leafy-600">Clean-up Events</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nearby Eco-Friendly Places</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-green-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium text-leafy-800">Green Goods Market</p>
                        <p className="text-xs text-leafy-600">Sustainable products store</p>
                        <p className="text-xs text-leafy-600">0.7 miles away</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-blue-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-leafy-800">City Recycling Center</p>
                        <p className="text-xs text-leafy-600">Electronics recycling available</p>
                        <p className="text-xs text-leafy-600">1.2 miles away</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-amber-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-medium text-leafy-800">Urban Garden Project</p>
                        <p className="text-xs text-leafy-600">Community garden with workshops</p>
                        <p className="text-xs text-leafy-600">1.5 miles away</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recently Added</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-green-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium text-leafy-800">Eco Cafe</p>
                        <p className="text-xs text-leafy-600">Zero-waste coffee shop</p>
                        <p className="text-xs text-gray-400">Added 2 days ago by @ecoemma</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-amber-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-medium text-leafy-800">Rooftop Garden</p>
                        <p className="text-xs text-leafy-600">Community growing space</p>
                        <p className="text-xs text-gray-400">Added 5 days ago by @greenmarc</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Saved Places</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[150px] flex items-center justify-center bg-leafy-50 rounded-md">
                      <div className="text-center px-4">
                        <Heart className="h-8 w-8 text-leafy-300 mx-auto mb-2" />
                        <p className="text-sm text-leafy-600">No saved places yet</p>
                        <Button size="sm" className="eco-button mt-3">Explore Map</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
