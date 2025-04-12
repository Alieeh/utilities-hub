import 'server-only'
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers'; // for Next.js 13+ (app router)
import { redirect } from 'next/navigation'; // for Next.js 13+ (app router)
import { CookieListItem } from 'next/dist/compiled/@edge-runtime/cookies';
//import { NextRequest } from 'next/server';


const key = new TextEncoder().encode(process.env.JWT_SECRET);


const cookie = {
    name: 'session_token',
    options: {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/'},
    duration: 60 * 60 * 24 * 1000, // 1 day
}
// the difference with secure=true????


// Payload type
// export interface SessionPayload extends Record<string, unknown> {
//     userId: number;
//     username: string;
//     email: string;
//   }


export async function encrypt(payload : {userId: number, expires: Date}) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${cookie.duration}s`)
    .sign(key);
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, key, {algorithms: ['HS256']});
        return payload;
    } catch (err) {
        return null;
    }
}



export async function createSession(userId: number){
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({userId, expires});

    cookies().set(cookie.name, session, { ...cookie.options, expires });
    redirect('/dashboard');
}

export async function verifySession() {
    const cookie = (await cookies()).get(cookies.name)?.value;
    const session = await decrypt(cookie);
    if (!session?.userId) {
        redirect('/login');
    }else return {userId: session.userId}
}

export async function deleteSession() {
    (await cookies()).delete(cookie.name);
    redirect('/login');
}