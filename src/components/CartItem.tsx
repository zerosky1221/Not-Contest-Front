import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { CartItem as CartItemType } from "../types";
import { useStore } from "../store/useStore";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const handleIncrement = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeFromCart(item.product.id);
    }
  };

  const formattedPrice = `${(item.product.price * item.quantity)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${item.product.currency}`;

  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="cart-item-image"
      />

      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.product.name}</h3>
        <p className="cart-item-price">{formattedPrice}</p>
      </div>

      <div className="cart-item-actions">
        <motion.button
          className="quantity-btn"
          onClick={handleDecrement}
          whileTap={{ scale: 0.9 }}
          aria-label="Decrease quantity"
        >
          <Icon icon="lucide:minus" />
        </motion.button>

        <span className="quantity-display">{item.quantity}</span>

        <motion.button
          className="quantity-btn"
          onClick={handleIncrement}
          whileTap={{ scale: 0.9 }}
          aria-label="Increase quantity"
        >
          <Icon icon="lucide:plus" />
        </motion.button>
      </div>
    </motion.div>
  );
};
