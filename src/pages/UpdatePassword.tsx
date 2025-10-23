import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { authAPI } from '@/lib/apiClient';

// Schema includes password confirmation
const formSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!resetToken) {
      setErrorMsg("No reset token found. Please request a new password reset link.");
      toast({ 
        title: "Invalid Link", 
        description: "Please request a new password reset link.", 
        variant: "destructive" 
      });
    }
  }, [resetToken, toast]);

  const onSubmit = async (data: FormData) => {
    if (!resetToken) {
      setErrorMsg("No reset token found.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      await authAPI.resetPassword(resetToken, data.password);

      toast({
        title: "Password Updated Successfully!",
        description: "You can now sign in with your new password.",
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Password update error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update password.';
      setErrorMsg('Failed to update password. Please try again.');
      toast({
        title: "Error updating password",
        description: errorMessage,
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
            {resetToken && !errorMsg
              ? 'Enter your new password below.'
              : errorMsg || 'Verifying reset link...'}
          </CardDescription>
        </CardHeader>
        {resetToken && !errorMsg && (
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
