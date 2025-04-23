import checkBoxImg from "/images/icon-order-confirmed.svg";
import { useCart } from "../Context/CartContext";

function OrderConfirmation({ isVisible, onClose }) {
  const { cart, getTotalAmount, clearCart } = useCart();

  if (!isVisible) return null;

  const handleNewOrder = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-lg rounded-xl p-6 flex flex-col gap-4 shadow-xl">
        <img src={checkBoxImg} alt="Order Confirmed" className="w-8" />

        <div>
          <h1 className="text-2xl font-bold text-Rose-900">Order Confirmed</h1>
          <p className="text-xs font-semibold text-Rose-300">
            We hope you enjoy your dessert!
          </p>
        </div>

        <div className="bg-Rose-50 w-full p-4 rounded-md max-h-[20em] overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-Rose-100 py-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image.thumbnail || "/images/image-placeholder.jpg"}
                  className="w-12 h-12 object-cover rounded"
                  alt={item.name}
                />
                <div>
                  <p className="text-sm font-semibold text-Rose-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-Rose-400">
                    {item.quantity}x ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-Rose-500">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-semibold text-Rose-500">Total</p>
          <b className="text-xl text-Rose-900">
            ${getTotalAmount().toFixed(2)}
          </b>
        </div>

        <button
          onClick={handleNewOrder}
          className="w-full mt-4 py-3 rounded-full bg-Red text-white hover:bg-Red/90"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
