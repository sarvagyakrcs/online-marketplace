import * as z from "zod"

export const AddReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().min(10, {
    message: "Review must be at least 10 characters long",
  }),
})

export type AddReviewInput = z.infer<typeof AddReviewSchema> 