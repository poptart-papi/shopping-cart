import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navigation from './components/common/Navigation/Navigation';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import './App.css';

const AppRoutes: FC = () => {
  const { state } = useCart();
  const location = useLocation();
  
  // Determine current page based on location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/shop') return 'shop';
    if (path === '/cart') return 'cart';
    return '';
  };

  return (
    <div className="app">
      <Navigation cartItemCount={state.totalItems} currentPage={getCurrentPage()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App: FC = () => {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
};

export default App;
