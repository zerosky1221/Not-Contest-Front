import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useStore } from '../store/useStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'Not Store', 
  showBack = false,
  showSearch = false, 
  showCart = true,
  onSearchClick
}) => {
  const history = useHistory();
  const location = useLocation();
  const cart = useStore(state => state.cart);
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleBack = () => {
    history.goBack();
  };
  
  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      history.push('/search');
    }
  };
  
  const handleCartClick = () => {
    history.push('/cart');
  };
  
  return (
    <header className="header">
      <div className="flex items-center">
        {showBack ? (
          <button 
            onClick={handleBack}
            className="mr-3"
            aria-label="Go back"
          >
            <Icon icon="lucide:chevron-left" className="text-xl text-white" />
          </button>
        ) : (
          <h1 className="text-lg font-medium text-white">Not Store</h1>
        )}
        {title && title !== 'Not Store' && <h1 className="text-lg font-medium text-white ml-3">{title}</h1>}
      </div>
      
      <div className="flex items-center">
        {showCart && location.pathname !== '/cart' && (
          <button 
            onClick={handleCartClick}
            className="relative"
            aria-label="Cart"
          >
            <Icon icon="lucide:shopping-bag" className="text-xl text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};