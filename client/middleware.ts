import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const publicRoutes = [
    "/"
];

const authenticationRoutes = [
    "/auth/login",
    "/auth/register",
];

export async function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthenticationRoute = authenticationRoutes.includes(nextUrl.pathname);

    const token = request.cookies.get("token");

    let loggedIn = false;

    if (token) {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/verify", {
                headers: {
                    Cookie: `token=${JSON.stringify(token)}`
                },
                withCredentials: true
            });
            
            if (res.data.success) {
                loggedIn = true;
            }
        } catch (error) {
        }
    }

    if (isAuthenticationRoute) {
        if (loggedIn) {
            return NextResponse.redirect(new URL("/home", nextUrl));
        }
        return NextResponse.next();
    }

    if (!isPublicRoute && !loggedIn) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
