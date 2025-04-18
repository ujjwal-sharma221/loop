import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { videos } from "@/db/schema";
import { model } from "@/lib/gemini-ai";
import { GenerateContentResult } from "@google/generative-ai";

interface InputType {
  userId: string;
  videoId: string;
}

const TITLE_SYSTEM_PROMPT = `Your task is to generate an SEO-focused title for a YouTube video based on its transcript. Please follow these guidelines:
- Be concise but descriptive, using relevant keywords to improve discoverability.
- Highlight the most compelling or unique aspect of the video content.
- Avoid jargon or overly complex language unless it directly supports searchability.
- Use action-oriented phrasing or clear value propositions where applicable.
- Ensure the title is 3-8 words long and no more than 100 characters.
- ONLY return the title as plain text. Do not add quotes or any additional formatting.
next will be the title provided by the user, update it accordingly
`;

export const { POST } = serve(async (context) => {
  const input = context.requestPayload as InputType;
  const { userId, videoId } = input;

  const video = await context.run("get-video", async () => {
    const [existingVideo] = await db
      .select()
      .from(videos)
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));

    if (!existingVideo) throw new Error("Video not found");

    return existingVideo;
  });

  const transcript = await context.run("get-transcript", async () => {
    const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;
    const res = await fetch(trackUrl);
    const text = res.text();

    if (!text) {
      throw new Error("Bad Request");
    }

    return text;
  });

  await context.run("update-video", async () => {
    const prompt = `${TITLE_SYSTEM_PROMPT}, ${transcript}`;
    const result = (await model.generateContent(
      prompt,
    )) as GenerateContentResult;

    if (!result.response.candidates) return;

    const text = result.response.candidates[0].content.parts[0].text;

    await db
      .update(videos)
      .set({ title: text })
      .where(and(eq(videos.id, video.id), eq(videos.userId, video.userId)));
  });
});
