import { useEffect, useState } from "react";
import { banners } from "../data";

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);

  return (
    <div className="relative rounded-2xl overflow-hidden h-44 sm:h-56 md:h-64">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ backgroundColor: banner.bgColor }}
        >
          <div className="relative h-full flex items-center justify-between px-6 sm:px-12">
            <div className="z-10 text-white max-w-[60%]">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-1 sm:mb-2 leading-tight">
                {banner.title}
              </h2>
              <p className="text-sm sm:text-base opacity-90">{banner.subtitle}</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
