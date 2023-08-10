import styles from "./Log.module.css";
import {useEffect, useState} from "react";

export function Log(props: {hash: string}) {
    const [codeHashLogs, setCodeHashLogs] = useState<any[]>([]);

    useEffect(() => {
        fetch(
            process.env.REACT_APP_SERVER_URL + '/buildSessions/logs/' + props.hash,
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
    }, [props.hash])


    return (
        <div className={styles.logBlockWrapper}>
            <div className={styles.logBlock}>
                {
                    codeHashLogs &&
                    codeHashLogs.map((line, i) => {
                        return <p key={i}>{line}</p>;
                    })
                }
            </div>
        </div>
    );
}
