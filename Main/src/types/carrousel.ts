import { z } from "zod";

export const CarrouselPartSchema = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    image: z.string(),
    carrouselName: z.string(),
    description: z.string(),
    order: z.number(),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type CarrouselPartType = z.infer<typeof CarrouselPartSchema>;