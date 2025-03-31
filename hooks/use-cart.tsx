"use client"

import { CartContext } from "@/providers/cart-provider";
import { useContext } from "react"

export default function useCart() {
    const context = useContext((CartContext))
    if(context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}