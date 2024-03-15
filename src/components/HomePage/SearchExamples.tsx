import styles from "./SearchExamples.module.css";
import React from "react";
import { contractExample, hashExample } from "../../constants/addresses"

export function SearchExamples(props: {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) {
    function setExamplePlaceholder(text: string) {
        const searchInput = document.getElementById(
            "search-input"
        )! as HTMLInputElement;
        searchInput.value = text;
        props.setSearchText(text);
    }

    return (
        <div className={styles.examplesBlock}>
            <p>For example:</p>
            <button
                type={"button"}
                className={styles.exampleButton}
                onClick={() => {
                    setExamplePlaceholder(contractExample);
                }}
            >
                <img src={"icons/search-examples/example-contract.svg"} alt={"contract example"}/>
                <p>Contract</p>
            </button>
            <button type={"button"} className={styles.exampleButton} onClick={() => {
                setExamplePlaceholder(hashExample);
            }}>
                <img src={"icons/search-examples/example-hash.svg"} alt={"code hash example"}/>
                <p>Code Hash</p>
            </button>
        </div>
    );
}
