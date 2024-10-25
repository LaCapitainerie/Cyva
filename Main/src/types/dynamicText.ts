import { z } from "zod"

export const DynamicTextSchema = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

export type DynamicTextType = z.infer<typeof DynamicTextSchema>
