"use server"

import { auth } from "@/auth";
import {prisma} from "@/lib/db/prisma";
import type { ProductFormValues } from "@/schemas/admin/products/create-product-schema"

export const createProduct = async (product: ProductFormValues) => {
    const session = await auth();
    if (!session?.user.id || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }
    const newProduct = await prisma.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            shippingTime: product.shippingTime,
            categoryId: product.categoryId,
            userId: session.user.id,
            avaiavility: "OUT_OF_STOCK",
            thumbnail: product.thumbnail,
            shortDescription: product.shortDescription,
            tag: product.tag,
        }
    })
    return newProduct;
}

