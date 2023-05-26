
export function codeListGET(sourceCode: number) {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors' as RequestMode,
    }

    return fetch(process.env.REACT_APP_SERVER_URL + '/files/' + sourceCode.toString(), options).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
}

export function codeGET(sourceCode: number, file: string) {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors' as RequestMode,
    }

    return fetch(process.env.REACT_APP_SERVER_URL + '/files/' + sourceCode + '?file=' + file, options).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
}

export function filesGet(sourceId: number) {
    let sourcePromise = codeListGET(sourceId)

    return sourcePromise.then((source) => {
        let file = source.files.length ? source.files[0].toString() : ""
        return codeGET(sourceId, file)
    })
}