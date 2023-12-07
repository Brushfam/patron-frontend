import styles from "./AddressElements.module.css"
import { parseAddress } from "../../helpers/helpers"
import Tooltip from "@mui/material/Tooltip"
import { useState } from "react"
import { Fade } from "@mui/material"
import { CopyIcon } from "../CopyIcon"
import { Link } from "react-router-dom"

export function AddressElements(props: {
    name: string
    iconPath: string
    address: string
    verified: boolean
    contractHash?: string
    metadata?: {}
}) {
    const [open, setOpen] = useState(false)
    const phalaHash = props.name === "Contract" ? props.contractHash : props.address

    function handleCopy() {
        navigator.clipboard.writeText(props.address)
    }

    const CopyAddress = (copyProps: { handleCLose: () => void; handleOpen: () => void }) => {
        return (
            <Tooltip
                onClose={() => {
                    copyProps.handleCLose()
                }}
                open={open}
                disableTouchListener
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                title="Copied!"
            >
                <button
                    className={styles.copyButton}
                    onClick={() => {
                        handleCopy()
                        copyProps.handleOpen()
                    }}
                >
                    <p className={styles.addressText}>{parseAddress(props.address)}</p>
                    <CopyIcon open={open} />
                </button>
            </Tooltip>
        )
    }

    function isProfilePage() {
        return props.name === "Address"
    }

    function VerifiedLabel() {
        if (props.verified) {
            return (
                <div className={styles.verifiedLabel}>
                    <img src={"/icons/verified.svg"} alt={"verified label"} />
                    <p>Verified</p>
                </div>
            )
        } else if (!props.verified && !isProfilePage()) {
            return (
                <div className={styles.unverifiedLabel}>
                    <img src={"/icons/unverified.svg"} alt={"unverified lable"} />
                    <p>Unverified</p>
                </div>
            )
        }
        return <></>
    }

    function getMetadataURL() {
        let metadata = JSON.stringify(props.metadata)
        let blob = new Blob([metadata], { type: "application/json" })
        return URL.createObjectURL(blob)
    }

    return (
        <div className={styles.addressBlock} style={isProfilePage() ? { width: "100%" } : {}}>
            <div className={styles.addressBlockTop}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <img src={props.iconPath} alt={"user icon"} />
                    <p className={styles.name}>{props.name}</p>
                </div>
                <VerifiedLabel />
            </div>
            <div
                className={styles.addressBlockMiddle}
                style={isProfilePage() ? { marginBottom: 0 } : {}}
            >
                <div className={styles.address}>
                    <CopyAddress
                        handleCLose={() => {
                            setOpen(false)
                        }}
                        handleOpen={() => {
                            setOpen(true)
                        }}
                    />
                </div>
                {props.verified || props.name === "Address" ? (
                    <></>
                ) : (
                    <div className={styles.unverifiedText}>
                        <a href={"/getting-started"}>Verify and Publish</a>
                        <p>your contract source code today!</p>
                    </div>
                )}
            </div>
            {isProfilePage() ? (
                <></>
            ) : (
                <div className={styles.addressBlockBottom}>
                    <div className={styles.deployWithBlock}>
                        <Link
                            to={
                                "https://contracts-ui.substrate.io/instantiate?patron=" + phalaHash
                            }
                            target={"_blank"}
                            className={styles.deployWithLink}
                        >
                            <img src={"/icons/aleph-zero-icon.svg"} alt={"Aleph Zero icon"} />
                            <p>Deploy with Aleph Zero</p>
                        </Link>
                        <Link
                            to={"https://phat.phala.network/contracts/add/" + phalaHash}
                            target={"_blank"}
                            className={styles.deployWithLink}
                        >
                            <img src={"/icons/phala-icon.svg"} alt={"Phala icon"} />
                            <p>Deploy with Phala</p>
                        </Link>
                    </div>
                    <a
                        className={styles.downloadMetadata}
                        download={props.address + "-metadata"}
                        href={getMetadataURL()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                        >
                            <path
                                d="M5.5 1.00024V10.3336M5.5 10.3336L3.57143 8.33358M5.5 10.3336L7.42857 8.33358M1 13.0002H10"
                                stroke="white"
                            />
                        </svg>
                        <p>Get ABI</p>
                    </a>
                </div>
            )}
        </div>
    )
}
