'use client'
import { create } from 'zustand'
import { createContext, type ReactNode } from 'react';
import { useAuth } from '@/features/user/hooks/use-auth';
import { User } from '@/features/user/types';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initData?: User;
}


export const useUser = create<UserContextType>((set) => ({
  user: { uid: null, name: '', email: '' },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user} })),
}))


export const UserProvider = ({ children, initData }: UserProviderProps) => {
  useAuth(initData)

  return (
    <UserContext.Provider value={undefined}>
      {children}
    </UserContext.Provider>
  );
};