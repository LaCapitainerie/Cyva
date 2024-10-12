import { z } from "zod"

export const DynamicTextSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
})

export type DynamicTextType = z.infer<typeof DynamicTextSchema>
