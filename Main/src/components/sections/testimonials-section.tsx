import { PrismaClient } from "@prisma/client";
import Testimonials, { TestimonialCardProps } from "../magicui/testimonials";

export async function TestimonialsSection() {

    const prisma = new PrismaClient()
    
    const result = await prisma.testimonial.findMany({
        take: 5,
        orderBy: {
            order: 'asc'
        }
    })


    const testimonials = result.map((res) => {
        return {
            name: res.name,
            role: res.role,
            description: res.description,
            img: res.img
        }
    }) as TestimonialCardProps[]

    return (
        <Testimonials testimonials={testimonials} />
    )
}