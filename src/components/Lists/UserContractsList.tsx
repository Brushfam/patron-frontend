import styles from "./UserContractsList.module.css";
import { UseUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { buildSessionsGET } from "../../api/BuildSessionsApi";
import { parseCodeHash, parseDate } from "../../helpers/helpers";
import {Link} from "react-router-dom";

export function UserContractsList() {
    const userContext = UseUser();
    const [sessionData, setSessionData] = useState<any[]>([]);

    useEffect(() => {
        buildSessionsGET(userContext.bearerToken).then((sessions) => {
            setSessionData(sessions);
        });
    }, [userContext.bearerToken]);

    const BuildSessionList = () => {
        return (
            <>
                {sessionData.length ?
                    sessionData.map((data) => {
                        if (data.status === 'failed' || data.status === 'new') {
                            return <></>
                        }

                        return (
                            <div className={styles.listRow} key={data.id}>
                                <div className={styles.codeHash}>
                                    <Link to={'/codeHash/' + data.code_hash}>
                                        <p>
                                            {data.code_hash
                                                ? parseCodeHash(data.code_hash)
                                                : ""}
                                        </p>
                                    </Link>
                                </div>
                                <p className={styles.time}>
                                    {parseDate(data.timestamp)}
                                </p>
                            </div>
                        );
                    }) : <p className={styles.noDataText}>no build sessions was found</p>}
            </>
        );
    };

    return (
        <div className={styles.userContractsList}>
            <div style={{ width: "100%" }}>
                <div className={styles.ListHeader}>
                    <p
                        className={styles.listColumnHeader}
                    >
                        Build sessions:
                    </p>
                    <p className={styles.listColumnHeaderTime}>Created on:</p>
                </div>
                <BuildSessionList />
            </div>
        </div>
    );
}
