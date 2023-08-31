import React, { useState } from "react"
import styles from "./SearchBlock.module.css"
import { SearchExamples } from "./SearchExamples"
import { HandleAddressSearch } from "../../api/HandleAddressSearch"
import { useNavigate } from "react-router-dom"

export function SearchBlock() {
    const [searchText, setSearchText] = useState("")
    const [searchFailed, setSearchFailed] = useState(false)
    const navigate = useNavigate()

    function setErrorPlaceholder() {
        setSearchFailed(true)
        const searchInput = document.getElementById("search-input")! as HTMLInputElement
        searchInput.value = ""
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            HandleAddressSearch(searchText, navigate, setErrorPlaceholder)
        }
    }

    return (
        <>
            <div className={styles.inputWrapper}>
                <input
                    id={"search-input"}
                    placeholder={searchFailed ? "This code hash was not verified yet" : "Search..."}
                    className={searchFailed ? styles.inputSearchError : styles.inputSearch}
                    autoComplete={"off"}
                    autoCorrect={"off"}
                    spellCheck={"false"}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        handleKeyDown(e)
                    }}
                />
                <img src={"/icons/search.svg"} className={styles.searchIcon} alt={"search icon"} />
                <button
                    type={"button"}
                    className={styles.searchButton}
                    onClick={() => {
                        HandleAddressSearch(searchText, navigate, setErrorPlaceholder)
                    }}
                >
                    <img
                        src={"icons/buttons/arrow.svg"}
                        className={styles.searchButtonIcon}
                        alt={"search arrow"}
                    />
                </button>
            </div>
            <SearchExamples setSearchText={setSearchText} />
        </>
    )
}
