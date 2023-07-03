import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Log} from "../components/ContractComponents/Log";
import {Code} from "../components/ContractComponents/Code";
import styles from "./ContractWindow.module.css";
import {ExplorerHeader} from "../components/Headers/ExplorerHeader";
import {AddressElements} from "../components/ContractComponents/AddressElements";
import {useCodeHash} from "../context/CodeHashContext";
import {CodeHashButtons} from "../components/Buttons/CodeHashButtons";
import {buildSessionsDetailsGET} from "../api/BuildSessionsApi";


export default function CodeHashWindow() {
    const params = useParams();
    const ContractContext = useCodeHash();
    const navigate = useNavigate();
    const [codeHashAddress, setCodeHashAddress] = useState("");
    const [codeSourceId, setCodeSourceId] = useState(0)


    useEffect(() => {
        if (params.id) {
            setCodeHashAddress(params.id.toString());
            let sourcePromise = buildSessionsDetailsGET(params.id.toString())
            sourcePromise.then((detailsList) => {
                setCodeSourceId(detailsList.source_code_id)
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

    }, [params.id, navigate]);

    const CurrentContractWindow = () => {
        if (ContractContext.pages[0]) {
            if (params.id) {
                return <Log hash={params.id}></Log>;
            } else return <Log hash={""}></Log>;
        } else return <Code source_id={codeSourceId}></Code>;
    };


    return (
        <div className={styles.contractContainer}>
            <ExplorerHeader />
            <div className={styles.mainBlock}>
                <AddressElements name={"Hash Code"} address={codeHashAddress} verified={true}/>
                <CodeHashButtons />
                <CurrentContractWindow />
            </div>
        </div>
    );
}