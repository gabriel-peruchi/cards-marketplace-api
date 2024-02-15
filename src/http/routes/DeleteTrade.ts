import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function DeleteTrade(app: FastifyInstance) {
  app.delete('/trades/:id', async (request, reply) => {
    const userId = '' // TODO: pegar do contexto

    const deleteTradeParams = z.object({
      tradeId: z.string().uuid()
    })

    const { tradeId } = deleteTradeParams.parse(request.body)

    const trade = await prisma.trade.findUnique({
      where: {
        id: tradeId
      }
    })

    if (!trade) {
      throw new Error('Trade not found.')
    }

    if (trade.userId !== userId) {
      throw new Error('Forbidden.')
    }

    await prisma.trade.delete({
      where: {
        id: tradeId,
        tradeCards: {
          every: {
            tradeId
          }
        }
      }
    })

    return reply.send()
  })
}