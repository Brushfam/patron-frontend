import { UseUser } from "../../context/UserContext"
import React, { useEffect, useState } from "react"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { BN, BN_ONE } from "@polkadot/util"
import { ContractPromise } from "@polkadot/api-contract"
import { WeightV2 } from "@polkadot/types/interfaces"
import { metadataGET } from "../../api/FilesApi"
import styles from "./ContractCaller.module.css"
import { ConnectToPatron } from "../Buttons/ConnectToPatron"
import { CopyIcon } from "../CopyIcon"
import { isNumber, snakeToCamel } from "../../helpers/helpers"
import { getWalletBySource } from "@subwallet/wallet-connect/dotsama/wallets"
import { Signer } from "@polkadot/types/types"
import { useContract } from "../../context/ContractContext"

interface FunctionDocs {
    lines: string[]
}

interface FunctionArgs {
    labels: string[]
    types: string[]
}

export function ContractCaller(props: { node?: string; address?: string; abi?: {} }) {
    const userContext = UseUser()
    const contractContext = useContract()

    const [functionAnchor, setFunctionAnchor] = useState("")
    const currentWallet = getWalletBySource(userContext.walletName)
    const [signer, setSigner] = useState<Signer | undefined>(undefined)
    const [isLocalNode, setIsLocalNode] = useState(false)

    const [functionNames, setFunctionNames] = useState<string[]>([])
    const [functionMutability, setFunctionMutability] = useState<boolean[]>([])
    const [functionSelectors, setFunctionSelectors] = useState<string[]>([])
    const [functionDocs, setFunctionDocs] = useState<FunctionDocs[]>([])
    const [functionArgs, setFunctionArgs] = useState<FunctionArgs[]>([])
    const [contractAbi, setContractAbi] = useState({})

    useEffect(() => {
        ;(async () => {
            await currentWallet?.enable()
            setSigner(currentWallet?.signer)
        })()

        if (props.node?.length) {
            setMetadataVars(props.abi)
        } else {
            const metadataPromise = metadataGET(contractContext.hash)
            metadataPromise.then((metadata) => {
                setMetadataVars(metadata)
            })
        }

        function setMetadataVars(metadata: any) {
            setContractAbi(metadata)
            let functionNamesList: string[] = []
            let functionMutabilityList: boolean[] = []
            let functionSelectorsList: string[] = []
            let functionArgsList: FunctionArgs[] = []
            let functionDocsList: FunctionDocs[] = []
            setTimeout(() => {
                let stringify_metadata = metadata.spec.messages
                stringify_metadata.forEach(
                    (method: { label: string; mutates: string; docs: string[]; args: any }) => {
                        functionNamesList.push(method.label)
                        let functionType = method.mutates.toString() !== "false"
                        functionMutabilityList.push(functionType)
                        // @ts-ignore
                        functionSelectorsList.push(method.selector)

                        let lines: FunctionDocs = { lines: [] }
                        method.docs.forEach((line) => {
                            lines.lines.push(line)
                        })
                        functionDocsList.push(lines)

                        let functionArgsLabelList: string[] = []
                        let functionArgsTypeList: string[] = []
                        method.args.forEach((argument: { label: string; type: any }) => {
                            functionArgsLabelList.push(argument.label.toString())
                            functionArgsTypeList.push(argument.type.displayName.toString())
                        })
                        functionArgsList.push({
                            labels: functionArgsLabelList,
                            types: functionArgsTypeList,
                        })
                    }
                )
                setFunctionNames(functionNamesList)
                setFunctionMutability(functionMutabilityList)
                setFunctionSelectors(functionSelectorsList)
                setFunctionArgs(functionArgsList)
                setFunctionDocs(functionDocsList)
            }, 200)
        }

        const currentURL = window.location.href
        let currentFunction = currentURL.slice(currentURL.lastIndexOf("#"))
        if (currentFunction.startsWith("#")) {
            setFunctionAnchor(currentFunction.slice(1))
        }
    }, [contractContext.hash, currentWallet, props.abi])

    const callContract = (
        label: string,
        mutability: boolean,
        parameters: string[],
        setCalledState: React.Dispatch<React.SetStateAction<boolean>>,
        setResultState: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (signer) {
            let provider = ""
            if (props.node) {
                provider = props.node
            } else if (contractContext.node === "Astar") {
                provider = "wss://rpc.astar.network"
            } else if (contractContext.node === "Aleph Zero") {
                provider = "wss://ws.azero.dev"
            } else {
                setIsLocalNode(true)
            }
            const wsProvider = new WsProvider(provider)
            const apiPromise = ApiPromise.create({ provider: wsProvider })

            apiPromise.then(async (api) => {
                const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE)
                const PROOF_SIZE = new BN(1_000_000)
                const contractAddress = props.address ? props.address : contractContext.address
                const contract = new ContractPromise(api, contractAbi, contractAddress)
                const gasLimitValue: WeightV2 = api?.registry.createType("WeightV2", {
                    refTime: MAX_CALL_WEIGHT,
                    proofSize: PROOF_SIZE,
                })
                const storageDepositLimit = null

                if (mutability) {
                    if (parameters.length) {
                        const { gasRequired } = await contract.query[label](
                            userContext.currentUser,
                            {
                                gasLimit: gasLimitValue,
                                storageDepositLimit,
                            },
                            ...parameters
                        )

                        const gasLimit = api?.registry.createType(
                            "WeightV2",
                            gasRequired
                        ) as WeightV2

                        await contract.tx[label](
                            {
                                gasLimit,
                                storageDepositLimit,
                            },
                            ...parameters
                        )
                            .signAndSend(userContext.currentUser, { signer }, async (res) => {
                                if (res.status.isInBlock) {
                                    setResultState("in a block!")
                                    setCalledState(false)
                                    console.log("in a block")
                                } else if (res.status.isFinalized) {
                                    console.log("finalized")
                                }
                                console.log("tx hash:" + res.txHash.toHex())
                            })
                            .catch((res) => {
                                setResultState(res.toString())
                                setCalledState(false)
                            })
                    } else {
                        const { gasRequired } = await contract.query[label](
                            userContext.currentUser,
                            {
                                gasLimit: gasLimitValue,
                                storageDepositLimit,
                            }
                        )

                        const gasLimit = api?.registry.createType(
                            "WeightV2",
                            gasRequired
                        ) as WeightV2

                        await contract.tx[label]({
                            gasLimit,
                            storageDepositLimit,
                        })
                            .signAndSend(userContext.currentUser, { signer }, async (res) => {
                                if (res.status.isInBlock) {
                                    setResultState("in a block!")
                                    setCalledState(false)
                                    console.log("in a block")
                                } else if (res.status.isFinalized) {
                                    console.log("finalized")
                                }
                                console.log("tx hash:" + res.txHash.toHex())
                            })
                            .catch((res) => {
                                setResultState(res.toString())
                                setCalledState(false)
                            })
                    }
                } else {
                    if (parameters.length) {
                        const functionResult = await contract.query[label](
                            userContext.currentUser,
                            {
                                gasLimit: api?.registry.createType("WeightV2", {
                                    refTime: MAX_CALL_WEIGHT,
                                    proofSize: PROOF_SIZE,
                                }) as WeightV2,
                                storageDepositLimit,
                            },
                            ...parameters
                        ).catch((res) => {
                            setResultState(res.toString())
                            setCalledState(false)
                        })
                        setTimeout(() => {
                            if (functionResult?.output) {
                                let parsedResult = JSON.parse(functionResult.output.toString())
                                setResultState(parsedResult.ok.toString())
                            }
                            setCalledState(false)
                        }, 150)
                    } else {
                        const functionResult = await contract.query[label](
                            userContext.currentUser,
                            {
                                gasLimit: api?.registry.createType("WeightV2", {
                                    refTime: MAX_CALL_WEIGHT,
                                    proofSize: PROOF_SIZE,
                                }) as WeightV2,
                                storageDepositLimit,
                            }
                        )
                        setTimeout(() => {
                            if (functionResult.output) {
                                let parsedResult = JSON.parse(functionResult.output.toString())
                                setResultState(parsedResult.ok.toString())
                            }
                            setCalledState(false)
                        }, 150)
                    }
                }
            })
        }
    }

    function updateCopyIcon(name: string, setState: React.Dispatch<React.SetStateAction<boolean>>) {
        let copyIcon = document.getElementById("function-copy-" + name)
        if (!copyIcon) return
        setState(true)
        copyIcon.setAttribute("style", "background: #19CB76")
        setTimeout(() => {
            setState(false)
            // @ts-ignore
            copyIcon.setAttribute("style", "background: #49525A")
        }, 2000)
    }

    function CopyButton(props: { name: string; selector: string }) {
        const [copied, setCopied] = useState(false)

        function handleCopy() {
            updateCopyIcon(props.name, setCopied)

            let currentURL = window.location.href
            if (currentURL.includes("#")) {
                currentURL = currentURL.slice(0, currentURL.indexOf("#"))
            }
            navigator.clipboard.writeText(currentURL + "#" + props.name)
        }

        return (
            <div
                id={"function-copy-" + props.name}
                className={styles.functionTitleButtonWrapper}
                onClick={() => {
                    handleCopy()
                }}
            >
                <CopyIcon open={copied} />
            </div>
        )
    }

    function FunctionBlock(props: {
        name: string
        selector: string
        type: boolean
        iteration: number
    }) {
        const [open, setOpen] = useState(false)
        const [called, setCalled] = useState(false)
        const [result, setResult] = useState("")
        const [firstOpen, setFirstOpen] = useState(true)

        useEffect(() => {
            // in case link contains function name
            if (functionAnchor === props.name && firstOpen) {
                setTimeout(() => {
                    if (document.getElementById(props.selector)) {
                        setOpen(true)
                    }
                }, 200)

                if (open) {
                    let element = document.getElementById(props.selector)
                    if (element) {
                        element.scrollIntoView()
                        setFirstOpen(false)
                    }
                }
            }
        }, [open, firstOpen, props.name, props.selector])

        function handleFunctionCall() {
            let parameters: string[] = []
            for (let i = 0; i < functionArgs[props.iteration].labels.length; i++) {
                const element = document.getElementById(
                    props.selector + "_" + i.toString()
                )! as HTMLInputElement
                parameters.push(element.value.toString().trim())
            }

            callContract(snakeToCamel(props.name), props.type, parameters, setCalled, setResult)
            setCalled(true)
        }

        return (
            <div className={styles.contractFunction} id={props.selector}>
                <div className={styles.functionTitleBlock}>
                    <div className={styles.functionTitle}>
                        <p>
                            {(props.iteration + 1).toString()}. {props.name} ({props.selector})
                        </p>
                        {props.type ? (
                            <div className={styles.functionTypeLabel}>
                                <p>Write</p>
                                <img src={"/icons/caller-write.svg"} alt={"type"} />
                            </div>
                        ) : (
                            <div className={styles.functionTypeLabel}>
                                <p>Read</p>
                                <img src={"/icons/caller-read.svg"} alt={"type"} />
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        <CopyButton name={props.name} selector={props.selector} />
                        <div
                            className={styles.functionTitleButtonWrapper}
                            onClick={() => {
                                setOpen(!open)
                            }}
                        >
                            <img
                                src={"/icons/buttons/arrow.svg"}
                                style={{
                                    transform: open ? "rotate(270deg)" : "rotate(90deg)",
                                    width: 14,
                                }}
                                alt={"arrow"}
                            />
                        </div>
                    </div>
                </div>
                {open ? (
                    <div className={styles.functionContent}>
                        {functionDocs[props.iteration].lines.length ? (
                            <div className={styles.functionDocs}>
                                {functionDocs[props.iteration].lines.map((line, i) => {
                                    return <p key={i.toString()}>{line}</p>
                                })}
                                <p style={{ paddingBottom: 8 }}></p>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className={styles.inputsBlock}>
                            {functionArgs[props.iteration].labels.length ? (
                                functionArgs[props.iteration].labels.map((label, i) => {
                                    return (
                                        <div className={styles.inputsRow} key={i.toString()}>
                                            <p className={styles.functionInputLabel}>{label}</p>
                                            <input
                                                id={props.selector + "_" + i.toString()}
                                                className={styles.functionInput}
                                                placeholder={functionArgs[props.iteration].types[i]}
                                                autoComplete={"off"}
                                                autoCorrect={"off"}
                                                spellCheck={"false"}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className={styles.ButtonRow}>
                            {!called && !isLocalNode && userContext.currentUser ? (
                                <button
                                    type={"button"}
                                    className={styles.callerButton}
                                    onClick={() => {
                                        handleFunctionCall()
                                    }}
                                >
                                    {props.name}
                                </button>
                            ) : (
                                <button type={"button"} className={styles.callerButtonDisabled}>
                                    {props.name}
                                </button>
                            )}
                            {result ? (
                                <div className={styles.contractCallerBlockResult}>
                                    <p style={{ lineHeight: "100%" }}>
                                        {isNumber(result) ? parseInt(result, 16) : result}
                                    </p>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        )
    }

    return (
        <div className={styles.contractCallerSection}>
            <ConnectToPatron />
            {!props.node?.length && props.abi ? <p className={styles.rebuildText}>Rebuild project once to start</p> : <></>}
            {functionNames ? (
                functionNames.map((name, i) => {
                    return (
                        <div key={i}>
                            <FunctionBlock
                                iteration={i}
                                name={name}
                                selector={functionSelectors[i]}
                                type={functionMutability[i]}
                            />
                        </div>
                    )
                })
            ) : (
                <></>
            )}
        </div>
    )
}
