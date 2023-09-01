import React, { createContext, ReactNode, useContext, useState } from "react"

type ContractContent = {
    page: string
    changePage: (pages: string) => void
    address: string
    isVerified: boolean
    hash: string
    node: string
    owner: string
    logHash: string
    source: number
    modalOpen: boolean
    setAddress: (text: string) => void
    setIsVerified: (value: boolean) => void
    setHash: (text: string) => void
    setNode: (text: string) => void
    setOwner: (text: string) => void
    setLogHash: (text: string) => void
    setSource: (source: number) => void
    setModalOpen: (value: boolean) => void
}

const ContractContext = createContext<ContractContent>({
    modalOpen: false,
    setModalOpen(value: boolean): void {},
    setSource(source: number): void {},
    source: 0,
    setAddress(text: string): void {},
    setHash(text: string): void {},
    setNode(text: string): void {},
    setOwner(text: string): void {},
    setIsVerified(value: boolean): void {},
    setLogHash(text: string): void {},
    address: "",
    hash: "",
    isVerified: false,
    node: "",
    owner: "",
    logHash: "",
    page: "1",
    changePage: () => {},
})

export const ContractProvider = ({ children }: { children: ReactNode }) => {
    const [page, setPage] = useState("1")
    const [address, setAddress] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [hash, setHash] = useState("")
    const [node, setNode] = useState("")
    const [owner, setOwner] = useState("")
    const [logHash, setLogHash] = useState("")
    const [source, setSource] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)

    const changePage = (page: string) => {
        setPage(page)
    }

    return (
        <ContractContext.Provider
            value={{
                page,
                changePage,
                address,
                isVerified,
                hash,
                node,
                owner,
                logHash,
                source,
                modalOpen,
                setAddress,
                setIsVerified,
                setHash,
                setNode,
                setOwner,
                setLogHash,
                setSource,
                setModalOpen,
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    return useContext(ContractContext)
}
