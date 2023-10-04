import React, { createContext, ReactNode, useContext, useState } from "react"

type ContractContent = {
    address: string
    isVerified: boolean
    hash: string
    node: string
    owner: string
    logHash: string
    source: number
    setAddress: (text: string) => void
    setIsVerified: (value: boolean) => void
    setHash: (text: string) => void
    setNode: (text: string) => void
    setOwner: (text: string) => void
    setLogHash: (text: string) => void
    setSource: (source: number) => void
}

const ContractContext = createContext<ContractContent>({
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
})

export const ContractProvider = ({ children }: { children: ReactNode }) => {
    const [address, setAddress] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [hash, setHash] = useState("")
    const [node, setNode] = useState("")
    const [owner, setOwner] = useState("")
    const [logHash, setLogHash] = useState("")
    const [source, setSource] = useState(0)

    return (
        <ContractContext.Provider
            value={{
                address,
                isVerified,
                hash,
                node,
                owner,
                logHash,
                source,
                setAddress,
                setIsVerified,
                setHash,
                setNode,
                setOwner,
                setLogHash,
                setSource,
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    return useContext(ContractContext)
}
