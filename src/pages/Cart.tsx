import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { items, incrementQty, decrementQty, removeFromCart, getTotalPrice } = useCart();

  const total = getTotalPrice();
  const deliveryFee = total > 199 ? 0 : 25;
  const handlingFee = items.length > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + handlingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-zepto-purple-50 flex items-center justify-center">
          <svg className="w-12 h-12 text-zepto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-zepto-gray mb-6">Add items to get started with your 10-minute delivery</p>
        <Link
          to="/"
          className="inline-block bg-zepto-purple text-white font-bold px-6 py-3 rounded-xl hover:bg-zepto-purple-dark transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 animate-fade-in">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-gray-50"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-sm sm:text-base font-medium text-gray-800 hover:text-zepto-purple transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-xs text-zepto-gray-light mt-0.5">{item.unit}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bold text-gray-900">₹{item.price}</span>
                  {item.mrp > item.price && (
                    <span className="text-xs text-zepto-gray-light line-through">₹{item.mrp}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center bg-zepto-purple rounded-lg">
                  <button
                    onClick={() => decrementQty(item.id)}
                    className="text-white font-bold w-8 h-8 flex items-center justify-center hover:bg-zepto-purple-dark rounded-l-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => incrementQty(item.id)}
                    className="text-white font-bold w-8 h-8 flex items-center justify-center hover:bg-zepto-purple-dark rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-zepto-red hover:underline font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/"
            className="block text-center text-sm font-semibold text-zepto-purple hover:underline mt-3"
          >
            + Add more items
          </Link>
        </div>

        {/* Bill Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-3 text-base">Bill Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-zepto-green font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Handling Fee</span>
                <span>₹{handlingFee}</span>
              </div>
              {deliveryFee === 0 && (
                <div className="text-xs text-zepto-green bg-green-50 rounded-lg px-2 py-1.5">
                  Free delivery on orders above ₹199
                </div>
              )}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-zepto-purple text-white font-bold py-3 rounded-xl mt-4 hover:bg-zepto-purple-dark transition-colors active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
