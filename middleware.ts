import { stack } from '@/middlewares/stack'
import { withMiddleware1 } from '@/middlewares/middleware1'
import { withMiddleware2 } from '@/middlewares/middleware2'

export default stack(withMiddleware1, withMiddleware2)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
