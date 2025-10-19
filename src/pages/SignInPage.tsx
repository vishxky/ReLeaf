import { AuthForm } from "@/components/auth/AuthForm";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from 'react';

export default function SignInPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate('/challenges');
    }
  }, [session, loading, navigate]);

  if (loading || session) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-leafy-50 to-white p-4">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
} 