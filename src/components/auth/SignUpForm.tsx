import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Using Card for structure
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, ArrowRight } from 'lucide-react'; // Icons

// Zod schema for sign-up including profile fields
const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  age: z.coerce.number().int().positive({ message: 'Age must be a positive number.' }).optional(), // Optional for now
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
      // 1. Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        // We can add options like user metadata if needed later
        // options: {
        //   data: {
        //     name: data.name, // You can add non-sensitive data here if desired
        //   }
        // }
      });

      if (signUpError) throw signUpError;

      // Check if user object exists (important if email verification is enabled)
      if (!signUpData.user) {
         // This case might happen if email verification is required 
         // and Supabase doesn't return the user object immediately.
         toast({
            title: "Sign Up Successful! Check Email",
            description: "Please check your email to verify your account before signing in.",
         });
         navigate('/login'); // Redirect to login, user needs to verify first
         setLoading(false);
         return; // Stop execution here
      }

      // 2. Insert profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ 
           id: signUpData.user.id, 
           name: data.name, 
           age: data.age, 
           updated_at: new Date() 
         });

      if (profileError) {
         // Log profile error but let user continue (they can update later)
         console.error('Error creating profile:', profileError.message);
         toast({
            title: "Sign Up Successful (Profile Pending)",
            description: "Account created, but failed to initialize profile. Please update it later in Settings.",
            variant: "destructive", 
         });
      } else {
         toast({
            title: "Sign Up Successful!",
            description: "Welcome! Your profile is created.",
         });
      }

      // 3. Redirect to challenges page after successful sign-up and profile attempt
      navigate('/challenges'); 

    } catch (error: any) {
      console.error(`Sign Up error:`, error.message);
      toast({
        title: `Error during Sign Up`,
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Using Card structure similar to OnboardingSection's container
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
       {/* Optional: Add link to Sign In */}
       {/* <CardFooter className="text-sm text-center justify-center"> */}
         {/* Link to /login */}
       {/* </CardFooter> */}
    </Card>
  );
}; 