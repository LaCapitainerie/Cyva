import { z } from "zod"

export const FAQSchema = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    order: z.number(),
    published: z.boolean(),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

export type FAQType = z.infer<typeof FAQSchema>