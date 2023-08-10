import styles from "./AddressElements.module.css";
import { parseAddress } from "../../helpers/helpers";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { Fade } from "@mui/material";
import { CopyIcon } from "../CopyIcon";

export function AddressElements(props: {
    name: string;
    iconPath: string;
    address: string;
    verified: boolean;
}) {
    const [open, setOpen] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(props.address);
    }

    const CopyAddress = (copyProps: {
        handleCLose: () => void;
        handleOpen: () => void;
    }) => {
        return (
            <Tooltip
                onClose={() => {
                    copyProps.handleCLose();
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
                        handleCopy();
                        copyProps.handleOpen();
                    }}
                >
                    <p className={styles.addressText}>
                        {parseAddress(props.address)}
                    </p>
                    <CopyIcon open={open}/>
                </button>
            </Tooltip>
        );
    };

    return (
        <div className={styles.addressBlock} style={props.name === "Address" ? {width: "100%"} : {}}>
            <div className={styles.addressBlockInfo}>
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
                {props.verified ? (
                    <img
                        src={"/verified-badge.svg"}
                        alt={"verified icon"}
                        className={styles.verifiedIcon}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className={styles.address}>
                <CopyAddress
                    handleCLose={() => {
                        setOpen(false);
                    }}
                    handleOpen={() => {
                        setOpen(true);
                    }}
                />
            </div>
        </div>
    );
}
