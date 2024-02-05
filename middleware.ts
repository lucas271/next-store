import nextAuth from 'next-auth'
import { getToken } from 'next-auth/jwt'
import {withAuth, NextRequestWithAuth} from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import User from './app/api/_models/UserModel'
// This function can be marked `async` if using `await` inside
export default withAuth(  
function middleware(req: NextRequestWithAuth){
    if(req.nextUrl.pathname.includes("/api/controllers") && req.method === 'GET') return NextResponse.next()
    const token = req.nextauth.token
    
    if((req.nextUrl.pathname.includes('/signIn') || req.nextUrl.pathname.includes('/signUp')) && token ) return NextResponse.rewrite(new URL('/notFound', req.url))


    const isGetMethod = req.method === 'GET'  
    const isPostMethod = req.method === 'POST'
    const isUserAdmin = token?.role === 'ADMIN'
    const isAdminPath = req.nextUrl.pathname.includes('/admin') ? true : false

    
    if(isAdminPath && !isUserAdmin) return NextResponse.rewrite(new URL('/notFound', req.url))
    if(req.nextUrl.pathname.includes('/wishList') && !token)  return NextResponse.rewrite(new URL('/notFound', req.url))
    if(req.nextUrl.pathname.includes('/api/controllers') && !isGetMethod) {
      if(req.nextUrl.pathname.includes('user') && isPostMethod && token) return NextResponse.redirect(new URL('/acessDenied', req.url))
      if(req.nextUrl.pathname.includes('user') && isPostMethod && !token) return NextResponse.next()

      if(!token) return NextResponse.redirect(new URL('/acessDenied', req.url))
      if(req.nextUrl.pathname.includes('product') && !isUserAdmin) return NextResponse.redirect(new URL('/acessDenied', req.url))
    }

    return NextResponse.next()
    
  },
  {
    callbacks: {
      authorized: () => {
        return true
      }
  }
})
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/wishList/:path*', '/api/controllers/:path*', '/signIn', '/signUp']
}