"use client";

import { useEffect, useState } from 'react';
import { Search } from '@/components/Search';
import FolderCards from '@/components/FolderCards';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [prompts, setPrompts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchPrompts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/prompts?page=${page}&limit=10`);
      const data = await response.json();
      if (data.prompts.length === 0) {
        setHasMore(false);
      } else {
        setPrompts((prevPrompts) => [...prevPrompts, ...data.prompts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchPrompts();
    }
  }, [inView]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20">
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Generate Type Beats for free</h1>
        <Search prompts={prompts} />
      </section>
      <FolderCards prompts={prompts} />
      {loading && <p className="text-center">Loading more prompts...</p>}
      {!loading && hasMore && (
        <div ref={ref} className="h-10" /> // Intersection observer target
      )}
      {!hasMore && <p className="text-center">No more prompts to load</p>}
    </div>
  );
}