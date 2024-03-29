import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const pathName = req.nextUrl.pathname;

  switch (pathName) {
    case '/chat':
      // 토큰이 없을 경우 /로 리다이렉트
      if (!token) return NextResponse.redirect(new URL('/', req.url));
      break;
    case '/login':
      if (token) return NextResponse.redirect(new URL('/', req.url));
      break;
    default:
      return;
  }
}

export const config = {
  matcher: ['/chat', '/login'],
};
