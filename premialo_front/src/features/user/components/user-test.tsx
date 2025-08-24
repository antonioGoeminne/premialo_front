'use client'
import { useUser } from "@/providers/user-provider"

export const UserTest = () => {
    const { uid } = useUser()

    return (
        <div>UserTest: {uid}</div>
    )
}