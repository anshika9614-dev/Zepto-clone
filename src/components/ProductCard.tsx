import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, getItemQty, incrementQty, decrementQty } = useCart();
  const qty = getItemQty(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-lg hover:border-gray-200 transition-all duration-200 group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-zepto-green text-white text-xs font-bold px-1.5 py-0.5 rounded">
              {discount}% OFF
            </div>
          )}
          {product.tags.includes("Bestseller") && (
            <div className="absolute top-2 right-2 bg-zepto-yellow text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
              Bestseller
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center gap-1 text-xs text-zepto-gray-light mb-1">
        <svg className="w-3.5 h-3.5 text-zepto-green-light fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="font-medium text-gray-700">{product.rating}</span>
        <span>({product.ratingCount})</span>
      </div>

      <Link to={`/product/${product.id}`}>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 hover:text-zepto-purple transition-colors leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>
      </Link>

      <p className="text-xs text-zepto-gray-light mb-2">{product.unit}</p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold text-gray-900">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-zepto-gray-light line-through">₹{product.mrp}</span>
          )}
        </div>

        {qty === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="text-sm font-semibold text-zepto-purple border-2 border-zepto-purple rounded-lg px-3 sm:px-4 py-1.5 hover:bg-zepto-purple hover:text-white transition-all active:scale-95"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-zepto-purple rounded-lg">
            <button
              onClick={() => decrementQty(product.id)}
              className="text-white font-bold w-8 h-8 flex items-center justify-center hover:bg-zepto-purple-dark rounded-l-lg transition-colors"
            >
              −
            </button>
            <span className="text-white font-bold text-sm w-5 text-center">{qty}</span>
            <button
              onClick={() => incrementQty(product.id)}
              className="text-white font-bold w-8 h-8 flex items-center justify-center hover:bg-zepto-purple-dark rounded-r-lg transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
