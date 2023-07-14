import styles from "./Info.module.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    parseAddress,
    parseAddressPTag,
    parseCodeHash,
    parseDate,
} from "../../helpers/helpers"
import Tooltip from "@mui/material/Tooltip"
import { Fade } from "@mui/material";

export function Info(props: {
    address: string
    isVerified: boolean
    hash: string
    node: string
    owner: string
}) {
    const [events, setEvents] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [openOwner, setOpenOwner] = useState(false)

    function handleCopy() {
        navigator.clipboard.writeText(props.hash)
    }

    function handleCopyOwner() {
        navigator.clipboard.writeText(props.owner)
    }

    useEffect(() => {
        let eventsPromise = fetch(
            process.env.REACT_APP_SERVER_URL +
                "/contracts/events/" +
                props.address,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors" as RequestMode,
            }
        ).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            } else {
                return response.text()
            }
        })

        eventsPromise.then((data) => {
            let parsedJson = JSON.parse(data)
            setEvents(parsedJson)
        })
    }, [])

    return (
        <div className={styles.info}>
            <div className={styles.infoBlock}>
                {/* Code Hash */}
                <div className={styles.infoRow}>
                    <p className={styles.infoHeader}>Code Hash:</p>
                    {props.isVerified ? (
                        <Link to={"/codeHash/" + props.hash}>
                            <p className={styles.hashTextVerified}>
                                {parseCodeHash(props.hash)}
                            </p>
                        </Link>
                    ) : (
                        <Tooltip
                            onClose={() => {
                                setOpen(false)
                            }}
                            open={open}
                            disableTouchListener
                            title={"Copied!"}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}
                        >
                            <p
                                className={styles.hashText}
                                onClick={() => {
                                    handleCopy()
                                    setOpen(true)
                                }}
                            >
                                {parseCodeHash(props.hash)}
                            </p>
                        </Tooltip>
                    )}
                </div>
                {/* Deployed on */}
                {props.node ? (
                    <div className={styles.infoRow}>
                        <p className={styles.infoHeader}>Deployed on:</p>
                        <p className={styles.infoText}>{props.node}</p>
                    </div>
                ) : (
                    <></>
                )}
                {/* Deployer */}
                {props.owner ? (
                    <div className={styles.infoRow}>
                        <p className={styles.infoHeader}>Deployer:</p>
                        <Tooltip
                            onClose={() => {
                                setOpenOwner(false)
                            }}
                            open={openOwner}
                            disableTouchListener
                            title={"Copied!"}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}
                        >
                            <p
                                className={styles.infoTextOwner}
                                onClick={() => {
                                    handleCopyOwner()
                                    setOpenOwner(true)
                                }}
                            >
                                {parseAddress(props.owner)}
                            </p>
                        </Tooltip>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {/*    eventListBlock    */}
            <div className={styles.ListHeader}>
                <p className={styles.EventHeader}>Type</p>
                <p className={styles.ContractHeader}>Code Hash</p>
                <p className={styles.TimeHeader}>Created on</p>
            </div>
            <div className={styles.eventListBlock}>
                <div className={styles.eventsList}>
                    {events.length ? (
                        events.map((value, i) => {
                            let tmp = JSON.parse(value.body)
                            let eventType = ""
                            let new_code_hash = ""
                            if (typeof tmp === "string") {
                                eventType = tmp
                            } else {
                                eventType = "CodeHash Update"
                                new_code_hash = tmp.new_code_hash
                            }
                            return (
                                <div
                                    className={styles.listRow}
                                    key={i.toString()}
                                >
                                    <div className={styles.event}>
                                        <img src={"/green-point.svg"} />
                                        <p>{eventType}</p>
                                    </div>
                                    <p className={styles.contract}>
                                        {new_code_hash
                                            ? parseAddress(new_code_hash)
                                            : parseAddress(props.hash)}
                                    </p>
                                    <p className={styles.contractMobile}>
                                        {new_code_hash
                                            ? parseAddressPTag(new_code_hash)
                                            : parseAddressPTag(props.hash)}
                                    </p>
                                    <p className={styles.time}>
                                        {parseDate(value.timestamp)}
                                    </p>
                                </div>
                            )
                        })
                    ) : (
                        <p className={styles.noDataText}>No events was found</p>
                    )}
                </div>
            </div>
        </div>
    )
}
