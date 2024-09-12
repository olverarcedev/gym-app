import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret }) as { user?: { provider?: string } };
    const { pathname } = request.nextUrl;
    if ((pathname.startsWith('/admin')) && (!token || token.user.provider === 'google')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if ((pathname == '/' || pathname.startsWith('/home')) && token && token.user && token.user.provider === 'credentials') {
        return NextResponse.redirect(new URL('/admin/adminActivities', request.url));
    }
    if (pathname.startsWith('/auth') && token && token.user && token.user.provider === 'credentials') {
        return NextResponse.redirect(new URL('/admin/adminActivities', request.url));
    }
    if (pathname.startsWith('/auth') && token && token.user && token.user.provider === 'google') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}
