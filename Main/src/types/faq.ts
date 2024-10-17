import { z } from "zod"

export const FAQSchema = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    order: z.number(),
    published: z.boolean(),
    faqName: z.string(),
})

export type FAQType = z.infer<typeof FAQSchema>

export const FAQListSchema = z.object({
    name: z.string(),
    questions: z.array(FAQSchema),
})

export type FAQListType = z.infer<typeof FAQListSchema>