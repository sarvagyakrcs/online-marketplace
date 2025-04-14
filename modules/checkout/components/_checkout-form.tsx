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

const formSchema = z.object({
  fName: z.string().min(1, "First name is required"),
  lName: z.string().optional(),
  mobile: z.string().min(1, "Phone number is required"),
  pinCode: z.string().min(1, "Postal code is required"),
  address: z.string().min(1, "Address is required"),
  area: z.string().min(1, "Area is required"),
  landmark: z.string().min(1, "Landmark is required"),
  country: z.tuple([z.string(), z.string().optional()])
});

export default function CheckoutForm() {
  const [, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="w-full max-w-sm rounded-md bg-gray-50 p-4 overflow-auto">
          <code className="text-gray-800">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
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