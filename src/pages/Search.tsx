import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchProducts as searchDefaultProducts } from "../data";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        const fetchedProducts = Array.isArray(result?.data) ? result.data : [];

        const normalizedProducts = fetchedProducts.map((product: any) => ({
          ...product,
          id: String(product.id),
          price: Number(product.price),
          mrp: Number(product.mrp),
          rating: Number(product.rating),
          tags: Array.isArray(product.tags)
            ? product.tags
            : typeof product.tags === "string"
              ? JSON.parse(product.tags)
              : [],
        }));

        setDbProducts(normalizedProducts);
      } catch (error) {
        console.error("Search product fetch failed:", error);
        setDbProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const results = useMemo(() => {
    const defaultResults = searchDefaultProducts(query);
    const dbResults = dbProducts.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });

    return [...defaultResults, ...dbResults];
  }, [dbProducts, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-zepto-gray-light mb-4">
        <Link to="/" className="hover:text-zepto-purple transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Search</span>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        Search Results
      </h1>
      <p className="text-sm text-zepto-gray mb-6">
        {results.length} product{results.length !== 1 ? "s" : ""} found for "{query}"
      </p>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-zepto-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No products found</h2>
          <p className="text-zepto-gray text-sm mb-6">Try searching for something else</p>
          <Link
            to="/"
            className="inline-block bg-zepto-purple text-white font-bold px-6 py-3 rounded-xl hover:bg-zepto-purple-dark transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
