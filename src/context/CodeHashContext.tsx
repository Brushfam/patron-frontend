import {createContext, ReactNode, useContext, useState} from "react";


type CodeHashContent = {
    pages: boolean[],
    changePage: (pages: boolean[]) => void,
}

const CodeHashContext = createContext<CodeHashContent>(
    {
        pages: [true, false],
        changePage: () => {},
    }
)

export const CodeHashProvider = ({children}: {children: ReactNode}) => {
    const [pages, setPages] = useState([true, false])

    const changePage = (pages: boolean[]) => {
        setPages(pages)
    }

    return <CodeHashContext.Provider value={{pages, changePage}}>{children}</CodeHashContext.Provider>
}

export const useCodeHash = () => {
    return useContext(CodeHashContext)
}