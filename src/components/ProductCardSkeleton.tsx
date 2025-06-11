import React from "react";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card animate-pulse">
      <div className="bg-dark-200 aspect-square w-full"></div>
      <div className="product-info">
        <div className="h-4 bg-dark-200 rounded w-3/4 mb-1"></div>
        <div className="h-3 bg-dark-200 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-dark-200 rounded w-1/3 mt-1"></div>
      </div>
    </div>
  );
};
