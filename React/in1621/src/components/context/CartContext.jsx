"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("Ecafe-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("Ecafe-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper to find index by id + option
  const findItemIndex = (items, id, option) =>
    items.findIndex(
      (cartItem) =>
        cartItem.id === id &&
        (cartItem.option || null) === (option || null)
    );

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const index = findItemIndex(prevItems, item.id, item.option);

      if (index > -1) {
        // Item exists with same id & option, update quantity
        const updatedItems = [...prevItems];
        updatedItems[index].quantity += item.quantity || 1;
        return updatedItems;
      }

      // Add new item, default quantity to 1 if not provided
      return [
        ...prevItems,
        {
          ...item,
          quantity: item.quantity || 1,
          option: item.option || null,
        },
      ];
    });
  };

  const removeFromCart = (id, option = null) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === id && (item.option || null) === (option || null))
      )
    );
  };

  const updateQuantity = (id, quantity, option = null) => {
    if (quantity < 1) {
      removeFromCart(id, option);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && (item.option || null) === (option || null)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
