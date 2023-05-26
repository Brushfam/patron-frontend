import React from 'react';
import './BaseHeader.css'
import { Link } from "react-router-dom";

export function BaseHeader(props: {children?: JSX.Element}) {
    return(
        <div className={"baseHeaderContainer"}>
            <div className={"baseHeader"}>
                <Link  to={'/'} className={"patronLogo"}>
                    <img src={"/patron-logo.svg"} alt={"Patron logo"}/>
                </Link>
                {props.children}
            </div>
        </div>
    )
}