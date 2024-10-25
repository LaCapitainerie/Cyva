import { z } from "zod"

export const TestimonialSchema = z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    img: z.string(),
    description: z.string(),
    order: z.number(),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

export type TestimonialType = z.infer<typeof TestimonialSchema>