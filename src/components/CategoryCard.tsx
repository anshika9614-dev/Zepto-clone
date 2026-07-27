import { Link } from "react-router-dom";
import type { Category } from "../types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="flex flex-col items-center gap-2 group shrink-0"
    >
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-zepto-purple group-hover:scale-105 transition-all duration-200"
        style={{ backgroundColor: category.color }}
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-zepto-purple transition-colors text-center">
        {category.name}
      </span>
    </Link>
  );
}
