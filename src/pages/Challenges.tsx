
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Leaf, Check, Calendar, ArrowUp, User, Star, MapPin, Clock, Upload } from "lucide-react";

// Import the ChallengeDashboard component directly
import ChallengeDashboard from '@/components/sections/ChallengeDashboard';

const Challenges = () => {
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ChallengeDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Challenges;
