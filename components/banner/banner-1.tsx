"use client";
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Button } from '../ui/button';

// Define the props that can be passed to the component
export default function Banner1({
  title,
  description,
  ctaText,
  ctaAction,
  bgColorFrom = "#ff80b5",
  bgColorTo = "#9089fc",
  onDismiss,
  showDismissButton = true
}: {
  title: string
  description: string
  ctaText?: string
  ctaAction?: () => void
  bgColorFrom?: string
  bgColorTo?: string
  onDismiss?: () => void
  showDismissButton?: boolean
}) {
  // Add state to track if the banner is visible
  const [isVisible, setIsVisible] = useState(true)

  // Handle the dismiss click
  const handleDismiss = () => {
    setIsVisible(false)
    // Also call the onDismiss callback if provided
    if (onDismiss) {
      onDismiss()
    }
  }

  // If banner is not visible, don't render anything
  if (!isVisible) {
    return null
  }

  return (
    <div className="relative w-screen isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            background: `linear-gradient(to right, ${bgColorFrom}, ${bgColorTo})`,
          }}
          className="aspect-577/310 w-[36.0625rem] opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            background: `linear-gradient(to right, ${bgColorFrom}, ${bgColorTo})`,
          }}
          className="aspect-577/310 w-[36.0625rem] opacity-30"
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-900">
          <strong className="font-semibold">{title}</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          {description}
        </p>
        {ctaText && ctaAction && (
          <Button
            onClick={ctaAction}
            className="text-sm font-semibold leading-6 text-white bg-black hover:bg-gray-800 transition"
          >
            {ctaText}
          </Button>
        )}

      </div>
      {showDismissButton && (
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            onClick={handleDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" />
          </button>
        </div>
      )}
    </div>
  )
}