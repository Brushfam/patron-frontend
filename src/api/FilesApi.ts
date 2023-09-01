export function fileListGET(sourceCode: number) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
    }

    return fetch(
        process.env.REACT_APP_SERVER_URL + "/files/" + sourceCode.toString(),
        options
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}

function codeGET(sourceCode: number, file: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
    }

    return fetch(
        process.env.REACT_APP_SERVER_URL +
            "/files/" +
            sourceCode +
            "?file=" +
            file,
        options
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}

export function fileGET(sourceId: number, fileNumber: number) {
    let fileListPromise = fileListGET(sourceId)

    return fileListPromise.then((fileList) => {
        let file = fileList.files.length
            ? fileList.files[fileNumber].toString()
            : ""
        return codeGET(sourceId, file)
    })
}

export function metadataGET(codeHash: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
    }

    return fetch(
        process.env.REACT_APP_SERVER_URL + "/buildSessions/metadata/" + codeHash,
        options
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}
