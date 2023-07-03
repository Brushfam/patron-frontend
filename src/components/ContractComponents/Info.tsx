import styles from "./Info.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    parseAddress,
    parseAddressPTag,
    parseCodeHash,
    parseDate,
} from "../../helpers/helpers";
import Tooltip from "@mui/material/Tooltip";

export function Info(props: {
    address: string;
    isVerified: boolean;
    hash: string;
    node: string;
    owner: string;
}) {
    const [events, setEvents] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [openOwner, setOpenOwner] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(props.hash);
    }

    function handleCopyOwner() {
        navigator.clipboard.writeText(props.owner);
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
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.text();
            }
        });

        eventsPromise.then((data) => {
            let parsedJson = JSON.parse(data);
            setEvents(parsedJson);
        });
    }, [props.address]);

    return (
        <div className={styles.info}>
            <div className={styles.infoBlock}>
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
                                setOpen(false);
                            }}
                            open={open}
                            disableTouchListener
                            title={"Copied!"}
                        >
                            <p
                                className={styles.hashText}
                                onClick={() => {
                                    handleCopy();
                                    setOpen(true);
                                }}
                            >
                                {parseCodeHash(props.hash)}
                            </p>
                        </Tooltip>
                    )}
                </div>
                {props.node ? (
                    <div className={styles.infoRow}>
                        <p className={styles.infoHeader}>Deployed on:</p>
                        <p className={styles.infoText}>{props.node}</p>
                    </div>
                ) : (
                    <></>
                )}
                {props.owner ? (
                    <div className={styles.infoRow}>
                        <p className={styles.infoHeader}>Deployer:</p>
                        <Tooltip
                            onClose={() => {
                                setOpenOwner(false);
                            }}
                            open={openOwner}
                            disableTouchListener
                            title={"Copied!"}
                        >
                            <p
                                className={styles.infoTextOwner}
                                onClick={() => {
                                    handleCopyOwner();
                                    setOpenOwner(true);
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
            <div className={styles.contractList}>
                <div style={{ width: "100%" }}>
                    <div className={styles.ListHeader}>
                        <p className={styles.ContractHeader}>Code Hash:</p>
                        <p className={styles.TimeHeader}>Created on:</p>
                        <p className={styles.EventHeader}>Type:</p>
                    </div>
                    {events &&
                        events.map((value, i) => {
                            let tmp = JSON.parse(value.body);
                            let eventType = "";
                            let new_code_hash = "";
                            if (typeof tmp === "string") {
                                eventType = tmp;
                            } else {
                                eventType = "CodeHash Update";
                                new_code_hash = tmp.new_code_hash;
                            }
                            return (
                                <div
                                    className={styles.listRow}
                                    key={i.toString()}
                                >
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
                                    <div className={styles.eventWrapper}>
                                        <p className={styles.event}>
                                            {eventType}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
