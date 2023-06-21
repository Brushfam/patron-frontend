import React from 'react';
import './BaseHeader.css'
import { Link } from "react-router-dom";

export function BaseHeader(props: {children?: JSX.Element}) {
    return(
        <div className={"baseHeaderContainer"}>
            <div className={"baseHeader"}>
                <Link  to={'/'} className={"patronLogo"} style={{height: 36}}>
                    <img src={"/patron-logo.svg"} alt={"Patron logo"}/>
                </Link>
                {props.children}
            </div>
        </div>
    )
}