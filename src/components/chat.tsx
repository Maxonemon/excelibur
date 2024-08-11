"use client";
import React from "react";
import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (textareaRef.current.scrollHeight > textareaRef.current.clientHeight) {
        textareaRef.current.style.overflow = "auto";
      } else {
        textareaRef.current.style.overflow = "hidden";
      }
    }
  }, [input]);

  return (
    <div className=" w-full max-w-4xl flex flex-col min-h-screen justify-between items-center  py-4 ">
      <div className="flex flex-col items-center  flex-1 overflow-y-auto w-full px-7 2xl:text-[25px] xl:text-[20px] lg:text-[17px] md:text-[15px] sm:text-[12px] border-black">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap  flex gap-3 items-center py-2 px-3 ml-[100px] ${
              m.role === "user"
                ? "bg-primary text-secondary w-[400px] self-end rounded-lg  mb-4"
                : "w-[700px]"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form
        className="fixed overflow-hidden rounded-lg border bg-secondary focus-within:ring-1 focus-within:ring-ring mt-auto w-[700px] top-[500px] flex justify-between 2xl:top-[900px] 2xl:w-[750px] xl:top-[490px] xl:w-[700px] lg:top-[490px] lg:w-[600px]  md:top-[900px]  md:w-[500px] sm:top-[700px] sm:w-[300px] "
        x-chunk="dashboard-03-chunk-1"
        onSubmit={handleSubmit}
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-secondary focus-visible:ring-0  bg-secondary h-auto focus-visible:ring-offset-0"
        />
        <div className="flex items-center p-3 pt-0 justify-center">
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 rounded-full w-10 h-10 mt-2"
          >
            <ArrowUp className="size-[18px]" />
          </Button>
        </div>
      </form>
    </div>
  );
}
