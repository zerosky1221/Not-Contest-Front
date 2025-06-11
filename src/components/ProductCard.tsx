import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const history = useHistory();
  const selectProduct = useStore(state => state.selectProduct);
  
  const handleClick = () => {
    selectProduct(product);
    history.push(`/product/${product.id}`);
  };
  
  const formattedPrice = `${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${product.currency}`;
  
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : `https://not-contest-cdn.openbuilders.xyz/items/${product.id}.jpg`;
  
  const hasMultipleImages = product.images && product.images.length > 1;
  
  return (
    <motion.div 
      className="product-card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="relative">
        <img 
          src={productImage} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{formattedPrice}</p>
      </div>
    </motion.div>
  );
};