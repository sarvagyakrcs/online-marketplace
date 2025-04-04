"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      title: "Handcrafted Madhubani Art",
      subtitle: "Exclusive Limited Pieces",
      description: "Intricate hand-painted Madhubani artworks perfect for home decor.",
      buttonText: "Shop now",
      backgroundColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      imageUrl: "/assets/hero-banner/img4.png",
      altText: "Madhubani painting collection",
    },
    {
      id: 2,
      title: "Rajasthani Puppets",
      subtitle: "Bringing Tradition to Life",
      description: "Colorful and expressive Rajasthani puppets that make for unique gifts and performances.",
      buttonText: "See collection",
      backgroundColor: "bg-pink-100",
      textColor: "text-pink-800",
      imageUrl: "/assets/hero-banner/img2.png",
      altText: "Rajasthani puppets collection",
    },
    {
      id: 3,
      title: "Blue Pottery from Jaipur",
      subtitle: "Vibrant & Elegant",
      description: "Hand-painted blue pottery with intricate designs, a true Rajasthani gem.",
      buttonText: "Explore now",
      backgroundColor: "bg-blue-100",
      textColor: "text-cyan-800",
      imageUrl: "/assets/hero-banner/img3.png",
      altText: "Jaipur blue pottery collection",
    },
    {
      id: 4,
      title: "Kashmiri Papier-mâché Art",
      subtitle: "Aesthetic & Sustainable",
      description: "Eco-friendly hand-crafted decor items with beautiful Kashmiri designs.",
      buttonText: "Discover",
      backgroundColor: "bg-green-100",
      textColor: "text-green-800",
      imageUrl: "/assets/hero-banner/img2.png",
      altText: "Kashmiri Papier-mâché collection",
    },
  ];

  const nextSlide = React.useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % products.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, products.length]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating, nextSlide]);

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative w-full overflow-hidden z-0 rounded-lg shadow-lg">
      {/* Main carousel */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full z-20">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out flex items-center ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className={`flex flex-col md:flex-row w-full h-full ${product.backgroundColor}`}>
              {/* Product info section - now full width on mobile */}
              <div className="flex flex-col justify-center w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:px-20 order-2 md:order-1">
                <div className="space-y-2 sm:space-y-4">
                  <span className={`text-xs sm:text-sm font-bold ${product.textColor}`}>
                    {product.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    {product.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 line-clamp-2">
                    {product.description}
                  </p>
                  <button className="mt-2 sm:mt-4 px-4 sm:px-6 py-1 sm:py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 inline-block w-max text-xs sm:text-sm font-medium">
                    {product.buttonText}
                  </button>
                </div>
              </div>

              {/* Product image section - full width on mobile but above text */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full order-1 md:order-2">
                <Image
                  height={1000}
                  width={1000}
                  src={product.imageUrl}
                  alt={product.altText}
                  className="w-full h-full object-contain object-center"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - smaller on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 rounded-full bg-white/70 hover:bg-white text-gray-800 shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 rounded-full bg-white/70 hover:bg-white text-gray-800 shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Indicator dots - smaller and more spaced on mobile */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1 sm:space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-gray-800"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;