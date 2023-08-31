import React, { useCallback } from "react";
import {
    getWalletBySource,
    getWallets,
} from "@subwallet/wallet-connect/dotsama/wallets";
import { Wallet } from "@subwallet/wallet-connect/types";
import styles from './WalletsList.module.css'
import { walletLinkData } from "../../data/walletLinksData";
import { UseUser } from "../../context/UserContext"


export function WalletsList(props: {
    setNextStep: React.Dispatch<React.SetStateAction<boolean>>,
    setNewWallet:  React.Dispatch<React.SetStateAction<Wallet | undefined>>
}) {
    const userContext = UseUser()
    const allDotsamaWallets = getWallets();
    const dotsamaWallets = allDotsamaWallets.slice(0,4)

    const onClickDotsamaWallet = useCallback(
        async (wallet: Wallet) => {
            if (wallet && wallet.installed) {
                props.setNewWallet(getWalletBySource(wallet.extensionName))
                userContext.setWallet(wallet)
                userContext.setWalletName(wallet.extensionName)
                await wallet.enable();
                setTimeout(() => {
                    props.setNextStep(false);
                }, 200)
            } else {
                walletLinkData.forEach((dotWallet) => {
                    if (wallet.extensionName === dotWallet.name) {
                        window.open(dotWallet.link, '_blank', 'noreferrer')
                    }
                })
            }
        },
        [props]
    );

    const WalletRow = (wallet: Wallet) => {
        return (
                <button type={"button"} className={styles.walletListItem} key={wallet.extensionName}>
                    <div
                        className={styles.walletRow}
                        onClick={() => {
                            onClickDotsamaWallet(wallet);
                        }}
                    >
                        <p className={styles.name}>{wallet.extensionName}</p>
                        <img
                            src={wallet.logo?.src}
                            alt={wallet.logo?.alt}
                            style={{ width: 30, height: 30 }}
                        />
                    </div>
                </button>
        );
    };

    return (
        <div className={styles.walletListBlock}>{dotsamaWallets.map((wallet) => WalletRow(wallet))}</div>
    );
}
