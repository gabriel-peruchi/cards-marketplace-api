import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { TradeCardEnum } from "../../types/TradeCardEnum"

export async function CreateTrade(app: FastifyInstance) {
  app.post('/trades', async (request, reply) => {
    const userId = '' // TODO: pegar do contexto

    const createTradeBody = z.object({
      cards: z.array(z.object({
        cardId: z.string().uuid(),
        type: z.nativeEnum(TradeCardEnum)
      }))
    })

    const { cards: tradeCards } = createTradeBody.parse(request.body)

    const trade = await prisma.trade.create({
      data: {
        userId,
        tradeCards: {
          createMany: {
            data: tradeCards
          }
        }
      }
    })

    return reply
      .status(201)
      .send({ tradeId: trade.id })
  })
}