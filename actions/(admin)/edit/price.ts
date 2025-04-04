"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

export const editPrice = async ({ price, productId }: { price: number; productId: string }) => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.product.update({
        where: { 
            id: productId,
            userId: session.user.id,
        },
        data: { price },
    })
}