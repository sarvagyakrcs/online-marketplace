"use client"
import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type SliderImage = {
  id: string
  url: string
  description?: string | null
  isMain: boolean
}

type ImageSliderProps = {
  images: SliderImage[]
  autoSlide?: boolean
  slideInterval?: number
  showThumbnails?: boolean
  showDescription?: boolean
  isMobile?: boolean
  onImageClick?: () => void
  className?: string
}

const ImageSlider = ({
  images,
  autoSlide = false,
  slideInterval = 3000,
  showThumbnails = true,
  showDescription = true,
  isMobile = false,
  onImageClick,
  className,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Find initial main image index or default to 0
  useEffect(() => {
    const mainImageIndex = images.findIndex((img) => img.isMain)
    setCurrentIndex(mainImageIndex !== -1 ? mainImageIndex : 0)
  }, [images])

  const startSlideTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, slideInterval)
  }, [images.length, slideInterval])

  // Setup auto-sliding
  useEffect(() => {
    if (autoSlide) {
      startSlideTimer()
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoSlide, startSlideTimer])

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    if (autoSlide) startSlideTimer()
  }

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    if (autoSlide) startSlideTimer()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    if (autoSlide) startSlideTimer()
  }

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next
      goToNextSlide()
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right, go to previous
      goToPreviousSlide()
    }
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  // If no images, display placeholder
  if (!images.length) {
    return (
      <div className="relative w-full h-64 bg-zinc-100 flex items-center justify-center rounded-lg dark:bg-zinc-800">
        <p>No images available</p>
      </div>
    )
  }

  // Full screen mobile view
  if (isFullScreen && isMobile) {
    return (
      <div
        className="fixed inset-0 bg-black z-50 flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 relative">
          <Image
            src={images[currentIndex].url || "/placeholder.svg"}
            alt={images[currentIndex].description || `Product image ${currentIndex + 1}`}
            className="object-contain w-full h-full"
            fill
            priority
          />

          {/* Close button */}
          <Button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 rounded-full bg-black/50 p-2 z-10 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>

          {/* Navigation arrows */}
          <div className="absolute inset-x-0 bottom-12 flex items-center justify-between p-4">
            <Button onClick={goToPreviousSlide} className="rounded-full bg-black/50 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </Button>
            <Button onClick={goToNextSlide} className="rounded-full bg-black/50 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </Button>
          </div>
        </div>

        {/* Thumbnails at bottom */}
        <div className="h-20 bg-black flex items-center overflow-x-auto px-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 h-14 w-14 mx-1 border-2 rounded overflow-hidden ${
                index === currentIndex ? "border-blue-500" : "border-transparent"
              }`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.description || `Thumbnail ${index + 1}`}
                className="object-cover"
                fill
              />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main image container */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={isMobile ? toggleFullScreen : onImageClick}
      >
        <Image
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].description || `Product image ${currentIndex + 1}`}
          className="object-cover w-full h-full transition-opacity duration-300"
          fill
          priority
        />

        {/* Navigation arrows - show only on desktop or when not mobile */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                goToPreviousSlide()
              }}
              className="rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </Button>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                goToNextSlide()
              }}
              className="rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </Button>
          </div>
        )}

        {/* Image counter badge */}
        <Badge className="absolute bottom-4 right-4 bg-black/70 text-white">
          {currentIndex + 1} / {images.length}
        </Badge>

        {/* Mobile fullscreen indicator */}
        {isMobile && images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M15 3h6v6"></path>
              <path d="M9 21H3v-6"></path>
              <path d="M21 3l-7 7"></path>
              <path d="M3 21l7-7"></path>
            </svg>
            Tap to expand
          </div>
        )}
      </div>

      {/* Image description */}
      {showDescription && images[currentIndex].description && (
        <div className="mt-2">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">{images[currentIndex].description}</p>
        </div>
      )}

      {/* Thumbnails - show on tablet and desktop */}
      {showThumbnails && images.length > 1 && !isMobile && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`relative h-16 w-16 rounded-md overflow-hidden border-2 ${
                index === currentIndex ? "border-blue-500 ring-1 ring-blue-500" : "border-transparent hover:opacity-80"
              }`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.description || `Thumbnail ${index + 1}`}
                className="object-cover"
                fill
              />
              {image.isMain && (
                <div className="absolute bottom-0 w-full bg-blue-500/70 py-0.5">
                  <span className="text-xs text-white text-center block">Main</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mobile dot indicators - simpler alternative to thumbnails on mobile */}
      {isMobile && images.length > 1 && (
        <div className="mt-2 flex justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageSlider

