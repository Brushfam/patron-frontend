import { ExplorerHeader } from "../components/Headers/ExplorerHeader";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddressElements } from "../components/ContractComponents/AddressElements";
import styles from "./ContractWindow.module.css";
import { ContractButtons } from "../components/Buttons/ContractButtons";
import { useContract } from "../context/ContractContext";
import { Info } from "../components/ContractComponents/Info";
import { Log } from "../components/ContractComponents/Log";
import { Code } from "../components/ContractComponents/Code";
import { buildSessionsDetailsGET } from "../api/BuildSessionsApi";

export default function ContractWindow() {
    const params = useParams();
    const ContractContext = useContract();
    const navigate = useNavigate();

    const [contractAddress, setContractAddress] = useState("");
    const [contractHash, setContractHash] = useState("");
    const [verified, setVerified] = useState(false);
    const [codeSourceId, setCodeSourceId] = useState(0);

    useEffect(() => {
        let dataPromise = fetch(
            process.env.REACT_APP_SERVER_URL + "/contracts/" + params.id,
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
            return response.json();
        });

        dataPromise.then((data) => {
            if (params.id) {
                setContractAddress(params.id.toString());
                let sourcePromise = buildSessionsDetailsGET(data.code_hash);
                sourcePromise.then((detailsList) => {
                    setCodeSourceId(detailsList.source_code_id);
                });
                setContractHash(data.code_hash);
            }

            fetch(
                process.env.REACT_APP_SERVER_URL + "/buildSessions/logs/" +
                    data.code_hash,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors" as RequestMode,
                }
            ).then((response) => {
                if (response.ok) {
                    setVerified(true);
                }
            });
        });

    }, [params.id, codeSourceId, contractHash]);

    const CurrentContractWindow = () => {
        const [logHash, source] = verified
            ? [contractHash, codeSourceId]
            : ["", 0];

        if (ContractContext.pages[0]) {
            return <Info address={contractAddress} hash={contractHash} isVerified={verified}></Info>;
        } else if (ContractContext.pages[1]) {
            return <Log hash={logHash}></Log>;
        } else return <Code source_id={source}></Code>;
    };

    return (
        <div className={styles.contractContainer}>
            <ExplorerHeader />
            <div className={styles.mainBlock}>
                <AddressElements
                    name={"Contract"}
                    address={contractAddress}
                    verified={verified}
                />
                <ContractButtons isVerified={verified}/>
                <CurrentContractWindow />
            </div>
        </div>
    );
}
