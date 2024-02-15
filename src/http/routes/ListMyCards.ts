import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify'

export async function ListMyCards(app: FastifyInstance) {
  app.get(
    '/me/cards',
    { onRequest: app.authenticate },
    async (request, reply) => {
      const userId = request.user.id

      const userCards = await prisma.userCard.findMany({
        where: {
          userId,
        },
        include: {
          card: true,
        },
        orderBy: {
          card: {
            name: 'asc',
          },
        },
      })

      const cards = userCards.map((userCard) => userCard.card)
      return reply.send(cards)
    }
  )
}
