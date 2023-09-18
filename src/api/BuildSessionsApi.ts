export function buildSessionsGET(token: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        mode: "cors" as RequestMode,
    }

    return fetch(
        process.env.REACT_APP_SERVER_URL + "/buildSessions",
        options
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}

export function buildSessionsDetailsGET(hash: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
    }

    return fetch(
        process.env.REACT_APP_SERVER_URL + "/buildSessions/details/" + hash,
        options
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}

export function buildSessionsMetadataGET(hash: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
    }

    return fetch(
        process.env.REACT_APP_SERVER_URL + "/buildSessions/metadata/" + hash,
        options
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}
