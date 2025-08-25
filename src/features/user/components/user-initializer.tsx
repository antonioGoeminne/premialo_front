'use client'

import { useUser } from '@/providers/user-provider'
import { useRef, useEffect } from 'react'

export function UserInitializer({ user }: { user: string | null }) {
    const parsedData = user ? JSON.parse(user) : null;
    const setUser = useUser((state) => state.setUser)
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current && user) {
            setUser({
                ...parsedData
            })
            initialized.current = true
        }
    }, [parsedData])

    return null 
}