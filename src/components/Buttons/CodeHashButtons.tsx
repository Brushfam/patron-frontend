import styles from "./ContractButtons.module.css";
import {useContract} from "../../context/ContractContext";
import { useLocation, useNavigate } from "react-router-dom";

export function CodeHashButtons() {
    const codeHashContext = useContract()
    const location = useLocation();
    const navigate = useNavigate()

    function checkTab(tab: string) {
        return tab === location.pathname.slice(location.pathname.lastIndexOf("/"))
    }

    function getLinkToNavigate(nextTab: string) {
        return location.pathname.slice(0, location.pathname.lastIndexOf("/")) + "/" + nextTab
    }

    return (
        <div className={styles.contractButtons}>
            <button
                className={styles.log}
                style={
                    checkTab("/log")
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {codeHashContext.changePage("1"); navigate(getLinkToNavigate("log"));}}
            >
                <img src={"/icons/buttons/logs.svg"} alt={"logs button"}/>
                Build log</button>
            <button
                className={styles.code}
                style={
                    checkTab("/code")
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {codeHashContext.changePage("2"); navigate(getLinkToNavigate("code"));}}
            >
                <img src={"/icons/buttons/code.svg"} alt={"code button"}/>
                Code</button>
        </div>
    );
}
