import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify'

export async function GetCard(app: FastifyInstance) {
  app.get('/cards/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const card = await prisma.card.findUnique({
      where: {
        id,
      }
    })

    return reply.send(card)
  })
}
