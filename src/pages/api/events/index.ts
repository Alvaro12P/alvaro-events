import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') return await handlePost(req, res)
  res.status(404).end()
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body)
  if (data) {
    try {
      const event = await prisma.event.create({ data })
      res.statusMessage = 'EVENT_CREATED'
      res.status(200).json(event)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500).send(e.message)
      } else res.status(500).send(e)
    }
  } else res.status(400).send('EVENT_DATA_NOT_SPECIFIED')
}
