import 'server-only'
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; // for Next.js 13+ (app router)

type SessionPayload = {
    userId: number;
    expires: Date;
}   

const key = new TextEncoder().encode(process.env.JWT_SECRET);

const cookieDuration = 60 * 60 * 24 * 1; // in seconds, 1 day
const cookieDetails = {
    name: 'session_token',
    duration: cookieDuration * 1000, //in mili seconds, 1 day
    options: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax" as "lax", 
        path: '/'},
}
// the difference with secure=true????


export async function encrypt(payload : SessionPayload) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${cookieDuration}s`)
    .sign(key);
}

export async function decrypt(session: string | undefined) {
    try {
        if (!session) {
            throw new Error('Session is undefined');
        }
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
        // payload contains the userId and expires Date
    } catch (err) {
        console.error('Faild to verify session:', err);
        return null;
    }
}



export async function createSession(userId: number){
    const expires = new Date(Date.now() + cookieDetails.duration);
    const session = await encrypt({userId, expires});

    const cookieStore = await cookies();
    cookieStore.set(
        cookieDetails.name,
        session,
        { ...cookieDetails.options, expires }
    );
}

export async function verifySession()  {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(cookieDetails.name)?.value;
    if (!cookie) {
        return null;
    }
    const session = await decrypt(cookie);
    if (session?.userId) {
        return {userId: session.userId}
    }
}

export async function deleteSession() {
    (await cookies()).delete(cookieDetails.name);
    console.log('Session deleted');
    redirect('/login');
    // session deleted, redirect to login page
}