"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { CheckoutSession } from "@/modules/products/types/checkout";
import { placeOrderSchema, PlaceOrderSchema } from "@/schemas/checkout/place-order-schema";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || ""
});

// Function to create Razorpay order
export const createRazorpayOrder = async ({ 
  checkoutSession, 
  orderData 
}: { 
  checkoutSession: CheckoutSession; 
  orderData: PlaceOrderSchema 
}) => {
  try {
    // Validate order data first
    const { data, error } = placeOrderSchema.safeParse(orderData);
    if (error) {
      throw new Error("Invalid order data");
    }

    // Calculate total amount from checkout session (in smallest currency unit, e.g., paise for INR)
    const amount = checkoutSession.line_items.reduce(
      (acc, item) => acc + item.price_data.unit_amount * item.quantity, 
      0
    );

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: `${data.fName} ${data.lName || ''}`,
        shippingAddress: data.address,
        phone: data.mobile
      }
    });

    return order;
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    throw new Error("Payment initialization failed");
  }
};

// Function to verify Razorpay payment
const verifyRazorpayPayment = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) => {
  const text = `${razorpayOrderId}|${razorpayPaymentId}`;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(text)
    .digest("hex");
    
  return generated_signature === razorpaySignature;
};

// Main order placement function
export const PlaceOrder = async ({ 
  orderData, 
  checkoutSession, 
  paymentDetails 
}: { 
  orderData: PlaceOrderSchema; 
  checkoutSession: CheckoutSession;
  paymentDetails?: {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
  }
}) => {
    const session = await auth();

    const {
        data,
        error
    } = placeOrderSchema.safeParse(orderData);

    if (error) {
        throw new Error("Invalid order data");
    }

    // Verify payment if details are provided
    if (
      paymentDetails && 
      !verifyRazorpayPayment(
        paymentDetails.razorpayOrderId,
        paymentDetails.razorpayPaymentId,
        paymentDetails.razorpaySignature
      )
    ) {
      throw new Error("Payment verification failed");
    }

    try {
        // Create Address
        const address = await prisma.address.create({
            data: {
                firstName: data.fName,
                lastName: data.lName ?? "",
                phone: data.mobile,
                address: data.address,
                area: data.area,
                landmark: data.landmark,
                postalCode: data.pinCode,
                country: data.country[0],
                state: data.country[1] ?? "",
            }
        });

        // Calculate order total
        const total = checkoutSession.line_items.reduce(
          (acc, item) => acc + item.price_data.unit_amount * item.quantity, 
          0
        ) / 100; // Converting from smallest unit to actual currency

        // Create Order
        const order = await prisma.order.create({
            data: {
                total,
                userId: session?.user?.id ?? "cm9gtcj6l00000r2k1pi0inen", // fallback ID
                addressId: address.id,
                paymentMethod: "RAZORPAY",
                paymentId: paymentDetails?.razorpayPaymentId || "",
                transactionId: paymentDetails?.razorpayOrderId || "",
            }
        });

        // Create OrderItems
        for (const item of checkoutSession.line_items) {
            const product = await prisma.product.findFirst({
                where: {
                    name: item.price_data.product_data.name
                }
            });

            if (!product) {
                throw new Error(`Product not found: ${item.price_data.product_data.name}`);
            }

            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price: item.price_data.unit_amount / 100, // converting from cents
                }
            });
        }

        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Failed to place order:", error);
        throw new Error("Something went wrong while placing the order");
    }
};