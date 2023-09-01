import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./ContractWindow.module.css";
import {ExplorerHeader} from "../components/Headers/ExplorerHeader";
import {AddressElements} from "../components/ContractComponents/AddressElements";
import {useContract} from "../context/ContractContext";
import {CodeHashButtons} from "../components/Buttons/CodeHashButtons";
import {buildSessionsDetailsGET} from "../api/BuildSessionsApi";

export default function CodeHashWindow(props: {child: JSX.Element}) {
    const params = useParams();
    const ContractContext = useContract();
    const navigate = useNavigate();
    const [codeHashAddress, setCodeHashAddress] = useState("");


    useEffect(() => {
        if (params.id) {
            setCodeHashAddress(params.id.toString());
            ContractContext.setLogHash(params.id.toString())
            let sourcePromise = buildSessionsDetailsGET(params.id.toString())
            sourcePromise.then((detailsList) => {
                ContractContext.setSource(detailsList.source_code_id)
            })
        }

        fetch(
            process.env.REACT_APP_SERVER_URL + '/buildSessions/logs/' + params.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors" as RequestMode,
            }
        ).then((response) => {
            if (!response.ok) {
                navigate("/");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })

    }, [params.id, navigate, ContractContext]);

    return (
        <div className={styles.contractContainer}>
            <ExplorerHeader />
            <div className={styles.mainBlock}>
                <div className={styles.addressAndButtons}>
                    <AddressElements name={"Hash Code"} iconPath={"/code-hash-square.svg"} address={codeHashAddress} verified={true} />
                    <CodeHashButtons />
                </div>
                {props.child}
            </div>
        </div>
    );
}