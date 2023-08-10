import styles from "./ContractButtons.module.css";
import {useContract} from "../../context/ContractContext";

export function CodeHashButtons() {
    const codeHashContext = useContract()

    return (
        <div className={styles.contractButtons}>
            <button
                className={styles.log}
                style={
                    codeHashContext.page === "1"
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {codeHashContext.changePage("1")}}
            >
                <img src={"/icons/buttons/logs.svg"} alt={"logs button"}/>
                Build log</button>
            <button
                className={styles.code}
                style={
                    codeHashContext.page === "2"
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {codeHashContext.changePage("2")}}
            >
                <img src={"/icons/buttons/code.svg"} alt={"code button"}/>
                Code</button>
        </div>
    );
}
