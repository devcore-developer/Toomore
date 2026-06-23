import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // حماية صفحات الـ admin — لاحقاً هتضيف auth logic
  if (pathname.startsWith('/admin')) {
    // TODO: Check auth token / session
    // const token = request.cookies.get('auth_token')
    // if (!token) return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}