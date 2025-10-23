import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { profileAPI } from '@/lib/apiClient';

// Zod schema for sign-up including profile fields
const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  age: z.coerce.number().int().positive({ message: 'Age must be a positive number.' }).optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      // Register the user
      await registerUser(data.email, data.password);

      // Get the user ID from localStorage or context
      const token = localStorage.getItem('token');
      if (token) {
        // Decode token to get user ID (simple approach - in production use a library)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        // Update profile with name and age
        try {
          await profileAPI.updateProfile(userId, {
            name: data.name,
            age: data.age
          });
        } catch (profileError) {
          console.error('Error updating profile:', profileError);
          // Don't block user - they can update later
        }
      }

      toast({
        title: "Sign Up Successful!",
        description: "Welcome! Your account has been created.",
      });

      navigate('/challenges');
    } catch (error: any) {
      console.error('Sign Up error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      toast({
        title: 'Error during Sign Up',
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-lg border-leafy-100">
      <CardHeader className="text-center">
        <div className="mx-auto bg-leafy-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
          <UserPlus className="h-8 w-8 text-leafy-600" />
        </div>
        <CardTitle className="text-3xl font-bold text-leafy-800">Create Your Account</CardTitle>
        <CardDescription className="text-leafy-600">
          Join the ReLeaf community and start making a difference today!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Group Name and Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-leafy-700">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                {...register('name')}
                disabled={loading}
                className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="age" className="text-leafy-700">Age (Optional)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Your Age"
                {...register('age')}
                disabled={loading}
                className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
              />
              {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-leafy-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
              disabled={loading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-leafy-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              {...register('password')}
              disabled={loading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-leafy-700">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="******"
              {...register('confirmPassword')}
              disabled={loading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="w-full eco-button text-lg py-3 mt-4" disabled={loading}>
            {loading ? 'Creating Account...' : 'Complete Sign Up'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
