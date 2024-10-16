import { CarrouselPartType } from "@/lib/types/carrousel";
import { PrismaClient } from "@prisma/client";
import { Emblacarousel } from "../magicui/caroussel";

interface CarrouselProps {
    name: CarrouselPartType["carrouselName"];
};

export default async function Carrousel({ name }: CarrouselProps) {
    const prisma = new PrismaClient();

    const carrousel = await prisma.carrouselPart.findMany({
        where: {
           carrouselName : name,
        },
    });

    if (!carrousel) {
        return (
            <div>
                <h1>Error : Carousel {name} not found.</h1>
            </div>
        );
    };

    return (
        <Emblacarousel
            slides={
                carrousel.map(
                    (item) => ({
                        title: item.title,
                        subtitle: item.subtitle,
                        image: item.image,
                        description: ""
                    })
                )
            }
        />
    );
}
