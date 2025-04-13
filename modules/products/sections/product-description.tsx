"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading, Subheading } from "@/components/ui/heading";
import { Text, Strong, TextLink } from "@/components/ui/text";
import { Truck, RotateCcw, Shield, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Image, Product } from "@prisma/client";
import useCart from "@/hooks/use-cart";
import ImageSlider from "../components/image-grid";
import toast from "react-hot-toast";
import { ExtendedProduct } from "../types/product";
import { notFound } from "next/navigation";

type Props = {
  product: ExtendedProduct;
  images: Image[];
  basicDetails: Product;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const ProductDescription = ({ product, images, basicDetails }: Props) => {
  const [selectedOption, setSelectedOption] = useState(
    product.options[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "description"
  );
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  if(!images || images.length === 0) {
    notFound();
  }

  // Format images for ImageSlider component
  const formattedImages = images.map(img => ({
    id: img.id || String(Math.random()),
    url: img.url || "",
    description: img.description || null,
    isMain: img.isMain || false
  }));

  // Import cart functionality
  const { addItem, items } = useCart();

  // Detect mobile screen on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Reset animation state
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  // Check if product is already in cart
  const isInCart = items.some((item) => item.id === product.id);

  // Get current cart quantity for this product
  const currentCartQuantity =
    items.find((item) => item.id === product.id)?.quantity || 0;

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product.avaiavility === "OUT_OF_STOCK") return;

    setAddingToCart(true);
    toast.loading("Adding to cart", { id: "add-to-cart" });

    // Create cart item from product data
    const selectedOptionObj = product.options.find(
      (opt: { id: string }) => opt.id === selectedOption
    );

    const cartItem = {
      id: product.id,
      name:
        product.name +
        (selectedOptionObj ? ` - ${selectedOptionObj.name}` : ""),
      price: product.price,
      quantity: quantity,
      images: images
        .map((img) => ({
          src: img.url || "",
        }))
        .filter((img) => img.src),
    };

    // Add item to cart
    addItem(cartItem);
    toast.success("Added to cart", { id: "add-to-cart" });

    // Animate button and reset
    setTimeout(() => {
      setAddingToCart(false);

      setAddedToCart(true);
    }, 600);
  };

  const getAvailabilityBadge = () => {
    switch (basicDetails.avaiavility) {
      case "IN_STOCK":
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            In Stock
          </Badge>
        );
      case "OUT_OF_STOCK":
        return (
          <Badge className="bg-red-500 text-white hover:bg-red-600">
            Out of Stock
          </Badge>
        );
      case "PRE_ORDER":
        return (
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">
            Pre-Order
          </Badge>
        );
      default:
        return null;
    }
  };

  // Calculate discount percentage
  const discountPercentage = basicDetails.isFeatured
    ? Math.round((1 - product.price / (product.price * 1.15)) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mobile bottom sticky button - ONE single add to cart button */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between z-40 shadow-lg">
          <div className="flex flex-col">
            <span className="font-bold text-lg">
              {formatPrice(product.price)}
            </span>
            {isInCart && (
              <span className="text-xs text-zinc-500">
                {currentCartQuantity} in cart
              </span>
            )}
          </div>
          <Button
            color="rose"
            className={`py-2 px-5 rounded-xl transition-all ${addingToCart ? "opacity-70" : ""} ${addedToCart ? "bg-green-600 hover:bg-green-700" : ""}`}
            disabled={basicDetails.avaiavility === "OUT_OF_STOCK" || addingToCart}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Added
              </span>
            ) : isInCart ? (
              <span>Add More</span>
            ) : (
              <span>Add to Cart</span>
            )}
          </Button>
        </div>
      )}

      <div className="w-full flex flex-col md:flex-row md:items-start md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
        {/* Image Slider - adaptive for both mobile and desktop */}
        <div className="w-full md:w-1/2 lg:w-3/5 mb-6 md:mb-0">
          <ImageSlider
            images={formattedImages}
            autoSlide={false}
            slideInterval={5000}
            showThumbnails={!isMobile}
            showDescription={!isMobile}
            isMobile={isMobile}
            className="w-full rounded-xl overflow-hidden"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 lg:w-2/5">
          {/* Product Heading */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <TextLink
                href={`/products?category=${product.category.id}`}
                className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
              >
                {product.category.name}
              </TextLink>
              {basicDetails.isFeatured && (
                <Badge className="bg-rose-500 text-white hover:bg-rose-600">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            <Heading level={1} className="text-2xl lg:text-3xl font-bold mb-2">
              {basicDetails.name}
            </Heading>

            {product.shortDescription && (
              <Text className="text-zinc-600 dark:text-zinc-300 mb-3">
                {basicDetails.shortDescription}
              </Text>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.isFeatured && (
                <span className="text-base line-through text-zinc-500">
                  {formatPrice(product.price * 1.15)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              {getAvailabilityBadge()}
              {product.avaiavility === "IN_STOCK" && (
                <Text className="text-sm">
                  <Strong>Ships in:</Strong> {basicDetails.shippingTime}
                </Text>
              )}
            </div>
          </div>

          {/* Product Options */}
          {product.options.length > 0 && (
            <div className="mb-6">
              <Subheading level={3} className="mb-3 font-medium">
                Options
              </Subheading>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {product.options.map((option: { id: string; name: string; inStock: boolean }) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    disabled={!option.inStock}
                    className={`border rounded-lg p-3 text-center transition-all ${
                      selectedOption === option.id
                        ? "border-black bg-zinc-50 dark:border-white dark:bg-zinc-800 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                    } ${!option.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="font-medium text-sm">{option.name}</div>
                    {!option.inStock && (
                      <div className="text-xs text-red-500 mt-1">
                        Out of stock
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector and Add to Cart - show on tablet and desktop */}
          {!isMobile && (
            <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-between w-full">
              <div className="flex items-center border border-zinc-200 rounded-lg w-32 dark:border-zinc-700">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-10 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-700 disabled:opacity-50 dark:text-zinc-400 dark:hover:text-zinc-300 text-xl font-medium"
                >
                  -
                </button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="w-10 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-700 disabled:opacity-50 dark:text-zinc-400 dark:hover:text-zinc-300 text-xl font-medium"
                >
                  +
                </button>
              </div>
              <Button
                className="w-full py-3 font-medium text-base flex items-center justify-center rounded-full transition-all"
                disabled={basicDetails.avaiavility === "OUT_OF_STOCK" || addingToCart}
                onClick={handleAddToCart}
                color="sky"
              >
                {"Add to Cart"}
              </Button>
            </div>
          )}

          {/* Mobile quantity selector - simplified for mobile */}
          {isMobile && (
            <div className="mb-6 flex items-center justify-start">
              <div className="flex items-center border border-zinc-200 rounded-lg dark:border-zinc-700">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-10 h-9 flex items-center justify-center text-zinc-500 disabled:opacity-50 dark:text-zinc-400 text-xl font-medium"
                >
                  -
                </button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="w-10 h-9 flex items-center justify-center text-zinc-500 disabled:opacity-50 dark:text-zinc-400 text-xl font-medium"
                >
                  +
                </button>
              </div>
              <span className="ml-3 text-sm text-zinc-500">
                {basicDetails.avaiavility === "IN_STOCK" ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          )}

          {/* Shipping & Returns Info */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <Truck className="w-5 h-5 text-zinc-700 dark:text-zinc-300 mb-1" />
                <Strong className="text-xs">Free Shipping</Strong>
              </div>

              <div className="flex flex-col items-center text-center p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <RotateCcw className="w-5 h-5 text-zinc-700 dark:text-zinc-300 mb-1" />
                <Strong className="text-xs">Easy Returns</Strong>
              </div>

              <div className="flex flex-col items-center text-center p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <Shield className="w-5 h-5 text-zinc-700 dark:text-zinc-300 mb-1" />
                <Strong className="text-xs">Warranty</Strong>
              </div>
            </div>
          </div>

          {/* Collapsible sections */}
          <div className="space-y-4">
            {/* Description Section */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleSection("description")}
              >
                <Subheading level={3} className="font-medium">
                  Description
                </Subheading>
                {expandedSection === "description" ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </button>
              {expandedSection === "description" && (
                <div className="mt-3 prose prose-zinc dark:prose-invert max-w-none prose-sm">
                  {basicDetails.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: basicDetails.description }}
                    />
                  ) : (
                    <Text className="text-zinc-600 dark:text-zinc-400">
                      No description available.
                    </Text>
                  )}
                </div>
              )}
            </div>

            {/* Shipping Details Section */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleSection("shipping")}
              >
                <Subheading level={3} className="font-medium">
                  Shipping Details
                </Subheading>
                {expandedSection === "shipping" ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </button>
              {expandedSection === "shipping" && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Standard Shipping:</span>
                    <Strong>Free</Strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Express Shipping:</span>
                    <Strong>$12.99</Strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Estimated Delivery:</span>
                    <Strong>{basicDetails.shippingTime}</Strong>
                  </div>
                  <Text className="text-xs text-zinc-500 mt-2">
                    Free shipping on all orders over $50. Orders are processed within 1-2 business days. Shipping times are estimates and are not guaranteed.
                  </Text>
                </div>
              )}
            </div>

            {/* Returns Section */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleSection("returns")}
              >
                <Subheading level={3} className="font-medium">
                  Returns & Warranty
                </Subheading>
                {expandedSection === "returns" ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </button>
              {expandedSection === "returns" && (
                <div className="mt-3 space-y-2">
                  <Text className="text-sm">
                    We offer a 30-day return policy for most items. Returns must be unused and in original packaging. Some products may be subject to a restocking fee.
                  </Text>
                  <Text className="text-sm mt-2">
                    This product comes with a 1-year limited warranty covering manufacturing defects.
                  </Text>
                  <TextLink href="/returns" className="text-sm inline-block mt-2">
                    View Full Return Policy →
                  </TextLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
