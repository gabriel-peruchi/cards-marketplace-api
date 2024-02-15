import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify'
import { Page } from '../../types/Page'

export async function ListCards(app: FastifyInstance) {
  app.get('/cards', async (request, reply) => {
    const listCardQuery = z.object({
      rpp: z.coerce.number(),
      page: z.coerce.number(),
      search: z.string().optional(),
    })
    
    const { page, rpp, search } = listCardQuery.parse(request.query)

    const queryPayload = {
      take: rpp + 1,
      skip: (page - 1) * rpp,
      where: {},
    }

    if (search) {
      queryPayload.where = {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }
    }

    const cards = await prisma.card.findMany({
      ...queryPayload,
      orderBy: {
        name: 'asc',
      },
    })

    return reply.send(
      Page.create({
        page,
        rpp,
        list: cards,
      })
    )
  })
}
