import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import About from "./pages/About";
import SignInPage from "./pages/SignInPage";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import UpdatePassword from "./pages/UpdatePassword";
import SignUpPage from "./pages/SignUpPage";
import ChallengeDetail from "./pages/ChallengeDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
