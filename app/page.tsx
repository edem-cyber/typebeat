"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PromptCardStack } from '@/components/PromptCardStack';
import { api } from '@/lib/api';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { generatePrompts } from '@/lib/gemini';

interface Prompt {
  id: number;
  prompt: string;
  description: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activePage, setActivePage] = useState('home');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await api.auth.getUser();
        if (user) {
          setUser(user);
          fetchPrompts();
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);

  const fetchPrompts = async () => {
    try {
      const generatedPrompts = await generatePrompts(8);
      const formattedPrompts = generatedPrompts.map((prompt, index) => ({
        id: index + 1,
        prompt,
        description: "AI-generated music production prompt",
      }));
      setPrompts(formattedPrompts);
    } catch (error) {
      console.error('Error generating prompts:', error);
    }
  };

  if (!user) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <DashboardSidebar user={user} onPageChange={setActivePage} />
      <main className="flex-1 overflow-y-auto p-8">
        {activePage === 'home' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Welcome to AI Beats, {user.email}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {prompts.map((prompt) => (
                <PromptCardStack key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        )}
        {/* ... other page content ... */}
      </main>
    </div>
  );
}