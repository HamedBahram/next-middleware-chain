import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest
} from 'next/server'

import { CustomMiddleware } from './chain'

export function withMiddleware1(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // The first middleware in the chain has to create the response
    // object and pass it down the chain.
    const response = NextResponse.next()
    response.cookies.set('vercel', 'fast')

    // Perform whatever logic the first middleware needs to do
    const url = request.url
    request.cookies.set('middleware1', 'true')

    // Call the next middleware and pass the request and response
    return middleware(request, event, response)
  }
}
