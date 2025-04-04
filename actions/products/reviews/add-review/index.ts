"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/db/prisma"
import { AddReviewInput, AddReviewSchema } from "@/schemas/products/reviews/review-schema"
import { revalidatePath } from "next/cache"

export async function addReview(data: AddReviewInput) {
    const session = await auth()
    if(!session) {
        throw new Error("Unauthorized")
    }

    if (!session.user?.id) {
        throw new Error("User ID not found")
    }

    const {
        success,
        data : validatedData
    } = AddReviewSchema.safeParse(data)

    if(!success) {
        throw new Error("Invalid data")
    }

    const review = await prisma.review.create({
        data: {
            rating: validatedData.rating,
            review: validatedData.review,
            productId: validatedData.productId,
            userId: session.user.id
        }
    })
    revalidatePath(`/products/${validatedData.productId}`)
    return review
}