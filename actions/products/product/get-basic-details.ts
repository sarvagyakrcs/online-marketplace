"use server"

import { prisma } from "@/lib/db/prisma";
import { redis } from "@/lib/redis"

export const getBasicProductDetails = async (id: string) => {
    const basicDetails = await redis.get(`product-basic-details:${id}`);
    if (basicDetails) {
        return JSON.parse(basicDetails);
    }
    const product = await prisma.product.findUnique({
        where: {
            id
        },
    });
    await redis.set(`product-basic-details:${id}`, JSON.stringify(product));

    return product;
}