import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProductById, products } from "../data";
import { useCart } from "../context/CartContext";
import ProductRow from "../components/ProductRow";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = getProductById(productId || "");
  const { addToCart, getItemQty, incrementQty, decrementQty } = useCart();
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/" className="text-zepto-purple font-semibold hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const qty = getItemQty(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 10);

  const handleAdd = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zepto-gray-light mb-4">
        <Link to="/" className="hover:text-zepto-purple transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-zepto-purple transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Product Image */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-3 left-3 bg-zepto-green text-white text-sm font-bold px-2 py-1 rounded-lg">
                {discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <svg className="w-4 h-4 text-zepto-green-light fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            </div>
            <span className="text-sm text-zepto-gray-light">{product.ratingCount} ratings</span>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-extrabold text-gray-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-lg text-zepto-gray-light line-through">₹{product.mrp}</span>
            )}
            {discount > 0 && (
              <span className="text-sm font-semibold text-zepto-green">Save ₹{product.mrp - product.price}</span>
            )}
          </div>

          <p className="text-sm text-zepto-gray mb-1">Unit: {product.unit}</p>

          {product.tags.length > 0 && (
            <div className="flex gap-2 mb-4 mt-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold bg-zepto-yellow text-black px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 pt-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">About this product</h3>
            <p className="text-sm text-zepto-gray leading-relaxed">{product.description}</p>
          </div>

          {/* Add to cart section */}
          <div className="mt-auto">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="w-full bg-zepto-purple text-white font-bold py-3.5 rounded-xl hover:bg-zepto-purple-dark transition-colors active:scale-[0.98] text-base"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center bg-zepto-purple rounded-xl">
                  <button
                    onClick={() => decrementQty(product.id)}
                    className="text-white font-bold w-12 h-12 flex items-center justify-center hover:bg-zepto-purple-dark rounded-l-xl transition-colors text-xl"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-lg w-10 text-center">{qty}</span>
                  <button
                    onClick={() => incrementQty(product.id)}
                    className="text-white font-bold w-12 h-12 flex items-center justify-center hover:bg-zepto-purple-dark rounded-r-xl transition-colors text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 bg-zepto-purple-50 text-zepto-purple font-bold py-3.5 rounded-xl hover:bg-zepto-purple-100 transition-colors"
                >
                  Go to Cart →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductRow title="You may also like" products={relatedProducts} />
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg z-50 animate-fade-in">
          Added to cart!
        </div>
      )}
    </div>
  );
}
