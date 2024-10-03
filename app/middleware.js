// middleware.js
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key'

export async function middleware(request) {
  const token = request.cookies.get('token')?.value

  // Public routes
  if (request.nextUrl.pathname.startsWith('/signin') || 
      request.nextUrl.pathname.startsWith('/signup')) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  try {
    // Verify token
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}