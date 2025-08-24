'use client'
import { create } from 'zustand'
import { createContext, type ReactNode } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInAnonymous } from '@/config/firebase-config';
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


const useUserStore = create<UserContextType>((set) => ({
  user: {uid: null, name: '', email: ''},
  setUser: (user) => set({ user }),
}))


export const UserProvider = ({ children }: UserProviderProps) => {
  const setUser = useUserStore((state) => state.setUser)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      signInAnonymous()
    }
  });

  return (
    <UserContext.Provider value={undefined}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
   return useUserStore().user
};