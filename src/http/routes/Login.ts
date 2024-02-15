import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function Login(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const loginUserBody = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = loginUserBody.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Incorrect password/email");
    }

    const senhasMatch = await bcrypt.compare(password, user.password);

    if (!senhasMatch) {
      throw new Error("Incorrect password/email");
    }

    const token = app.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "4380h" }
    );    

    return reply.send({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
}
