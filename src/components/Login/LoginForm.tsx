import React, { useState } from "react";
import { LoginStepTitle } from "../LoginStepTitle";
import styles from "./LoginForm.module.css";
import { AccountList } from "../Lists/AccountList";
import {WalletsList} from "../Lists/WalletsList";
import { Wallet } from "@subwallet/wallet-connect/types";

export function LoginForm() {
    const [step1, setStep1] = useState(true);
    const [wallet, setWallet] = useState<Wallet|undefined>(undefined)

    return (
        <div>
            {step1 ? (
                <div className={styles.login} id={"step1"}>
                    <LoginStepTitle text={"Choose your wallet"} />
                    <WalletsList setNextStep={setStep1} setNewWallet={setWallet}/>
                </div>
            ) : (
                <div className={styles.login} id={"step2"}>
                    <LoginStepTitle text={"Choose your account"} />
                    <AccountList  wallet={wallet} previousStep={setStep1}/>
                </div>
            )}
        </div>
    );
}
