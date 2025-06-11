import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "../components/Button";
import { Confetti } from "../components/Confetti";

export const SuccessPage: React.FC = () => {
  const history = useHistory();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newProgress = [...konamiProgress, e.key];

      if (newProgress.length > konamiCode.length) {
        newProgress.shift();
      }

      setKonamiProgress(newProgress);

      if (newProgress.join(",") === konamiCode.join(",")) {
        setShowEasterEgg(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [konamiProgress]);

  const handleContinueShopping = () => {
    history.push("/");
  };

  return (
    <div className="success-page">
      <Confetti />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {showEasterEgg ? (
          <Icon icon="lucide:party-popper" className="success-icon text-8xl" />
        ) : (
          <Icon icon="lucide:party-popper" className="success-icon" />
        )}
      </motion.div>

      <motion.h1
        className="success-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        You Got It!
      </motion.h1>

      <motion.p
        className="success-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your purchase is on the way
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={handleContinueShopping}>Continue</Button>
      </motion.div>

      {showEasterEgg && (
        <motion.div
          className="mt-8 text-sm text-dark-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎮 Konami code activated! 🎮
        </motion.div>
      )}
    </div>
  );
};
