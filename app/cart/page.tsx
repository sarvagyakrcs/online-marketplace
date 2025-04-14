"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useCart from "@/hooks/use-cart";
import { ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Logo } from "@/components/global/logo";
import SignInForm from "@/modules/auth/components/sign-in-component";
import { Trash2Icon } from "lucide-react";
import Checkout from "@/modules/products/components/checkout";
import { CheckoutSession } from "@/modules/products/types/checkout";

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, cartTotal } = useCart();
  const [checkoutConfirm, setCheckoutConfirm] = useState(false);
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;
  const totalAmount = cartTotal + taxAmount;
  const [promoError, setPromoError] = useState("");

  const checkoutSession : CheckoutSession = {
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.images[0].src],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <nav className="bg-white dark:bg-zinc-800 shadow-md w-full">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center space-x-6">
            <SignInForm type="modal" modalLabel="icon" />
            <Badge color="sky" className="px-3 py-1 text-sm font-semibold">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left max-w-sm">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <ShoppingBagIcon className="h-10 w-10 text-blue-600 dark:text-blue-300" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
                  Your cart is waiting to be filled
                </h2>

                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Discover our curated collection of products and add your favorites to your cart.
                </p>

                <Button 
                  className="mt-8 px-6 py-2.5 flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700" 
                  href={"/"}
                >
                  Browse Products
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-sm"></div>
                <div className="relative">
                  <Image
                    src="/assets/empty-cart.png"
                    alt="Empty Cart"
                    width={320}
                    height={320}
                    className="rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-xl bg-white shadow-sm ring-1 ring-zinc-950/10 dark:bg-zinc-800 dark:ring-white/10">
                <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6 px-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
                        <Image
                          height={100}
                          width={100}
                          src={item.images[0].src}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-zinc-900 dark:text-white">
                            <h3>
                              <Link
                                href={`/products/${item.id}`}
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="ml-4">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            ${item.price} each
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-zinc-600 dark:text-zinc-400">
                              Qty
                            </span>
                            <div className="flex items-center border border-zinc-300 rounded dark:border-zinc-600">
                              <button
                                type="button"
                                className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-zinc-800 dark:text-zinc-200">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <Button>
                            <Trash2Icon size={16} onClick={() => removeItem(item.id)} />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Button
                  href="/products"
                  color="light"
                  className="w-full sm:w-auto"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-950/10 dark:bg-zinc-800 dark:ring-white/10">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Order Summary
                </h2>

                <DescriptionList className="mt-6">
                  <DescriptionTerm>Subtotal</DescriptionTerm>
                  <DescriptionDetails>
                    ${cartTotal.toFixed(2)}
                  </DescriptionDetails>

                  <DescriptionTerm>Shipping</DescriptionTerm>
                  <DescriptionDetails>Free</DescriptionDetails>

                  <DescriptionTerm>Tax ({(taxRate * 100).toFixed(0)}%)</DescriptionTerm>
                  <DescriptionDetails>
                    ${taxAmount.toFixed(2)}
                  </DescriptionDetails>

                  <DescriptionTerm className="!border-t-2 pt-4 font-medium text-zinc-900 dark:text-white">
                    Total
                  </DescriptionTerm>
                  <DescriptionDetails className="!border-t-2 pt-4 font-medium text-zinc-900 dark:text-white">
                    ${totalAmount.toFixed(2)}
                  </DescriptionDetails>
                </DescriptionList>

                <Button
                  className="mt-6 w-full py-2.5"
                  color="sky"
                  onClick={() => setCheckoutConfirm(true)}
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  <p>We accept all major credit cards and PayPal</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-950/10 dark:bg-zinc-800 dark:ring-white/10">
                <h3 className="text-base font-medium text-zinc-900 dark:text-white">
                  Promotional Code
                </h3>
                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
                    placeholder="Enter code"
                  />
                  <Button onClick={() => setPromoError("Promo code is not valid")} className="flex items-center justify-center" >Apply</Button>
                </div>
                  { promoError && (
                    <p className="text-red-500 text-sm mt-2 ml-6">
                      {promoError}
                    </p>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Improved checkout confirmation dialog */}
        <Dialog
          open={checkoutConfirm}
          onClose={() => setCheckoutConfirm(false)}
        >
          <DialogTitle>Ready to Complete Your Purchase?</DialogTitle>
          <DialogBody className="pt-6">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Order Summary</h3>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Items ({cartItems.length}):</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span>Tax:</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700 flex justify-between font-medium">
                  <span>Total:</span>
                  <span className="text-lg">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <p className="text-zinc-600 dark:text-zinc-400">
                In the next step, you&apos;ll enter your shipping and payment information to complete your purchase.
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </DialogBody>
          <DialogActions className="border-t flex items-center justify-center border-zinc-200 dark:border-zinc-700 pt-4">
            <div className="flex items-center justify-center space-x-4">
              {/* <StripeCheckout /> */}
              {/* <RazorpayCheckout /> */}
              <Checkout checkoutSession={checkoutSession} />
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}