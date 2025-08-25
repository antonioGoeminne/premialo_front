import { authAdmin, dbAdmin } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function getCurrentUser(): Promise<string | null> {
  // @ts-expect-error cookie exists and works
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedToken = await authAdmin.verifySessionCookie(sessionCookie, true);

    const userProfile = await dbAdmin.collection('users').doc(decodedToken.uid).get();

    const jsonData = JSON.stringify(userProfile.data());
    return jsonData

  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}