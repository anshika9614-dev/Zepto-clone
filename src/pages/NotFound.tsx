import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="text-8xl font-extrabold text-zepto-purple mb-4">404</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h2>
      <p className="text-zepto-gray mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-block bg-zepto-purple text-white font-bold px-6 py-3 rounded-xl hover:bg-zepto-purple-dark transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
