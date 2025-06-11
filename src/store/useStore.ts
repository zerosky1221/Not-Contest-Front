import { create } from 'zustand';
import { Product, CartItem, HistoryItem } from '../types';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  history: HistoryItem[];
  isLoading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  searchQuery: string;
  telegramUser: TelegramUser | null;
  
  fetchProducts: () => Promise<void>;
  fetchHistory: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  selectProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  checkout: () => Promise<void>;
  fetchTelegramUser: () => void;
}

const assignUniqueImages = (products: Product[]): Product[] => {
  const imageMapping: Record<number, string[]> = {
    1: ['https://not-contest-cdn.openbuilders.xyz/items/1.jpg'],
    2: [
      'https://not-contest-cdn.openbuilders.xyz/items/2.jpg',
      'https://not-contest-cdn.openbuilders.xyz/items/3.jpg',
      'https://not-contest-cdn.openbuilders.xyz/items/4.jpg'
    ],
    3: ['https://not-contest-cdn.openbuilders.xyz/items/3.jpg'],
    4: ['https://not-contest-cdn.openbuilders.xyz/items/4.jpg'],
    5: ['https://not-contest-cdn.openbuilders.xyz/items/5.jpg'],
    6: ['https://not-contest-cdn.openbuilders.xyz/items/6.png'],
    7: ['https://not-contest-cdn.openbuilders.xyz/items/7.jpg'],
    8: ['https://not-contest-cdn.openbuilders.xyz/items/8.jpg'],
  };
  
  const categoryMapping: Record<number, string> = {
    1: 't-shirt',
    2: 't-shirt',
    3: 't-shirt',
    4: 't-shirt',
    5: 'hoodie',
    6: 'hoodie',
    7: 'cap',
    8: 'hoodie',
  };
  
  const nameMapping: Record<number, string> = {
    2: 'Essential T-shirt Collection',
  };
  
  return products.map(product => {
    if (imageMapping[product.id]) {
      product.images = imageMapping[product.id];
      
      if (categoryMapping[product.id]) {
        product.category = categoryMapping[product.id];
      }
      
      if (nameMapping[product.id]) {
        product.name = nameMapping[product.id];
      }
    }
    
    return product;
  }).filter(product => {
    return product.id !== 3 && product.id !== 4;
  });
};

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
  history: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
  searchQuery: '',
  telegramUser: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://not-contest-cdn.openbuilders.xyz/api/items.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      const productsWithUniqueImages = assignUniqueImages(data.data);
      
      set({ products: productsWithUniqueImages, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://not-contest-cdn.openbuilders.xyz/api/no_history.json');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      
      const data = await response.json();
      
      set({ history: data.data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { product, quantity: 1 }] });
    }
  },
  
  removeFromCart: (productId) => {
    const { cart } = get();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    set({ cart: updatedCart });
  },
  
  updateQuantity: (productId, quantity) => {
    const { cart } = get();
    if (quantity <= 0) {
      const updatedCart = cart.filter(item => item.product.id !== productId);
      set({ cart: updatedCart });
    } else {
      const updatedCart = cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
      set({ cart: updatedCart });
    }
  },
  
  clearCart: () => {
    set({ cart: [] });
  },
  
  selectProduct: (product) => {
    set({ selectedProduct: product });
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  
  checkout: async () => {
    set({ isLoading: true });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { cart, history } = get();
    const now = Date.now();
    
    const newHistoryItems = cart.map(item => ({
      timestamp: now,
      id: item.product.id,
      total: item.product.price * item.quantity,
      currency: item.product.currency,
      product: item.product,
      quantity: item.quantity
    }));
    
    set({ 
      history: [...newHistoryItems, ...history],
      cart: [],
      isLoading: false 
    });
  },
  
  fetchTelegramUser: () => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;

      if (user) {
        set({ telegramUser: user });
      } else {
        console.warn('Telegram user data not available. Using fallback data.');
        set({
          telegramUser: {
            id: 12345678,
            first_name: 'Unknown user',
            username: 'unknown',
            photo_url: 'https://not-contest-cdn.openbuilders.xyz/avatar.jpg'
          }
        });
      }
    } else {
      console.error('Telegram WebApp script is not loaded or available.');
      set({
        telegramUser: {
          id: 87654321,
          first_name: 'Guest',
          username: 'guest_user',
          photo_url: 'https://not-contest-cdn.openbuilders.xyz/avatar.jpg'
        }
      });
    }
  }
}));  