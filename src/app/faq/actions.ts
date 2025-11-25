"use server";

import { faqChatbot } from "@/ai/flows/faq-chatbot";
import { z } from "zod";

const AskQuestionSchema = z.object({
  question: z.string().min(5, "Soalan mestilah sekurang-kurangnya 5 aksara."),
});

export type FormState = {
  answer: string;
  error?: string;
};

export async function askQuestion(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const validation = AskQuestionSchema.safeParse({
    question: formData.get("question"),
  });

  if (!validation.success) {
    return {
      answer: "",
      error: validation.error.errors[0].message,
    };
  }

  try {
    const response = await faqChatbot({ question: validation.data.question });
    return { answer: response.answer };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      answer: "",
      error: `Gagal mendapatkan jawapan: ${errorMessage}`,
    };
  }
}
