import { UserProvider } from "./user-provider"

interface ProviderProps {
    children: React.ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}