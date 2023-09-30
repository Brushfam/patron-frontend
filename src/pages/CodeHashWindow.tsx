import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import styles from "./ContractWindow.module.css"
import { AddressElements } from "../components/ContractComponents/AddressElements"
import { useContract } from "../context/ContractContext"
import { ContractButtons } from "../components/Buttons/ContractButtons"
import { buildSessionsDetailsGET, buildSessionsMetadataGET } from "../api/BuildSessionsApi"
import { LoginModal } from "../components/LoginModal/LoginModal";
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader";
import { LoginButton } from "../components/Buttons/LoginButton";
import { MainHeaderLogged } from "../components/Headers/MainHeader";
import { UseUser } from "../context/UserContext";

export default function CodeHashWindow(props: { child: JSX.Element }) {
    const params = useParams()
    const ContractContext = useContract()
    const navigate = useNavigate()
    const [codeHashAddress, setCodeHashAddress] = useState("")
    const [codeHashMetadata, setCodeHashMetadata] = useState({})

    const userContext = UseUser()
    const [loginOpen, setLoginOpen] = useState(false)

    useEffect(() => {
        if (params.id) {
            setCodeHashAddress(params.id.toString())
            ContractContext.setLogHash(params.id.toString())
            let sourcePromise = buildSessionsDetailsGET(params.id.toString())
            sourcePromise.then((detailsList) => {
                ContractContext.setSource(detailsList.source_code_id)
            })
            let metadataPromise = buildSessionsMetadataGET(params.id.toString())
            metadataPromise.then((result) => {
                setCodeHashMetadata(result)
            })
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/buildSessions/logs/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors" as RequestMode,
        }).then((response) => {
            if (!response.ok) {
                navigate("/")
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        })
    }, [params.id, navigate, ContractContext])

    return (
        <div className={styles.contractContainer}>
            <LoginModal isOpen={loginOpen} setModal={setLoginOpen} isLogin={false} />
            {!userContext.currentUser ? (
                <GettingStartedHeader loginButton={<LoginButton onClickEvent={setLoginOpen} />} />
            ) : (
                <MainHeaderLogged />
            )}
            <div className={styles.mainBlock}>
                <div className={styles.addressAndButtons}>
                    <AddressElements
                        name={"Hash Code"}
                        iconPath={"/code-hash-square.svg"}
                        address={codeHashAddress}
                        verified={true}
                        metadata={codeHashMetadata}
                    />
                    <ContractButtons />
                </div>
                {props.child}
            </div>
        </div>
    )
}
