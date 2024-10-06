"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchProps {
  prompts: string[];
}

export function Search({ prompts }: SearchProps) {
  const [placeholder, setPlaceholder] = useState(prompts[0] || "Search for beats");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (prompts.length > 0) {
      const interval = setInterval(() => {
        setPlaceholder((current) => {
          const nextIndex = (prompts.indexOf(current) + 1) % prompts.length;
          return prompts[nextIndex];
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [prompts]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", inputValue);
    setInputValue("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-full focus:outline-none focus:border-primary"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={placeholder}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {inputValue === "" ? placeholder : ""}
          </motion.span>
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full"
          type="submit"
        >
          Search
        </motion.button>
      </form>
    </div>
  );
}