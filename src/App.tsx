import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { SearchPage } from './pages/SearchPage';
import { SuccessPage } from './pages/SuccessPage';
import { BottomNav } from './components/BottomNav';
import { useStore } from './store/useStore';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const fetchTelegramUser = useStore(state => state.fetchTelegramUser);
  
  useEffect(() => {
    fetchTelegramUser();
    
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, [fetchTelegramUser]);
  
  return (
    <ThemeProvider>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/success" component={SuccessPage} />
        </Switch>
        <BottomNav />
      </div>
    </ThemeProvider>
  );
};

export default App;