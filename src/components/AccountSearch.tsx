import styles from "./AccountSearch.module.css"
import React from "react";

export function AccountSearch(props: {setSearchText: React.Dispatch<React.SetStateAction<string>>}) {

    return (
        <div className={styles.searchBlock}>
            <div className={styles.inputWrapper}>
                <img
                    src={"icons/search-mini.svg"}
                    className={styles.searchIcon}
                    alt={"search icon"}
                />
                <input
                    className={styles.searchInput}
                    autoComplete={"off"}
                    autoCorrect={"off"}
                    spellCheck={"false"}
                    placeholder={"Search by name"}
                    onChange={(e) => {
                        props.setSearchText(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}
