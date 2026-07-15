import { NextResponse, type NextRequest } from 'next/server'
import { auth } from './lib/auth' 

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers 
    })

    const { pathname } = request.nextUrl
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const userRole = session.user?.role 

    if (pathname.startsWith('/addservice') && userRole !== 'Doctor') {
        return NextResponse.redirect(new URL(`/dashboard/${userRole || ''}`, request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        '/addservice',
        '/profile', 
        '/myservices',
    ]
}