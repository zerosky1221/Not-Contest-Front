import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import { useStore } from "../store/useStore";

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const products = useStore((state) => state.products);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setShowKeyboard(true);
    }
  }, []);

  const filteredProducts =
    query.trim() === ""
      ? []
      : products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

  const handleInputFocus = () => {
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    if (window.innerWidth < 768) {
      return;
    }
    setShowKeyboard(false);
  };

  const handleClearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Header title="Search" showBack showSearch={false} />
      <main className="page-container pb-16">
        <div className="p-4 sticky top-0 bg-black z-10">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Search"
              className="search-input pr-10"
            />
            {query && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={handleClearSearch}
              >
                <Icon icon="lucide:x" className="text-dark-500" />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {query.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="lucide:search-x"
                  title="Not Found"
                  message="No products found"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showKeyboard && (
          <div className="keyboard">
            <div className="keyboard-row">
              <div className="key">Q</div>
              <div className="key">W</div>
              <div className="key">E</div>
              <div className="key">R</div>
              <div className="key">T</div>
              <div className="key">Y</div>
              <div className="key">U</div>
              <div className="key">I</div>
              <div className="key">O</div>
              <div className="key">P</div>
            </div>
            <div className="keyboard-row">
              <div className="key">A</div>
              <div className="key">S</div>
              <div className="key">D</div>
              <div className="key">F</div>
              <div className="key">G</div>
              <div className="key">H</div>
              <div className="key">J</div>
              <div className="key">K</div>
              <div className="key">L</div>
            </div>
            <div className="keyboard-row">
              <div className="key key-special">⇧</div>
              <div className="key">Z</div>
              <div className="key">X</div>
              <div className="key">C</div>
              <div className="key">V</div>
              <div className="key">B</div>
              <div className="key">N</div>
              <div className="key">M</div>
              <div className="key key-special">⌫</div>
            </div>
            <div className="keyboard-row">
              <div className="key key-special">123</div>
              <div className="key key-special">🌐</div>
              <div className="key" style={{ flexGrow: 3 }}>
                space
              </div>
              <div className="key key-action">search</div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
