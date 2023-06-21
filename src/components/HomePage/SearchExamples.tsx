import styles from "./SearchExamples.module.css";
import React from "react";

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

    const contractExample = "5FCeeM1W235pbJk9soS9kqRtY4jvfzqbhBxLhJzUHrrsiena"
    const hashExample = "c71df4b0424191e8e21850b1668668dafe0726a7ecc40837b4a8ef3d90ecf7cf"

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
