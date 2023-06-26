import { Navigate } from "react-router-dom";
import React from "react";

export default function Login() {
    let params = new URL(window.location.href).searchParams
    let cli_token = params.get("cli_token")
    if (cli_token) {
        return <Navigate to={"/?cli_token=" + cli_token} />
    } else {
        return <Navigate to={'/'}/>
    }
}
