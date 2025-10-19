
import { Button } from "@/components/ui/button";

const JoinMovementSection = () => {
  return (
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-leafy-800 to-leafy-900 opacity-90 z-0"></div>
      <div className="leaf-pattern absolute inset-0 opacity-10"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            The planet needs you! <br />
            <span className="text-leafy-200">Play the game. Save the Earth.</span>
          </h2>
          <p className="text-leafy-100 text-lg md:text-xl mb-8">
            Join the eco-revolution now and make every sustainable action count!
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-leafy-800 hover:bg-leafy-100 py-6 px-8 rounded-full text-lg font-medium">
              Download Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 rounded-full text-lg font-medium">
              Learn More
            </Button>
          </div>
          
          <div className="mt-10 flex justify-center gap-6">
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-sm text-leafy-200">Daily Active Users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-white">50k+</p>
              <p className="text-sm text-leafy-200">Trees Planted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-white">240+</p>
              <p className="text-sm text-leafy-200">Eco-Challenges</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-white">4.9</p>
              <p className="text-sm text-leafy-200">App Store Rating</p>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <p className="text-lg text-white italic">
              "I never thought being eco-friendly could be so fun and rewarding. ReLeaf has completely changed my daily habits!"
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="bg-leafy-200 h-10 w-10 rounded-full flex items-center justify-center text-leafy-800 font-bold">
                M
              </div>
              <div className="ml-3 text-left">
                <p className="text-white font-medium">Maria Rodriguez</p>
                <p className="text-leafy-200 text-sm">ReLeaf User, 3 months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  );
};

export default JoinMovementSection;
