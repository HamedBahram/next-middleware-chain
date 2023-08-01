import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export function withMiddleware2(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname
    console.log('middleware2 =>', { pathname })

    return middleware(request, event)
  }
}
