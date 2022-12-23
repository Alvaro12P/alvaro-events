import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') return await handleDelete(req, res)
  else if (req.method === 'PUT') return await handlePut(req, res)
  else res.status(404).end()
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (id && typeof id === 'string' && !isNaN(parseInt(id))) {
    try {
      await prisma.event.delete({ where: { id: parseInt(id) } })
      res.statusMessage = 'EVENT_DELETED'
      res.status(200).send(`Evento con ID ${id} eliminado`)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          res.statusMessage = 'EVENT_NOT_FOUND'
          res.status(404).send(`Evento con ID ${id} no encontrado`)
        } else res.status(500).send(e.message)
      } else res.status(500).send(e)
    }
  } else res.status(400).send('EVENT_ID_NOT_SPECIFIED')
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (id && typeof id === 'string' && !isNaN(parseInt(id))) {
    const data = JSON.parse(req.body)
    try {
      await prisma.event.update({ where: { id: parseInt(id) }, data })
      res.statusMessage = 'EVENT_UPDATED'
      res.status(200).send(`Evento con ID ${id} actualizado`)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          res.statusMessage = 'EVENT_NOT_FOUND'
          res.status(404).send(`Evento con ID ${id} no encontrado`)
        } else res.status(500).send(e.message)
      } else res.status(500).send(e)
    }
  } else res.status(400).send('EVENT_ID_NOT_SPECIFIED')
}
