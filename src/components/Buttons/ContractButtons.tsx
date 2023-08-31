import styles from "./ContractButtons.module.css";
import {useContract} from "../../context/ContractContext";

export function ContractButtons(props: {isVerified: boolean}) {
    const ContractContext = useContract()

    return (
        <div className={styles.contractButtons}>
            <div className={styles.contractButtonsRow}>
                <button
                    className={styles.info}
                    style={
                        ContractContext.page === "1"
                            ? { backgroundColor: "#4270E7" }
                            : { backgroundColor: "#49525A" }
                    }
                    onClick={() => {ContractContext.changePage("1")}}
                >
                    <img src={"/icons/buttons/info.svg"} alt={"info button"}/>
                    Info</button>
                {
                    props.isVerified ? <button
                        className={styles.log}
                        style={
                            ContractContext.page === "2"
                                ? { backgroundColor: "#4270E7" }
                                : { backgroundColor: "#49525A" }
                        }
                        onClick={() => {ContractContext.changePage("2")}}
                    >
                        <img src={"/icons/buttons/logs.svg"} alt={"logs button"}/>
                        Build log</button> : <></>
                }
                {
                    props.isVerified ? <button
                        className={styles.code}
                        style={
                            ContractContext.page === "3"
                                ? { backgroundColor: "#4270E7" }
                                : { backgroundColor: "#49525A" }
                        }
                        onClick={() => {ContractContext.changePage("3")}}
                    >
                        <img src={"/icons/buttons/code.svg"} alt={"code button"}/>
                        Code</button> : <></>
                }
            </div>
            {
                props.isVerified ? <button
                    className={styles.caller}
                    style={
                        ContractContext.page === "4"
                            ? { backgroundColor: "#4270E7" }
                            : { backgroundColor: "#49525A" }
                    }
                    onClick={() => {ContractContext.changePage("4")}}
                >
                    <img src={"/icons/contract-icon.svg"} alt={"caller button"}/>
                    Caller</button> : <></>
            }
        </div>
    );
}
