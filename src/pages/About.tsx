
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Award, Users, Calendar, Globe, Sprout, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-leafy-500 text-white p-3 rounded-full">
                  <Leaf className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-leafy-800">About ReLeaf</h1>
              <p className="mt-4 text-xl text-leafy-600 max-w-3xl mx-auto">
                Our mission is to inspire and empower individuals to take small, consistent actions that collectively make a significant environmental impact.
              </p>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-12 bg-leafy-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-leafy-800">Our Values</h2>
              <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
                We believe in the power of community, gamification, and positive reinforcement to create lasting change.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Heart className="h-6 w-6 text-leafy-600" />
                  </div>
                  <h3 className="text-xl font-bold text-leafy-800 text-center mb-2">Accessibility</h3>
                  <p className="text-leafy-600 text-center">
                    Making sustainable living accessible and enjoyable for everyone, regardless of their starting point.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-6 w-6 text-leafy-600" />
                  </div>
                  <h3 className="text-xl font-bold text-leafy-800 text-center mb-2">Community</h3>
                  <p className="text-leafy-600 text-center">
                    Building a supportive network of like-minded individuals who inspire and motivate each other.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Globe className="h-6 w-6 text-leafy-600" />
                  </div>
                  <h3 className="text-xl font-bold text-leafy-800 text-center mb-2">Impact</h3>
                  <p className="text-leafy-600 text-center">
                    Focusing on meaningful actions that create real, measurable environmental benefits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-leafy-800 mb-4">Our Story</h2>
                <p className="text-lg text-leafy-600 mb-4">
                  ReLeaf was born from a simple observation: many people want to live more sustainably, but don't know where to start or feel their individual actions won't make a difference.
                </p>
                <p className="text-lg text-leafy-600 mb-4">
                  Our founders, a group of environmental scientists and game designers, came together to create a platform that makes sustainable living fun, social, and rewarding.
                </p>
                <p className="text-lg text-leafy-600">
                  Since our launch in 2024, we've grown to a community of over 50,000 eco-warriors who have collectively prevented more than 500,000 pounds of CO2 emissions and diverted 100,000 pounds of waste from landfills.
                </p>
              </div>
              <div className="bg-leafy-100 h-64 rounded-xl"></div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-leafy-800">How ReLeaf Works</h2>
              <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
                ReLeaf transforms everyday eco-friendly actions into a fun, rewarding experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Sprout className="h-8 w-8 text-leafy-600" />
                </div>
                <h3 className="text-xl font-bold text-leafy-800 mb-2">Choose Challenges</h3>
                <p className="text-leafy-600">
                  Select from personalized daily, weekly, and monthly eco-challenges that match your interests and lifestyle.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="h-8 w-8 text-leafy-600" />
                </div>
                <h3 className="text-xl font-bold text-leafy-800 mb-2">Complete Actions</h3>
                <p className="text-leafy-600">
                  Incorporate sustainable actions into your daily routine and document your progress.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Award className="h-8 w-8 text-leafy-600" />
                </div>
                <h3 className="text-xl font-bold text-leafy-800 mb-2">Earn Rewards</h3>
                <p className="text-leafy-600">
                  Collect points, badges, and rewards that can be redeemed for real-world benefits or donated to environmental causes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-leafy-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-8 w-8 text-leafy-600" />
                </div>
                <h3 className="text-xl font-bold text-leafy-800 mb-2">Join Community</h3>
                <p className="text-leafy-600">
                  Connect with like-minded individuals, join teams, and participate in community challenges and events.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-12 bg-gradient-to-r from-leafy-500 to-leafy-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Collective Impact</h2>
              <p className="text-lg max-w-2xl mx-auto opacity-90">
                Together, the ReLeaf community has made significant environmental contributions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-lg">Active Users</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">2.5M</div>
                <p className="text-lg">Challenges Completed</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">500K</div>
                <p className="text-lg">lbs of CO2 Prevented</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">100K</div>
                <p className="text-lg">lbs of Waste Diverted</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-leafy-800">Our Team</h2>
              <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
                Meet the passionate people behind ReLeaf who are dedicated to making sustainability accessible and fun.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Alex Rivera", role: "Founder & CEO", bio: "Environmental scientist with a passion for gamification." },
                { name: "Jordan Chen", role: "Chief Product Officer", bio: "Designer focused on creating engaging user experiences." },
                { name: "Taylor Kim", role: "Head of Partnerships", bio: "Building relationships with eco-friendly businesses." },
                { name: "Morgan Patel", role: "Environmental Director", bio: "Ensures our challenges create meaningful impact." },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="h-32 w-32 bg-leafy-100 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-leafy-800">{member.name}</h3>
                  <p className="text-leafy-600 font-medium">{member.role}</p>
                  <p className="mt-2 text-leafy-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Section */}
        <section className="py-12 bg-leafy-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-leafy-800 mb-4">Join the Movement</h2>
              <p className="text-lg text-leafy-600 max-w-2xl mx-auto mb-8">
                Be part of a growing community that's making small changes with big impacts. Download ReLeaf today and start your eco-friendly journey!
              </p>
              <Button className="eco-button text-lg py-6 px-8">Get Started Today</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
