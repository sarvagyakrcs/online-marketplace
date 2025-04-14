"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import LocationSelector from "@/components/ui/location-selector";
import { placeOrderSchema, PlaceOrderSchema } from "@/schemas/checkout/place-order-schema";
import { useMutation } from "@tanstack/react-query";
import { CheckoutSession } from "@/modules/products/types/checkout";
import { PlaceOrder, createRazorpayOrder } from "@/actions/orders";

// Add Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutForm({ checkoutSession } : { checkoutSession : CheckoutSession }) {
  const [, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const form = useForm<PlaceOrderSchema>({
    resolver: zodResolver(placeOrderSchema),
    defaultValues: {
      fName: "",
      lName: "",
      mobile: "",
      pinCode: "",
      address: "",
      area: "",
      landmark: "",
      country: ["", ""]
    }
  });

  const {
    mutate: OrderNow,
    isPending
  } = useMutation({
    mutationKey: ["place-order"],
    mutationFn: PlaceOrder,
    onMutate: () => {
      toast.loading("Placing your order", { id: "place-order" });
    },
    onSuccess: () => {
      toast.success("Order placed successfully", { id: "place-order" });
    },
    onError: (error) => {
      toast.error("Failed to place order", { id: "place-order" });
      console.error("Error placing order", error);
    }
  });

  // Initialize and open Razorpay payment
  const initializeRazorpayPayment = async (orderData: PlaceOrderSchema) => {
    if (!isRazorpayLoaded) {
      toast.error("Payment gateway is loading. Please try again.");
      return;
    }

    try {
      toast.loading("Initializing payment...", { id: "razorpay-init" });
      
      // Create Razorpay order on the server
      const razorpayOrderData = await createRazorpayOrder({
        checkoutSession,
        orderData
      });
      
      if (!razorpayOrderData || !razorpayOrderData.id) {
        throw new Error("Failed to create payment order");
      }

      toast.success("Payment initialized", { id: "razorpay-init" });

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrderData.amount,
        currency: razorpayOrderData.currency,
        name: "Your Store Name",
        description: "Order Payment",
        order_id: razorpayOrderData.id,
        prefill: {
          name: `${orderData.fName} ${orderData.lName || ''}`,
          email: '', // You may want to add email to your form
          contact: orderData.mobile
        },
        notes: {
          address: orderData.address
        },
        theme: {
          color: "#3B82F6" // Blue color to match your button
        },
        handler: function(response: any) {
          // Process successful payment
          OrderNow({
            checkoutSession, 
            orderData,
            paymentDetails: {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature
            }
          });
        }
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      toast.error("Payment initialization failed", { id: "razorpay-init" });
      console.error("Razorpay initialization failed:", error);
    }
  };

  function onSubmit(values: PlaceOrderSchema) {
    // Instead of directly placing order, initialize Razorpay payment
    initializeRazorpayPayment(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <h2 className="text-2xl font-medium mb-6">Shipping Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John"
                    className="bg-transparent"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Doe"
                    className="bg-transparent"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter your phone number"
                  className="bg-transparent"
                  {...field}
                  defaultCountry="US"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="123 Main Street, Apt 4B"
                  className="bg-transparent"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area/Neighborhood</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Downtown"
                    className="bg-transparent"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="10001"
                    className="bg-transparent"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Near Central Park"
                  className="bg-transparent"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || '');
                    form.setValue(field.name, [country?.name || '', stateName || '']);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || '');
                    form.setValue(field.name, [form.getValues(field.name)[0] || '', state?.name || '']);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isPending || !isRazorpayLoaded}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {isPending ? "Processing..." : "Proceed to Payment"}
        </Button>
      </form>
    </Form>
  );
}