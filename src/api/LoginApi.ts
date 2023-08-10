import { KeysPOST } from "./KeysApi"

export function RegistrationPOST() {
    const options = {
        method: "POST",
    }

    return fetch(process.env.REACT_APP_SERVER_URL + "/auth/register", options).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
}

export function LoginPOST(address: string, signature: string, cli_token: string | null) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
        body: JSON.stringify({ account: address, signature: signature }),
    }

    let loginPromise = cli_token
        ? fetch(process.env.REACT_APP_SERVER_URL + "/auth/login?cli_token=" + cli_token, options)
        : fetch(process.env.REACT_APP_SERVER_URL + "/auth/login", options)

    return loginPromise.then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        if (response.ok) {
            return response
                .clone()
                .json()
                .then((value) => {
                    if (value.error) {
                        let tokenPromise = RegistrationPOST()
                        tokenPromise.then((token) => {
                            ;(async () => {
                                KeysPOST(address, signature, token.token.toString())
                                if (cli_token) {
                                    setTimeout(() => {
                                        return LoginPOST(address, signature, cli_token)
                                    }, 200)
                                }
                            })()
                        })
                        return tokenPromise
                    } else {
                        return response.json()
                    }
                })
        }
    })
}
