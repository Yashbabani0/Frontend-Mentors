import React from "react";
import OrderConfirmation from "./Components/OrderConfirmation";
import ProductContainer from "./Components/ProductContainer";
import Cart from "./Components/Cart";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 py-6 md:px-8 md:py-10 lg:px-16 lg:py-16 lg:items-start">
        <ProductContainer />
        <Cart />
        <OrderConfirmation />
      </div>
    </CartProvider>
  );
}

export default App;
