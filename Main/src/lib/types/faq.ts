import { z } from "zod"

export const FAQSchema = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    order: z.number(),
    published: z.boolean(),
})

export type FAQType = z.infer<typeof FAQSchema>