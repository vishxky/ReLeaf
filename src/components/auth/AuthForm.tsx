import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom'; // Add Link
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";
import { LogIn, MailWarning } from 'lucide-react'; // Icon and MailWarning icon

// Define Zod schema for validation (only email/password)
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }), // Min 1, as length check is done by Supabase
});

type FormData = z.infer<typeof formSchema>;

// Remove mode prop
// interface AuthFormProps {
//   mode: 'signIn' | 'signUp';
// }
// export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
export const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [emailForResend, setEmailForResend] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch, // Watch email field for resend
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Watch the email field to use it for resend
  const watchedEmail = watch("email");
  React.useEffect(() => {
    setEmailForResend(watchedEmail);
  }, [watchedEmail]);

  const handleResendConfirmation = async () => {
    if (!emailForResend) {
       toast({ title: "Error", description: "Please enter your email first.", variant: "destructive" });
       return;
    }
    setResendLoading(true);
    try {
       const { error } = await supabase.auth.resend({ 
          type: 'signup', 
          email: emailForResend 
       });
       if (error) throw error;
       toast({ title: "Confirmation Email Resent", description: "Please check your inbox.", });
       setShowResend(false); // Hide resend button after successful send
    } catch (error: any) {
       console.error("Resend error:", error.message);
       toast({ title: "Error Resending Email", description: error.message || "Please try again.", variant: "destructive" });
    } finally {
       setResendLoading(false);
    }
 };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setShowResend(false); // Reset resend button visibility on new submit
    setEmailForResend(data.email); // Ensure email is set for potential resend
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        // Check if the error is due to unconfirmed email
        if (signInError.message.includes('Email not confirmed')) {
          setShowResend(true); // Show the resend button/message
          toast({
            title: "Email Not Verified",
            description: "Please click the link in the confirmation email sent to you. You can also resend the email.",
            variant: "destructive",
            duration: 7000, // Keep toast longer
          });
        } else {
          // Handle other sign-in errors
          throw signInError;
        }
      } else {
        // Successful sign in
        toast({
          title: "Sign In Successful!",
          description: "Welcome back!",
        });

        // Call the function to update login streak
        try {
          const { error: streakError } = await supabase.rpc('update_login_streak');
          if (streakError) {
            // Log the error but don't block the user
            console.error("Error updating login streak:", streakError);
            // Optionally, show a non-critical toast
            // toast({ title: "Streak Update Issue", description: "Could not update login streak.", variant: "destructive" });
          }
        } catch (rpcError) {
          console.error("Unexpected error calling update_login_streak:", rpcError);
        }

        navigate('/challenges');
      }

    } catch (error: any) {
      // Catch errors not handled above (like wrong password)
      console.error(`Sign In error:`, error.message);
       if (!showResend) { // Don't show generic error if specific resend message is already shown
          toast({
             title: `Error during Sign In`,
             description: error.message || "An unexpected error occurred.",
             variant: "destructive",
          });
       }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-leafy-100">
      <CardHeader className="text-center">
         <div className="mx-auto bg-leafy-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
           <LogIn className="h-8 w-8 text-leafy-600" />
        </div>
        <CardTitle className="text-3xl font-bold text-leafy-800">Welcome Back!</CardTitle>
        <CardDescription className="text-leafy-600">
           Sign in to continue your eco-journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-leafy-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
              disabled={loading || resendLoading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="text-leafy-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              {...register('password')}
              disabled={loading || resendLoading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
             {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
             {/* Link to forgot password */}
             <div className="text-right mt-1">
                <Link 
                  to="/request-password-reset" 
                  className="text-xs font-medium text-leafy-600 hover:text-leafy-800 underline"
                >
                   Forgot password?
                 </Link>
             </div>
          </div>
          {/* Resend Confirmation Button Area */} 
          {showResend && (
             <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700 mb-2">
                   Your email address needs to be confirmed.
                </p>
                <Button
                   type="button"
                   variant="outline"
                   size="sm"
                   onClick={handleResendConfirmation}
                   disabled={resendLoading || !emailForResend}
                   className="text-yellow-800 border-yellow-300 hover:bg-yellow-100"
                >
                   <MailWarning className="h-4 w-4 mr-2" />
                   {resendLoading ? 'Sending...' : 'Resend Confirmation Email'}
                </Button>
             </div>
          )}
          <Button type="submit" className="w-full eco-button text-lg py-3 mt-2" disabled={loading || resendLoading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
       <CardFooter className="text-sm text-center justify-center">
          Don't have an account?{' '}
          <Link to="/register" className="underline font-medium text-leafy-700 hover:text-leafy-800">
             Sign up
           </Link>
       </CardFooter>
    </Card>
  );
}; 