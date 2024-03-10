import { MiddlewareFactory } from './stack'

export const withMiddleware2: MiddlewareFactory = middleware => {
  return async (request, event, response) => {
    // Perform whatever logic the second middleware needs to do
    const pathname = request.nextUrl.pathname
    console.log('middleware2 =>', { pathname })

    console.log('request cookies =>', request.cookies.get('middleware1'))
    console.log('response cookies =>', response.cookies.get('vercel'))

    // Call the next middleware and pass the request and response
    return middleware(request, event, response)
  }
}
