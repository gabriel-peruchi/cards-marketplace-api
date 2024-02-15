import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { Page } from "../../types/Page"

export async function ListTrades(app: FastifyInstance) {
  app.get('/trades', async (request, reply) => {
    const listTradesQuery = z.object({
      rpp: z.number(),
      page: z.number(),
    })

    const { page, rpp } = listTradesQuery.parse(request.query)

    const queryPayload = {
      take: rpp + 1,
      skip: (page - 1) * rpp,
      where: {},
    }

    const trades = await prisma.trade.findMany({
      ...queryPayload,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
        tradeCards: {
          include: {
            card: true
          },
        }
      }
    })

    return reply.send(Page.create({
      page,
      rpp,
      list: trades
    }))
  })
}