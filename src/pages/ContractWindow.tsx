import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AddressElements } from "../components/ContractComponents/AddressElements"
import styles from "./ContractWindow.module.css"
import { ContractButtons } from "../components/Buttons/ContractButtons"
import { useContract } from "../context/ContractContext"
import { buildSessionsDetailsGET } from "../api/BuildSessionsApi"
import { LoginModal } from "../modal/LoginModal";
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader";
import { LoginButton } from "../components/Buttons/LoginButton";
import { MainHeaderLogged } from "../components/Headers/MainHeader";
import { UseUser } from "../context/UserContext";

export default function ContractWindow(props: {child: JSX.Element}) {
    const params = useParams()
    const ContractContext = useContract()
    const navigate = useNavigate()
    const userContext = UseUser()

    const [loginOpen, setLoginOpen] = useState(false)

    const [contractAddress, setContractAddress] = useState("")
    const [verified, setVerified] = useState(false)
    const [codeSourceId, setCodeSourceId] = useState(0)
    const [contractHash, setContractHash] = useState("")

    useEffect(() => {
        let dataPromise = fetch(process.env.REACT_APP_SERVER_URL + "/contracts/" + params.id, {
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
            return response.json()
        })

        dataPromise.then((data) => {
            if (params.id) {
                ContractContext.setAddress(params.id.toString())
                setContractAddress(params.id.toString())
                let sourcePromise = buildSessionsDetailsGET(data.code_hash)
                sourcePromise.then((detailsList) => {
                    ContractContext.setSource(detailsList.source_code_id)
                    setCodeSourceId(detailsList.source_code_id)
                })
                ContractContext.setHash(data.code_hash)
                ContractContext.setLogHash(data.code_hash)
                ContractContext.setOwner(data.owner)
                setContractHash(data.code_hash)
                if (data.node === "astar") {
                    ContractContext.setNode("Astar")
                } else if (data.node === "alephzero") {
                    ContractContext.setNode("Aleph Zero")
                } else {
                    ContractContext.setNode("")
                }
            }

            fetch(process.env.REACT_APP_SERVER_URL + "/buildSessions/logs/" + data.code_hash, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors" as RequestMode,
            }).then((response) => {
                if (response.ok) {
                    ContractContext.setIsVerified(true)
                    setVerified(true)
                }
            })
        })
    }, [params.id, codeSourceId, contractHash, navigate, ContractContext])

    return (
        <div className={styles.contractContainer}>
            <LoginModal isOpen={loginOpen} setModal={setLoginOpen} isLogin={false}/>
            {!userContext.currentUser ? (
                <GettingStartedHeader loginButton={<LoginButton onClickEvent={setLoginOpen} />} />
            ) : (
                <MainHeaderLogged />
            )}
            <div className={styles.mainBlock}>
                <div className={styles.addressAndButtons}>
                    <AddressElements
                        name={"Contract"}
                        iconPath={"/contract-square.svg"}
                        address={contractAddress}
                        verified={verified}
                        contractHash={contractHash}
                    />
                    <ContractButtons isVerified={verified} />
                </div>
                {props.child}
            </div>
        </div>
    )
}
