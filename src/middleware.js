import { NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

// const protectedRoutes = ['/dash/(.*)']

export async function middleware (req) {
  const { nextUrl } = req
  const sessionCookie = getSessionCookie(req)

  const res = NextResponse.next()

  const isLoggedIn = !!sessionCookie
  // const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
  const protectedRoutes = nextUrl.pathname.startsWith('/dash')
  const isOnAuthRoute = nextUrl.pathname.startsWith('/sign-in')

  // Check if the user is trying to access a protected route
  if (protectedRoutes && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // If the user is logged in and trying to access an auth route,
  // redirect to dashboard
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dash', req.url))
  }
  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
