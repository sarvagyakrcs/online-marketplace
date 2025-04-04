import * as z from 'zod'

export const productFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.string().refine((val) => !isNaN(Number(val)), {
      message: 'Price must be a valid number',
    }),
    shippingTime: z.string().min(1, 'Shipping time is required'),
    // images: z.array(mediaSchema),
    // mainImage: z.string().min(1, 'Main image is required'),
    // videos: z.array(mediaSchema),
    categoryId: z.string().min(1, 'Category is required'),
    stock: z.string().refine((val) => !isNaN(Number(val)), {
      message: 'Stock must be a valid number',
    }),
    isAvailable: z.boolean().optional(),
    thumbnail: z.string().optional(),
    tag: z.string().optional(),
    shortDescription: z.string().optional(),
  })
  
 export type ProductFormValues = z.infer<typeof productFormSchema>