"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Bot, Send, User } from "lucide-react";

import { askQuestion, FormState } from "@/app/faq/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Message = {
  sender: "user" | "bot";
  text: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <Bot className="h-5 w-5 animate-spin" />
      ) : (
        <Send className="h-5 w-5" />
      )}
      <span className="sr-only">Hantar</span>
    </Button>
  );
}

export default function FaqChatbot() {
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Salam! Saya pembantu AI anda. Apa yang boleh saya bantu?",
    },
  ]);

  const [state, formAction] = useFormState<FormState, FormData>(askQuestion, {
    answer: "",
    error: undefined,
  });

  useEffect(() => {
    if (state.answer) {
      setMessages((prev) => [...prev, { sender: "bot", text: state.answer }]);
    }
    if (state.error) {
      setMessages((prev) => [...prev, { sender: "bot", text: state.error! }]);
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollableViewport) {
        scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const question = formData.get("question") as string;
    if (question.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: question }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  return (
    <Card className="flex flex-col h-[500px] shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot className="text-primary" />
          Pembantu AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                 {message.sender === "user" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
             {useFormStatus().pending && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                </div>
                <div className="max-w-xs rounded-lg px-4 py-2 bg-muted">
                  <p className="text-sm animate-pulse">Menaip...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          ref={formRef}
          action={handleFormSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            name="question"
            placeholder="Taip soalan anda di sini..."
            autoComplete="off"
            required
            className="flex-grow"
          />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
