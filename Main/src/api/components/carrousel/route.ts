import { adminRoute } from "@/lib/safe-route";
import { CarrouselSchema } from "@/lib/types/carrousel";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = adminRoute
  .body(CarrouselSchema)
  .handler(async (req, { body }) => {
    
    const result = await prisma.carrouselPart.createMany({
        data: body.parts,
    });

    if (result.count !== body.parts.length) {
        return Response.json({ message: "Error when creating Parts" }, { status: 400 });
    }

    return Response.json({ message: "Parts created" }, { status: 200 });

  });

export const PUT = adminRoute
  .body(CarrouselSchema)
  .handler(async (req, { body }) => {
      
    const result = await prisma.carrouselPart.updateMany({
        where: {
            carrouselName: body.name,
        },
        data: body.parts,
    });

    if (result.count !== body.parts.length) {
        return Response.json({ message: "Error when updating Parts" }, { status: 400 });
    }
  
    return Response.json({ message: "Parts updated" }, { status: 200 });
  
  });

export const DELETE = adminRoute
  .body(CarrouselSchema)
  .handler(async (req, { body }) => {

    const result = await prisma.carrouselPart.deleteMany({
        where: {
            carrouselName: body.name,
        },
    });

    if (result.count !== body.parts.length) {
      return Response.json({ message: "Error when deleting Parts" }, { status: 400 });
    }

    return Response.json({ message: "Parts deleted" }, { status: 200 });

  });
