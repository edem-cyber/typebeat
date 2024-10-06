"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CardSpotlight from './CardSpotlight';

const FolderCards = ({ prompts }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [generatedBeats, setGeneratedBeats] = useState([]);

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    // TODO: Implement beat generation logic
    setGeneratedBeats([
      { id: 1, title: 'Beat 1', waveform: 'path/to/waveform1.svg' },
      { id: 2, title: 'Beat 2', waveform: 'path/to/waveform2.svg' },
      { id: 3, title: 'Beat 3', waveform: 'path/to/waveform3.svg' },
    ]);
  };

  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Popular Type Beats</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {prompts.map((prompt, index) => (
          <CardSpotlight key={index} onClick={() => handlePromptClick(prompt)}>
            <div className="w-full h-48 flex flex-col items-center justify-center text-center p-4">
              <FolderIcon className="w-16 h-16 mb-2 text-primary" />
              <h3 className="text-lg font-medium mb-1">{prompt}</h3>
            </div>
          </CardSpotlight>
        ))}
      </div>

      <Dialog open={selectedPrompt !== null} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPrompt}</DialogTitle>
            <DialogDescription>Generated beats based on the prompt</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {generatedBeats.map((beat) => (
              <div key={beat.id} className="p-4 bg-secondary rounded-md">
                <h4 className="font-medium mb-2">{beat.title}</h4>
                <div className="h-16 bg-primary/20 rounded-md mb-2">
                  {/* TODO: Implement waveform visualization */}
                  <div className="text-center pt-6">Waveform Placeholder</div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">Play/Pause</Button>
                  <Button variant="outline" size="sm">Download/Save</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

const FolderIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
    />
  </svg>
);

export default FolderCards;