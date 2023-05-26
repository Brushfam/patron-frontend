import React, { useState } from "react";
import styles from "./SearchInput.module.css";
import { useNavigate } from "react-router-dom";

export function SearchInput() {
    const [searchText, setSearchText] = useState("");
    const [searchFailed, setSearchFailed] = useState(false);
    const navigate = useNavigate();

    function setErrorPlaceholder() {
        setSearchFailed(true);
        const searchInput = document.getElementById(
            "search-input"
        )! as HTMLInputElement;
        searchInput.value = "";
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors" as RequestMode,
            };

            let text = searchText.trim()
            if ((text.length === 64) || (text.length === 66)) {
                let searchCodeHash = (searchText.slice(0,2) === "0x") ? searchText.slice(2) : searchText

                fetch(
                    process.env.REACT_APP_SERVER_URL + "/buildSessions/details/" + searchCodeHash,
                    options
                ).then((response) => {
                    if (!response.ok) {
                        setErrorPlaceholder();
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    } else {
                        navigate("/codeHash/" + searchCodeHash);
                    }
                });
            } else if (searchText) {
                fetch(
                    process.env.REACT_APP_SERVER_URL + "/contracts/" + text,
                    options
                ).then((response) => {
                    if (!response.ok) {
                        setErrorPlaceholder();
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    } else {
                        navigate("/contract/" + text);
                    }
                });
            }
        }
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                id={"search-input"}
                placeholder={
                    searchFailed
                        ? "This code hash was not verified yet"
                        : "Search Accounts, Contracts, Transactions..."
                }
                className={
                    searchFailed ? styles.inputSearchError : styles.inputSearch
                }
                autoComplete={"off"}
                autoCorrect={"off"}
                spellCheck={"false"}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                    handleKeyDown(e);
                }}
            />
            <img
                src={"icons/search.svg"}
                className={styles.searchIcon}
                alt={"search icon"}
            />
        </div>
    );
}
