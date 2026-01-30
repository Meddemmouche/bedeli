// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Routes that require authentication
  const protectedRoutes = [
    '/post',
    '/messages',
    '/profile',
    '/propose',
  ];

  // Check if current path requires auth
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirect to connection page if not logged in and trying to access protected route
  if (!isLoggedIn && requiresAuth) {
    return NextResponse.redirect(new URL('/connection', req.url));
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === '/connection' || pathname.startsWith('/connection/'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    // Only run on routes that might need auth
    '/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)',
  ],
}