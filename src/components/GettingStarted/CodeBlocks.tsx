import styles from "./CodeBlocks.module.css"
import React, { useState } from "react"
import { CopyIcon } from "../CopyIcon"
import { getHashFromString } from "../../helpers/helpers"

function updateCopyIcon(
    htmlElement: HTMLElement | null,
    setState: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (!htmlElement) return
    setState(true)
    htmlElement.setAttribute("style", "background: #19CB76")
    setTimeout(() => {
        setState(false)
        htmlElement.setAttribute("style", "background: #49525A")
    }, 2000)
}

export function CodeBlock(props: { command: string }) {
    const [copied, setCopied] = useState(false)
    const copyIconId = getHashFromString(props.command).toString()
    let copyIcon: HTMLElement | null = null
    setTimeout(() => {
        copyIcon = document.getElementById(copyIconId)
    }, 100)


    return (
        <div className={styles.wrapper}>
            <div className={styles.codeBlock}>
                <p>{props.command}</p>
                <div
                    id={copyIconId}
                    className={styles.copySquare}
                    onClick={() => {
                        updateCopyIcon(copyIcon, setCopied);
                        navigator.clipboard.writeText(props.command)
                    }}
                >
                    <CopyIcon open={copied} />
                </div>
            </div>
        </div>
    )
}
