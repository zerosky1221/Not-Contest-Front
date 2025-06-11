import React, { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useStore } from "../store/useStore";
import { Product } from "../types";

interface ProductGridProps {
  category?: string;
  limit?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  category,
  limit,
}) => {
  const products = useStore((state) => state.products);
  const isLoading = useStore((state) => state.isLoading);

  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {};

    products.forEach((product) => {
      if (product.id === 3 || product.id === 4) {
        return;
      }

      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }

      const existingProduct = grouped[product.category].find(
        (p) => p.name === product.name
      );
      if (!existingProduct) {
        grouped[product.category].push(product);
      }
    });

    return grouped;
  }, [products]);

  if (isLoading) {
    return (
      <div>
        {category ? (
          <div className="product-grid">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
          </div>
        ) : (
          Object.keys(groupedProducts).map((cat) => (
            <div key={cat}>
              <h2 className="category-title">{cat}</h2>
              <div className="product-grid">
                {Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  if (category) {
    const categoryProducts = groupedProducts[category] || [];
    const displayProducts = limit
      ? categoryProducts.slice(0, limit)
      : categoryProducts;

    return (
      <div className="product-grid">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {Object.entries(groupedProducts).map(([cat, catProducts]) => {
        const displayProducts = limit
          ? catProducts.slice(0, limit)
          : catProducts;

        return (
          <div key={cat} className="mb-6">
            <h2 className="category-title">{cat}</h2>
            <div className="product-grid">
              {displayProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
