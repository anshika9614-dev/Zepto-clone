import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [placed, setPlaced] = useState(false);

  const total = getTotalPrice();
  const deliveryFee = total > 199 ? 0 : 25;
  const handlingFee = items.length > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + handlingFee;

  if (placed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-14 h-14 text-zepto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-zepto-gray mb-2">Your order will be delivered in 10 minutes</p>
        <p className="text-sm text-zepto-gray-light mb-6">Order Total: ₹{grandTotal}</p>
        <button
          onClick={() => {
            clearCart();
            navigate("/");
          }}
          className="bg-zepto-purple text-white font-bold px-6 py-3 rounded-xl hover:bg-zepto-purple-dark transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    setPlaced(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 animate-fade-in">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-zepto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
              Delivery Address
            </h2>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-gray-900">John Doe</span>
                <span className="text-xs bg-zepto-purple-50 text-zepto-purple px-2 py-0.5 rounded font-medium">Home</span>
              </div>
              <p className="text-sm text-zepto-gray">123, 5th Cross Road, Koramangala 4th Block, Bangalore, Karnataka 560034</p>
              <p className="text-sm text-zepto-gray mt-1">Phone: +91 98765 43210</p>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-3">Delivery Instructions (Optional)</h2>
            <textarea
              placeholder="e.g. Leave at the door, call on arrival..."
              className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:border-zepto-purple focus:outline-none resize-none"
              rows={2}
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-3">Payment Method</h2>
            <div className="space-y-2">
              {[
                { id: "upi", label: "UPI", desc: "Pay using any UPI app", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" },
                { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
                { id: "wallet", label: "Zepto Wallet", desc: "Balance: ₹500", icon: "M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12m18 0V8.25A2.25 2.25 0 0018.75 6H5.25A2.25 2.25 0 003 8.25v3.75m18 0v3.75A2.25 2.25 0 0118.75 18H5.25A2.25 2.25 0 013 15.75v-3.75" },
                { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? "border-zepto-purple bg-zepto-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-zepto-purple"
                  />
                  <svg className="w-5 h-5 text-zepto-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={method.icon} />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{method.label}</div>
                    <div className="text-xs text-zepto-gray-light">{method.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-3">Order Summary</h2>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover bg-gray-50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 truncate">{item.name}</p>
                    <p className="text-xs text-zepto-gray-light">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <span className="font-medium text-gray-900 shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span className="text-zepto-green font-semibold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Handling Fee</span>
                <span>₹{handlingFee}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-zepto-purple text-white font-bold py-3.5 rounded-xl mt-4 hover:bg-zepto-purple-dark transition-colors active:scale-[0.98]"
            >
              Place Order — ₹{grandTotal}
            </button>
            <p className="text-xs text-center text-zepto-gray-light mt-2">
              Delivery in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
