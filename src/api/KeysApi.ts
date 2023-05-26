
export function KeysPOST(address: string, signature: string, token: string) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        mode: 'cors' as RequestMode,
        body: JSON.stringify({account: address, signature: signature})
    }

    fetch(process.env.REACT_APP_SERVER_URL + '/keys', options).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
}

