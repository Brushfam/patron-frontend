import styles from "./ContractButtons.module.css"
import { useContract } from "../../context/ContractContext"
import { useLocation, useNavigate } from "react-router-dom"

export function ContractButtons(props: { isVerified?: boolean }) {
    const contractContext = useContract()
    const location = useLocation()
    const navigate = useNavigate()

    function checkTab(tab: string) {
        return tab === location.pathname.slice(location.pathname.lastIndexOf("/"))
    }

    function getLinkToNavigate(nextTab: string) {
        return location.pathname.slice(0, location.pathname.lastIndexOf("/")) + "/" + nextTab
    }

    function getTabCssClass(name: string) {
        return styles[name]
    }

    function ContractTab(props: {
        tabName: string
        page: string
        imgName: string
        tabText: string
    }) {
        return (
            <button
                className={getTabCssClass(props.tabName)}
                style={
                    checkTab("/" + props.tabName)
                        ? { backgroundColor: "#4270E7" }
                        : { backgroundColor: "#49525A" }
                }
                onClick={() => {
                    contractContext.changePage(props.page)
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
            <ContractTab tabName={"log"} page={"1"} imgName={"logs.svg"} tabText={"Build log"} />
            <ContractTab tabName={"code"} page={"2"} imgName={"code.svg"} tabText={"Code"} />
        </div>
    ) : (
        <div className={styles.contractButtons}>
            <div className={styles.contractButtonsRow}>
                <ContractTab tabName={"info"} page={"1"} imgName={"info.svg"} tabText={"Info"} />
                {props.isVerified ? (
                    <ContractTab tabName={"log"} page={"2"} imgName={"logs.svg"} tabText={"Build log"} />
                ) : (
                    <></>
                )}
                {props.isVerified ? (
                    <ContractTab tabName={"code"} page={"3"} imgName={"code.svg"} tabText={"Code"} />
                ) : (
                    <></>
                )}
            </div>
            {props.isVerified ? (
                <ContractTab tabName={"caller"} page={"4"} imgName={"contract-icon.svg"} tabText={"Caller"} />
            ) : (
                <></>
            )}
        </div>
    )
}
