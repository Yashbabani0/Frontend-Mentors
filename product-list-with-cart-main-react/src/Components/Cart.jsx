import { useState } from "react";
import { useCart } from "../Context/CartContext";
import EmptyCartImg from "/images/illustration-empty-cart.svg";
import CarbonNeutral from "/images/icon-carbon-neutral.svg";
import remove from "/images/icon-remove-item.svg";
import OrderConfirmation from "./OrderConfirmation";

function Cart() {
  const { cart, removeItemFromCart, getTotalAmount, confirmOrder } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmOrder = () => {
    confirmOrder();
    setShowConfirmation(true);
  };

  if (cart.length === 0) {
    return (
      <div className="w-[22em] bg-Rose-50 lg:w-[24em] rounded-lg p-5 my-8 py-8">
        <h1 className="text-Red text-2xl font-bold mb-4">Your Cart (0)</h1>
        <div className="flex flex-col items-center justify-center">
          <img src={EmptyCartImg} alt="Empty cart" />
          <p className="text-Red text-[0.8em] font-semibold">
            Your added items will appear here
          </p>
        </div>
        <OrderConfirmation
          isVisible={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-[22em] bg-Rose-50 lg:w-[24em] rounded-lg p-5 my-8 py-8 relative">
      <h1 className="text-Red text-2xl font-bold mb-4">
        Your Cart (<span>{cart.length}</span>)
      </h1>

      <div className="w-full">
        {cart.map((item) => (
          <div
            className="flex items-center justify-between border-b py-4 border-Rose-300"
            key={item.id}
          >
            <div>
              <b className="text-Rose-900 text-sm font-semibold">
                {item.name}
              </b>
              <div className="flex items-center gap-2 text-sm">
                <p className="text-Red font-semibold">{item.quantity}x</p>
                <p className="text-Rose-400">@ ${item.price.toFixed(2)}</p>
                <p className="text-Rose-500 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <img
              src={remove}
              alt="Remove item"
              className="border rounded-full p-1 border-Rose-500 hover:border-transparent cursor-pointer"
              onClick={() => removeItemFromCart(item.id)}
            />
          </div>
        ))}
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between my-4">
          <p className="text-sm text-Rose-500 font-semibold">Order Total</p>
          <b className="text-Rose-900 text-2xl">
            ${getTotalAmount().toFixed(2)}
          </b>
        </div>

        <div className="text-Rose-400 flex items-center justify-center gap-2 text-[0.8em] font-semibold mb-4 bg-Rose-100 p-2 py-4 rounded-md">
          <img src={CarbonNeutral} alt="" />
          <p>
            This is a <b className="text-Red">carbon—neutral</b> delivery
          </p>
        </div>

        <button
          className="w-full rounded-full bg-Red py-3 text-white hover:bg-Red/80"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>
      </div>

      <OrderConfirmation
        isVisible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}

export default Cart;
