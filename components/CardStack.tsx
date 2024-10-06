"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import CardSpotlight from "./CardSpotlight";

const CardStack = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="relative h-[400px] w-full">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              "absolute w-full max-w-md rounded-xl border border-border bg-card shadow-lg",
              index === cards.length - 1 ? "z-30" : "z-20"
            )}
            style={{
              top: index * 20,
              left: index * 20,
              right: 0,
              margin: "auto",
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCard(card)}
          >
            <CardSpotlight>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            </CardSpotlight>
          </motion.div>
        ))}
      </AnimatePresence>
      {selectedCard && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
            <p className="mb-4">{selectedCard.description}</p>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardStack;