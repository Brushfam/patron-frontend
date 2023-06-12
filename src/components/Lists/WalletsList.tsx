import React, { useCallback } from "react";
import {
    getWalletBySource,
    getWallets,
} from "@subwallet/wallet-connect/dotsama/wallets";
import { Wallet } from "@subwallet/wallet-connect/types";
import ListItemButton from "@mui/material/ListItemButton";
import styles from './WalletsList.module.css'
import { walletLinkData } from "../../data/walletLinksData";


export function WalletsList(props: {
    setNextStep: React.Dispatch<React.SetStateAction<boolean>>,
    setNewWallet:  React.Dispatch<React.SetStateAction<Wallet | undefined>>
}) {
    const dotsamaWallets = getWallets();

    const onClickDotsamaWallet = useCallback(
        async (wallet: Wallet) => {
            if (wallet && wallet.installed) {
                props.setNewWallet(getWalletBySource(wallet.extensionName))
                await wallet.enable();
                setTimeout(() => {
                    props.setNextStep(false);
                }, 200)
            } else {
                walletLinkData.map((dotWallet) => {
                    if (wallet.extensionName === dotWallet.name) {
                        window.open(dotWallet.link, '_blank', 'noreferrer')
                    }
                })
            }
        },
        []
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
                        <img
                            src={wallet.logo?.src}
                            alt={wallet.logo?.alt}
                            style={{ width: 30, height: 30, marginRight: 10 }}
                        />
                        <p className={styles.name}>{wallet.extensionName}</p>
                    </div>
                </button>
        );
    };

    return (
        <div style={{width: "100%"}}>{dotsamaWallets.map((wallet) => WalletRow(wallet))}</div>
    );
}
