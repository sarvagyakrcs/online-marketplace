"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
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
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useCart from "@/hooks/use-cart";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { Logo } from "@/components/global/logo";
import SignInForm from "@/modules/auth/components/sign-in-component";

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, cartTotal } = useCart();
  const [checkoutConfirm, setCheckoutConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <nav className="bg-white dark:bg-zinc-800 shadow-md w-full">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center space-x-6">
            <SignInForm type="modal" modalLabel="icon" />
            <Badge color="blue" className="px-3 py-1 text-sm font-semibold">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-800 dark:ring-white/10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                <ShoppingBagIcon className="h-8 w-8 text-zinc-500 dark:text-zinc-300" />
              </div>

              <h2 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-white">
                Your cart is empty
              </h2>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                Looks like you haven&apos;t added anything to your cart yet.
                Explore our products to find something you&apos;ll love!
              </p>

              <Button className="mt-6 px-4 py-2" href={"/"}>
                Continue Shopping
              </Button>
            </div>
            <Image
              src="/assets/empty-cart.png"
              alt="Empty Cart"
              width={200}
              height={200}
              className="mt-8 w-full max-w-sm mx-auto rounded-2xl"
            />
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
                            ${item.price.toFixed(2)} each
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

                          <Dropdown>
                            <DropdownButton
                              as="button"
                              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                            >
                              Actions
                            </DropdownButton>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  const newQty = prompt(
                                    "Enter new quantity:",
                                    item.quantity.toString()
                                  );
                                  if (newQty && !isNaN(parseInt(newQty, 10))) {
                                    updateQuantity(
                                      item.id,
                                      parseInt(newQty, 10)
                                    );
                                  }
                                }}
                              >
                                Update Quantity
                              </DropdownItem>
                              <DropdownDivider />
                              <DropdownItem onClick={() => removeItem(item.id)}>
                                Remove
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
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

                  <DescriptionTerm>Tax</DescriptionTerm>
                  <DescriptionDetails>
                    ${(cartTotal * 0.08).toFixed(2)}
                  </DescriptionDetails>

                  <DescriptionTerm className="!border-t-2 pt-4 font-medium text-zinc-900 dark:text-white">
                    Total
                  </DescriptionTerm>
                  <DescriptionDetails className="!border-t-2 pt-4 font-medium text-zinc-900 dark:text-white">
                    ${(cartTotal + cartTotal * 0.08).toFixed(2)}
                  </DescriptionDetails>
                </DescriptionList>

                <Button
                  className="mt-6 w-full"
                  color="blue"
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
                  <Button plain>Apply</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout confirmation dialog */}
        <Dialog
          open={checkoutConfirm}
          onClose={() => setCheckoutConfirm(false)}
        >
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You&apos;re about to check out with {cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"} for a total of $
            {(cartTotal + cartTotal * 0.08).toFixed(2)}.
          </DialogDescription>
          <DialogBody>
            <p className="text-zinc-600 dark:text-zinc-400">
              This is a demonstration checkout page. In a real application, you
              would proceed to enter your payment and shipping information.
            </p>
          </DialogBody>
          <DialogActions>
            <Button onClick={() => setCheckoutConfirm(false)} outline>
              Cancel
            </Button>
            <Button
              color="blue"
              onClick={() => alert("Order placed successfully!")}
            >
              Confirm Order
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
