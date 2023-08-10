import styles from "./LoginModal.module.css";
import React, { useEffect, useState } from "react";
import { Wallet } from "@subwallet/wallet-connect/types";
import { WalletsList } from "../components/Lists/WalletsList";
import { AccountList } from "../components/Lists/AccountList";
import { UseUser } from "../context/UserContext";

export function LoginModal(props: {
    isOpen: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [step1, setStep1] = useState(true);
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

    const userContext = UseUser();
    useEffect(() => {
        if (userContext.currentUser) {
            props.setModal(false);
        }
    }, [userContext.currentUser, props]);

    if (!props.isOpen) {
        return <></>;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.loginModal}>
                <img
                    src={"/icons/buttons/exit.svg"}
                    alt={"exit button"}
                    className={styles.exitButton}
                    onClick={() => {
                        props.setModal(false);
                    }}
                />
                {step1 ? (
                    <div className={styles.login} id={"step1"}>
                        <p className={styles.loginTitle}>Connect your wallet</p>
                        <div className={styles.loginDescription}>
                            <p>Choose which wallet you want to connect</p>
                        </div>
                        <WalletsList
                            setNextStep={setStep1}
                            setNewWallet={setWallet}
                        />
                    </div>
                ) : (
                    <div className={styles.login} id={"step2"}>
                        <p className={styles.loginTitle}>Connect your wallet</p>
                        <div className={styles.loginDescription}>
                            <img
                                src={"/icons/back-to-wallets.svg"}
                                alt={"back to wallet button"}
                                style={{ marginRight: 6 }}
                            />
                            <p
                                style={{
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setStep1(true);
                                }}
                            >
                                Back to wallet selection
                            </p>
                        </div>
                        <AccountList wallet={wallet} previousStep={setStep1} />
                    </div>
                )}
            </div>
        </div>
    );
}
