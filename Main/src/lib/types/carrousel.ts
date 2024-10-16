import { z } from "zod";

export const CarrouselPartSchema = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    image: z.string(),
    carrouselName: z.string(),
    description: z.string(),
    order: z.number(),
});

export type CarrouselPartType = z.infer<typeof CarrouselPartSchema>;

export const CarrouselSchema = z.object({
    id: z.number(),
    name: z.string(),
    parts: z.array(CarrouselPartSchema),
});

export type CarrouselType = z.infer<typeof CarrouselSchema>;