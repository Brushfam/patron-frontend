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

    const contractExample = "5D9GkALjKfwvTca9RtWbb1zmRx7ZJBCxHiHNZ8Ke32Z6tmFu"
    const hashExample = "0efaf17fd9145a2c7d59821aea6036549f4b6f2d0c86440a16d4c1ac9d57a295"

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
