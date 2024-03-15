import styles from "./Log.module.css";
import {useEffect, useState} from "react";
import { logsExample } from "../../data/logsExample"

export function Log() {
    const [codeHashLogs, setCodeHashLogs] = useState<string[]>([]);

    useEffect(() => {
        setCodeHashLogs(logsExample)
    }, [])

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
