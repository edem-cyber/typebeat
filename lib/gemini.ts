import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing Gemini API Key");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generatePrompts(count: number = 8): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate ${count} unique and creative music production prompts. Each prompt should be a short phrase or sentence that inspires a specific type of beat or musical style. Separate each prompt with a newline character.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text.split('\n').filter(line => line.trim() !== '');
}
