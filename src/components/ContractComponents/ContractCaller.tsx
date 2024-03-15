import { UseUser } from "../../context/UserContext"
import React, { useEffect, useState } from "react"
import styles from "./ContractCaller.module.css"
import { ConnectToPatron } from "../Buttons/ConnectToPatron"
import { CopyIcon } from "../CopyIcon"
import { getWalletBySource } from "@subwallet/wallet-connect/dotsama/wallets"
import { IKeyringPair, Signer } from "@polkadot/types/types"
import "@polkadot/api-augment"
import { flipperContractABI } from "../../data/flipper"

export interface CurrentCaller {
    userAddressOrPair: string | IKeyringPair
    userSigner: Signer | undefined
}

interface FunctionDocs {
    lines: string[]
}

interface FunctionArgs {
    labels: string[]
    types: string[]
}

export function ContractCaller() {
    const userContext = UseUser()

    const [functionAnchor, setFunctionAnchor] = useState("")
    const currentWallet = getWalletBySource(userContext.walletName)

    const [functionNames, setFunctionNames] = useState<string[]>([])
    const [functionMutability, setFunctionMutability] = useState<boolean[]>([])
    const [functionSelectors, setFunctionSelectors] = useState<string[]>([])
    const [functionDocs, setFunctionDocs] = useState<FunctionDocs[]>([])
    const [functionArgs, setFunctionArgs] = useState<FunctionArgs[]>([])

    useEffect(() => {
        setMetadataVars(flipperContractABI)

        ;(async () => {
            await currentWallet?.enable()
        })()

        function setMetadataVars(metadata: any) {
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
    }, [
        currentWallet,
        userContext.currentUser,
    ])

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
                            <button type={"button"} className={styles.callerButtonDisabled}>
                                {props.name}
                            </button>
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
            <div className={styles.accountsWrapper}>
                <ConnectToPatron />
            </div>
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
