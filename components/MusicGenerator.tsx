import React, { useState } from 'react';

export const MusicGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a description for your music"
        className="w-full p-2 border rounded mb-4"
      />
      <button 
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? 'Generating...' : 'Generate Music'}
      </button>
      {audioUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Generated Music:</h3>
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}
    </div>
  );
};
