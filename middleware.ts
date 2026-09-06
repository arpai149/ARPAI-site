import { NextRequest, NextResponse } from 'next/server';

const arpaiRedirectHosts = new Set(['arpai.ai','www.arpai.ai','arpai.net','www.arpai.net','arpai.info','www.arpai.info','arpai.xyz','www.arpai.xyz']);

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  if (arpaiRedirectHosts.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = 'arpai.co';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)'
};
