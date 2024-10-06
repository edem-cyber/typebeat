import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { provider } = req.query;

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as 'github' | 'google',
      });

      if (error) throw error;

      res.status(200).json({ message: `${provider} login successful`, url: data.url });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}