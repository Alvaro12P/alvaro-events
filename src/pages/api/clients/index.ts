import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, phone } = JSON.parse(req.body)
    if (
      name &&
      phone &&
      typeof name === 'string' &&
      typeof phone === 'string'
    ) {
      if (/^[a-z\s]{5,}$/i.test(name)) {
        if (/^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(phone)) {
          const user = await prisma.client.create({ data: { name, phone } })
          res.status(200).json(user)
        } else res.statusMessage = 'Número de teléfono inválido'
      } else res.statusMessage = 'El nombre debe contener al menos 5 carácteres'
    } else res.statusMessage = 'Nombre y móvil deben ser enviados como strings'
    res.status(400).end()
  } else res.status(404).end()
}
