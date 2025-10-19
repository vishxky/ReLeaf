import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import JoinMovementSection from '@/components/sections/JoinMovementSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <JoinMovementSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
