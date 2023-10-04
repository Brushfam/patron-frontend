import styles from "./ContractButtons.module.css"
import { useLocation, useNavigate } from "react-router-dom"

export function ContractButtons(props: { isVerified?: boolean }) {
    const location = useLocation()
    const navigate = useNavigate()

    function checkTab(tab: string) {
        return tab === location.pathname.slice(location.pathname.lastIndexOf("/"))
    }

    function getLinkToNavigate(nextTab: string) {
        return location.pathname.slice(0, location.pathname.lastIndexOf("/")) + "/" + nextTab
    }

    function ContractTab(props: {
        tabName: string
        imgName: string
        tabText: string
    }) {
        return (
            <button
                className={styles[props.tabName]}
                style={
                    checkTab("/" + props.tabName)
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {
                    navigate(getLinkToNavigate(props.tabName))
                }}
            >
                <img src={"/icons/buttons/" + props.imgName} alt={props.tabName + " button"} />
                {props.tabText}
            </button>
        )
    }

    return props.isVerified === undefined ? (
        <div className={styles.contractButtonsRow}>
            <ContractTab tabName={"log"} imgName={"logs.svg"} tabText={"Build log"} />
            <ContractTab tabName={"code"} imgName={"code.svg"} tabText={"Code"} />
            <ContractTab tabName={"diagnostic"} imgName={"diagnostic.svg"} tabText={"Diagnostic"} />
        </div>
    ) : (
        <div className={styles.contractButtons}>
            <div className={styles.contractButtonsRow}>
                <ContractTab tabName={"info"} imgName={"info.svg"} tabText={"Info"} />
                {props.isVerified ? (
                    <ContractTab tabName={"log"} imgName={"logs.svg"} tabText={"Build log"} />
                ) : (
                    <></>
                )}
                {props.isVerified ? (
                    <ContractTab tabName={"code"} imgName={"code.svg"} tabText={"Code"} />
                ) : (
                    <></>
                )}
            </div>
            <div className={styles.contractButtonsRow}>
                <ContractTab tabName={"diagnostic"} imgName={"diagnostic.svg"} tabText={"Diagnostic"} />
                {props.isVerified ? (
                    <ContractTab tabName={"caller"} imgName={"contract-icon.svg"} tabText={"Caller"} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
