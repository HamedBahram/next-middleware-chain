import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
  NextResponse
} from 'next/server'

type NextMiddlewareResult = ReturnType<NextMiddleware>

type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult

export type MiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware

export function stack(
  ...functions: MiddlewareFactory[]
): ReturnType<MiddlewareFactory> {
  const current = functions.shift()

  if (current) {
    const next = stack(...functions)
    return current(next)
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response
  }
}
