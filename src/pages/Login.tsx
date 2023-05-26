import {LoginLayout} from "../layouts/LoginLayout";
import React from "react";
import {LoginForm} from "../components/Login/LoginForm";


export default function Login() {
    return(
        <LoginLayout headerText="Log in">
            <LoginForm></LoginForm>
        </LoginLayout>
    )
}