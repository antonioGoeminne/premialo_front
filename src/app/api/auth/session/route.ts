import { authAdmin } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { idToken } = await request.json();

  // El token de ID expira en 1 hora. La cookie de sesión puede durar más.
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 días en milisegundos

  try {
    const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
    const response = NextResponse.json({ status: 'success' });

    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to create session' }, { status: 401 });
  }
}