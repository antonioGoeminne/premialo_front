import { User } from "@/features/user/types"
import { UserProvider } from "./user-provider"

interface InitData {
    user?: User
}

interface ProviderProps {
    initData: InitData
    children: React.ReactNode
}

export const Provider = ({ children, initData }: ProviderProps) => {
    const { user } = initData || {}

    return (
        <UserProvider initData={user}>
            {children}
        </UserProvider>
    )
}