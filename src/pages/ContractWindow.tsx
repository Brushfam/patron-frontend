import React, { useEffect, useState } from "react"
import { AddressElements } from "../components/ContractComponents/AddressElements"
import styles from "./ContractWindow.module.css"
import { ContractButtons } from "../components/Buttons/ContractButtons"
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader"
import { LoginButton } from "../components/Buttons/LoginButton"
import { contractExample, hashExample } from "../constants/addresses"
import { useContract } from "../context/ContractContext"

export default function ContractWindow(props: { child: JSX.Element }) {
    const pageContext = useContract()
    const [contractAddress, setContractAddress] = useState("")
    const [verified, setVerified] = useState(false)
    const [contractHash, setContractHash] = useState("")

    useEffect(() => {
        setContractAddress(contractExample)
        setVerified(true)
        setContractHash(hashExample)
        pageContext.setOwner("5EvzJ273zu7R996gR7iouawMWSKe5Ny6CkNE8s6jSDwWr8c5")
    }, [pageContext])

    return (
        <div className={styles.contractContainer}>
            <GettingStartedHeader loginButton={<LoginButton/>} />
            <div className={styles.mainBlock}>
                <div className={styles.addressAndButtons}>
                    <AddressElements
                        name={"Contract"}
                        iconPath={"/contract-square.svg"}
                        address={contractAddress}
                        verified={verified}
                        contractHash={contractHash}
                        metadata={{}}
                    />
                    <ContractButtons isVerified={verified} />
                </div>
                {props.child}
            </div>
        </div>
    )
}
