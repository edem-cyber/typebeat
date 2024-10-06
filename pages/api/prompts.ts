import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate ${limitNumber} creative prompts for AI-generated music beats. Each prompt should be a short phrase or description that could inspire a unique beat. Format the output as a JSON array of strings.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      let prompts;
      try {
        prompts = JSON.parse(text);
      } catch (error) {
        console.error('Error parsing Gemini response:', error);
        prompts = text.split('\n').filter(line => line.trim() !== '').map(line => line.replace(/^\d+\.\s*/, ''));
      }

      res.status(200).json({
        prompts,
        page: pageNumber,
        limit: limitNumber,
        total: prompts.length,
      });
    } catch (error) {
      console.error('Error generating prompts:', error);
      res.status(500).json({ error: 'Failed to generate prompts' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}