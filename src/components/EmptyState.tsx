import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionText,
  onAction,
}) => {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Icon icon={icon} className="text-5xl text-dark-500 mb-4" />
      <h2 className="text-xl font-medium mb-2">{title}</h2>
      <p className="text-dark-500 mb-6">{message}</p>

      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};
