import { useState, useEffect } from 'react';
import { CartContext } from './CartContext.js';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
  };

  const updateCount = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count + delta };
          }
          return item;
        })
        .filter((item) => item.count > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.count, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.count), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateCount, 
      clearCart, 
      cartCount, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};