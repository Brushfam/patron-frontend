import { ExplorerHeader } from "../components/Headers/ExplorerHeader"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AddressElements } from "../components/ContractComponents/AddressElements"
import styles from "./ContractWindow.module.css"
import { ContractButtons } from "../components/Buttons/ContractButtons"
import { useContract } from "../context/ContractContext"
import { Info } from "../components/ContractComponents/Info"
import { Log } from "../components/ContractComponents/Log"
import { Code } from "../components/ContractComponents/Code"
import { buildSessionsDetailsGET } from "../api/BuildSessionsApi"
import { UseUser } from "../context/UserContext"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { BN, BN_ONE } from "@polkadot/util"
import { ContractPromise } from "@polkadot/api-contract"
import contractAbi from "../components/Lists/flipper.json"
import { WeightV2 } from "@polkadot/types/interfaces"
import { metadataGET } from "../api/FilesApi";


function ContractCallerTest(props: {contractAddress: string, contractCodeHash: string}) {
    const userContext = UseUser()
    const signer = userContext.wallet?.signer
    const [functionNames, setFunctionNames] = useState<string[]>([])
    const [functionTypes, setFunctionTypes] = useState<string[]>([])
    const [writeResult, setWriteResult] = useState("")
    const [readResult, setReadResult] = useState("")

    const testContract = (label: string, mutatesType: string) => {
        console.log(signer)
        if (signer) {
            const wsProvider = new WsProvider("wss://rpc.astar.network")
            const apiPromise = ApiPromise.create({ provider: wsProvider })
            apiPromise.then(async (api) => {
                const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE)
                const PROOF_SIZE = new BN(1_000_000)
                const contract = new ContractPromise(
                    api,
                    contractAbi,
                    props.contractAddress
                )

                console.log(mutatesType)
                if (mutatesType.toString() === "false") {
                    console.log("123")
                    const testVar = await contract.query[label](userContext.currentUser, {
                        gasLimit: api?.registry.createType("WeightV2", {
                            refTime: MAX_CALL_WEIGHT,
                            proofSize: PROOF_SIZE,
                        }) as WeightV2,
                        storageDepositLimit: null,
                    })
                    setTimeout(() => {
                        console.log("get: " + testVar.output?.toString())
                        setReadResult(testVar.output ? testVar.output?.toString() : "")
                    }, 150)
                } else if (mutatesType.toString() === "true") {
                    const storageDepositLimit = null

                    const { gasRequired } = await contract.query[label](userContext.currentUser, {
                        gasLimit: api?.registry.createType("WeightV2", {
                            refTime: MAX_CALL_WEIGHT,
                            proofSize: PROOF_SIZE,
                        }) as WeightV2,
                        storageDepositLimit,
                    })

                    const gasLimit = api?.registry.createType("WeightV2", gasRequired) as WeightV2

                    await contract.tx
                        [label]({
                        gasLimit,
                        storageDepositLimit,
                    })
                        .signAndSend(userContext.currentUser, { signer }, async (res) => {
                            if (res.status.isInBlock) {
                                console.log("in a block")
                            } else if (res.status.isFinalized) {
                                console.log("finalized")
                            }
                            setWriteResult("tx hash:" + res.txHash.toHex())
                        })
                }
            })
        }
    }

    const setMetadataVars = () => {
        const metadataPromise = metadataGET(props.contractCodeHash)
        metadataPromise.then((metadata) => {
            let functionNamesList: string[] = []
            let functionTypesList: string[] = []
            setTimeout(() => {
                let stringify_metadata = metadata.spec.messages
                stringify_metadata.map((method: { label: string; mutates: string }) => {
                    functionNamesList.push(method.label)
                    functionTypesList.push(method.mutates)
                })
                setFunctionNames(functionNamesList)
                setFunctionTypes(functionTypesList)
            }, 200)
        })
    }

    useEffect(() => {
        setMetadataVars()
    }, [props.contractCodeHash]);

    return (
        <div className={styles.contractCallerSection}>
            {
                functionNames ? functionNames.map((name, i) => {
                    return(
                        <div className={styles.contractCallerBlock} key={i}>
                            <button type={"button"} onClick={() => {testContract(name, functionTypes[i])}}>
                                {name}
                            </button>
                            <div className={styles.contractCallerBlockResult}>
                                {functionTypes[i].toString() === "false" ? readResult : writeResult}
                            </div>
                        </div>
                    )
                }) : <></>
            }
        </div>
    )
}

export default function ContractWindow() {
    const params = useParams()
    const ContractContext = useContract()
    const navigate = useNavigate()

    const [contractAddress, setContractAddress] = useState("")
    const [verified, setVerified] = useState(false)
    const [codeSourceId, setCodeSourceId] = useState(0)

    const [contractHash, setContractHash] = useState("")
    const [contractNetwork, setContractNetwork] = useState("")
    const [contractOwner, setContractOwner] = useState("")

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
                setContractAddress(params.id.toString())
                let sourcePromise = buildSessionsDetailsGET(data.code_hash)
                sourcePromise.then((detailsList) => {
                    setCodeSourceId(detailsList.source_code_id)
                })
                setContractHash(data.code_hash)
                setContractOwner(data.owner)
                setContractNetwork(data.node)
                if (data.node === "astar") {
                    setContractNetwork("Astar")
                } else if (data.node === "alephzero") {
                    setContractNetwork("Aleph Zero")
                } else {
                    setContractNetwork("")
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
                    setVerified(true)
                }
            })
        })
    }, [params.id, codeSourceId, contractHash, navigate])

    const CurrentContractWindow = () => {
        const [logHash, source] = verified ? [contractHash, codeSourceId] : ["", 0]

        if (ContractContext.page === "1") {
            return (
                <Info
                    address={contractAddress}
                    isVerified={verified}
                    hash={contractHash}
                    node={contractNetwork}
                    owner={contractOwner}
                ></Info>
            )
        } else if (ContractContext.page === "2") {
            return <Log hash={logHash}></Log>
        } else return <Code source_id={source}></Code>
    }

    return (
        <div className={styles.contractContainer}>
            <ExplorerHeader />
            <div className={styles.mainBlock}>
                <div className={styles.addressAndButtons}>
                    <AddressElements
                        name={"Contract"}
                        iconPath={"/contract-square.svg"}
                        address={contractAddress}
                        verified={verified}
                    />
                    <ContractButtons isVerified={verified} />
                </div>
                <CurrentContractWindow />
            </div>
            <ContractCallerTest  contractCodeHash={contractHash} contractAddress={contractAddress}/>
        </div>
    )
}
