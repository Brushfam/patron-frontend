import styles from "./Log.module.css";
import {useEffect, useState} from "react";
import { useContract } from "../../context/ContractContext";

export function Log() {
    const pageContext = useContract()
    const [codeHashLogs, setCodeHashLogs] = useState<any[]>([]);

    useEffect(() => {
        fetch(
            process.env.REACT_APP_SERVER_URL + '/buildSessions/logs/' + pageContext.logHash,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors" as RequestMode,
            }
        ).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    let logLines = ""
                    data.logs.forEach((log: {id: number, text: string}) => {
                        logLines = logLines.concat(log.text)
                    });

                    setCodeHashLogs(logLines.split('\n'));
                })
            } else {
                setCodeHashLogs([""])
            }
        })
    }, [pageContext.logHash])


    return (
        <div className={styles.logBlockWrapper}>
            <div className={styles.logBlock}>
                {
                    codeHashLogs &&
                    codeHashLogs.map((line, i) => {
                        return <p key={i}>{line}</p>;
                    })
                }
                <p style={{ height: 20}}></p>
            </div>
        </div>
    );
}
