import { route } from "@/lib/safe-route";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/lib/jwt";
import { UserSchema } from "@/lib/types/user";


const prisma = new PrismaClient();


export const POST = route
  .body(UserSchema)
  .handler(async (req, { body }) => {


    // -- Find user or make a new one -- //
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    }) || await prisma.user.create({
      data: body,
    });


    // -- Generate token -- //
    const jwt = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: generateToken({...user, password: '',  token: ''}, '1h'),
      },
    });


    return Response.json({ token: jwt.token }, { status: 200 });

  });