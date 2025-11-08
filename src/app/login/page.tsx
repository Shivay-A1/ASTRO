"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Separator } from "@/components/ui/separator";
import { ParticleBackground } from "@/components/particle-background";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const phoneSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
    setIsLoading(true);
    setPhoneNumber(values.phone);
    // Simulate API call
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
    }, 1500);
  }

  function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // On success, redirect to home page
      toast({
        title: "Login Successful",
        description: "Welcome back! You have been successfully logged in.",
      });
      setIsLoading(false);
      router.push("/");
    }, 1500);
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Login Successful",
        description: "Welcome! You have been successfully logged in with Google.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Login Card */}
      <Card className="relative w-full max-w-md bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl border-0">
        <CardHeader className="relative">
          {/* Dark Mode Toggle */}
          <div className="absolute top-6 right-6">
            <DarkModeToggle />
          </div>

          <div className="text-center mt-4">
            <Sparkles className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="font-headline text-3xl">
              {step === 'phone' ? 'Welcome Back' : 'Verify Your Identity'}
            </CardTitle>
            <CardDescription className="mt-2">
              {step === 'phone'
                ? 'Sign in to your Astro Emporium account'
                : `We've sent a code to ${phoneNumber}.`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Google Sign-In Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </div>

          {step === 'phone' ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6 mt-6">
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="+1 (555) 000-0000" 
                          className="bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary dark:focus:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-primary hover:bg-primary/90 transition-transform transform hover:scale-105"
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Send Code
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6 mt-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          maxLength={6} 
                          placeholder="_ _ _ _ _ _" 
                          className="text-center tracking-[0.5em] bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary dark:focus:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-primary hover:bg-primary/90 transition-transform transform hover:scale-105"
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Verify
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => setStep('phone')}
                  type="button"
                >
                  Use a different phone number
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
