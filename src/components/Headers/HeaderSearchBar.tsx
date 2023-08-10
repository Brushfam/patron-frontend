import React, { useState } from "react"
import styles from "./HeaderSearchBar.module.css"
import { useNavigate } from "react-router-dom"
import { HandleAddressSearch } from "../../api/HandleAddressSearch"

export function HeaderSearchBar(props: { elementId: string; barWidth?: string }) {
    const [searchText, setSearchText] = useState("")
    const [searchFailed, setSearchFailed] = useState(false)
    const navigate = useNavigate()

    function setErrorPlaceholder() {
        setSearchFailed(true)
        const searchInput = document.getElementById(props.elementId)! as HTMLInputElement
        searchInput.value = ""
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            HandleAddressSearch(searchText, navigate, setErrorPlaceholder)
        }
    }

    return (
        <div
            className={styles.inputWrapper}
            style={props.barWidth ? { width: props.barWidth } : {}}
        >
            <input
                id={props.elementId}
                placeholder={
                    searchFailed
                        ? "This code hash was not verified yet"
                        : "Search Contract or Hash Code"
                }
                className={searchFailed ? styles.searchInputError : styles.searchInput}
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
            <img
                src={"/icons/search-mini.svg"}
                className={styles.searchIcon}
                alt={"search icon"}
            />
        </div>
    )
}
