import Box from "@mui/material/Box";
import { List } from "@mui/material";
import React, { useCallback } from "react";
import {
    getWalletBySource,
    getWallets,
} from "@subwallet/wallet-connect/dotsama/wallets";
import { Wallet } from "@subwallet/wallet-connect/types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import styles from './AccountList.module.css'


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
                window.location.replace(wallet.installUrl);
            }
        },
        []
    );

    const WalletRow = (wallet: Wallet) => {
        return (
            <ListItem
                disablePadding
                sx={{
                    borderBottom: 1,
                    borderColor: "#49525A",
                    backgroundColor: "#323D47",
                }}
                key={wallet.extensionName}
            >
                <ListItemButton sx={{ padding: 0 }}>
                    <div
                        className={styles.walletRow}
                        onClick={() => {
                            onClickDotsamaWallet(wallet);
                        }}
                    >
                        <img
                            src={wallet.logo?.src}
                            alt={wallet.logo?.alt}
                            style={{ width: 22, height: 22, marginRight: 12 }}
                        />
                        <p className={styles.name}>{wallet.extensionName}</p>
                    </div>
                </ListItemButton>
            </ListItem>
        );
    };

    return (
        <Box
            sx={[
                {
                    width: "100%",
                    height: 140,
                    overflowY: "auto",
                    overflowX: "hidden",
                    border: 1,
                    borderColor: "#49525A",
                    borderRadius: 3,
                    marginTop: "20px",
                },
                { "&::-webkit-scrollbar": { display: "none" } },
            ]}
        >
            <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <div>{dotsamaWallets.map((wallet) => WalletRow(wallet))}</div>
            </List>
        </Box>
    );
}
