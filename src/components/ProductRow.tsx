import { useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "../types";

interface ProductRowProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductRow({ title, products, viewAllLink }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.7;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-sm font-semibold text-zepto-purple hover:underline"
            >
              View All
            </Link>
          )}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-zepto-purple hover:text-white hover:border-zepto-purple transition-all"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-zepto-purple hover:text-white hover:border-zepto-purple transition-all"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="w-40 sm:w-48 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
