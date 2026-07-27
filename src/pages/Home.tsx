import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import { categories, products as defaultProducts, getBestsellers, getProductsByCategory } from "../data";
import type { Product } from "../types";

export default function Home() {
  // Keep the existing demo cards untouched and load database products separately.
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

        // Normalize the database response so it can be rendered by the existing ProductCard.
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
        console.error("Product fetch failed:", error);
        setDbProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const bestsellers = getBestsellers();
  const fruits = getProductsByCategory("fruits");
  const snacks = getProductsByCategory("snacks");
  const dairy = getProductsByCategory("dairy");
  const beverages = getProductsByCategory("beverages");
  const icecream = getProductsByCategory("icecream");
  const snackProducts = dbProducts.filter((product) => {
    const category = (product.category || "").toLowerCase();
    return category.includes("snack") || category.includes("munch");
  });
  const freshFruitProducts = dbProducts.filter((product) => {
    const category = (product.category || "").toLowerCase();
    return category.includes("fruit");
  });
  const allProducts = [...defaultProducts, ...dbProducts];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 animate-fade-in">
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Categories */}
      <section className="mt-6 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 px-1">
          Shop by Category
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Info Strip */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-zepto-purple-50 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zepto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">10 Min</div>
            <div className="text-[10px] sm:text-xs text-zepto-gray-light">Delivery</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zepto-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">100%</div>
            <div className="text-[10px] sm:text-xs text-zepto-gray-light">Quality</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zepto-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">Best</div>
            <div className="text-[10px] sm:text-xs text-zepto-gray-light">Prices</div>
          </div>
        </div>
      </div>

      {/* Product Rows */}
      <ProductRow title="Bestsellers" products={bestsellers} />
      <ProductRow title="Fresh Fruits" products={[...fruits, ...freshFruitProducts]} viewAllLink="/category/fruits" />
      <ProductRow title="Snacks & Munchies" products={[...snacks, ...snackProducts]} viewAllLink="/category/snacks" />
      <ProductRow title="Dairy & Eggs" products={dairy} viewAllLink="/category/dairy" />
      <ProductRow title="Beverages" products={beverages} viewAllLink="/category/beverages" />
      <ProductRow title="Ice Creams" products={icecream} viewAllLink="/category/icecream" />

      {/* All Products Grid */}
      <section className="mt-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 px-1">
          All Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
