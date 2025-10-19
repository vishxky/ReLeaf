import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Leaf, Trophy, Users, Award, Search } from 'lucide-react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [timeframe, setTimeframe] = useState("weekly");
  
  // Dummy user data - global leaderboard
  const globalLeaders = [
    { rank: 1, name: "Emma Rodriguez", username: "ecoemma", points: 1245, change: "up", avatar: "https://picsum.photos/id/1/40/40" },
    { rank: 2, name: "Marcus Chen", username: "greenmarc", points: 1180, change: "same", avatar: "https://picsum.photos/id/2/40/40" },
    { rank: 3, name: "Olivia Taylor", username: "olivgreen", points: 1140, change: "up", avatar: "https://picsum.photos/id/3/40/40" },
    { rank: 4, name: "Sam Green", username: "ecowarrior", points: 875, change: "down", avatar: "https://picsum.photos/id/4/40/40" },
    { rank: 5, name: "Jamie Wilson", username: "ecojamie", points: 820, change: "up", avatar: "https://picsum.photos/id/5/40/40" },
    { rank: 6, name: "Alex Patel", username: "zerowastealex", points: 790, change: "down", avatar: "https://picsum.photos/id/6/40/40" },
    { rank: 7, name: "Taylor Johnson", username: "ecotay", points: 760, change: "up", avatar: "https://picsum.photos/id/7/40/40" },
    { rank: 8, name: "Jordan Smith", username: "jordaneco", points: 735, change: "same", avatar: "https://picsum.photos/id/8/40/40" },
    { rank: 9, name: "Casey Brown", username: "caseyearth", points: 710, change: "up", avatar: "https://picsum.photos/id/9/40/40" },
    { rank: 10, name: "Riley Garcia", username: "sustainriley", points: 690, change: "down", avatar: "https://picsum.photos/id/10/40/40" },
  ];
  
  // Dummy user data - friends leaderboard
  const friendsLeaders = [
    { rank: 1, name: "Jamie Wilson", username: "ecojamie", points: 820, change: "up", avatar: "https://picsum.photos/id/5/40/40", friend: true },
    { rank: 2, name: "Sam Green", username: "ecowarrior", points: 875, change: "same", avatar: "https://picsum.photos/id/4/40/40", friend: true, isUser: true },
    { rank: 3, name: "Alex Patel", username: "zerowastealex", points: 790, change: "down", avatar: "https://picsum.photos/id/6/40/40", friend: true },
    { rank: 4, name: "Casey Brown", username: "caseyearth", points: 710, change: "up", avatar: "https://picsum.photos/id/9/40/40", friend: true },
    { rank: 5, name: "Riley Garcia", username: "sustainriley", points: 690, change: "same", avatar: "https://picsum.photos/id/10/40/40", friend: true },
  ];
  
  // Dummy team data
  const teamsLeaders = [
    { rank: 1, name: "Green Guardians", members: 12, points: 8450, change: "up", avatar: "https://picsum.photos/id/11/40/40" },
    { rank: 2, name: "Eco Warriors", members: 8, points: 7920, change: "same", avatar: "https://picsum.photos/id/12/40/40" },
    { rank: 3, name: "Planet Protectors", members: 15, points: 7650, change: "up", avatar: "https://picsum.photos/id/13/40/40", userTeam: true },
    { rank: 4, name: "Zero Waste Heroes", members: 10, points: 7340, change: "down", avatar: "https://picsum.photos/id/14/40/40" },
    { rank: 5, name: "Climate Champions", members: 9, points: 7120, change: "up", avatar: "https://picsum.photos/id/15/40/40" },
    { rank: 6, name: "Sustainable Squad", members: 7, points: 6890, change: "down", avatar: "https://picsum.photos/id/16/40/40" },
    { rank: 7, name: "Forest Friends", members: 11, points: 6680, change: "up", avatar: "https://picsum.photos/id/17/40/40" },
    { rank: 8, name: "Ocean Defenders", members: 6, points: 6540, change: "same", avatar: "https://picsum.photos/id/18/40/40" },
    { rank: 9, name: "Urban Gardeners", members: 14, points: 6380, change: "up", avatar: "https://picsum.photos/id/19/40/40" },
    { rank: 10, name: "Renewable Rangers", members: 8, points: 6150, change: "down", avatar: "https://picsum.photos/id/20/40/40" },
  ];
  
  const renderRankChange = (change) => {
    switch(change) {
      case 'up':
        return <span className="inline-flex items-center text-green-600"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg></span>;
      case 'down':
        return <span className="inline-flex items-center text-red-600"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>;
      default:
        return <span className="inline-flex items-center text-gray-400"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8"/></svg></span>;
    }
  };
  
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Leaderboard</h2>
            <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
              See how you're ranking against other eco-warriors and teams. Compete, inspire, and make a bigger impact together!
            </p>
          </div>
          
          <div className="mb-8">
            <Tabs defaultValue="global" className="w-full" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <TabsList className="bg-white rounded-lg">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={timeframe === "weekly" ? "bg-leafy-500 text-white border-leafy-500" : ""}
                    onClick={() => setTimeframe("weekly")}
                  >
                    This Week
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={timeframe === "monthly" ? "bg-leafy-500 text-white border-leafy-500" : ""}
                    onClick={() => setTimeframe("monthly")}
                  >
                    This Month
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={timeframe === "alltime" ? "bg-leafy-500 text-white border-leafy-500" : ""}
                    onClick={() => setTimeframe("alltime")}
                  >
                    All Time
                  </Button>
                </div>
              </div>
              
              {/* Global Tab */}
              <TabsContent value="global" className="animate-grow origin-top">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>Global Rankings</span>
                      <div className="text-sm font-normal text-leafy-600">
                        Your rank: <span className="font-bold text-leafy-800">#4</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b border-leafy-100">
                            <th className="text-left py-3 px-2 text-sm font-medium text-leafy-700">Rank</th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-leafy-700">User</th>
                            <th className="text-right py-3 px-2 text-sm font-medium text-leafy-700">Points</th>
                            <th className="text-center py-3 px-2 text-sm font-medium text-leafy-700 w-20">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {globalLeaders.map((leader) => (
                            <tr 
                              key={leader.rank} 
                              className={`border-b border-leafy-50 hover:bg-leafy-50/50 ${leader.username === 'ecowarrior' ? 'bg-leafy-50/70' : ''}`}
                            >
                              <td className="py-3 px-2">
                                {leader.rank <= 3 ? (
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50">
                                    <Trophy className={`h-4 w-4 ${
                                      leader.rank === 1 ? 'text-amber-500' : 
                                      leader.rank === 2 ? 'text-gray-400' : 
                                      'text-amber-700'
                                    }`} />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 flex items-center justify-center text-leafy-600">
                                    {leader.rank}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage src={leader.avatar} alt={leader.name} />
                                    <AvatarFallback className="bg-leafy-200 text-leafy-800">
                                      {leader.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-leafy-800">{leader.name}</div>
                                    <div className="text-xs text-leafy-600">@{leader.username}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Leaf className="h-4 w-4 text-leafy-500" />
                                  <span className="font-medium text-leafy-800">{leader.points}</span>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                {renderRankChange(leader.change)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="text-leafy-700">
                    View More
                  </Button>
                </div>
              </TabsContent>
              
              {/* Friends Tab */}
              <TabsContent value="friends" className="space-y-6 animate-grow origin-top">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Friends Rankings</span>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Find Friends</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-leafy-100">
                            <th className="text-left py-3 px-2 text-sm font-medium text-leafy-700">Rank</th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-leafy-700">Friend</th>
                            <th className="text-right py-3 px-2 text-sm font-medium text-leafy-700">Points</th>
                            <th className="text-center py-3 px-2 text-sm font-medium text-leafy-700 w-20">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {friendsLeaders.map((friend) => (
                            <tr 
                              key={friend.rank} 
                              className={`border-b border-leafy-50 hover:bg-leafy-50/50 ${friend.isUser ? 'bg-leafy-50/70' : ''}`}
                            >
                              <td className="py-3 px-2">
                                <div className="w-8 h-8 flex items-center justify-center text-leafy-600">
                                  {friend.rank}
                                </div>
                              </td>
                              <td className="py-3 px-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage src={friend.avatar} alt={friend.name} />
                                    <AvatarFallback className="bg-leafy-200 text-leafy-800">
                                      {friend.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-leafy-800">
                                      {friend.name} {friend.isUser && <span className="text-xs text-leafy-600">(You)</span>}
                                    </div>
                                    <div className="text-xs text-leafy-600">@{friend.username}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Leaf className="h-4 w-4 text-leafy-500" />
                                  <span className="font-medium text-leafy-800">{friend.points}</span>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                {renderRankChange(friend.change)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {friendsLeaders.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-10 w-10 text-leafy-300 mx-auto mb-2" />
                        <p className="text-leafy-600">No friends added yet.</p>
                        <Button size="sm" className="eco-button mt-4">Add Friends</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Friend Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Robin Lee", username: "robineco", mutualFriends: 3, avatar: "/placeholder.svg" },
                        { name: "Dana Jones", username: "sustaindana", mutualFriends: 2, avatar: "/placeholder.svg" },
                        { name: "Morgan Perez", username: "ecomorgan", mutualFriends: 1, avatar: "/placeholder.svg" },
                      ].map((suggestion, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                              <AvatarFallback className="bg-leafy-200 text-leafy-800">
                                {suggestion.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-leafy-800">{suggestion.name}</div>
                              <div className="text-xs text-leafy-600">
                                {suggestion.mutualFriends} mutual {suggestion.mutualFriends === 1 ? 'friend' : 'friends'}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Add</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Teams Tab */}
              <TabsContent value="teams" className="animate-grow origin-top">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>Team Rankings</span>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Join a Team</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b border-leafy-100">
                            <th className="text-left py-3 px-2 text-sm font-medium text-leafy-700">Rank</th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-leafy-700">Team</th>
                            <th className="text-center py-3 px-2 text-sm font-medium text-leafy-700">Members</th>
                            <th className="text-right py-3 px-2 text-sm font-medium text-leafy-700">Points</th>
                            <th className="text-center py-3 px-2 text-sm font-medium text-leafy-700 w-20">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamsLeaders.map((team) => (
                            <tr 
                              key={team.rank} 
                              className={`border-b border-leafy-50 hover:bg-leafy-50/50 ${team.userTeam ? 'bg-leafy-50/70' : ''}`}
                            >
                              <td className="py-3 px-2">
                                {team.rank <= 3 ? (
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50">
                                    <Trophy className={`h-4 w-4 ${
                                      team.rank === 1 ? 'text-amber-500' : 
                                      team.rank === 2 ? 'text-gray-400' : 
                                      'text-amber-700'
                                    }`} />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 flex items-center justify-center text-leafy-600">
                                    {team.rank}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage src={team.avatar} alt={team.name} />
                                    <AvatarFallback className="bg-leafy-200 text-leafy-800">
                                      {team.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-leafy-800">
                                      {team.name} {team.userTeam && <Badge variant="outline" className="ml-1 text-xs">Your Team</Badge>}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center text-leafy-600">
                                {team.members}
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Leaf className="h-4 w-4 text-leafy-500" />
                                  <span className="font-medium text-leafy-800">{team.points}</span>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                {renderRankChange(team.change)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="text-leafy-700">
                    View More
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Achievers This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-6">
                    {/* Top 3 achievers with podium visualization */}
                    <div className="flex items-end space-x-8 my-8">
                      {/* 2nd place */}
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 border-2 border-gray-300">
                          <AvatarImage src="/placeholder.svg" alt="Marcus Chen" />
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <Badge className="mt-2 bg-gray-200 text-gray-800">
                          <Trophy className="h-3 w-3 mr-1" />
                          2nd
                        </Badge>
                        <div className="mt-2 text-center">
                          <p className="font-medium text-sm">Marcus C.</p>
                          <p className="text-xs text-leafy-600">1,180 pts</p>
                        </div>
                        <div className="mt-4 h-20 w-20 bg-gray-200 rounded-t-lg flex items-center justify-center text-lg font-bold text-gray-700">2</div>
                      </div>
                      
                      {/* 1st place */}
                      <div className="flex flex-col items-center">
                        <Avatar className="h-20 w-20 border-4 border-amber-400">
                          <AvatarImage src="/placeholder.svg" alt="Emma Rodriguez" />
                          <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        <Badge className="mt-2 bg-amber-500 text-white">
                          <Trophy className="h-3 w-3 mr-1" />
                          1st
                        </Badge>
                        <div className="mt-2 text-center">
                          <p className="font-bold">Emma R.</p>
                          <p className="text-sm text-leafy-600">1,245 pts</p>
                        </div>
                        <div className="mt-4 h-28 w-24 bg-amber-100 rounded-t-lg flex items-center justify-center text-2xl font-bold text-amber-700">1</div>
                      </div>
                      
                      {/* 3rd place */}
                      <div className="flex flex-col items-center">
                        <Avatar className="h-14 w-14 border-2 border-amber-700">
                          <AvatarImage src="/placeholder.svg" alt="Olivia Taylor" />
                          <AvatarFallback>OT</AvatarFallback>
                        </Avatar>
                        <Badge className="mt-2 bg-amber-700 text-white">
                          <Trophy className="h-3 w-3 mr-1" />
                          3rd
                        </Badge>
                        <div className="mt-2 text-center">
                          <p className="font-medium text-sm">Olivia T.</p>
                          <p className="text-xs text-leafy-600">1,140 pts</p>
                        </div>
                        <div className="mt-4 h-16 w-20 bg-amber-700 rounded-t-lg flex items-center justify-center text-lg font-bold text-amber-100">3</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Spotlight</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-leafy-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium text-leafy-800">Most Improved</h4>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src="/placeholder.svg" alt="Taylor Johnson" />
                        <AvatarFallback>TJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-leafy-800">Taylor Johnson</p>
                        <p className="text-xs text-leafy-600">Jumped 15 places this week!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-leafy-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium text-leafy-800">Perfect Streak</h4>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src="/placeholder.svg" alt="Marcus Chen" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-leafy-800">Marcus Chen</p>
                        <p className="text-xs text-leafy-600">30-day perfect streak!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-leafy-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium text-leafy-800">Challenge Champion</h4>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src="/placeholder.svg" alt="Emma Rodriguez" />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-leafy-800">Emma Rodriguez</p>
                        <p className="text-xs text-leafy-600">Completed most challenges this month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
