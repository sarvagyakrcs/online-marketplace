"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/db/prisma";

export const editShortDescription = async ( {
    productId,
    shortDescription
} : {
    productId: string,
    shortDescription: string,
} ) => {
    try {
        const session = await auth();
        if(!session?.user.id) {
            throw new Error("User not authenticated");
        }
    
        await prisma.product.update({
            where: {
                id: productId,
                userId: session.user.id,
            },
            data: {
                shortDescription
            }
        })
    } catch (error) {
        console.error("Error updating short description:", error);
        throw error;
    }
}

export const editLongDescription = async ( {
    productId,
    longDescription
} : {
    productId: string,
    longDescription: string,
} ) => {
    try {
        const session = await auth();
        if(!session?.user.id) {
            throw new Error("User not authenticated");
        }
    
        await prisma.product.update({
            where: {
                id: productId,
                userId: session.user.id,
            },
            data: {
                description: longDescription
            }
        })
    } catch (error) {
        console.error("Error updating short description:", error);
        throw error;
    }
}