import styles from "./AddressElements.module.css";
import { parseAddress } from "../../helpers/helpers";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

export function AddressElements(props: {
    name: string;
    address: string;
    verified: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(props.address);
    }

    const CopyAddress = (copyProps: {
        handleCLose: () => void;
        handleOpen: () => void;
        isOpen: boolean;
    }) => {
        return (
            <Tooltip
                onClose={() => {
                    copyProps.handleCLose();
                }}
                open={copyProps.isOpen}
                disableTouchListener
                title="Copied!"
            >
                <button
                    className={styles.copyButton}
                    onClick={() => {
                        handleCopy();
                        copyProps.handleOpen();
                    }}
                >
                    <p className={styles.addressText}>
                        {parseAddress(props.address)}
                    </p>
                    <img
                        src={"/icons/copy-user.svg"}
                        className={styles.copyIcon}
                        alt={"copy icon"}
                    />
                </button>
            </Tooltip>
        );
    };

    return (
        <div style={{ marginBottom: 40, width: "100%" }}>
            <div className={styles.addressElements}>
                <div className={styles.userBlock}>
                    <img src={props.name === "Address" ? "/icons/user.svg" : "/icons/contract-icon.svg"} alt={"user icon"} />
                </div>
                <p className={styles.name}>{props.name}</p>
                <div className={styles.addressDesktop}>
                    <CopyAddress
                        isOpen={open}
                        handleCLose={() => {setOpen(false)}}
                        handleOpen={() => {setOpen(true)}}
                    />
                </div>
                {props.verified ? (
                    <img
                        src={"/verified.svg"}
                        alt={"verified icon"}
                        className={styles.verifiedIcon}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className={styles.addressMobile}>
                <CopyAddress
                    isOpen={openMobile}
                    handleCLose={() => {
                        setOpenMobile(false);
                    }}
                    handleOpen={() => {
                        setOpenMobile(true);
                    }}
                />
            </div>
        </div>
    );
}
