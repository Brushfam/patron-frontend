import styles from "./Code.module.css"
import { useEffect, useState } from "react"
import { setFileNameLength } from "../../helpers/helpers"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { codeExample } from "../../data/codeExample"

export function Code() {
    const [currentCode, setCurrentCode] = useState("")
    const [currentFile, setCurrentFile] = useState("")
    const [fileListOpen, setFileListOpen] = useState(false)

    useEffect(() => {
        setCurrentFile("example.rs")
        setCurrentCode(codeExample)
    }, [])

    function FileListButton() {
       return (
           <div className={styles.oneFileButton}>
               <p>{setFileNameLength(currentFile)}</p>
           </div>
       )
    }

    return (
        <div className={styles.codeWrapper}>
            <FileListButton />
            {fileListOpen ? (
                <div className={styles.fileList}>
                    <div
                        className={styles.currentFileRow}
                        onClick={() => {
                            setFileListOpen(false)
                        }}
                    >
                        <p>{setFileNameLength(currentFile)}</p>
                        <p>|</p>
                        <img
                            src={"/icons/file-list-arrow.svg"}
                            alt={"file list arrow"}
                            style={{ transform: "rotate(180deg)" }}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className={styles.code}>
                <SyntaxHighlighter
                    language={"rust"}
                    style={vscDarkPlus}
                    customStyle={{ background: "#21282F" }}
                >
                    {currentCode}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
