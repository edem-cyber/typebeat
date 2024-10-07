import React from "react";
import { motion } from "framer-motion";

interface SongProps {
  title: string;
  index: number;
  onClick: () => void;
}

const Waveform: React.FC = () => (
  <div className="h-8 flex items-center space-x-1">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-blue-500"
        initial={{ height: 0 }}
        animate={{ height: Math.random() * 32 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    ))}
  </div>
);

export const Song: React.FC<SongProps> = ({ title, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-gray-700 p-4 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <Waveform />
    </motion.div>
  );
};
