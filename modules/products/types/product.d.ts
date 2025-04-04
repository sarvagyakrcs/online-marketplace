export type ExtendedProduct = Omit<
    Prisma.ProductGetPayload<{
        include: {
            category: true
            variants: true
            options: true
        }
    }>,
    "price"
> & {
    price: number; // Change this to the desired type
};
