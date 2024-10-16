import { adminRoute, authRoute, route } from "@/lib/safe-route";
import { CarrouselSchema } from "@/lib/types/carrousel";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = route
  .body(CarrouselSchema)
  .handler(async (req, { body }) => {
    
    const values = await prisma.carrouselPart.createMany({
        data: body.parts,
    });

    if (values.count !== body.parts.length) {
        return Response.json({ message: "Error when creating Parts" }, { status: 400 });
    }

    return Response.json({ message: "User created" }, { status: 200 });

  });

export const PUT = authRoute
  .body(CarrouselSchema)
  .handler(async (req, { body }) => {
      
    const values = await prisma.carrouselPart.updateMany({
        where: {
            carrouselName: body.name,
        },
        data: body.parts,
    });
  
    return Response.json({ message: "User updated" }, { status: 200 });
  
  });

export const DELETE = adminRoute
  .body(CarrouselSchema)
  .handler(async (req, { body }) => {

    await prisma.carrouselPart.deleteMany({
        where: {
            carrouselName: body.name,
        },
    });

    return Response.json({ message: "Parts deleted" }, { status: 200 });

  });
