import { route } from "@/lib/safe-route";
import { UserSchema } from "@/lib/types/user";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const POST = route
  .body(UserSchema)
  .handler(async (req, { body }) => {

    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    };

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: "user",
        token: "",
      },
    });

    return Response.json({ message: "User created" }, { status: 200 });

  });



export const GET = route
  .handler(async () => {

    const users = await prisma.user.findMany();

    return Response.json(users, { status: 200 });

  });



export const DELETE = route
  .body(UserSchema)
  .handler(async (req, { body }) => {

    const user = await prisma.user.delete({
      where: {
        id: body.id,
      },
    });

    return Response.json({ message: "User deleted" }, { status: 200 });

  });



export const PUT = route
  .body(UserSchema)
  .handler(async (req, { body }) => {
      
      await prisma.user.update({
        where: {
          id: body.id,
        },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          role: body.role,
        },
      });
  
      return Response.json({ message: "User updated" }, { status: 200 });
  
    });