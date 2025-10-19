import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

// Schema includes password confirmation
const formSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type FormData = z.infer<typeof formSchema>;

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Listen for the PASSWORD_RECOVERY event
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setShowForm(true);
        // Supabase automatically handles the session recovery from the URL hash
      }
    });

    // Check if the hash contains an error initially (e.g., expired token)
    const hash = window.location.hash;
    if (hash.includes('error_code=401')) {
      setErrorMsg("Password reset link has expired or is invalid. Please request a new one.");
      toast({ title: "Link Expired", description: "Please request a new password reset link.", variant: "destructive" });
    } else if (hash.includes('error=')) {
       setErrorMsg("An error occurred during password recovery. Please try again.");
       toast({ title: "Recovery Error", description: "An unexpected error occurred.", variant: "destructive" });
    }

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Password Updated Successfully!",
        description: "You can now sign in with your new password.",
      });
      navigate('/login'); // Redirect to login after successful update
    } catch (error: any) {
      console.error('Password update error:', error.message);
      setErrorMsg('Failed to update password. Please try again.');
      toast({
        title: "Error updating password",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set New Password</CardTitle>
          <CardDescription>
            {showForm
              ? 'Enter your new password below.'
              : errorMsg || 'Verifying reset link...'}
          </CardDescription>
        </CardHeader>
        {showForm && !errorMsg && (
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  disabled={loading}
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  disabled={loading}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        )}
        {errorMsg && (
          <CardContent>
            <p className="text-sm text-red-500 text-center">{errorMsg}</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
} 