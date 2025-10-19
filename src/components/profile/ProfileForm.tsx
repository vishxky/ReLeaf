import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

// Zod schema for profile data
const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty.' }).optional(),
  age: z.coerce.number().int().positive({ message: 'Age must be a positive number.' }).optional(),
  // Add other profile fields here if needed
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfileForm: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }, // Use isDirty to enable save button only on changes
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '', // Initialize with empty strings
      age: undefined,
    },
  });

  // Populate form with profile data once available
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        age: profile.age || undefined,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return; // Should not happen if component is rendered correctly
    if (!isDirty) return; // Don't submit if no changes were made

    setLoading(true);
    try {
      const updates = {
        id: user.id,
        name: data.name,
        age: data.age,
        updated_at: new Date(), // Update timestamp
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;

      toast({
        title: "Profile Updated Successfully!",
      });
      // Reset dirty state after successful submission
      reset(data); 
      // TODO: Potentially trigger a refresh of AuthContext profile data if needed

    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Error updating profile",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <p>Loading profile...</p>; // Or a spinner component
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Your Profile</CardTitle>
        <CardDescription>Update your name and age.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              {...register('name')}
              disabled={loading}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Your Age"
              {...register('age')}
              disabled={loading}
            />
            {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
          </div>
          <Button type="submit" disabled={loading || !isDirty}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 