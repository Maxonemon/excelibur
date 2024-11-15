"use client";

import { useChat } from "ai/react";
import { BotIcon, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { ScrollArea } from "~/src/components/ui/scroll-area";
import { ny } from "~/src/lib/utils";

export default function Component() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsTyping(true);
    await handleSubmit(e);
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-background to-background/80 justify-center text-foreground p-4 sm:p-6 md:p-8">
      <div className="flex flex-col h-[90%] max-w-4xl mx-auto w-full backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          AI Chat Assistant
        </h1>
        <ScrollArea
          className="flex-1 rounded-xl border border-border/50 bg-background/95 shadow-xl mb-6 hover:border-border/80 transition-all"
          ref={scrollAreaRef}
        >
          <div className="space-y-6 p-4 sm:p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={ny(
                  "flex w-full max-w-md animate-in fade-in-50 slide-in-from-bottom-5",
                  message.role === "user"
                    ? "ml-auto justify-end"
                    : "mr-auto justify-start"
                )}
              >
                <div
                  className={ny(
                    "rounded-xl px-4 py-2.5 shadow-md transition-all hover:shadow-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/80 text-muted-foreground backdrop-blur-sm"
                  )}
                >
                  <div className="flex items-center space-x-2.5">
                    {message.role === "assistant" && (
                      <BotIcon className="mb-0.5 h-4 w-4 shrink-0 opacity-80" />
                    )}
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={onSubmit} className="flex space-x-3">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border-border/50 bg-background/95 backdrop-blur-sm focus:border-primary/50 transition-all"
              autoFocus
              autoComplete="off"
            />
            <Button
              type="submit"
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              disabled={isLoading || isTyping}
            >
              <Send className="mr-2 h-4 w-4" />
              {isLoading || isTyping ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
