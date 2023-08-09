import {createContext, ReactNode, useContext, useState} from "react";


type ContractContent = {
    page: string,
    changePage: (pages: string) => void,
}

const ContractContext = createContext<ContractContent>(
    {
        page: "1",
        changePage: () => {},
    }
)

export const ContractProvider = ({children}: {children: ReactNode}) => {
    const [page, setPage] = useState("1")

    const changePage = (page: string) => {
        setPage(page)
    }

    return <ContractContext.Provider value={{page, changePage}}>{children}</ContractContext.Provider>
}

export const useContract = () => {
    return useContext(ContractContext)
}