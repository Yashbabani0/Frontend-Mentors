import React from "react";
import Product from "./Product";

function ProductContainer() {
  return (
    <div className="flex flex-col items-start justify-start w-full max-w-screen ">
      <h1 className="text-Rose-900 text-3xl lg:text-4xl font-bold">Desserts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-screen lg:w-[70vw] mx-auto md:mx-0">
        <Product />
      </div>
    </div>
  );
}

export default ProductContainer;
