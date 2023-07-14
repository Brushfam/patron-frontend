import { UseUser } from "../../context/UserContext"
import Box from "@mui/material/Box"
import React, { useCallback, useEffect, useState } from "react"
import styles from "./AccountList.module.css"
import { LoginPOST } from "../../api/LoginApi"
import { parseAddress, textContainString } from "../../helpers/helpers";
import { Wallet, WalletAccount } from "@subwallet/wallet-connect/types"
import { AccountSearch } from "../AccountSearch";

const AccountRow = (props: {
    name: string | undefined
    address: string
    wallet: Wallet | undefined
}) => {
    const userContext = UseUser()

    const signMessage = useCallback(
        (address: string) => {
            const signer = props.wallet?.signer

            if (signer && signer.signRaw) {
                const signPromise = signer.signRaw({
                    address,
                    data: address,
                    type: "bytes",
                })

                signPromise.then((response: any) => {
                    if (response.signature.match("0x[0-9a-fA-F]+")) {
                        ;(async () => {
                            let params = new URL(window.location.href)
                                .searchParams
                            let cli_token = params.get("cli_token")

                            let tokenPromise = LoginPOST(
                                address,
                                response.signature,
                                cli_token
                            )
                            tokenPromise.then((bearerToken) => {
                                userContext.login(
                                    address,
                                    bearerToken.token.toString()
                                )
                            })
                        })()
                    }
                })
            }
        },
        [userContext, props.wallet?.signer]
    );

    const accountClicked = useCallback(
        (address: string) => {
            return () => {
                signMessage(address)
            }
        },
        [signMessage]
    )

    return (
        <div
            className={styles.rowWrapper}
            onClick={accountClicked(props.address)}
        >
            <div className={styles.row}>
                <div className={styles.circle}>
                    <img src={"/icons/user.svg"} alt={"account icon"} />
                </div>
                <div className={styles.rowInfo}>
                    <p className={styles.name}>{props.name}</p>
                    <p className={styles.address}>
                        {parseAddress(props.address)}
                    </p>
                </div>
            </div>
        </div>
    )
}


function NoAccountComponent() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 200)
    }, [show])

    return show ? (
        <div className={styles.noAccountDiv}>
            <p className={styles.noAccountText}>No account found</p>
        </div>
    ) : (
        <></>
    )
}


export function AccountList(props: {
    wallet: Wallet | undefined
    previousStep: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [accounts, setAccounts] = useState<WalletAccount[]>([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        if (props.wallet) {
            ;(async () => {
                const userAccounts = await props.wallet?.getAccounts()
                setTimeout(() => {
                    userAccounts && setAccounts(userAccounts)
                }, 150)
            })()
        }
    }, [accounts, props.wallet]);

    return accounts.length ? (
        <div>
            <AccountSearch setSearchText={setSearchText}/>
            <Box
                sx={[
                    {
                        width: "100%",
                        maxHeight: "190px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        borderRadius: "10px",
                        marginTop: "20px",
                        "scrollbar-width": "none",
                    },
                    { "&::-webkit-scrollbar": { display: "none" } },
                ]}
            >
                {
                    <div className={styles.accountList}>
                        {accounts.map((account, i) => {
                            if (textContainString(account.name, searchText)) {
                                return (
                                    <AccountRow
                                        name={account.name}
                                        address={account.address}
                                        key={i.toString()}
                                        wallet={props.wallet}
                                    />
                                )
                            } else return <></>
                        })}
                    </div>
                }
            </Box>
        </div>
    ) : (
        <NoAccountComponent />
    )
}
