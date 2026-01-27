// middleware.ts (root level, same as app/)
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Public routes anyone can access
  const publicRoutes = ["/", "/connection/log-in", "/connection/sign-in", "/connection"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url))
  };

  // Redirect non-logged-in users to login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  };

  return NextResponse.next()
});

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)",
  ],
};