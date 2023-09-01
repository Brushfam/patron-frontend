import styles from "./ContractButtons.module.css";
import {useContract} from "../../context/ContractContext";
import { useLocation, useNavigate } from "react-router-dom";

export function ContractButtons(props: {isVerified: boolean}) {
    const ContractContext = useContract()
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
            <div className={styles.contractButtonsRow}>
                <button
                    className={styles.info}
                    style={
                        checkTab("/info")
                            ? { backgroundColor: "#4270E7" }
                            : { backgroundColor: "#49525A" }
                    }
                    onClick={() => {ContractContext.changePage("1"); navigate(getLinkToNavigate("info"));}}
                >
                    <img src={"/icons/buttons/info.svg"} alt={"info button"}/>
                    Info</button>
                {
                    props.isVerified ? <button
                        className={styles.log}
                        style={
                            checkTab("/log")
                                ? { backgroundColor: "#4270E7" }
                                : { backgroundColor: "#49525A" }
                        }
                        onClick={() => {ContractContext.changePage("2"); navigate(getLinkToNavigate("log"));}}
                    >
                        <img src={"/icons/buttons/logs.svg"} alt={"logs button"}/>
                        Build log</button> : <></>
                }
                {
                    props.isVerified ? <button
                        className={styles.code}
                        style={
                            checkTab("/code")
                                ? { backgroundColor: "#4270E7" }
                                : { backgroundColor: "#49525A" }
                        }
                        onClick={() => {ContractContext.changePage("3"); navigate(getLinkToNavigate("code"));}}
                    >
                        <img src={"/icons/buttons/code.svg"} alt={"code button"}/>
                        Code</button> : <></>
                }
            </div>
            {
                props.isVerified ? <button
                    className={styles.caller}
                    style={
                        checkTab("/caller")
                            ? { backgroundColor: "#4270E7" }
                            : { backgroundColor: "#49525A" }
                    }
                    onClick={() => {ContractContext.changePage("4"); navigate(getLinkToNavigate("caller"));}}
                >
                    <img src={"/icons/contract-icon.svg"} alt={"caller button"}/>
                    Caller</button> : <></>
            }
        </div>
    );
}
