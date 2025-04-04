"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";

const ConfettiParticle = ({ index }: { index: number }) => {
  const colors = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#FF69B4', '#9370DB'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = `${Math.random() * 100}%`;
  const randomSize = `${Math.random() * 0.6 + 0.4}rem`;
  const randomDuration = `${Math.random() * 3 + 2}s`;
  const randomDelay = `${Math.random() * 2}s`;
  
  return (
    <div 
      className="absolute top-0 animate-fall"
      style={{
        left: randomLeft,
        width: randomSize,
        height: randomSize,
        backgroundColor: randomColor,
        borderRadius: index % 3 === 0 ? '50%' : '0',
        animation: `fall ${randomDuration} ease-in ${randomDelay} forwards`,
        opacity: 0,
        zIndex: 10,
        transform: `rotate(${Math.random() * 360}deg)`
      }}
    />
  );
};

export default function SuccessPage() {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Generate confetti particles
    setParticles(Array.from({ length: 80 }, (_, i) => i));
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-10px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 overflow-hidden">
        {particles.map((index) => (
          <ConfettiParticle key={index} index={index} />
        ))}
        
        <div className="text-center animate-slideIn" style={{ animation: 'slideIn 0.8s ease-out forwards' }}>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-pulse" style={{ animation: 'pulse 2s infinite' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Order Successful 🎉
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Your order has been confirmed and will be shipped soon.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              Go back home
            </Link>
            <Link href="/support" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}