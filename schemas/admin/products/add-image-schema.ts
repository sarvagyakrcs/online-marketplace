import { z } from 'zod'

export const imageSchema = z.object({
    url: z.string().url('Please enter a valid URL'),
    isMain: z.boolean().default(false),
})

export const imageFormSchema = z.object({
    images: z.array(imageSchema).min(1, 'Add at least one image'),
})