"use client";

import React from "react";
import { CardStack } from "@/components/ui/card-stack";
import CardSpotlight from "@/components/CardSpotlight";

interface PromptCard {
  id: number;
  prompt: string;
  description: string;
}

interface PromptCardStackProps {
  prompt: PromptCard;
}

export const PromptCardStack: React.FC<PromptCardStackProps> = ({ prompt }) => {
  const cards = [
    {
      id: prompt.id,
      name: "Main Prompt",
      designation: "AI Generated",
      content: (
        <div className="relative h-full flex flex-col justify-between p-4">
          <h3 className="text-xl font-bold mb-2">{prompt.prompt}</h3>
          <p className="text-sm">{prompt.description}</p>
        </div>
      ),
    },
    {
      id: prompt.id + 1,
      name: "Variation 1",
      designation: "AI Generated",
      content: (
        <div className="p-4">
          <p>A variation of the main prompt...</p>
        </div>
      ),
    },
    {
      id: prompt.id + 2,
      name: "Variation 2",
      designation: "AI Generated",
      content: (
        <div className="p-4">
          <p>Another variation of the main prompt...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full h-80">
      <CardStack 
        items={cards} 
        offset={20}
        scaleFactor={0.06}
        renderItem={(item, index) => (
          index === 0 ? (
            <CardSpotlight className="w-full h-full">
              {item.content}
            </CardSpotlight>
          ) : (
            item.content
          )
        )}
      />
    </div>
  );
};
