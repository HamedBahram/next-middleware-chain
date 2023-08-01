import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export function withMiddleware1(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const url = request.url
    console.log('middleware1 =>', { url })

    return middleware(request, event)
  }
}
