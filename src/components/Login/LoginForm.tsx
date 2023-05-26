import React, { useState } from "react";
import { LoginStepTitle } from "../LoginStepTitle";
import "./LoginForm.css";
import { AccountList } from "../Lists/AccountList";
import {WalletsList} from "../Lists/WalletsList";
import { Wallet } from "@subwallet/wallet-connect/types";

export function LoginForm() {
    const [step1, setStep1] = useState(true);
    const [wallet, setWallet] = useState<Wallet|undefined>(undefined)

    return (
        <div>
            {step1 ? (
                <div className={"login"} id={"step1"}>
                    <LoginStepTitle text={"Connect Your Wallet"} />
                    <WalletsList setNextStep={setStep1} setNewWallet={setWallet}/>
                </div>
            ) : (
                <div className={"login"} id={"step2"}>
                    <LoginStepTitle text={"Choose your account"} />
                    <AccountList  wallet={wallet}/>
                </div>
            )}
        </div>
    );
}
