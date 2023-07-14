import styles from "./Code.module.css"
import { useEffect, useState } from "react"
import { fileGET, fileListGET } from "../../api/FilesApi"

export function Code(props: { source_id: number }) {
    const [fileList, setFileList] = useState<string[]>([])
    const [currentCode, setCurrentCode] = useState<string[]>([])
    const [currentFile, setCurrentFile] = useState("")
    const [fileListOpen, setFileListOpen] = useState(false)

    function chooseFile(fileNumber: number) {
        let filePromise = fileGET(props.source_id, fileNumber)
        filePromise.then((data) => {
            let parsedText = data.text.replaceAll("\n\n", "\n \n")
            setCurrentCode(parsedText.split("\n"))
        })
    }

    useEffect(() => {
        let fileListPromise = fileListGET(props.source_id)
        fileListPromise.then((contractFiles) => {
            if (contractFiles.files) {
                setFileList(contractFiles.files)
                setCurrentFile(contractFiles.files[0])
            }
        })

        chooseFile(0)
    }, [props.source_id])

    function FileListButton() {
        if (fileList.length > 1) {
            return fileListOpen ? (
                <></>
            ) : (
                <button
                    type={"button"}
                    className={styles.fileListButton}
                    onClick={() => {
                        setFileListOpen(true)
                    }}
                >
                    <p>{currentFile}</p>
                    <p>|</p>
                    <img src={"/icons/file-list-arrow.svg"} alt={"file list arrow"} />
                </button>
            )
        } else {
            return (
                <div className={styles.oneFileButton}>
                    <p>{currentFile}</p>
                </div>
            )
        }
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
                        <p>{currentFile}</p>
                        <p>|</p>
                        <img
                            src={"/icons/file-list-arrow.svg"}
                            alt={"file list arrow"}
                            style={{ transform: "rotate(180deg)" }}
                        />
                    </div>
                    {fileList &&
                        fileList.map((name, i) => {
                            return name === currentFile ? (
                                <></>
                            ) : (
                                <p
                                    key={i.toString()}
                                    onClick={() => {
                                        chooseFile(i)
                                        setFileListOpen(false)
                                        setCurrentFile(name)
                                    }}
                                    className={styles.fileRow}
                                >
                                    {name}
                                </p>
                            )
                        })}
                </div>
            ) : (
                <></>
            )}
            <div className={styles.code}>
                {currentCode &&
                    currentCode.map((text, i) => {
                        return (
                            <p key={i.toString()} style={{ whiteSpace: "pre" }}>
                                {text}
                            </p>
                        )
                    })}
            </div>
        </div>
    )
}
