import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";              // link:navigation without reloading page //
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const totalItems = getTotalItems();

  useEffect(() => {
    if (mobileSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-zepto-purple text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium">
        Delivery in 10 minutes — India's fastest grocery delivery
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zepto-purple flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl">
            Z
          </div>
          <span className="hidden sm:block text-2xl font-extrabold text-zepto-purple tracking-tight">
            Zepto
          </span>
        </Link>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-sm shrink-0">
          <svg className="w-5 h-5 text-zepto-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <div>
            <div className="font-semibold text-sm">Delivery to Home</div>
            <div className="text-xs text-zepto-gray-light">Koramangala, Bangalore</div>
          </div>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zepto-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2.5 bg-zepto-gray-bg rounded-xl border border-gray-200 focus:border-zepto-purple focus:outline-none text-sm transition-colors"
            />
          </div>
        </form>

        {/* Mobile search icon */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="sm:hidden ml-auto p-2 text-zepto-gray"
          aria-label="Search"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </button>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 bg-zepto-purple-50 px-3 sm:px-4 py-2.5 rounded-xl hover:bg-zepto-purple-100 transition-colors shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zepto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="hidden sm:block font-semibold text-sm text-zepto-purple">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-zepto-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-scale">
              {totalItems}
            </span>
          )}
        </Link>

        {/* {login} */}
        <Link
          to="/login"
          className="relative flex items-center gap-2 bg-zepto-purple-50 px-3 sm:px-4 py-2.5 rounded-xl hover:bg-zepto-purple-100 transition-colors shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zepto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="hidden sm:block font-semibold text-sm text-zepto-purple">Sign Up</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-zepto-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-scale">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <form onSubmit={handleSearch} className="sm:hidden px-4 pb-3 animate-fade-in">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zepto-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2.5 bg-zepto-gray-bg rounded-xl border border-gray-200 focus:border-zepto-purple focus:outline-none text-sm"
            />
          </div>
        </form>
      )}
    </header>
  );
}
