// middleware.ts (place in root directory)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith('/dashboard');
  
  // Get the token from cookies (adjust the cookie name to match your auth)
  const token = request.cookies.get('auth-token')?.value || 
                request.cookies.get('session')?.value;

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  // Redirect to dashboard if logged in and trying to access login/signup
  if ((path === '/login' || path === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // '/dashboard/:path*',
    '/login',
    '/signup',
  ],
};