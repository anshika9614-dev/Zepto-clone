import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zepto-purple flex items-center justify-center text-white font-extrabold text-2xl">
                Z
              </div>
              <span className="text-2xl font-extrabold text-zepto-purple">Zepto</span>
            </div>
            <p className="text-sm text-zepto-gray leading-relaxed">
              India's fastest grocery delivery. Get groceries delivered to your doorstep in 10 minutes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-800">Company</h3>
            <ul className="space-y-2 text-sm text-zepto-gray">
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-800">Help</h3>
            <ul className="space-y-2 text-sm text-zepto-gray">
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">FAQs</Link></li>
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-zepto-purple transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-800">Download the App</h3>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-900 text-white rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-80">Download on the</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </div>
              <div className="bg-gray-900 text-white rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.395 12l2.503-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-80">GET IT ON</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zepto-gray-light">
            © 2025 Zepto Clone — Built for demonstration purposes.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-zepto-gray-light">10-minute delivery</span>
            <span className="text-xs text-zepto-gray-light">•</span>
            <span className="text-xs text-zepto-gray-light">100% Quality assured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
