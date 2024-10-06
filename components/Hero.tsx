"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Hero = () => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('');

  const handleGenerate = () => {
    // TODO: Implement generation logic
    console.log('Generating beat with prompt:', prompt, 'and genre:', genre);
  };

  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Generate Type Beats for free</h1>
      <div className="max-w-xl mx-auto space-y-4">
        <Input
          placeholder="Enter your beat prompt (e.g., Drake type beats)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 rounded-md border border-input bg-background"
        />
        <Select onValueChange={setGenre}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trap">Trap</SelectItem>
            <SelectItem value="hiphop">Hip Hop</SelectItem>
            <SelectItem value="rnb">R&B</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleGenerate} className="w-full">Generate</Button>
      </div>
    </section>
  );
};

export default Hero;