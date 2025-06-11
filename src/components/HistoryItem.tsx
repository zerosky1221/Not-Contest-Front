import React from "react";
import { motion } from "framer-motion";
import { HistoryItem as HistoryItemType } from "../types";
import { Icon } from "@iconify/react";

interface HistoryItemProps {
  item: HistoryItemType;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const date = new Date(item.timestamp);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedPrice = `${item.total
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${item.currency}`;

  return (
    <motion.div
      className="history-item bg-dark-100 rounded-lg p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="flex items-center mb-2">
        <Icon icon="lucide:clock" className="text-primary mr-2" />
        <span className="text-sm text-dark-500">
          {formattedDate} at {formattedTime}
        </span>
      </div>

      <div className="flex items-center">
        {item.product && (
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="history-item-image w-16 h-16 object-cover rounded-md mr-4"
          />
        )}

        <div className="flex-grow">
          <h3 className="history-item-name text-white font-medium">
            {item.product ? item.product.name : `Product #${item.id}`}
          </h3>
          <p className="text-sm text-dark-400">Quantity: {item.quantity}</p>
        </div>

        <div className="history-item-price text-right">
          <p className="text-lg font-bold text-primary">{formattedPrice}</p>
          <p className="text-xs text-dark-500">Total amount</p>
        </div>
      </div>
    </motion.div>
  );
};
