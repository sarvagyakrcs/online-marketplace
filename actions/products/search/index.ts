"use server"

import { prisma } from "@/lib/db/prisma"

export const searchProducts = async (query: string) => {
    const results = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    category: {
                        name: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    tag: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
            ],
        }
    })

    return results.map((product) => ({
        id: product.id,
        name: product.name,
        thumbnail: product.thumbnail,
        price: product.price.toFixed(2),
    }))
}