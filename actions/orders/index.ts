"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { CheckoutSession } from "@/modules/products/types/checkout";
import { placeOrderSchema, PlaceOrderSchema } from "@/schemas/checkout/place-order-schema";

export const PlaceOrder = async ({ orderData, checkoutSession }: { orderData: PlaceOrderSchema; checkoutSession: CheckoutSession }) => {
    const session = await auth();

    const {
        data,
        error
    } = placeOrderSchema.safeParse(orderData);

    if (error) {
        throw new Error("Invalid order data");
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

        // Create Order
        const order = await prisma.order.create({
            data: {
                total: checkoutSession.line_items.reduce((acc, item) => acc + item.price_data.unit_amount * item.quantity, 0) / 100, // converting from cents to actual currency
                userId: session?.user?.id ?? "cm9gtcj6l00000r2k1pi0inen", // fallback ID
                addressId: address.id,
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
