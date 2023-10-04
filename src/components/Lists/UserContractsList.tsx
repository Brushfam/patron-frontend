import styles from "./UserContractsList.module.css"
import { UseUser } from "../../context/UserContext"
import { useEffect, useState } from "react"
import { buildSessionsGET } from "../../api/BuildSessionsApi"
import { parseCodeHash, parseDate } from "../../helpers/helpers"
import { Link } from "react-router-dom"

export function UserContractsList() {
    const userContext = UseUser()
    const [sessionData, setSessionData] = useState<any[]>([])

    useEffect(() => {
        buildSessionsGET(userContext.bearerToken).then((allSessions) => {
            let sessions: {}[] = []
            allSessions.forEach((session: any) => {
                if (session.status !== "new") {
                    sessions.push(session)
                }
            })
            setSessionData(sessions)
        })
    }, [userContext.bearerToken])

    const BuildSessionList = () => {
        return (
            <div className={styles.userContractsList}>
                {sessionData.length ? (
                    sessionData.map((data, i) => {
                        return (
                            <div className={styles.listRow} key={i.toString()}>
                                <div className={styles.codeHash}>
                                    {
                                        data.code_hash ?
                                            <Link to={"/codeHash/" + data.code_hash + "/code"}>
                                                <p>
                                                    {parseCodeHash(data.code_hash)}
                                                </p>
                                            </Link>
                                            :
                                            <Link to={"/failedBuildSession/" + data.id + "/code"}>
                                                <p>
                                                    Failed session ({data.id})
                                                </p>
                                            </Link>
                                    }
                                </div>
                                <p className={styles.time}>
                                    {parseDate(data.timestamp)}
                                </p>
                            </div>
                        )
                    })
                ) : (
                    <p className={styles.noDataText}>
                        No build sessions was found
                    </p>
                )}
            </div>
        )
    }

    return (
        <>
            <div className={styles.ListHeader}>
                <p className={styles.listColumnHeaderHash}>Code Hash</p>
                <p className={styles.listColumnHeaderTime}>Created on</p>
            </div>
            <div className={styles.userContractsListWrapper}>
                <BuildSessionList />
            </div>
        </>
    )
}
