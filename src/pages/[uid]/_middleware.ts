import { NextRequest, NextResponse } from 'next/server';

function middleware(req: NextRequest) {
  if (req.url.includes('/111')) {
    return NextResponse.redirect(`${req.url.replace('/111', '/2')}?redirect=111`);
  }

  return NextResponse.next();
}

export default middleware;
