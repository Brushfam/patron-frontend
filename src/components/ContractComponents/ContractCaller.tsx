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

interface FunctionArgs {
    labels: string[]
    types: string[]
}

export function ContractCaller(props: {
    contractAddress: string
    contractCodeHash: string
    contractNetwork: string
    loginClickEvent: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const userContext = UseUser()
    const currentWallet = getWalletBySource(userContext.walletName)
    const [signer, setSigner] = useState<Signer | undefined>(undefined)

    const [functionNames, setFunctionNames] = useState<string[]>([])
    const [functionMutability, setFunctionMutability] = useState<boolean[]>([])
    const [functionSelectors, setFunctionSelectors] = useState<string[]>([])
    const [functionArgs, setFunctionArgs] = useState<FunctionArgs[]>([])
    const [contractAbi, setContractAbi] = useState({})

    useEffect(() => {
        ;(async () => {
            await currentWallet?.enable()
            setSigner(currentWallet?.signer)
        })()
        setMetadataVars()
    }, [props.contractCodeHash])

    const callContract = (
        label: string,
        mutability: boolean,
        parameters: string[],
        setCalledState: React.Dispatch<React.SetStateAction<boolean>>,
        setResultState: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (signer) {
            const wsProvider = new WsProvider(
                props.contractNetwork === "Astar" ? "wss://rpc.astar.network" : "wss://ws.azero.dev"
            )
            const apiPromise = ApiPromise.create({ provider: wsProvider })

            apiPromise.then(async (api) => {
                const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE)
                const PROOF_SIZE = new BN(1_000_000)
                const contract = new ContractPromise(api, contractAbi, props.contractAddress)
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
                        ).signAndSend(userContext.currentUser, { signer }, async (res) => {
                            if (res.status.isInBlock) {
                                setResultState("in a block!")
                                console.log("in a block")
                            } else if (res.status.isFinalized) {
                                console.log("finalized")
                            }
                            console.log("tx hash:" + res.txHash.toHex())
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

                        await contract.tx[label](
                            {
                                gasLimit,
                                storageDepositLimit,
                            }
                        ).signAndSend(userContext.currentUser, { signer }, async (res) => {
                            if (res.status.isInBlock) {
                                setResultState("in a block!")
                                console.log("in a block")
                            } else if (res.status.isFinalized) {
                                console.log("finalized")
                            }
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
                        )
                        setTimeout(() => {
                            if (functionResult.output) {
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

    const setMetadataVars = () => {
        const metadataPromise = metadataGET(props.contractCodeHash)
        metadataPromise.then((metadata) => {
            setContractAbi(metadata)
            let functionNamesList: string[] = []
            let functionMutabilityList: boolean[] = []
            let functionSelectorsList: string[] = []
            let functionArgsList: FunctionArgs[] = []
            setTimeout(() => {
                let stringify_metadata = metadata.spec.messages
                stringify_metadata.map((method: { label: string; mutates: string; args: any }) => {
                    let functionArgsLabelList: string[] = []
                    let functionArgsTypeList: string[] = []

                    functionNamesList.push(method.label)
                    let functionType = method.mutates.toString() !== "false"
                    functionMutabilityList.push(functionType)
                    // @ts-ignore
                    functionSelectorsList.push(method.selector)
                    method.args.map((argument: { label: string; type: any }) => {
                        functionArgsLabelList.push(argument.label.toString())
                        functionArgsTypeList.push(argument.type.displayName.toString())
                    })
                    functionArgsList.push({
                        labels: functionArgsLabelList,
                        types: functionArgsTypeList,
                    })
                })
                setFunctionNames(functionNamesList)
                setFunctionMutability(functionMutabilityList)
                setFunctionSelectors(functionSelectorsList)
                setFunctionArgs(functionArgsList)
            }, 200)
        })
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

        return (
            <div
                id={"function-copy-" + props.name}
                className={styles.functionTitleButtonWrapper}
                onClick={() => {
                    updateCopyIcon(props.name, setCopied)
                    navigator.clipboard.writeText(props.name + " " + props.selector)
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

        function handleFunctionCall() {
            let parameters: string[] = []
            for (let i = 0; i < functionArgs[props.iteration].labels.length; i++) {
                const element = document.getElementById(
                    props.name + "_" + i.toString()
                )! as HTMLInputElement
                parameters.push(element.value.toString().trim())
            }

            callContract(snakeToCamel(props.name), props.type, parameters, setCalled, setResult)
            setCalled(true)
        }

        return (
            <div className={styles.contractFunction}>
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
                        <div className={styles.inputsBlock}>
                            {functionArgs[props.iteration].labels.length ? (
                                functionArgs[props.iteration].labels.map((label, i) => {
                                    return (
                                        <div className={styles.inputsRow} key={i.toString()}>
                                            <p className={styles.functionInputLabel}>{label}</p>
                                            <input
                                                id={props.name + "_" + i.toString()}
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
                            {!called ? (
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
                                    {isNumber(result) ? parseInt(result, 16) : result}
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
            <ConnectToPatron loginClickEvent={props.loginClickEvent} />
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
