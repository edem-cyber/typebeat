"use client";

import React, { useState } from "react";
import { CardStack } from "@/components/ui/card-stack";
import CardSpotlight from "@/components/CardSpotlight";
import { Song } from "@/components/Song";
import { AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PromptCard {
  id: number;
  prompt: string;
  description: string;
}

interface PromptCardStackProps {
  prompt: PromptCard;
}

const dummySongs = [
  { id: 1, title: "Cosmic Rhythm" },
  { id: 2, title: "Neon Pulse" },
  { id: 3, title: "Quantum Beat" },
  { id: 4, title: "Stellar Groove" },
];

export const PromptCardStack: React.FC<PromptCardStackProps> = ({ prompt }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<Array<{ id: number; title: string; prompt: string }>>([]);

  const handleCardClick = async () => {
    setIsDialogOpen(true);
    // Generate songs based on the main prompt
    await generateSong(prompt.prompt);
  };

  const generateSong = async (songPrompt: string) => {
    try {
      const response = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: songPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const data = await response.json();
      setGeneratedSongs(prevSongs => [
        ...prevSongs,
        { id: prevSongs.length + 1, title: `Generated Song ${prevSongs.length + 1}`, prompt: songPrompt }
      ]);
    } catch (error) {
      console.error('Error generating song:', error);
    }
  };

  const cards = [
    {
      id: prompt.id,
      name: "Main Prompt",
      designation: "AI Generated",
      content: (
        <div className="relative h-full flex flex-col justify-between p-4">
          <h3 className="text-xl font-bold mb-2 text-white">{prompt.prompt}</h3>
          <p className="text-sm text-gray-300">{prompt.description}</p>
        </div>
      ),
    },
    {
      id: prompt.id + 1,
      name: "Variation 1",
      designation: "AI Generated",
      content: (
        <div className="p-4">
          <p className="text-gray-300">A variation of the main prompt...</p>
        </div>
      ),
    },
    {
      id: prompt.id + 2,
      name: "Variation 2",
      designation: "AI Generated",
      content: (
        <div className="p-4">
          <p className="text-gray-300">Another variation of the main prompt...</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="relative w-full h-80" onClick={handleCardClick}>
        <CardStack 
          items={cards} 
          offset={20}
          scaleFactor={0.06}
          renderItem={(item, index) => (
            index === 0 ? (
              <CardSpotlight className="w-full h-full bg-gray-800">
                {item.content}
              </CardSpotlight>
            ) : (
              <div className="w-full h-full bg-gray-800">
                {item.content}
              </div>
            )
          )}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>{prompt.prompt}</DialogTitle>
            <DialogDescription className="text-gray-300">
              {prompt.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <AnimatePresence>
              {generatedSongs.map((song, index) => (
                <Song key={song.id} title={song.title} index={index} onClick={() => generateSong(song.prompt)} />
              ))}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};