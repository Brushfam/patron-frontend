import styles from "./ContractButtons.module.css";
import {useContract} from "../../context/ContractContext";

export function ContractButtons(props: {isVerified: boolean}) {
    const ContractContext = useContract()

    return (
        <div className={styles.contractButtons}>
            <button
                className={styles.info}
                style={
                    ContractContext.pages[0]
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {ContractContext.changePage([true, false, false])}}
            >
                <img src={"/icons/buttons/info.svg"}/>
                Info</button>
            {
                props.isVerified ? <button
                    className={styles.log}
                    style={
                        ContractContext.pages[1]
                            ? { backgroundColor: "#4270E7" }
                            : { backgroundColor: "#49525A" }
                    }
                    onClick={() => {ContractContext.changePage([false, true, false])}}
                >
                    <img src={"/icons/buttons/gear.svg"}/>
                    Build log</button> : <></>
            }
            {
                props.isVerified ? <button
                    className={styles.code}
                    style={
                        ContractContext.pages[2]
                            ? { backgroundColor: "#4270E7" }
                            : { backgroundColor: "#49525A" }
                    }
                    onClick={() => {ContractContext.changePage([false, false, true])}}
                >
                    <img src={"/icons/buttons/code.svg"}/>
                    Code</button> : <></>
            }
        </div>
    );
}
