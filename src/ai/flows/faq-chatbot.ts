'use server';
/**
 * @fileOverview An AI chatbot for answering FAQs about VUJ/PRIME/JOY! PREMIUM.
 *
 * - faqChatbot - A function that handles the chatbot conversation.
 * - FAQChatbotInput - The input type for the faqChatbot function.
 * - FAQChatbotOutput - The return type for the faqChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FAQChatbotInputSchema = z.object({
  question: z.string().describe('The user question about VUJ/PRIME/JOY! PREMIUM.'),
});
export type FAQChatbotInput = z.infer<typeof FAQChatbotInputSchema>;

const FAQChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot answer to the user question.'),
});
export type FAQChatbotOutput = z.infer<typeof FAQChatbotOutputSchema>;

export async function faqChatbot(input: FAQChatbotInput): Promise<FAQChatbotOutput> {
  return faqChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faqChatbotPrompt',
  input: {schema: FAQChatbotInputSchema},
  output: {schema: FAQChatbotOutputSchema},
  prompt: `You are a chatbot designed to answer frequently asked questions about VUJ/PRIME/JOY! PREMIUM.

Here are some sample Q&A pairs:
Q: Apa itu VUJ/PRIME/JOY! PREMIUM?
A: Perkhidmatan langganan kandungan premium...

Q: Bagaimana cara pembayaran?
A: Bank transfer atau e-wallet...

Q: Berapa lama activation?
A: 1-2 jam selepas pembayaran disahkan...

Q: Boleh kongsi account?
A: Tidak disyorkan...

Q: Support device apa?
A: Semua device moden...

Answer the following question:
Q: {{{question}}}
A:
`,
});

const faqChatbotFlow = ai.defineFlow(
  {
    name: 'faqChatbotFlow',
    inputSchema: FAQChatbotInputSchema,
    outputSchema: FAQChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
