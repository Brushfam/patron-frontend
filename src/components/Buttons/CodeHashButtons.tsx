import styles from "./ContractButtons.module.css";
import {useCodeHash} from "../../context/CodeHashContext";

export function CodeHashButtons() {
    const codeHashContext = useCodeHash()

    return (
        <div className={styles.contractButtons}>
            <button
                className={styles.log}
                style={
                    codeHashContext.pages[0]
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {codeHashContext.changePage([true, false])}}
            >
                <img src={"/icons/buttons/gear.svg"}/>
                Build log</button>
            <button
                className={styles.code}
                style={
                    codeHashContext.pages[1]
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {codeHashContext.changePage([false, true])}}
            >
                <img src={"/icons/buttons/code.svg"}/>
                Code</button>
        </div>
    );
}
