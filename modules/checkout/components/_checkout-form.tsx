"use client";

import { useState } from "react";
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
import { PlaceOrder } from "@/actions/orders";

export default function CheckoutForm({ checkoutSession } : { checkoutSession : CheckoutSession }) {
  const [, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');

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
  })

  function onSubmit(values: PlaceOrderSchema) {
    OrderNow({checkoutSession, orderData: values});
    form.reset();
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
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Continue to Payment
        </Button>
      </form>
    </Form>
  );
}