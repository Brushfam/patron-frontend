import { NavigateFunction } from "react-router-dom"

export function HandleAddressSearch(
    text: string,
    navigateTo: NavigateFunction,
    handleError: () => void
) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
    }

    if (text.length === 64 || text.length === 66) {
        let searchCodeHash = text.slice(0, 2) === "0x" ? text.slice(2) : text

        fetch(
            process.env.REACT_APP_SERVER_URL + "/buildSessions/details/" + searchCodeHash,
            options
        ).then((response) => {
            if (!response.ok) {
                handleError()
                throw new Error(`HTTP error! Status: ${response.status}`)
            } else {
                navigateTo("/codeHash/" + searchCodeHash)
            }
        })
    } else if (text) {
        fetch(process.env.REACT_APP_SERVER_URL + "/contracts/" + text, options).then(
            (response) => {
                handleError()
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                } else {
                    navigateTo("/contract/" + text)
                }
            }
        )
    }
}
