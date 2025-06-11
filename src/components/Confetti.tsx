import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
}

export const Confetti: React.FC = () => {
  const confettiRef = useRef<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ["#0088CC", "#FFD700", "#FF6B6B", "#4CAF50", "#9C27B0"];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    confettiRef.current = pieces;
  }, []);

  return (
    <div className="confetti">
      {confettiRef.current.map((piece) => (
        <motion.div
          key={piece.id}
          style={{
            position: "absolute",
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: "10px",
            height: "10px",
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          initial={{
            y: piece.y,
            x: piece.x,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: `${100 + Math.random() * 50}%`,
            x: `${piece.x + (Math.random() * 20 - 10)}%`,
            rotate: piece.rotation * 2,
            scale: piece.scale,
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            ease: "easeOut",
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
};
