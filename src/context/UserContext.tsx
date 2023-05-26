import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Wallet} from "@subwallet/wallet-connect/types";
import {getWalletBySource} from "@subwallet/wallet-connect/dotsama/wallets";
import {useLocalStorage} from "../local-storage/LocalStorage";

type UserContent = {
    currentUser: string,
    bearerToken: string,
    wallet: Wallet|undefined,
    setWallet: (wallet: Wallet|undefined) => void,
    login: (user: string, token: string) => void,
    logout: () => void,
}

const UserContext = createContext<UserContent>(
    {
        currentUser: "",
        bearerToken: "",
        wallet: undefined,
        setWallet: (wallet) => {},
        login: ()=> {},
        logout: () => {}
    }
)

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [currentUser, setCurrentUser] = useLocalStorage('current-user')
    const [bearerToken, setBearerToken] = useLocalStorage('bearer-token')
    const [wallet, setWallet] = useState<Wallet|undefined>(getWalletBySource('subwallet-js'))

    const login = (user: string, token: string) => {
        setCurrentUser(user)
        setBearerToken(token)
    }

    const logout = () => {
        setCurrentUser("")
    }

    return <UserContext.Provider value={{currentUser, bearerToken, wallet, setWallet, login, logout}}> {children} </UserContext.Provider>
}

export const UseUser = () => {
    return useContext(UserContext)
}
