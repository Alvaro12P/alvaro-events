import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const events = await prisma.event.findMany()
    res.status(200).json(events)
  } else res.status(404).end()
}
