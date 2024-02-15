import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify'

export async function GetProfile(app: FastifyInstance) {
  app.get('/me', { onRequest: app.authenticate }, async (request, reply) => {
    const userId = request.user.id

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cards: {
          include: {
            card: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const myCards = user.cards.map((userCard) => userCard.card)

    return reply.send({
      id: user.id,
      name: user.name,
      email: user.email,
      cards: myCards,
    })
  })
}
