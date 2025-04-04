import { type Metadata } from "next";
import { Poppins } from "next/font/google";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

import "@/styles/tailwind.css";
import { Providers } from "@/components/providers/theme-providers";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import CartProvider from "@/providers/cart-provider";
import NetworkIndicator from "@/components/global/network-indicator";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});

export const metadata: Metadata = {
  title: "Mashno - A shopping experience like no other",
  description:
    "Mashno is a shopping platform that offers a unique and personalized shopping experience, combining the best of online and offline shopping.",
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx("h-full antialiased", font.className)}
      suppressHydrationWarning
    >
      <QueryClientProvider>
        <body className="flex min-h-full flex-col dark:bg-gray-950">
          <Providers>
            <CartProvider>
              <NetworkIndicator />
              {children}
            </CartProvider>
          </Providers>
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </QueryClientProvider>
    </html>
  );
}
