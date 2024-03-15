import React, { useEffect, useState } from "react"
import styles from "./ContractWindow.module.css"
import { AddressElements } from "../components/ContractComponents/AddressElements"
import { ContractButtons } from "../components/Buttons/ContractButtons"
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader";
import { LoginButton } from "../components/Buttons/LoginButton";
import { hashExample } from "../constants/addresses"

export default function CodeHashWindow(props: { child: JSX.Element }) {
    const [codeHashAddress, setCodeHashAddress] = useState("")

    useEffect(() => {
        setCodeHashAddress(hashExample)
    }, [])

    return (
        <div className={styles.contractContainer}>
            <GettingStartedHeader loginButton={<LoginButton />} />
            <div className={styles.mainBlock}>
                <div className={styles.addressAndButtons}>
                    <AddressElements
                        name={"Hash Code"}
                        iconPath={"/code-hash-square.svg"}
                        address={codeHashAddress}
                        verified={true}
                        metadata={{}}
                    />
                    <ContractButtons />
                </div>
                {props.child}
            </div>
        </div>
    )
}
