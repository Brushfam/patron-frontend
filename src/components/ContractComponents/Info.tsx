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
import { useContract } from "../../context/ContractContext";

export function Info() {
    const pageContext = useContract()
    const [events, setEvents] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [openOwner, setOpenOwner] = useState(false)

    function handleCopy() {
        navigator.clipboard.writeText(pageContext.hash)
    }

    function handleCopyOwner() {
        navigator.clipboard.writeText(pageContext.owner)
    }

    useEffect(() => {
        let eventsPromise = fetch(
            process.env.REACT_APP_SERVER_URL +
                "/contracts/events/" +
            pageContext.address,
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
    }, [pageContext.address])

    return (
        <div className={styles.info}>
            <div className={styles.infoBlock}>
                {/* Code Hash */}
                <div className={styles.infoRow}>
                    <p className={styles.infoHeader}>Code Hash:</p>
                    {pageContext.isVerified ? (
                        <Link to={"/codeHash/" + pageContext.hash + "/log"}>
                            <p className={styles.hashTextVerified}>
                                {parseCodeHash(pageContext.hash)}
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
                                {parseCodeHash(pageContext.hash)}
                            </p>
                        </Tooltip>
                    )}
                </div>
                {/* Deployed on */}
                {pageContext.node ? (
                    <div className={styles.infoRow}>
                        <p className={styles.infoHeader}>Deployed on:</p>
                        <p className={styles.infoText}>{pageContext.node}</p>
                    </div>
                ) : (
                    <></>
                )}
                {/* Deployer */}
                {pageContext.owner ? (
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
                                {parseAddress(pageContext.owner)}
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
                                        <img src={"/green-point.svg"} alt={"green point"}/>
                                        <p>{eventType}</p>
                                    </div>
                                    <p className={styles.contract}>
                                        {new_code_hash
                                            ? parseAddress(new_code_hash)
                                            : parseAddress(pageContext.hash)}
                                    </p>
                                    <p className={styles.contractMobile}>
                                        {new_code_hash
                                            ? parseAddressPTag(new_code_hash)
                                            : parseAddressPTag(pageContext.hash)}
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
