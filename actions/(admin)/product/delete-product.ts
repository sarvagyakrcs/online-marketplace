"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const deletePorduct = async (productId: string) => {
    try {
        const session = await auth();
    
        if(!session){
            throw new Error("Unauthorized");
        }
    
        await prisma.product.delete({
            where: {
                id: productId,
                userId: session.user.id
            }
        })
        revalidatePath("/admin");
        return {
            message: "Product deleted successfully"
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product");
    }
}