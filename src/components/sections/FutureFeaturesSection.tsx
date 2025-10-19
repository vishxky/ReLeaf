
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FutureFeaturesSection = () => {
  const features = [
    {
      id: "smart-tracking",
      name: "Smart Challenge Tracking",
      description: "Upcoming integration with smart home devices and wearables to automatically track progress on challenges like water usage, energy conservation, and sustainable transportation.",
      image: (
        <svg className="w-full h-full text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3H14M12 3V8M9 14L12 11L15 14M8 21H16C17.1046 21 18 20.1046 18 19V7C18 5.89543 17.1046 5 16 5H8C6.89543 5 6 5.89543 6 7V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      comingSoon: true
    },
    {
      id: "carbon-footprint",
      name: "Carbon Footprint Calculator",
      description: "Advanced analytics to calculate your personal carbon footprint based on challenge completions and lifestyle data. Track your progress in reducing emissions over time.",
      image: (
        <svg className="w-full h-full text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5H11M3 12H16M3 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      comingSoon: true
    },
    {
      id: "ai-personalization",
      name: "AI Personalization",
      description: "Our upcoming AI system will analyze your habits and preferences to suggest the most impactful and enjoyable sustainability challenges for your lifestyle.",
      image: (
        <svg className="w-full h-full text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L17 8L21 4M21 14V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      comingSoon: true
    },
    {
      id: "partnership-rewards",
      name: "Expanded Partnership Rewards",
      description: "We're expanding our network of eco-friendly businesses offering exclusive discounts and promotions for ReLeaf users who complete challenges.",
      image: (
        <svg className="w-full h-full text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 12C14 14.2091 12.2091 16 10 16C7.79086 16 6 14.2091 6 12C6 9.79086 7.79086 8 10 8C12.2091 8 14 9.79086 14 12Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 2C5.58172 2 2 5.58172 2 10V14C2 18.4183 5.58172 22 10 22H14C18.4183 22 22 18.4183 22 14C22 9.58172 18.4183 6 14 6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      comingSoon: false
    },
  ];

  return (
    <div className="bg-gradient-to-b from-leafy-50 to-white py-16">
      <div className="section-container">
        <div className="mb-12 text-center">
          <div className="inline-block bg-leafy-100 text-leafy-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Future Features</h2>
          <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
            The ReLeaf journey is just beginning! We're constantly innovating to make sustainability even more accessible and rewarding.
          </p>
        </div>

        <Tabs defaultValue={features[0].id} className="w-full max-w-4xl mx-auto">
          <TabsList className="bg-white mb-8 p-1 rounded-lg w-fit mx-auto flex flex-wrap justify-center">
            {features.map(feature => (
              <TabsTrigger key={feature.id} value={feature.id} className="text-sm relative">
                {feature.name}
                {feature.comingSoon && (
                  <span className="absolute -top-1 -right-1 bg-leafy-600 text-white text-[10px] px-1 py-0.5 rounded-full">Soon</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map(feature => (
            <TabsContent key={feature.id} value={feature.id} className="animate-grow">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-leafy-800">
                      {feature.name}
                      {feature.comingSoon && (
                        <span className="ml-2 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">Coming Q3 2025</span>
                      )}
                    </h3>
                    <p className="mt-4 text-leafy-600">{feature.description}</p>
                    <div className="mt-8">
                      <Button className="eco-button">
                        Join Waitlist
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-leafy-50 to-leafy-100 p-8 flex items-center justify-center">
                    <div className="w-32 h-32 md:w-48 md:h-48">
                      {feature.image}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="eco-card p-6 flex flex-col items-center text-center">
            <div className="bg-leafy-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg text-leafy-800 mb-2">Educational Resources</h3>
            <p className="text-leafy-600 text-sm">In-depth guides, courses, and workshops to deepen your sustainability knowledge and skills.</p>
          </div>

          <div className="eco-card p-6 flex flex-col items-center text-center">
            <div className="bg-leafy-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 21V19C3 16.7909 4.79086 15 7 15H17C19.2091 15 21 16.7909 21 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg text-leafy-800 mb-2">Family Accounts</h3>
            <p className="text-leafy-600 text-sm">Invite family members to join the eco-journey and compete in household sustainability challenges.</p>
          </div>

          <div className="eco-card p-6 flex flex-col items-center text-center">
            <div className="bg-leafy-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-leafy-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22H15C16.1046 22 17 21.1046 17 20V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V20C7 21.1046 7.89543 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg text-leafy-800 mb-2">Eco Home Integration</h3>
            <p className="text-leafy-600 text-sm">Connect with smart home devices to monitor and optimize energy usage, water consumption, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureFeaturesSection;
