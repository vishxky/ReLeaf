import { SignUpForm } from "@/components/auth/SignUpForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; 
import { useEffect } from 'react'; 

export default function SignUpPage() {
  const navigate = useNavigate(); 
  const { session, loading } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && session) {
      navigate('/challenges'); // Redirect logged-in users to challenges
    }
  }, [session, loading, navigate]);

  // Show loading or null while checking session
  if (loading || session) {
    return null; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-leafy-50 to-white p-4">
       <div className="w-full max-w-lg">
        <SignUpForm />
        <div className="mt-6 text-center text-sm text-leafy-600">
            Already have an account?{' '}
            <Link to="/login" className="underline font-medium text-leafy-700 hover:text-leafy-800">
               Sign in
            </Link>
        </div>
      </div>
    </div>
  );
} 