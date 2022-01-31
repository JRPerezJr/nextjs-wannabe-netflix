import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { verifyToken } from '../lib/utils';

export async function middleware(req, ev) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if ((token && userId) || pathname.includes('/api/login')) {
    return NextResponse.next();
  }

  if (
    pathname.includes('api/login') ||
    userId ||
    pathname.includes('/static')
  ) {
    return NextResponse.next();
  }
}
