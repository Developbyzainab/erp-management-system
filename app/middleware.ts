// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifySession } from './lib/db';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('auth-token')?.value || 
//                 request.headers.get('Authorization')?.replace('Bearer ', '');
  
//   const isAuthPage = request.nextUrl.pathname.startsWith('/signin') || 
//                      request.nextUrl.pathname.startsWith('/signup');
  
//   // Allow access to auth pages without token
//   if (isAuthPage) {
//     return NextResponse.next();
//   }
  
//   // Redirect to login if no token
//   if (!token) {
//     const url = new URL('/signin', request.url);
//     return NextResponse.redirect(url);
//   }
  
//   // Verify token
//   const user = await verifySession(token);
  
//   if (!user) {
//     const url = new URL('/signin', request.url);
//     return NextResponse.redirect(url);
//   }
  
//   // Add user info to headers
//   const response = NextResponse.next();
//   response.headers.set('X-User-Id', user.user_id.toString());
//   response.headers.set('X-User-Email', user.email);
//   response.headers.set('X-Tenant-Id', user.tenant_id.toString());
  
//   return response;
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };