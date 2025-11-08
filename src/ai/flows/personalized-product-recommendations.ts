'use server';

/**
 * @fileOverview Personalized product recommendations based on astrological profile.
 *
 * This file defines a Genkit flow that provides product recommendations tailored to a user's
 * astrological profile, specifically their birthdate and zodiac sign.
 *
 * @example
 * // Example usage:
 * const recommendations = await getPersonalizedRecommendations({
 *   birthdate: '1990-01-01',
 *   zodiacSign: 'Capricorn'
 * });
 *
 * @interface PersonalizedRecommendationsInput - Input type for the getPersonalizedRecommendations function.
 * @interface PersonalizedRecommendationsOutput - Output type for the getPersonalizedRecommendations function.
 * @function getPersonalizedRecommendations - A function that takes astrological profile information and returns product recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  birthdate: z
    .string()
    .describe('The user\'s birthdate in ISO 8601 format (YYYY-MM-DD).'),
  zodiacSign: z.string().describe('The user\'s zodiac sign.'),
});

export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  products: z.array(
    z.object({
      name: z.string().describe('The name of the recommended product.'),
      description: z.string().describe('A brief description of the product.'),
      imageUrl: z.string().describe('URL of the product image.'),
      reason: z.string().describe('Why this product is recommended for the user.'),
    })
  ).describe('A list of personalized product recommendations.'),
});

export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an astrology expert and product recommendation specialist.
  Based on the user's birthdate ({{birthdate}}) and zodiac sign ({{zodiacSign}}), recommend products that align with their astrological needs and preferences. Products include items such as rudraksha, gemstones, and other astrology-related items.

  Provide a list of personalized product recommendations, including the product name, a brief description, an image URL, and a reason for the recommendation.  Focus on how the product can benefit the user based on their astrological profile.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
