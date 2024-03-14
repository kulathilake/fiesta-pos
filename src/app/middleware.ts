import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.headers.get('Authorization'))
  throw new Error("")
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/pos/api/bill/:path*',
}