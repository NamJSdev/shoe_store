import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/','/shoeConfigs','/shoeModels','/shoeProducts']
const authPaths = ['/login','/changePass']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const sessionToken = request.cookies.get('sessionToken')?.value

    // Nếu người dùng đã đăng nhập, kiểm tra không cần thiết cho các trang login/changePass
    if (sessionToken && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Nếu người dùng chưa đăng nhập, chuyển hướng họ đến trang đăng nhập cho các trang privatePaths
    if (!sessionToken && privatePaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();    
}

export const config = {
  matcher: [...privatePaths, ...authPaths]
} 
