"use client";
import { motion } from "framer-motion";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  renderItem,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  renderItem?: (item: Card, index: number) => React.ReactNode;
}) => {
  const CARD_OFFSET = offset;
  const SCALE_FACTOR = scaleFactor;

  return (
    <div className="relative h-80 w-full">
      {items.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top left",
            }}
            initial={{
              top: 0,
              left: 0,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: items.length - index,
            }}
            animate={{
              top: index * CARD_OFFSET,
              left: index * CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: items.length - index,
            }}
          >
            {renderItem ? (
              renderItem(card, index)
            ) : (
              <>
                <div className="font-normal text-neutral-700 dark:text-neutral-200">
                  {card.content}
                </div>
                <div>
                  <p className="text-neutral-500 font-medium dark:text-white">
                    {card.name}
                  </p>
                  <p className="text-neutral-400 font-normal dark:text-neutral-200">
                    {card.designation}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
