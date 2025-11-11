import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import type { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, {
    input,
    voice,
  }) => {
    console.log("Generating audio with voice:", voice);
    //call openai api to create new audio tts
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams['voice'],
      input,
    });
    const buffer = await mp3.arrayBuffer();
    return buffer;
  },
});

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })

    // Add safety checks for the response
    if (!response.data || response.data.length === 0) {
      throw new Error('No image data received from OpenAI');
    }

    const url = response.data[0].url;

    if (!url) {
      throw new Error('Error generating thumbnail - no URL returned');
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  }
})