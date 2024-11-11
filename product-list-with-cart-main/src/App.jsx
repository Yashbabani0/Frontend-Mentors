import React from "react";
import Products from "./Components/Products";
import Cart from "./Components/Cart";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between w-full lg:items-start">
      <Products />
      <Cart />
    </div>
  );
}
