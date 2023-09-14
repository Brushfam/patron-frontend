import { UseUser } from "../context/UserContext";
import React, { useEffect, useState } from "react";
import { LoginModal } from "../modal/LoginModal";
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader";
import { LoginButton } from "../components/Buttons/LoginButton";
import { MainHeaderLogged } from "../components/Headers/MainHeader";
import styles from './LocalContractCaller.module.css'
import { ContractCaller } from "../components/ContractComponents/ContractCaller";

export function LocalContractCaller() {
    const userContext = UseUser()
    const [loginOpen, setLoginOpen] = useState(false)

    const [node, setNode] = useState("")
    const [address, setAddress] = useState("")
    const [abi, setAbi] = useState({})

    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:20600');

        ws.onopen = () => {
            console.log("ws opened")
        };
        ws.onmessage = (event) => {
            let data = JSON.parse(event.data)
            setNode(data.node)
            setAddress(data.address)
            setAbi(data.metadata)
        };
        ws.onclose = () => {
            console.log("ws closed");
            ws.close();
        };

        return () => {
            ws.close();
        };
    }, []);

    return(
        <div className={styles.pageContainer}>
            <LoginModal isOpen={loginOpen} setModal={setLoginOpen} isLogin={false} />
            {!userContext.currentUser ? (
                <GettingStartedHeader loginButton={<LoginButton onClickEvent={setLoginOpen} />} />
            ) : (
                <MainHeaderLogged />
            )}
            <div className={styles.mainBlock}>
                <ContractCaller node={node} address={address} abi={abi}/>
            </div>
        </div>
    )
}
