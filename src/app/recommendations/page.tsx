"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { getPersonalizedRecommendations, type PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-product-recommendations';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  birthdate: z.date({
    required_error: "Your birthdate is required to chart your stars.",
  }),
  zodiacSign: z.string({
    required_error: "Please select your zodiac sign.",
  }),
});

const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const input = {
          birthdate: values.birthdate.toISOString().split('T')[0],
          zodiacSign: values.zodiacSign,
      };
      const result = await getPersonalizedRecommendations(input);
      if (result) {
        setRecommendations(result);
      } else {
        setError("We couldn't generate recommendations at this time. Please try again later.");
      }
    } catch (e) {
      setError("The cosmos seems to be cloudy. We couldn't get your recommendations. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Wand2 className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="font-headline text-3xl">Personalized Recommendations</CardTitle>
            <CardDescription>
              Unveil the products the stars have aligned for you. Enter your birth details to receive AI-powered suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <DatePicker date={field.value} setDate={field.onChange} placeholder="Select your birthdate" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zodiacSign"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zodiac Sign</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your zodiac sign" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {zodiacSigns.map(sign => (
                            <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Consulting the Stars...
                    </>
                  ) : "Reveal My Items"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {isLoading && (
        <div className="text-center mt-12">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">The cosmos is aligning your products...</p>
        </div>
      )}

      {error && <p className="text-center text-destructive mt-8">{error}</p>}
      
      {recommendations && (
        <div className="mt-12">
            <h2 className="font-headline text-3xl text-center mb-8 flex items-center justify-center gap-2">
              <Sparkles className="text-accent" />
              Your Celestial Matches
              <Sparkles className="text-accent" />
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.products.map((product) => (
                    <Card key={`${product.name}-${product.imageUrl}`} className="flex flex-col overflow-hidden">
                        <div className="relative aspect-video w-full">
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        </div>
                        <CardHeader>
                            <CardTitle className="font-headline">{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm italic text-muted-foreground">
                                &ldquo;{product.reason}&rdquo;
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
