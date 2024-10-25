import { z } from "zod";

export const CarrouselPartSchema = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    image: z.string(),
    carrouselName: z.string(),
    order: z.number(),
});

export type CarrouselPartType = z.infer<typeof CarrouselPartSchema>;
