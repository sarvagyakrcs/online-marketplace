"use server";
import React from "react";
import ShoppingNavbar from "../components/shopping-nav";
import { auth } from "@/auth";
import Footer from "../components/footer";

type Props = {
  children: React.ReactNode;
};

const ShoppingLayout = async ({ children }: Props) => {
  const session = await auth();
  return (
    <div className="grainy">
      <main className="h-full">
        <ShoppingNavbar session={session} />
        <div className="flex w-screen items-center justify-center gap-3">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingLayout;
