"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NetworkIndicator() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Monitor navigation changes through pathname and searchParams
  useEffect(() => {
    // When navigation starts
    const startProgress = () => {
      setProgress(0);
      setIsVisible(true);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Slowly approach 90% until actual completion
          const newProgress = prevProgress + (90 - prevProgress) * 0.1;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 100);
      
      return interval;
    };

    // When navigation completes
    const completeProgress = (interval: NodeJS.Timeout) => {
      clearInterval(interval);
      setProgress(100);
      
      // Hide the progress bar after completion
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 500);
    };

    // Start the progress
    const interval = startProgress();
    
    // Cleanup function that runs when navigation completes
    return () => {
      completeProgress(interval);
    };
  }, [pathname, searchParams]);

  // For monitoring resource loading
  useEffect(() => {
    // Function to handle resource loading state
    const handleResourceLoad = () => {
      if (document.readyState === 'complete') {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 500);
      }
    };

    // Add event listener
    window.addEventListener('load', handleResourceLoad);
    
    // Cleanup
    return () => {
      window.addEventListener('load', handleResourceLoad);
    };
  }, []);

  // Support navigation via browser back/forward buttons
  useEffect(() => {
    const handleStartNavigation = () => {
      setProgress(0);
      setIsVisible(true);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (90 - prevProgress) * 0.1;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 100);
      
      return interval;
    };

    const handlePopState = () => {
      const interval = handleStartNavigation();
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 500);
      }, 300);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        backgroundColor: 'red',
        zIndex: 9999,
        transition: 'width 0.2s ease-in-out'
      }}
    />
  );
}