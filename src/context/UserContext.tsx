import { createContext, ReactNode, useContext, useState } from "react"
import { Wallet } from "@subwallet/wallet-connect/types"
import { getWalletBySource } from "@subwallet/wallet-connect/dotsama/wallets"
import { useLocalStorage } from "../local-storage/LocalStorage"

type UserContent = {
    currentUser: string
    bearerToken: string
    cState: string
    wallet: Wallet | undefined
    walletName: string
    setWallet: (wallet: Wallet | undefined) => void
    setWalletName: (name: string) => void
    login: (user: string, token: string) => void
    logout: () => void
}

const UserContext = createContext<UserContent>({
    currentUser: "",
    bearerToken: "",
    cState: "loading",
    wallet: undefined,
    walletName: "",
    setWallet: (wallet) => {},
    setWalletName: (name) => {},
    login: () => {},
    logout: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useLocalStorage("current-user")
    const [cState, setCState] = useLocalStorage("c-state", "loading")
    const [bearerToken, setBearerToken] = useLocalStorage("bearer-token")
    const [walletName, setWalletName] = useLocalStorage("wallet-name")
    const [wallet, setWallet] = useState<Wallet | undefined>(getWalletBySource("subwallet-js"))

    const login = (user: string, token: string) => {
        setCurrentUser(user)
        setBearerToken(token)
        setCState("logged")
    }

    const logout = () => {
        setCurrentUser("")
        setBearerToken("")
        setWallet(undefined)
        setWalletName("")
    }

    return (
        <UserContext.Provider
            value={{
                currentUser,
                bearerToken,
                cState,
                wallet,
                walletName,
                setWallet,
                setWalletName,
                login,
                logout,
            }}
        >
            {" "}
            {children}{" "}
        </UserContext.Provider>
    )
}

export const UseUser = () => {
    return useContext(UserContext)
}
