'use client'
import { useUser } from "@/providers/user-provider"

export const UserTest = () => {
    const name = useUser(st => st.user.name)

    if(!name) return <div></div>

    return (
        <div>UserName: {name}</div>
    )
}