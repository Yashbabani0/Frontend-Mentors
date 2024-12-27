import React, { createContext, useContext, useState, useEffect } from "react";

// Create CartContext to provide the cart state
const CartContext = createContext();

// CartProvider component will provide cart state and actions to the rest of the app
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0); // Actual cart count
  const [tempCount, setTempCount] = useState(0); // Temporary count for tracking increments

  // Initialize cart count from localStorage
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("cartCount"), 10) || 0;
    setCartCount(savedCount);
  }, []);

  // Increment the cart count by a specific amount
  const increment = (amount) => {
    const updatedCount = cartCount + amount; // Add the specified amount to cartCount
    setCartCount(updatedCount); // Update the cart count
    localStorage.setItem("cartCount", updatedCount); // Save updated cart count to localStorage
  };

  // Decrement the temporary count
  const decrement = () => {
    setTempCount((prevCount) => Math.max(0, prevCount - 1)); // Prevent negative values
  };

  // Delete cart item (reset cart count)
  const deleteCartItem = () => {
    setCartCount(0);
    localStorage.removeItem("cartCount");
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        tempCount,
        increment,
        decrement,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext in any component
export const useCartLogic = () => useContext(CartContext);
