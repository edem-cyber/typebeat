"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('');

  const handleGenerate = () => {
    // TODO: Implement generation logic
    console.log('Generating beat with prompt:', prompt, 'and genre:', genre);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Generate Your Beat</h1>
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
    </div>
  );
}