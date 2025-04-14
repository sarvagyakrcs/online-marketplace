import React from 'react';

type BannerProps = {
  title: string;
  description: string;
  ctaText?: string;
  ctaAction?: () => void;
  onDismiss?: () => void;
};

const Banner1 = ({ 
  title, 
  description, 
  ctaText, 
  ctaAction, 
  onDismiss 
}: BannerProps) => {
  return (
    <div className="w-full bg-gray-50 py-3 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 truncate">{title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-0.5 line-clamp-1">{description}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            {ctaText && ctaAction && (
              <button
                onClick={ctaAction}
                className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                {ctaText}
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1.5 text-gray-500 hover:text-gray-700"
                aria-label="Dismiss"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner1;