import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify'

export async function AddOnMyCards(app: FastifyInstance) {
  app.post(
    '/me/cards',
    { onRequest: app.authenticate },
    async (request, reply) => {
      const userId = request.user.id

      const addOnMyCards = z.object({
        cardIds: z.array(z.string().uuid()),
      })

      const { cardIds } = addOnMyCards.parse(request.body)

      const existingUserCards = await prisma.userCard.findMany({
        where: {
          userId,
        },
      })

      const existingCards = existingUserCards.map((userCard) => userCard.cardId)

      const userCards = cardIds
        .filter((cardId) => !existingCards.includes(cardId))
        .map((cardId) => ({ cardId, userId }))

      await prisma.userCard.createMany({
        data: userCards,
      })

      return reply.send()
    }
  )
}
