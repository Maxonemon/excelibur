"use client";

import { useChat } from "ai/react";
import { Send, User } from "lucide-react";
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
    <div className="flex h-screen flex-col bg-background justify-center text-foreground p-4 sm:p-6 md:p-8 mt-8">
      <div className="flex flex-col h-[90%] max-w-4xl mx-auto w-full">
        <ScrollArea
          className="flex-1 rounded-lg border border-border bg-background shadow-lg mb-4"
          ref={scrollAreaRef}
        >
          <div className="space-y-4 p-4 sm:p-6">
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
                    "rounded-lg px-4 py-2 shadow-sm transition-colors",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {message.role === "assistant" && (
                      <User className="mb-1 h-4 w-4 shrink-0" />
                    )}
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading || isTyping}
            >
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
