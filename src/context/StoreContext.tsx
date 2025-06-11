import React, { createContext, useContext, useEffect } from 'react';
import { useStore } from '../store/useStore';


const StoreContext = createContext<null>(null);


export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useStore();
  
  useEffect(() => {
    
    store.fetchProducts();
    
    
    store.fetchProducts().then(() => {
      store.fetchHistory();
    });
  }, []);
  
  return (
    <StoreContext.Provider value={null}>
      {children}
    </StoreContext.Provider>
  );
};


export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};
