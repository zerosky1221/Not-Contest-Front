export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  left: number;
  tags: {
    fabric: string;
    [key: string]: string;
  };
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HistoryItem {
  timestamp: number;
  id: number;
  total: number;
  currency: string;
  product?: Product;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initDataUnsafe?: {
          user?: TelegramUser;
          query_id?: string;
          auth_date?: string;
          hash?: string;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
      };
    };
  }
}
