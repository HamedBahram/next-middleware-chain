import { chain } from '@/middlewares/chain'
import { withMiddleware1 } from '@/middlewares/middleware1'
import { withMiddleware2 } from '@/middlewares/middleware2'

// export default chain([withMiddleware1, withMiddleware2])

export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
