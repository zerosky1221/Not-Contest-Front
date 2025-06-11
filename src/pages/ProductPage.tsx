import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "../components/Button";
import { useStore } from "../store/useStore";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const selectProduct = useStore((state) => state.selectProduct);

  const product = selectedProduct || products.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id && !selectedProduct && products.length > 0) {
      const foundProduct = products.find((p) => p.id === Number(id));
      if (foundProduct) {
        selectProduct(foundProduct);
      }
    }
  }, [id, products, selectedProduct, selectProduct]);

  if (!product) {
    return (
      <>
        <Header title="" showBack />
        <div className="flex items-center justify-center h-full">
          <p>Product not found</p>
        </div>
      </>
    );
  }

  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    history.push("/cart");
  };

  const formattedPrice = `${product.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${product.currency}`;

  return (
    <>
      <Header showBack />
      <main className="page-container pb-24">
        <ImageGallery images={product.images} alt={product.name} />

        <motion.div
          className="product-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-xl font-medium text-white">{product.name}</h1>
          <p className="text-[var(--dark-500)]">{product.category}</p>
          <p className="text-xl font-medium mt-2 text-white">
            {formattedPrice}
          </p>

          <div className="product-tags mt-3">
            <span className="tag">{product.tags.fabric}</span>
            <span className="stock-tag">{product.left} left</span>
          </div>

          <p className="product-description mt-4">{product.description}</p>

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={handleAddToCart}>
              Add to cart
            </Button>
            <Button variant="primary" onClick={handleBuyNow}>
              Buy now
            </Button>
          </div>
          {addedToCart && <p className="added-to-cart">Added to cart</p>}
        </motion.div>
      </main>
    </>
  );
};
