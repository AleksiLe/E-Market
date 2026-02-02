"use server"
import { redirect } from 'next/navigation'
import { SessionPayload } from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import validateToken from '@/services/validateToken'


 
export async function createSession(token) {
  const expiresAt = new Date(Date.now() +  60 * 60 * 1000) // 1 hour
  const cookieStore = await cookies()
 
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

/* export async function updateSession() {
  const session = (await cookies()).get('session')?.value
 
  // Sessions validation and updating token on api side (WIP)
  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 60 * 60 * 1000)

  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
} */

export async function validateSession() {
  const cookie = (await cookies()).get('session')?.value
  const verification = await validateToken(cookie)
  if (!verification) {
    return false;
  }
  return true;
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session', { path: '/' })
  return;
}