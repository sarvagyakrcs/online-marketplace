"use client";
import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NetworkIndicator() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialLoadRef = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial page load
  useEffect(() => {
    // Check if this is the initial load
    if (initialLoadRef.current) {
      // Set initial loading state
      setProgress(0);
      setIsVisible(true);
      
      // Start progress animation
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (90 - prevProgress) * 0.1;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 100);

      // Check if document is already loaded
      if (document.readyState === 'complete') {
        completeLoading();
      } else {
        // Listen for the load event
        const handleLoad = () => {
          completeLoading();
        };
        
        window.addEventListener('load', handleLoad);
        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }
      
      // Mark initial load as done for future renders
      initialLoadRef.current = false;
    }
  }, []);

  // Handle navigation changes
  useEffect(() => {
    // Skip for initial render
    if (initialLoadRef.current) return;
    
    // Start loading indicator
    startLoading();
    
    // Simulate completion after navigation
    const timeout = setTimeout(() => {
      completeLoading();
    }, 300);
    
    return () => {
      clearTimeout(timeout);
      
      // Clean up any existing interval when the component unmounts
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pathname, searchParams]);

  // Handle browser back/forward navigation
  useEffect(() => {
    // Skip for initial render
    if (initialLoadRef.current) return;
    
    const handlePopState = () => {
      startLoading();
      
      setTimeout(() => {
        completeLoading();
      }, 300);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Helper function to start loading animation
  const startLoading = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setProgress(0);
    setIsVisible(true);
    
    // Start progress animation
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (90 - prevProgress) * 0.1;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 100);
  };

  // Helper function to complete loading animation
  const completeLoading = () => {
    // Clear the progress interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Complete the progress bar
    setProgress(100);
    
    // Hide after transition
    setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 500);
  };

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