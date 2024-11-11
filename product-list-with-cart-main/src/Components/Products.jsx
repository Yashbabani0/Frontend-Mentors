import { useEffect, useState } from "react";

export default function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div className="products flex flex-wrap gap-8 items-center justify-center lg:items-start lg:gap-5 lg:justify-start mt-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="product  flex flex-col items-center justify-center w-[22em] md:w-[30em] lg:w-[21em] mb-8 md:mb-0"
        >
          <div className="img relative">
            <img
              src={item.image.mobile}
              className="rounded-xl w-full"
              alt={item.name}
            />
            {/* Add to Cart Button */}
            <div className="add_to_cart absolute bottom-[-1em] left-1/2 translate-x-[-50%]">
              <button className="flex items-center justify-center text-center border shadow-sm shadow-rose-900 border-rose-900 outline-none rounded-full py-2 px-6 font-medium bg-rose-50">
                <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
                &nbsp; Add to Cart
              </button>
              {/* Quantity Control (hidden by default) */}
              <div className="bg-red hidden items-center justify-between text-white rounded-full w-[10em] h-[3em] px-3 py-3">
                <img
                  src="./assets/images/icon-decrement-quantity.svg"
                  className="decrement border rounded-full w-5 h-5 p-1 cursor-pointer"
                  alt="Decrement"
                />
                <span>4</span>
                <img
                  src="./assets/images/icon-increment-quantity.svg"
                  className="increment border rounded-full w-5 h-5 p-1 cursor-pointer"
                  alt="Increment"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-start w-full justify-center mt-8">
            <p className="text-rose-400">{item.category}</p>
            <b className="text-rose-900 font-semibold text-xl">{item.name}</b>
            <b className="price text-red">${item.price.toFixed(2)}</b>
          </div>
        </div>
      ))}
    </div>
  );
}
