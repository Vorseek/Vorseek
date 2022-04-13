import { NextRequest, NextResponse } from 'next/server';

function middleware(req: NextRequest) {
  if (req.url.includes('/1')) {
    return NextResponse.redirect(`${req.url.replace('/1', '/2')}?redirect=1`);
  }

  return NextResponse.next();
}

export default middleware;
