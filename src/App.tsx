import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { useCart } from "./context/CartContext";
import { Link } from "react-router-dom";
import SignUp from './pages/SignUp';

function FloatingCartBar() {
  const { getTotalItems, getTotalPrice } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();
  const total = getTotalPrice();

  if (totalItems === 0) return null;
  if (location.pathname === "/cart" || location.pathname === "/checkout") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 pb-3">
        <Link
          to="/cart"
          className="flex items-center justify-between bg-zepto-purple text-white rounded-2xl px-4 sm:px-6 py-3 shadow-2xl hover:bg-zepto-purple-dark transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-zepto-yellow text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold">{totalItems} item{totalItems !== 1 ? "s" : ""} • ₹{total}</div>
              <div className="text-xs opacity-90">View cart & checkout</div>
            </div>
          </div>
          <div className="flex items-center gap-1 font-bold text-sm">
            Checkout
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-zepto-gray-bg">
      <Header />
      <main className="flex-1 pb-20">

        <Routes>
          <Route path="/login" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCartBar />
    </div>
  );
}
