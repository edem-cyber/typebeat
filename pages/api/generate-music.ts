import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;
      
      // Here, we're not actually using the prompt to generate music
      // Instead, we're returning parameters for a simple beat
      const bpm = Math.floor(Math.random() * (140 - 80 + 1) + 80); // Random BPM between 80 and 140
      const kickPattern = Array(16).fill(0).map(() => Math.random() > 0.7 ? 1 : 0);
      const snarePattern = Array(16).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);
      const hihatPattern = Array(16).fill(0).map(() => Math.random() > 0.5 ? 1 : 0);

      res.status(200).json({ bpm, kickPattern, snarePattern, hihatPattern });
    } catch (error) {
      console.error('Error generating beat:', error);
      res.status(500).json({ error: 'Failed to generate beat' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
