import React, { useEffect, useState } from "react";
import styles from "./LocalCallerAccounts.module.css"
import { IKeyringPair, Signer } from "@polkadot/types/types";
import { CurrentCaller } from "../ContractComponents/ContractCaller"
import "@polkadot/api-augment"
import { Keyring } from "@polkadot/keyring"
import { UseUser } from "../../context/UserContext"
import { cryptoWaitReady } from "@polkadot/util-crypto";

export function LocalCallerAccounts(props: {
    setCaller: React.Dispatch<React.SetStateAction<CurrentCaller>>
    defaultSigner: Signer | undefined,
}) {
    const userContext = UseUser()
    const [currentButton, setCurrentButton] = useState("1")
    let accountsList: {id: string, account: string|IKeyringPair, signer: Signer|undefined}[] = []

    useEffect(() => {
        (async () => {
            let waitPromise =  cryptoWaitReady()
            waitPromise.then(() => {
                const callerKeyring = new Keyring({ type: "sr25519" })
                const alice = callerKeyring.addFromUri("//Alice")
                const bob = callerKeyring.addFromUri("//Bob")
                accountsList = [
                    { id: "1", account: userContext.currentUser, signer: props.defaultSigner },
                    { id: "2", account: alice, signer: undefined },
                    { id: "3", account: bob, signer: undefined },
                ]
            })
        })()
    }, [accountsList]);

    function handleClick(n: string) {
        setCurrentButton(n)
        let changed = false
        let caller: CurrentCaller = {userAddressOrPair: "", userSigner: undefined}
        accountsList.forEach((element) => {
            if (n === element.id) {
                caller = { userAddressOrPair: element.account, userSigner: element.signer }
                changed = true
            }
        })

        if (changed) {
            props.setCaller(caller)
        }
    }

    function checkCurrentButton(n: string) {
        return currentButton === n ? styles.currentAccountButton : styles.accountButton
    }

    return (
        <div className={styles.accountButtons}>
            <div
                className={checkCurrentButton("1")}
                onClick={() => {
                    handleClick("1")
                }}
            >
                <p>Your account</p>
            </div>
            <div
                className={checkCurrentButton("2")}
                onClick={() => {
                    handleClick("2")
                }}
            >
                <p>Alice</p>
            </div>
            <div
                className={checkCurrentButton("3")}
                onClick={() => {
                    handleClick("3")
                }}
            >
                <p>Bob</p>
            </div>
        </div>
    )
}
