import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function CreateCard(app: FastifyInstance) {
  app.post('/cards', async (request, reply) => {
    const createCardBody = z.object({
      name: z.string(),
      description: z.string(),
      imageUrl: z.optional(z.string().url()),
    })

    const { name, description, imageUrl } = createCardBody.parse(request.body)

    const card = await prisma.card.create({
      data: {
        name,
        imageUrl,
        description,
      }
    })

    return reply
      .status(201)
      .send({ cardId: card.id })
  })
}