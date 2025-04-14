import { z } from "zod";

export const placeOrderSchema = z.object({
    fName: z.string().min(1, "First name is required"),
    lName: z.string().optional(),
    mobile: z.string().min(1, "Phone number is required"),
    pinCode: z.string().min(1, "Postal code is required"),
    address: z.string().min(1, "Address is required"),
    area: z.string().min(1, "Area is required"),
    landmark: z.string().min(1, "Landmark is required"),
    country: z.tuple([z.string(), z.string().optional()])
});

export type PlaceOrderSchema = z.infer<typeof placeOrderSchema>;