"use server"
import { z } from 'zod'
import { auth } from "@/auth"
import {prisma} from "@/lib/db/prisma"
import { imageFormSchema } from '@/schemas/admin/products/add-image-schema'
import { revalidatePath } from 'next/cache'

export const addImagesToProduct = async (productId: string, imageData: z.infer<typeof imageFormSchema>) => {
    const session = await auth();
    if (!session?.user.id || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }
    
    const product = await prisma.product.findUnique({
        where: { id: productId }
    })

    if (!product) {
        throw new Error("Product not found")
    }

    const {
        data,
        success
    } = imageFormSchema.safeParse(imageData)

    if (!success) {
        throw new Error("Invalid images")
    }
    
    const createdImages = await Promise.all(
        data.images.map((image) => 
            prisma.image.create({
                data: {
                    url: image.url,
                    isMain: image.isMain,
                    productId: product.id,
                }
            })
        )
    )
    revalidatePath(`/products/${productId}`)

    return createdImages
}