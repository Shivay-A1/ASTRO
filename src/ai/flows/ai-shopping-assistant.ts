// src/ai/flows/ai-shopping-assistant.ts
'use server';

/**
 * @fileOverview AI-powered shopping assistant flow for answering user questions and providing support during the shopping experience.
 *
 * - aiShoppingAssistant - A function that handles the shopping assistant chatbot interaction.
 * - AiShoppingAssistantInput - The input type for the aiShoppingAssistant function.
 * - AiShoppingAssistantOutput - The return type for the aiShoppingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiShoppingAssistantInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
});
export type AiShoppingAssistantInput = z.infer<typeof AiShoppingAssistantInputSchema>;

const AiShoppingAssistantOutputSchema = z.object({
  response: z.string().describe('The response from the AI shopping assistant.'),
});
export type AiShoppingAssistantOutput = z.infer<typeof AiShoppingAssistantOutputSchema>;

export async function aiShoppingAssistant(input: AiShoppingAssistantInput): Promise<AiShoppingAssistantOutput> {
  return aiShoppingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiShoppingAssistantPrompt',
  input: {schema: AiShoppingAssistantInputSchema},
  output: {schema: AiShoppingAssistantOutputSchema},
  prompt: `You are a helpful AI shopping assistant for Astro Emporium. Your goal is to answer user questions and provide support during their shopping experience.
  Use a friendly and helpful tone.
  If a user asks a question that falls outside the scope of Astro Emporium, politely inform them that you are only able to answer questions about the store and its products.
  
  User Query: {{{query}}}
  `,
});

const aiShoppingAssistantFlow = ai.defineFlow(
  {
    name: 'aiShoppingAssistantFlow',
    inputSchema: AiShoppingAssistantInputSchema,
    outputSchema: AiShoppingAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
