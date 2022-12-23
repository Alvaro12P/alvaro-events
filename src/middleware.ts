export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/home/:path*',
    '/api/clients/:path*',
    '/api/events/:path*',
    '/api/user/:path*'
  ]
}
