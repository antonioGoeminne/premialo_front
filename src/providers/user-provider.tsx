'use client'
import { create } from 'zustand'
import { createContext, type ReactNode, useEffect } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth, signInAnonymous } from '@/config/firebase-config';
import { createUser } from '@/features/user/services/create-user';
import { getUserData } from '@/features/user/services/get-user-data';
interface User {
  uid: string | null | undefined;
  name: string;
  email: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}


export const useUser = create<UserContextType>((set) => ({
  user: { uid: null, name: '', email: '' },
  setUser: (user) => set({ user }),
}))


export const UserProvider = ({ children }: UserProviderProps) => {
  const uid = useUser((state) => state.user.uid)
  const setUser = useUser((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        getUserData(user.uid, (data) => {
          if (data) {
            setUser({
              ...data
            })
          }
        })
      } else {
        const userCredential = signInAnonymous()
        const idTokenPromise = userCredential.then((res) => res.user.getIdToken())
        idTokenPromise.then((idToken) => {
          fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
        });
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (uid) {
      createUser(uid)
    }
  }, [uid])


  return (
    <UserContext.Provider value={undefined}>
      {children}
    </UserContext.Provider>
  );
};