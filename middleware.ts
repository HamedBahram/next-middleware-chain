import { withAuth } from 'next-auth/middleware'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Locale, i18n } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const protectedPaths = ['/dashboard']

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths]

  protectedPaths.forEach(route => {
    locales.forEach(
      locale =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`
        ])
    )
  })

  return protectedPathsWithLocale
}

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

const middleware = withAuth(
  function middleware(request) {
    const token = request.nextauth?.token
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales
    ])

    // If the user is not authenticated and the path is protected, redirect to login
    const callbackUrl = pathname || '/'
    if (!token && protectedPathsWithLocale.includes(pathname)) {
      return NextResponse.redirect(
        new URL(
          `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          request.url
        )
      )
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url
        )
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => true
    }
  }
)

export default middleware
