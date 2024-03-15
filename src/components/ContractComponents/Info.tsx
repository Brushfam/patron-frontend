import styles from "./Info.module.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    parseAddress,
    parseCodeHash,
    parseDate,
} from "../../helpers/helpers"
import Tooltip from "@mui/material/Tooltip"
import { Fade } from "@mui/material";
import { useContract } from "../../context/ContractContext";
import { hashExample } from "../../constants/addresses"

export function Info() {
    const pageContext = useContract()
    const [openOwner, setOpenOwner] = useState(false)

    function handleCopyOwner() {
        navigator.clipboard.writeText(pageContext.owner)
    }

    return (
        <div className={styles.info}>
            <div className={styles.infoBlock}>
                {/* Code Hash */}
                <div className={styles.infoRow}>
                    <p className={styles.infoHeader}>Code Hash:</p>
                    <Link to={"/codeHash/" + hashExample + "/log"}>
                        <p className={styles.hashTextVerified}>
                            {parseCodeHash(hashExample)}
                        </p>
                    </Link>
                </div>
                {/* Deployed on */}
                <div className={styles.infoRow}>
                    <p className={styles.infoHeader}>Deployed on:</p>
                    <p className={styles.infoText}>Aleph Zero</p>
                </div>
                {/* Deployer */}
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
            </div>
            {/*    eventListBlock    */}
            <div className={styles.ListHeader}>
                <p className={styles.EventHeader}>Type</p>
                <p className={styles.ContractHeader}>Code Hash</p>
                <p className={styles.TimeHeader}>Created on</p>
            </div>
            <div className={styles.eventListBlock}>
                <div className={styles.eventsList}>
                    <div
                        className={styles.listRow}
                    >
                        <div className={styles.event}>
                            <img src={"/green-point.svg"} alt={"green point"} />
                            <p>CodeHash Update</p>
                        </div>
                        <p className={styles.contract}>
                            {parseAddress(hashExample)}
                        </p>
                        <p className={styles.contractMobile}>
                            {parseAddress(hashExample)}
                        </p>
                        <p className={styles.time}>
                            {parseDate(1710453661)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
