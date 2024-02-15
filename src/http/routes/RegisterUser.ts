import { z } from "zod"
import bcrypt from 'bcryptjs'
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function RegisterUser(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const registerUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { name, email, password } = registerUserBody.parse(request.body)

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }
    
    const passwordCrypt = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordCrypt
      }
    })

    return reply
      .status(201)
      .send({ userId: user.id })
  })
}