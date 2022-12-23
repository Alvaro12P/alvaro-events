import { hash } from 'argon2'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password } = req.body
    if (typeof username === 'string') {
      if (typeof password === 'string') {
        const user = await prisma.user.create({
          data: { username, password: await hash(password) }
        })

        res.status(201).json(user)
      } else res.statusMessage = 'Password must be a string'
    } else res.statusMessage = 'Username must be a string'
    res.status(400).end()
  }
  res.status(404).end()
}
