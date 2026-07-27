import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories, getProductsByCategory } from "../data";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const products = getProductsByCategory(categoryId || "");

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
        <Link to="/" className="text-zepto-purple font-semibold hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zepto-gray-light mb-4">
        <Link to="/" className="hover:text-zepto-purple transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{category.name}</span>
      </div>

      {/* Category Header */}
      <div
        className="rounded-2xl p-6 mb-6 flex items-center gap-4"
        style={{ backgroundColor: category.color }}
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">{category.name}</h1>
          <p className="text-sm text-zepto-gray">{products.length} products available</p>
        </div>
      </div>

      {/* Sub-category chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {["All", "Bestsellers", "New Arrivals", "Offers", "Premium"].map((chip, i) => (
          <button
            key={chip}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-zepto-purple text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-zepto-purple hover:text-zepto-purple"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zepto-gray text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
