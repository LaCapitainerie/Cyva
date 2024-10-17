import { adminRoute } from "@/lib/safe-route";
import { FAQListSchema } from "@/lib/types/faq";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = adminRoute
  .body(FAQListSchema)
  .handler(async (req, { body }) => {
    
    const result = await prisma.question.createMany({
        data: body.questions,
    });

    if (result.count !== body.questions.length) {
        return Response.json({ message: "Error when creating Questions" }, { status: 400 });
    }

    return Response.json({ message: "Questions created" }, { status: 200 });

  });

export const PUT = adminRoute
  .body(FAQListSchema)
  .handler(async (req, { body }) => {
      
    const result = await prisma.question.updateMany({
        where: {
          faqName: body.name,
        },
        data: body.questions,
    });

    if (result.count !== body.questions.length) {
        return Response.json({ message: "Error when updating Questions" }, { status: 400 });
    }
  
    return Response.json({ message: "Questions updated" }, { status: 200 });
  
  });

export const DELETE = adminRoute
  .body(FAQListSchema)
  .handler(async (req, { body }) => {

    const result = await prisma.question.deleteMany({
        where: {
          faqName: body.name,
        },
    });

    if (result.count !== body.questions.length) {
      return Response.json({ message: "Error when deleting Questions" }, { status: 400 });
    }

    return Response.json({ message: "Parts deleted" }, { status: 200 });

  });
