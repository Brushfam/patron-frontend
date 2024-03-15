import { NavigateFunction } from "react-router-dom"
import { contractExample, hashExample } from "../constants/addresses"

export function HandleAddressSearch(
    text: string,
    navigateTo: NavigateFunction,
    handleError: () => void
) {
    if (text === contractExample) {
        let searchCodeHash = text.slice(0, 2) === "0x" ? text.slice(2) : text
        navigateTo("/codeHash/" + searchCodeHash + "/code")
    } else if (text === hashExample) {
        navigateTo("/contract/" + text + "/code")
    } else {
        handleError()
    }
}
