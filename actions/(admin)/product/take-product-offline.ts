"use server"

import { auth } from "@/auth"
import {prisma} from "@/lib/db/prisma"
import type { $Enums } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const takeProductOffline = async (productId: string, availability: $Enums.Avaiavility) => {
    const session = await auth()
    if (!session?.user.id || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const product = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            avaiavility: availability
        }
    })

    revalidatePath(`/products/${productId}`)
    return product
}