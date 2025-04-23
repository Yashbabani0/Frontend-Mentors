import data from "/data.json";
import addtocartimg from "/images/icon-add-to-cart.svg";
import minus from "/images/icon-decrement-quantity.svg";
import plus from "/images/icon-increment-quantity.svg";
import { useCart } from "../Context/CartContext";

function Product() {
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  return (
    <>
      {data.map((item) => {
        const itemInCart = cart.find((i) => i.id === item.id);

        return (
          <div
            className="flex flex-col items-start justify-start w-[20em] lg:w-[18em]"
            key={item.id}
          >
            <div className="relative">
              <picture>
                <source
                  media="(min-width: 1000px)"
                  srcSet={item.image.desktop}
                />
                <source media="(min-width: 700px)" srcSet={item.image.tablet} />
                <img
                  src={item.image.mobile}
                  alt={item.name}
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="absolute -bottom-5 left-0 w-full flex items-center justify-center">
                {!itemInCart ? (
                  <button
                    className="flex items-center justify-center gap-4 w-[15em] py-2 rounded-full bg-Rose-50 border border-Red cursor-pointer hover:bg-Rose-100 transition-all duration-200 ease-in-out"
                    onClick={() => addToCart(item)}
                  >
                    <img src={addtocartimg} alt="" />
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-evenly gap-4 w-[15em] py-3 rounded-full bg-Red text-Rose-100 font-semibold">
                    <img
                      src={minus}
                      alt=""
                      className="border border-Rose-100 rounded-full py-2 px-1 cursor-pointer"
                      onClick={() => decrementQuantity(item.id)}
                    />
                    <span>{itemInCart.quantity}</span>
                    <img
                      src={plus}
                      alt=""
                      className="border border-Rose-100 rounded-full p-1 cursor-pointer"
                      onClick={() => incrementQuantity(item.id)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-10 gap-1 w-full">
              <p className="text-sm text-Rose-300">{item.category}</p>
              <p className="text-Rose-900 font-semibold">{item.name}</p>
              <p className="text-Red font-semibold text-md">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Product;
