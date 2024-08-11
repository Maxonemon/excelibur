// app/api/chat/route.ts
import MistralClient from "@mistralai/mistralai";
import { MistralStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

const mistral = new MistralClient(process.env.MISTRAL_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = mistral.chatStream({
      model: "open-mistral-7b",
      maxTokens: 1000,
      messages,
    });

    const stream = MistralStream(response as any);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
