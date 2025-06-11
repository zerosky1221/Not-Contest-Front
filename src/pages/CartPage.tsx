import React from "react";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/Header";
import { CartItem } from "../components/CartItem";
import { Button } from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { useStore } from "../store/useStore";

export const CartPage: React.FC = () => {
  const history = useHistory();
  const cart = useStore((state) => state.cart);
  const checkout = useStore((state) => state.checkout);
  const isLoading = useStore((state) => state.isLoading);

  const handleCheckout = async () => {
    await checkout();
    history.push("/success");
  };

  const handleContinueShopping = () => {
    history.push("/");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const currency = cart.length > 0 ? cart[0].product.currency : "NOT";

  return (
    <>
      <Header title="Cart" showBack showSearch={false} showCart={false} />
      <main className="page-container">
        {cart.length === 0 ? (
          <EmptyState
            icon="lucide:shopping-bag"
            title="Cart's cold"
            message="Your cart is empty"
            actionText="OK"
            onAction={handleContinueShopping}
          />
        ) : (
          <>
            <AnimatePresence>
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </AnimatePresence>

            <motion.div
              className="sticky bottom-16 bg-black p-4 border-t border-[var(--border-color)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[var(--dark-500)]">Total</span>
                <span className="text-xl font-medium text-white">
                  {formattedTotal} {currency}
                </span>
              </div>

              <Button onClick={handleCheckout} disabled={isLoading}>
                {isLoading
                  ? "Processing..."
                  : `Buy for ${formattedTotal} ${currency}`}
              </Button>
            </motion.div>
          </>
        )}
      </main>
    </>
  );
};
