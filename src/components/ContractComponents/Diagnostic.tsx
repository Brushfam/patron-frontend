import styles from "./Diagnostic.module.css"
import { useEffect, useState } from "react"
import { codeGET, fileDiagnosticGET } from "../../api/FilesApi"
import { useContract } from "../../context/ContractContext"

interface IDiagnostic {
    level: string
    message: string
    lines: string
}

export function Diagnostic() {
    const contractContext = useContract()
    const [display, setDisplay] = useState(false)
    const [diagnostic, setDiagnostic] = useState<IDiagnostic[]>([])

    function findLine(symbolNumber: number, code: string) {
        let count = 0
        for (let i = 0; i < symbolNumber; i++) {
            if (code.charAt(i) === "\n") {
                count++
            }
        }
        return count
    }

    useEffect(() => {
        function returnLines(start: number, end: number, code: string) {
            let line1 = findLine(start, code)
            let line2 = findLine(end, code)
            return line1 === line2
                ? "line: " + line1.toString()
                : "lines " + line1.toString() + "-" + line2.toString()
        }

        let diagnosticPromise = fileDiagnosticGET(contractContext.logHash)
        diagnosticPromise.then((res) => {
            if (res.length) {
                setDisplay(true)
            }
            let codePromise = codeGET(contractContext.source, "lib.rs")
            codePromise.then((codeText) => {
                let diagnosticList: IDiagnostic[] = []
                res.forEach((element: any) => {
                    diagnosticList.push({
                        level: element.level,
                        message: element.message,
                        lines: returnLines(element.start, element.end, codeText.text.toString()),
                    })
                })
                setDiagnostic(diagnosticList)
            })
        })
    }, [contractContext.logHash, contractContext.source])

    return (
        <div className={styles.diagnosticBlockWrapper}>
            <div className={styles.diagnosticBlock}>
                {display ? (
                    diagnostic.map((card) => {
                        return (
                            <div className={card.level === "error" ? styles.error : styles.warning}>
                                <img
                                    src={
                                        card.level === "error"
                                            ? "/error-label.svg"
                                            : "/warning-label.svg"
                                    }
                                    alt={"level label"}
                                />
                                <p>{card.message}</p>
                                <p>{card.lines}</p>
                            </div>
                        )
                    })
                ) : (
                    <div className={styles.noWarningText}>No warnings was found</div>
                )}
            </div>
        </div>
    )
}
