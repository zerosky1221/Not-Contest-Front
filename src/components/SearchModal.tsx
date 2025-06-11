import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import { useStore } from "../store/useStore";

interface SearchModalProps {
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const products = useStore((state) => state.products);
  const selectProduct = useStore((state) => state.selectProduct);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const filteredProducts =
    query.trim() === ""
      ? []
      : products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

  const handleProductClick = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      selectProduct(product);
      onClose();
      history.push(`/product/${productId}`);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="search-modal"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="search-modal-header">
          <button className="search-modal-close" onClick={onClose}>
            <Icon icon="lucide:x" />
          </button>
          <div className="search-input-container">
            <Icon icon="lucide:search" className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="search-modal-input"
            />
            {query && (
              <button
                className="search-clear-button"
                onClick={handleClearSearch}
              >
                <Icon icon="lucide:x" className="text-dark-500" />
              </button>
            )}
          </div>
        </div>

        <div className="search-modal-content">
          {query.trim() !== "" && (
            <>
              {filteredProducts.length > 0 ? (
                <div className="search-results-grid">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ProductCard product={product} index={index} />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="lucide:search-x"
                  title="Not Found"
                  message="No products found"
                />
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
