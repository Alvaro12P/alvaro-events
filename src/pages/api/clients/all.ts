import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { events } = req.query
    const clients = await prisma.client.findMany({
      include: { events: events === 'true' }
    })
    res.status(200).json(clients)
  } else res.status(404).end()
}
