'use client'

// import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider attribute="class" disableTransitionOnChange>
    <div className="">
      {children}
      </div>
    // </ThemeProvider>
  )
}
