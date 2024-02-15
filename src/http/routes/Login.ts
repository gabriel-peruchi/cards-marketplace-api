import { z } from "zod"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { authUser } from "../../config/auth"

export async function Login(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const loginUserBody = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = loginUserBody.parse(request.body)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('Email/Senha incorreto.')
    }

    const senhasMatch = await bcrypt.compare(password, user.password)

    if (!senhasMatch) {
      throw new Error('Email/Senha incorreto.')
    }

    const tokenPayload = {
      userId: user.id,
    }

    const tokenOptions = {
      subject: user.id,
    }

    const token = jwt.sign(tokenPayload, authUser.secretKey, tokenOptions)

    return reply.send({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  })
}