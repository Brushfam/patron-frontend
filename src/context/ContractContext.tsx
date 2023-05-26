import {createContext, ReactNode, useContext, useState} from "react";


type ContractContent = {
    pages: boolean[],
    changePage: (pages: boolean[]) => void,
}

const ContractContext = createContext<ContractContent>(
    {
        pages: [true, false, false],
        changePage: () => {},
    }
)

export const ContractProvider = ({children}: {children: ReactNode}) => {
    const [pages, setPages] = useState([true, false, false])

    const changePage = (pages: boolean[]) => {
        setPages(pages)
    }

    return <ContractContext.Provider value={{pages, changePage}}>{children}</ContractContext.Provider>
}

export const useContract = () => {
    return useContext(ContractContext)
}