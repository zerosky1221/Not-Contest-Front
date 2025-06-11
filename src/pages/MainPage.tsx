import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { useStore } from '../store/useStore';

export const MainPage: React.FC = () => {
  const fetchProducts = useStore(state => state.fetchProducts);
  const isLoading = useStore(state => state.isLoading);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return (
    <>
      <Header />
      <main className="page-container">
        <ProductGrid />
        
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </main>
    </>
  );
};