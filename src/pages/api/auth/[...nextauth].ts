import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { verify } from 'argon2'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '../../../utils/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Nombre de usuario',
          type: 'text'
        },
        password: { label: 'Contraseña', type: 'password' }
      },
      authorize: async (credentials) => {
        if (credentials === undefined) return null
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        })
        if (!user) return null

        const validPassword = await verify(user.password, credentials.password)
        if (!validPassword) return null

        return user
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { strategy: 'jwt' }
}

export default NextAuth(authOptions)
